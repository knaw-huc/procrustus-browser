import React from "react";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ICollection, ISearchParams, IStore} from "../misc/interfaces";
import {getServiceServer} from "../misc/config";
import {Base64} from "js-base64";

function Store(props: { params: ISearchParams }) {
    const [storeLoading, setStoreLoading] = useState(true);
    const [store, setStore] = useState<IStore>({"dataSets": []})
    const [refresh, setRefresh] = useState(false);
    const [datasetIndex, setDatasetIndex] = useState(0);
    const [collections, setCollections] = useState<ICollection[]>([]);
    const [collectionIndex, setCollectionIndex] = useState(props.params.collection_index);
    const [dataset, setDataset] = useState(props.params.dataset);
    const [currentCollection, setCurrentCollection] = useState(props.params.collection);
    const [parameter, setParameter] = useState("");
    let navigate = useNavigate();
    console.log(props.params.dataset);

    async function getStore() {
        const url = getServiceServer() + "get_store";
        const response = await fetch(url);
        const resp_store: IStore = await response.json();
        setStore(resp_store);
        const dsInxex = getDataSetIndex(props.params.dataset, resp_store)
        setDatasetIndex(dsInxex);
        setCollections(resp_store.dataSets[dsInxex].indexes);
        setCurrentCollection(resp_store.dataSets[dsInxex].indexes[getCollectionIndex(props.params.collection, dsInxex, resp_store)].collection);
        setStoreLoading(false);
    }


    function getDataSetIndex(ds: string, st:IStore) {
        let retVal = 0;
        st.dataSets.map((item, index) => {
            if (item.dataSet === ds) {
                retVal = index;
            }
        });
        return retVal;
    }

    function getCollectionIndex(coll: string, dsIndex: number, st: IStore) {
        let retVal = 0;
        st.dataSets[dsIndex].indexes.map((item, index) => {
            if (item.collection_id === coll) {
                retVal = index;
            }
        })
        return retVal;
    }




    useEffect(() => {
        getStore();
    }, [refresh]);

    return (<div>
        <div className="hcContentContainer hcMarginBottom5 hcBorderBottom hcMarginTop2">
            {!storeLoading && (<div className="hcBarDataset hcBasicSideMargin">
                <span>
                <span className="hcSmallTxt hcTxtColorGreyMid">Dataset</span>
                    <select className="" name="" value={dataset} onChange={(event) => {
                        setDatasetIndex(event.target.selectedIndex);
                        setDataset(store.dataSets[event.target.selectedIndex].dataSet);
                        setCurrentCollection(store.dataSets[event.target.selectedIndex].indexes[0].collection_id);
                        setCollectionIndex(store.dataSets[event.target.selectedIndex].indexes[0].collection);
                        setCollections(store.dataSets[event.target.selectedIndex].indexes);
                        let struc: ISearchParams = {
                            dataset: store.dataSets[event.target.selectedIndex].dataSet,
                            collection: store.dataSets[event.target.selectedIndex].indexes[0].collection_id,
                            collection_index: store.dataSets[event.target.selectedIndex].indexes[0].collection,
                            page: 1,
                            searchvalues: []
                        }
                        navigate("/search/" + Base64.encode(JSON.stringify(struc)));
                        setRefresh(!refresh);
                    }}>
                    {store.dataSets.map((item, index) => {
                        return (<option key={index} value={item.dataSet}>{item.label}</option>)
                    })}
                    </select>
                </span>
                <span><span className="hcSmallTxt hcTxtColorGreyMid">Collections</span>
                    <select value={collectionIndex}
                            onChange={(event) => {
                                setCollectionIndex(store.dataSets[datasetIndex].indexes[event.target.selectedIndex].collection);
                                setCurrentCollection(store.dataSets[datasetIndex].indexes[event.target.selectedIndex].collection_id);
                                //setCollectionSelectIndex(event.target.selectedIndex);
                                let struc: ISearchParams = {
                                    dataset: dataset,
                                    collection: store.dataSets[datasetIndex].indexes[event.target.selectedIndex].collection_id,
                                    collection_index: store.dataSets[datasetIndex].indexes[event.target.selectedIndex].collection,
                                    page: 1,
                                    searchvalues: []
                                }
                                navigate("/search/" + Base64.encode(JSON.stringify(struc)));
                                //setRefresh(!refresh)
                            }}>
                        {collections.map((item, index) => {
                            return (<option key={index} value={item.collection}>{item.label}</option>)
                        })}
                    </select>
                </span>
            </div>)}
        </div>
    </div>)
}

export default Store;