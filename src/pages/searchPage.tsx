import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {ISearchParams} from "../misc/interfaces";
import {
    ISearchObject,
    IResultList,
    ISendPage,
    ICollection,
    ISendCandidate,
    IFacetCandidate,
    ISearchValues,
    IResetFacets,
    IRemoveFacet,
    IShowDetail
} from "../misc/interfaces";
import FreeTextFacet from "../facets/freeTextFacet";
import SearchResultList from "../elements/searchResultList";
import {OutletProps} from "react-router-dom";
import {Base64} from "js-base64";
import {getServiceServer, getHome} from "../misc/config";

function SearchPage() {
    const params = useParams();
    const parameters: ISearchParams = JSON.parse(Base64.decode(params.scode as string));
    const [refresh, setRefresh] = useState(false);
    const [collections, setCollections] = useState<ICollection[]>([]);
    const [collectionIndex, setCollectionIndex] = useState(0);
    const [esIndex, setEsIndex] = useState(parameters.collection_index);
    const [dataset, setDataset] = useState(parameters.dataset);
    const [collection, setCollection] = useState(parameters.collection);
    const [page, setPage] = useState(parameters.page);
    const [result, setResult] = useState<IResultList>({amount: 0} as IResultList);
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState<number[]>([]);
    let navigate = useNavigate();

    let searchStruc: ISearchObject = {
        searchvalues: parameters.searchvalues,
        page: page,
        page_length: 30,
        sortorder: "title",
        collection_index: esIndex
    };




    async function fetchData() {
        update_search_struc();
        const url = getServiceServer() + "browse";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': getHome()
            },
            body: JSON.stringify(searchStruc)
        });
        const json: IResultList = await response.json();
        setResult(json);
        setPages(createPages(json));
        setLoading(false);
    }

    function update_search_struc() {
        searchStruc.collection_index = parameters.collection_index;
        searchStruc.searchvalues = parameters.searchvalues;
        searchStruc.page = parameters.page;
    }




    const sendCandidate: ISendCandidate = (candidate: IFacetCandidate) => {
        setPage(1);
        if (parameters.searchvalues === []) {
            parameters.searchvalues = [{
                name: candidate.facet,
                field: candidate.field,
                values: [candidate.candidate]
            } as ISearchValues];
            parameters.page = 1;
            //setSearchStruc(searchBuffer);
            //window.location.href = '#search/' + Base64.toBase64(JSON.stringify(searchStruc));
        } else {
            if (typeof parameters.searchvalues === "object") {
                let found: boolean = false;
                parameters.searchvalues.forEach((item) => {
                    if (item.name === candidate.facet) {
                        found = true;
                        if (!item.values.includes(candidate.candidate)) {
                            item.values.push(candidate.candidate);
                        }
                    }
                });
                if (!found) {
                    parameters.searchvalues.push({
                        name: candidate.facet,
                        field: candidate.field,
                        values: [candidate.candidate]
                    });
                }
            }
            searchStruc.page = 1;
        }
        goToPage(page);
        window.scroll(0, 0);
    }

    let facets: ISearchValues[] = [];
    if (typeof searchStruc.searchvalues === "object") {
        facets = searchStruc.searchvalues as ISearchValues[];
    }


    const resetFacets: IResetFacets = () => {
        searchStruc.page = 1;
        searchStruc.searchvalues = [];
        setRefresh(!refresh);
    }

    const removeFacet: IRemoveFacet = (field: string, value: string) => {
        if (typeof parameters.searchvalues === "object") {
            parameters.searchvalues.forEach((item: ISearchValues) => {
                if (item.name === field) {
                    item.values = item.values.filter((element => element !== value));
                }
            })
            parameters.searchvalues = parameters.searchvalues.filter(function (el) {
                return el.values.length > 0
            });
        }
        //setSearchStruc(searchBuffer);
        setRefresh(!refresh);
    }

    function createPages(json: IResultList) {
        let arr: number[] = [];
        for (var i: number = 1; i <= json.pages; i++) {
            arr.push(i);
        }
        return arr;
    }

    function nextPage() {
        setPage(parameters.page + 1);
        goToPage(parameters.page + 1);
    }

    function selectPage(item: string) {
        const pg: number = Number(item);
        if (pg != NaN) {
            setPage(pg);
            goToPage(pg);
        }
    }

    function prevPage() {
        if (parameters.page > 0) {
            setPage(parameters.page - 1);
            goToPage(parameters.page - 1);
        }
    }


    const goToPage: ISendPage = (page: number) => {

        parameters.page = page;
        //setSearchStruc(searchBuffer);
        setRefresh(!refresh);
        navigate('/search/' + Base64.toBase64(JSON.stringify(parameters)));
        window.scroll(0, 0);
    }

    const showDetail: IShowDetail = ( uri: string) => {
        //setUri(uri);
        //setDetails(true);
        const paramSet = {
            dataset: "",
            collection: "",
            uri: uri
        }
        paramSet.dataset = parameters.dataset;
        paramSet.collection = parameters.collection;
        navigate('/detail/' + Base64.encode(JSON.stringify(paramSet)));
        window.scroll(0,0);
    }

    fetchData();

    useEffect(() => {
            fetchData();
        },
        [refresh]);


    return (
        <div>
            <div className="hcContentContainer">
                <div className="hcBasicSideMargin hcMarginTop1 hcMarginBottom1">
                    <h1>Search</h1>

                </div>
                <div className="hcLayoutFacet-Result hcBasicSideMargin hcMarginBottom15">
                    <div className="hcLayoutFacets">
                        <FreeTextFacet add={sendCandidate}/>
                    </div>
                    <div className="hcLayoutResults">
                        <div className="hcResultsHeader hcMarginBottom1">
                            {result.amount > 9999 ? (
                                <div>{result.amount}+ Results, page {parameters.page} of {result.pages} pages</div>
                            ) : (
                                <div>{result.amount} Results, page {parameters.page} of {result.pages} pages</div>
                            )}
                        </div>

                        <div className="hcMarginBottom2">
                            <span className="hcSmallTxt hcTxtColorGreyMid">Selected facets:</span>
                            <span
                                className="hcFacetReset hcClickable" onClick={resetFacets}>Reset facets</span>
                        </div>
                        {parameters.searchvalues === [] ? (
                            <div/>
                        ) : (
                            facets.map((item: ISearchValues, index) => {
                                return (
                                    <span key={index} className="hcSelectedFacet"><span
                                        className="hcSelectedFacetType">{item.name}: </span>
                                        {item.values.map(function (element, i) {
                                            return (<div className="hcFacetValues" key={i}
                                                         onClick={() => removeFacet(item.name, element)}>{element}  </div>)
                                        })}
                                    </span>
                                )
                            })
                        )}
                        <div className="hcList">
                            <div className="hcListHeader">
                                <div className="hcLabel hcListItemLong">Title</div>
                                <div className="hcLabel">URI</div>
                            </div>
                        </div>

                        <div className="hcLists hcMarginBottom2">
                            {loading ? (<div>Loading...</div>) : (<SearchResultList list={result} open={showDetail}/>)}
                        </div>
                        {!loading && result.amount > searchStruc.page_length ? (
                            <div className="hcPagination">
                                {parameters.page < 2 ?
                                    (<div/>) : (
                                        <div className="hcClickable" onClick={prevPage}>&#8592; Previous</div>)}
                                <div className="hcClickable">
                                    <select className="hcPageSelector" value={parameters.page} onChange={(e) => selectPage(e.target.value)}>
                                        {pages.map((pg: number, index) => {
                                            //if (pg === searchStruc.page) {
                                             //   return (
                                             //       <option value={pg} selected>{pg}</option>)
                                            //} else {
                                                return (
                                                    <option key={index} value={pg}>{pg}</option>)
                                            //}
                                        })}
                                    </select>
                                </div>
                                {parameters.page < result.pages ? (
                                    <div className="hcClickable" onClick={nextPage}>Next &#8594;</div>
                                ) : (<div/>)}
                            </div>
                        ) : (<div/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage;


