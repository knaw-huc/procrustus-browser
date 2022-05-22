import React from "react";
import {useState, useEffect} from "react";
import {SERVICE_SERVER, HOME} from "../misc/config";
import {IStore, ICollection, IShowDetail, ICloseDetail} from "../misc/interfaces";
import {IBrowseResult, IBrowseStruc, ISearchObject, IResultList, ISendPage, ISendCandidate, IFacetCandidate, ISearchValues, IResetFacets, IRemoveFacet } from "../misc/interfaces";
import wrench from "../assets/images/wrench32.png";
import doc from "../assets/images/linedpaper32.png";
import back from "../assets/images/leftarrow32.png";
import {Base64, fromBase64, toBase64} from "js-base64";
import FreeTextFacet from "../facets/freeTextFacet";
import SearchResultList from "../elements/searchResultList";


function Search(props: {parStr: string}) {

    const [storeLoading, setStoreLoading] = useState(true);
    const [store, setStore] = useState<IStore>({"dataSets": []})
    const [refresh, setRefresh] = useState(false);
    const [dataRefresh, setDataRefresh] = useState(false);
    const [datasetIndex, setDatasetIndex] = useState(0);
    const [collections, setCollections] = useState<ICollection[]>([]);
    const [collectionIndex, setCollectionIndex] = useState(0);
    const [esIndex, setEsIndex] = useState("none");
    const [dataset, setDataset] = useState("");
    const [collection, setCollection] = useState("");
    const [uri, setUri] = useState("");
    const [page, setPage] = useState(1);
    const [result, setResult] = useState<IResultList>({amount: 0} as IResultList);
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState<number[]>([]);

    const parameters = fromBase64(props.parStr);
    let tmpBuffer: ISearchObject = {
        searchvalues: "none",
        page: page,
        page_length: 30,
        sortorder: "title",
        index: ""
    };
    if (parameters === "none") {
        let tmpBuffer: ISearchObject = JSON.parse(parameters);
    }

    let searchBuffer: ISearchObject = tmpBuffer;


    const [searchStruc, setSearchStruc] = useState(searchBuffer);

    async function fetchStoreAndData() {
        if (storeLoading) {
            const url = SERVICE_SERVER + "get_store";
            const response = await fetch(url);
            const resp_store: IStore = await response.json();
            setStore(resp_store);
            setCollections(resp_store.dataSets[0].indexes);
            setStoreLoading(false);
            setEsIndex(resp_store.dataSets[0].indexes[0].collection);
            setDataset(resp_store.dataSets[0].dataSet);
            setCollection(resp_store.dataSets[0].indexes[0].collection_id);
        } else {
            setCollections(store.dataSets[datasetIndex].indexes);
            setEsIndex(store.dataSets[datasetIndex].indexes[0].collection);
            searchBuffer.page = 1;
            setSearchStruc(searchBuffer);
        }
        setDataRefresh(!dataRefresh);
    }

    async function fetchData() {
        if (!storeLoading) {
            searchStruc.index = esIndex;
            const url = SERVICE_SERVER + "browse";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Origin': HOME
                },
                body: JSON.stringify(searchStruc)
                });
            const json: IResultList = await response.json();
            setResult(json);
            setPages(createPages(json));
            //setDetails(false);
            setLoading(false);
        }
    }

    window.onload = correctLoad;

    function correctLoad() {
        window.location.href = "#search";
    }




    useEffect(() => {
        fetchStoreAndData();
    }, [refresh]);

    useEffect(() => {
        fetchData();
        },
        [storeLoading, dataRefresh]);

    const showDetail: IShowDetail = (uri: string) => {
        //setUri(uri);
        //setDetails(true);
        const paramSet = {
            dataset: dataset,
            collection: collection,
            uri: uri
        }
        window.location.href = '#detail/' + toBase64(JSON.stringify(paramSet));
        window.scroll(0,0);
    }

    /*const closeDetail: ICloseDetail = () => {
        //setDetails(false);
        window.location.href = '#search'
    }*/

    const sendCandidate: ISendCandidate = (candidate: IFacetCandidate) => {
        setPage(1);
        searchBuffer = searchStruc;
        if (searchStruc.searchvalues === "none") {
            searchBuffer.searchvalues = [{
                name: candidate.facet,
                field: candidate.field,
                values: [candidate.candidate]
            } as ISearchValues];
            searchBuffer.page = 1;
            setSearchStruc(searchBuffer);
            //window.location.href = '#search/' + Base64.toBase64(JSON.stringify(searchStruc));
            setDataRefresh(!dataRefresh);
        } else {
            if (typeof searchBuffer.searchvalues === "object") {
                let found: boolean = false;
                searchBuffer.searchvalues.forEach((item) => {
                    if (item.name === candidate.facet) {
                        found = true;
                        if (!item.values.includes(candidate.candidate)) {
                            item.values.push(candidate.candidate);
                        }
                    }
                });
                if (!found) {
                    searchBuffer.searchvalues.push({
                        name: candidate.facet,
                        field: candidate.field,
                        values: [candidate.candidate]
                    });
                }
            }
            searchBuffer.page = 1;
            setSearchStruc(searchBuffer);
            setDataRefresh(!dataRefresh);
            window.scroll(0, 0);
        }
    }

    let facets: ISearchValues[] = [];
    if (typeof searchStruc.searchvalues === "object") {
        facets = searchStruc.searchvalues as ISearchValues[];
    }



    const resetFacets: IResetFacets = () => {
        searchBuffer = searchStruc;
        searchBuffer.page = 1;
        searchBuffer.searchvalues = "none";
        setSearchStruc(searchBuffer);
        setRefresh(!refresh);
    }

    const removeFacet: IRemoveFacet = (field: string, value: string) => {
        searchBuffer = searchStruc;
        if (typeof searchBuffer.searchvalues === "object") {
            searchBuffer.searchvalues.forEach((item: ISearchValues) => {
                if (item.name === field) {
                    item.values = item.values.filter((element => element !== value));
                }
            })
            searchBuffer.searchvalues = searchBuffer.searchvalues.filter(function (el) {
                return el.values.length > 0
            });
            if (searchBuffer.searchvalues.length === 0) {
                searchBuffer.searchvalues = "none";
            }
        }
        setSearchStruc(searchBuffer);
        setDataRefresh(!dataRefresh);
    }

    function createPages(json: IResultList) {
        let arr: number[] = [];
        for (var i: number = 1; i <= json.pages; i++) {
            arr.push(i);
        }
        return arr;
    }

    function nextPage() {
        setPage(searchStruc.page + 1);
        goToPage(searchStruc.page + 1);
    }

    function selectPage(item: string) {
        const pg: number = Number(item);
        if (pg != NaN) {
            setPage(pg);
            goToPage(pg);
        }
    }

    function prevPage() {
        if (searchStruc.page > 0) {
            setPage(searchStruc.page - 1);
            goToPage(searchStruc.page - 1);
        }
    }


    const goToPage: ISendPage = (page: number) => {
        searchBuffer = searchStruc;
        searchBuffer.page = page;
        setSearchStruc(searchBuffer);
        //setDataRefresh(!dataRefresh);
        window.location.href = '#search/' + Base64.toBase64(JSON.stringify(searchStruc));
        window.scroll(0, 0);
    }

    return (
        <div>
            <div className="hcContentContainer hcMarginBottom5 hcBorderBottom">
                {!storeLoading && (<div className="hcBarDataset hcBasicSideMargin">
                <span>
                <span className="hcSmallTxt hcTxtColorGreyMid">Dataset</span>
                    <select className="" name="" onChange={(event) => {
                        window.location.href = "#search";
                        setDatasetIndex(event.target.selectedIndex);
                        setDataset(store.dataSets[event.target.selectedIndex].dataSet);
                        setCollection(store.dataSets[event.target.selectedIndex].indexes[0].collection_id);
                        setCollectionIndex(0);
                        setRefresh(!refresh);
                    }}>
                    {store.dataSets.map((item, index) => {
                        return (<option key={index}>{item.label}</option>)
                    })}
                    </select>
                </span><span>
                <span className="hcSmallTxt hcTxtColorGreyMid">Collections</span>
                    <select value={store.dataSets[datasetIndex].indexes[collectionIndex].label}  onChange={(event) => {
                        window.location.href = "#search";
                        setEsIndex(store.dataSets[datasetIndex].indexes[event.target.selectedIndex].collection);
                        setCollectionIndex(event.target.selectedIndex);
                        setCollection(store.dataSets[datasetIndex].indexes[event.target.selectedIndex].collection_id)
                        setDataRefresh(!dataRefresh);}}>
                        {collections.map((item, index) => {
                            return (<option key={index}>{item.label}</option> )
                        })}
                    </select>
                </span>
                </div>)}

            </div>
                <div className="hcContentContainer">
                <div className="hcBasicSideMargin hcMarginTop4 hcMarginBottom1">
                    <h1>Search</h1>
                </div>

                <div className="hcLayoutFacet-Result hcBasicSideMargin hcMarginBottom15">

                    <div className="hcLayoutFacets">
                        <FreeTextFacet add={sendCandidate}/>
                    </div>
                    <div className="hcLayoutResults">
                        <div className="hcResultsHeader hcMarginBottom1">
                            {result.amount > 9999 ? (
                                <div>{result.amount}+ Results, page {searchStruc.page} of {result.pages} pages</div>
                            ) : (
                                <div>{result.amount} Results, page {searchStruc.page} of {result.pages} pages</div>
                            )}

                           {/* <div><select className="" name="">
                                <option value="">Order by Relevance</option>
                                <option value="">Order by given name</option>
                                <option value="">Order by family name</option>
                            </select></div>*/}
                        </div>

                        <div className="hcMarginBottom2">
                            <span className="hcSmallTxt hcTxtColorGreyMid">Selected facets:</span>
                            <span
                                className="hcFacetReset hcClickable" onClick={resetFacets}>Reset facets</span>
                        </div>
                        {searchStruc.searchvalues === "none" ? (
                            <div/>
                        ) : (
                            facets.map((item: ISearchValues) => {
                                return (
                                    <span className="hcSelectedFacet"><span
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
                                {searchStruc.page < 2 ?
                                    (<div/>) : (
                                        <div className="hcClickable" onClick={prevPage}>&#8592; Previous</div>)}
                                <div className="hcClickable">
                                    <select className="hcPageSelector" onChange={(e) => selectPage(e.target.value)}>
                                        {pages.map((pg: number) => {
                                            if (pg === searchStruc.page) {
                                                return (
                                                    <option value={pg} selected>{pg}</option>)
                                            } else {
                                                return (
                                                    <option value={pg}>{pg}</option>)
                                            }
                                        })}
                                    </select>
                                </div>
                                {searchStruc.page < result.pages ? (
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

export default Search;