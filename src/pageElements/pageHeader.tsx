import React, {useEffect} from 'react';
import logo from '../assets/img/ga.png';
import {useState} from "react";
import {IStore, IDataSet, ICollection, ISearchParams, IRefresh} from "../misc/interfaces";
import {getServiceServer} from "../misc/config";
import {Base64} from "js-base64";
import {useNavigate, useParams} from "react-router-dom";
import down_arrow from '../assets/img/icon_arrow-down.png';

function PageHeader() {

    const [storeLoading, setStoreLoading] = useState(true);
    const [store, setStore] = useState<IStore>({"dataSets": []})
    const [refresh, setRefresh] = useState(false);
    const [datasetIndex, setDatasetIndex] = useState(0);
    const [collections, setCollections] = useState<ICollection[]>([]);
    const [collectionIndex, setCollectionIndex] = useState("");
    const [collectionSelectIndex, setCollectionSelectIndex] = useState(0);
    const [dataset, setDataset] = useState("");
    const [collection, setCollection] = useState("");
    const [parameter, setParameter] = useState("");
    let navigate = useNavigate();

    async function getStore() {
        if (storeLoading) {
            const url = getServiceServer() + "get_store";
            const response = await fetch(url);
            const resp_store: IStore = await response.json();
            setStore(resp_store);
            setCollections(resp_store.dataSets[0].indexes);
            setDataset(resp_store.dataSets[0].dataSet);
            setCollection(resp_store.dataSets[0].indexes[0].collection_id);
            setCollectionIndex(resp_store.dataSets[0].indexes[0].collection);
            setStoreLoading(false);
        }
    }


    useEffect(() => {
        getStore();
    });


    return (
        <div>
            {/*<div className="hcContentContainer bgColorBrand1 hcMarginBottom1">
                <header className=" hcPageHeaderSimple hcBasicSideMargin">
                    <div className="hcBrand">
                        <div className="hcBrandLogo">
                            <img src={logo} className="galogo"/>
                        </div>
                    </div>

                    <nav>
                        <a href="">About</a>
                    </nav>
                </header>
            </div>*/}
            <header className="hcGaHeaderGen bgColorBrand1">
                <div className="hcGaHeaderGen__Logo">
                    <img
                        src="https://d33wubrfki0l68.cloudfront.net/ed17091f189bc37f34f94717f506432501dbc722/d072a/images/logo-ga.png"
                        alt="Golden Agents logo"/>
                </div>
                <div className="hcGaHeaderGen__ToolName hcDataSetHeaderLink" onClick={() => {
                    navigate("/")
                }}>
                    Dataset Browser
                </div>

                <nav className="hcGaHeaderGen__Nav">

                    <div className="hcDropList hcGaHeader__dropdown">
                        <button type="button" name="button" aria-label="open menu item" className="">About <img
                            src={down_arrow} alt=""/></button>
                        <div className="hcDropList__list">
                            <a href="https://www.goldenagents.org/tools/dataset-browser/" target="_blank">About this
                                tool</a>
                            <a href="https://ga-wp3.sd.di.huc.knaw.nl/" target="_blank">About the Golden Agents
                                Project</a>
                            <a href="https://www.goldenagents.org/" target="_blank">Goldenagents.org</a>
                        </div>
                    </div>


                    <div className="hcDropList hcGaHeader__dropdown">
                        <button type="button" name="button" aria-label="open menu item" className="">More tools <img
                            src={down_arrow} alt=""/></button>
                        <div className="hcDropList__list">
                            <a href="https://www.goldenagents.org/tools/dataset-browser/" target="_blank">Dataset
                                Browser<br/>
                                <small>Explore the Golden Agents datasets.</small></a>
                            <a href="https://ga-wp3.sd.di.huc.knaw.nl/" target="_blank">Golden Agent Search<br/>
                                <small>Use SparQL or a querybuilder to anwser your research question. Our agents search
                                    overmultiple datasets.</small></a>
                            <a href="https://lenticularlens.goldenagents.org" target="_blank">Lenticular Lens<br/>
                                <small>A dataset alignment tool. It offers context-dependent user-guided entity matching
                                    across multiple datasets.</small></a>
                            <a href="https://github.com/proycon/analiticcl" target="_blank">Analiticcl<br/>
                                <small>Analiticcl is an approximate string matching or fuzzy-matching system that can be
                                    used for spelling correction or text normalisation
                                </small></a>
                        </div>
                    </div>


                    <div className="hcDropList hcGaHeader__dropdown">
                        <button type="button" name="button" aria-label="open menu item" className="">Help <img
                            src={down_arrow} alt=""/>
                        </button>
                        <div className="hcDropList__list">
                        </div>
                    </div>
                </nav>


            </header>
            {/*{(document.location.href.indexOf("/search") !== -1 || document.location.href.indexOf("/detail") !== -1) ? (
                <div className="hcContentContainer hcMarginBottom5 hcBorderBottom hcMarginTop2">
                    {!storeLoading && (<div className="hcBarDataset hcBasicSideMargin">
                <span>
                <span className="hcSmallTxt hcTxtColorGreyMid">Dataset</span>
                    <select className="" name="" value={store.dataSets[datasetIndex].label} onChange={(event) => {
                        setDatasetIndex(event.target.selectedIndex);
                        setDataset(store.dataSets[event.target.selectedIndex].dataSet);
                        setCollection(store.dataSets[event.target.selectedIndex].indexes[0].collection_id);
                        setCollectionIndex(store.dataSets[event.target.selectedIndex].indexes[0].collection);
                        setCollections(store.dataSets[event.target.selectedIndex].indexes);
                        setDatasetIndex(event.target.selectedIndex);
                        let struc: ISearchParams = {
                            dataset: store.dataSets[event.target.selectedIndex].dataSet,
                            collection: store.dataSets[event.target.selectedIndex].indexes[0].collection_id,
                            collection_index: store.dataSets[event.target.selectedIndex].indexes[0].collection,
                            page: 1,
                            searchvalues: []
                        }
                        navigate("search/" + Base64.encode(JSON.stringify(struc)));
                        setRefresh(!refresh);
                    }}>
                    {store.dataSets.map((item, index) => {
                        return (<option key={index}>{item.label}</option>)
                    })}
                    </select>
                </span>
                        <span><span className="hcSmallTxt hcTxtColorGreyMid">Collections</span>
                    <select value={store.dataSets[datasetIndex].indexes[collectionSelectIndex].label}
                            onChange={(event) => {
                                setCollectionIndex(store.dataSets[datasetIndex].indexes[event.target.selectedIndex].collection);
                                setCollection(store.dataSets[datasetIndex].indexes[event.target.selectedIndex].collection_id);
                                setCollectionSelectIndex(event.target.selectedIndex);
                                let struc: ISearchParams = {
                                    dataset: dataset,
                                    collection: store.dataSets[datasetIndex].indexes[event.target.selectedIndex].collection_id,
                                    collection_index: store.dataSets[datasetIndex].indexes[event.target.selectedIndex].collection,
                                    page: 1,
                                    searchvalues: []
                                }
                                navigate("search/" + Base64.encode(JSON.stringify(struc)));
                                setRefresh(!refresh)
                            }}>
                        {collections.map((item, index) => {
                            return (<option key={index}>{item.label}</option>)
                        })}
                    </select>
                </span>
                    </div>)}
                </div>) : (<div/>)}*/}
        </div>
    )
}

export default PageHeader;