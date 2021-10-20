import React from "react";
import {useState, useEffect} from "react";
import {SERVICE_SERVER, HOME} from "../misc/config";
import {IStore, ICollection} from "../misc/interfaces";
import {IBrowseResult, IBrowseStruc, ISearchObject, IResultList, ISendPage, ISendCandidate, IFacetCandidate, ISearchValues } from "../misc/interfaces";
import wrench from "../assets/images/wrench32.png";
import doc from "../assets/images/linedpaper32.png";
import back from "../assets/images/leftarrow32.png";
import {Base64} from "js-base64";
import FreeTextFacet from "../facets/freeTextFacet";
import SearchResultList from "../elements/searchResultList";


function Search() {

    let searchBuffer: ISearchObject = {
        searchvalues: "none",
        page: 1,
        page_length: 30,
        sortorder: "title",
        index: ""
    };
    const [storeLoading, setStoreLoading] = useState(true);
    const [store, setStore] = useState<IStore>({"dataSets": []})
    const [refresh, setRefresh] = useState(false);
    const [dataRefresh, setDataRefresh] = useState(false);
    const [datasetIndex, setDatasetIndex] = useState(0);
    const [collections, setCollections] = useState<ICollection[]>([]);
    const [esIndex, setEsIndex] = useState("none");
    //const [page, setPage] = useState(1);
    const [result, setResult] = useState<IResultList>({amount: 0} as IResultList);
    const [loading, setLoading] = useState(true);
    const [searchStruc, setSearchStruc] = useState(searchBuffer);
    const [pages, setPages] = useState<number[]>([]);

    async function fetchStoreAndData() {
        if (storeLoading) {
            const url = SERVICE_SERVER + "get_store";
            const response = await fetch(url);
            const resp_store: IStore = await response.json();
            setStore(resp_store);
            setCollections(resp_store.dataSets[0].indexes);
            setStoreLoading(false);
            setEsIndex(resp_store.dataSets[0].indexes[0].collection);
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
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchStoreAndData();
    }, [refresh]);

    useEffect(() => {
        fetchData();
        },
        [storeLoading, dataRefresh]);

    const sendCandidate: ISendCandidate = (candidate: IFacetCandidate) => {
        searchBuffer = searchStruc;
        if (searchStruc.searchvalues === "none") {
            searchBuffer.searchvalues = [{
                name: candidate.facet,
                field: candidate.field,
                values: [candidate.candidate]
            } as ISearchValues];
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
        console.log(JSON.stringify(searchBuffer));
    }

    function createPages(json: IResultList) {
        let arr: number[] = [];
        for (var i: number = 1; i <= json.pages; i++) {
            arr.push(i);
        }
        return arr;
    }

    function nextPage() {
        goToPage(searchStruc.page + 1);
    }

    function selectPage(item: string) {
        const pg: number = Number(item);
        if (pg != NaN) {
            goToPage(pg);
        }
    }

    function prevPage() {
        if (searchStruc.page > 0) {
            goToPage(searchStruc.page - 1);
        }
    }


    const goToPage: ISendPage = (page: number) => {
        searchBuffer = searchStruc;
        searchBuffer.page = page;
        setSearchStruc(searchBuffer);
        setDataRefresh(!dataRefresh);
        //window.location.href = '#search/' + Base64.toBase64(JSON.stringify(searchStruc));
        window.scroll(0, 0);
    }

    return (
        <div>
            <div className="hcContentContainer hcMarginBottom5 hcBorderBottom">
                {!storeLoading && (<div className="hcBarDataset hcBasicSideMargin">
                <span>
                <span className="hcSmallTxt hcTxtColorGreyMid">Dataset</span>
                    <select className="" name="" onChange={(event) => {setDatasetIndex(event.target.selectedIndex); setRefresh(!refresh);}}>
                    {store.dataSets.map((item, index) => {
                        return (<option key={index}>{item.label}</option>)
                    })}
                    </select>
                </span><span>
                <span className="hcSmallTxt hcTxtColorGreyMid">Collections</span>
                    <select className="" name="" onChange={(event) => {setEsIndex(store.dataSets[datasetIndex].indexes[event.target.selectedIndex].collection); setDataRefresh(!dataRefresh);}}>
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
                            <div>{result.amount} Results, page {searchStruc.page} of {result.pages} pages</div>
                           {/* <div><select className="" name="">
                                <option value="">Order by Relevance</option>
                                <option value="">Order by given name</option>
                                <option value="">Order by family name</option>
                            </select></div>*/}
                        </div>

                        <div className="hcMarginBottom2">
                            <span className="hcSmallTxt hcTxtColorGreyMid">Selected facets:</span>
                        </div>

                        <div className="hcList">
                            <div className="hcListHeader">
                                <div className="hcLabel hcListItemLong">Title</div>
                                <div className="hcLabel">URI</div>
                            </div>
                        </div>

                        <div className="hcLists hcMarginBottom2">
                            {loading ? (<div>Loading...</div>) : (<SearchResultList list={result}/>)}
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