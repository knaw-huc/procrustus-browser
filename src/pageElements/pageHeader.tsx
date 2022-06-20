import React, {useEffect} from 'react';
import logo from '../assets/img/ga.png';
import {useState} from "react";
import {IStore, IDataSet, ICollection, ISearchParams, IRefresh} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";
import {Base64} from "js-base64";
import {useNavigate, useParams} from "react-router-dom";

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
            const url = SERVICE_SERVER + "get_store";
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
    }, [refresh]);




    return (
        <div>
            <div className="hcContentContainer bgColorBrand1 hcMarginBottom1">
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
            </div>
            <div className="hcContentContainer hcMarginBottom5 hcBorderBottom">
                {!storeLoading && (<div className="hcBarDataset hcBasicSideMargin">
                <span>
                <span className="hcSmallTxt hcTxtColorGreyMid">Dataset</span>
                    <select className="" name="" defaultValue={store.dataSets[datasetIndex].label} onChange={(event) => {
                        //window.location.href = "#search";
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
                </span><span>
                <span className="hcSmallTxt hcTxtColorGreyMid">Collections</span>
                    <select defaultValue={store.dataSets[datasetIndex].indexes[collectionSelectIndex].label}  onChange={(event) => {
                        setCollectionIndex(store.dataSets[datasetIndex].indexes[event.target.selectedIndex].collection);
                        setCollection(store.dataSets[datasetIndex].indexes[event.target.selectedIndex].collection_id);
                        setCollectionSelectIndex(event.target.selectedIndex);
                        let struc:ISearchParams = {
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
                            return (<option key={index}>{item.label}</option> )
                        })}
                    </select>
                </span>
                </div>)}
            </div></div>
    )
}

export default PageHeader;