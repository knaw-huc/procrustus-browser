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
    const [collectionSelectIndex, setCollectionSelectIndex] = useState(0);
    const [dataset, setDataset] = useState(props.params.dataset);
    const [collection, setCollection] = useState(props.params.collection);
    const [parameter, setParameter] = useState("");
    let navigate = useNavigate();

    async function getStore() {
        const url = getServiceServer() + "get_store";
        const response = await fetch(url);
        const resp_store: IStore = await response.json();
        setStore(resp_store);
        setCollections(resp_store.dataSets[getDataSetIndex(props.params.dataset, resp_store)].indexes);
        /*setDataset(resp_store.dataSets[0].dataSet);
        setCollection(resp_store.dataSets[0].indexes[0].collection_id);
        setCollectionIndex(resp_store.dataSets[0].indexes[0].collection);*/
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


    useEffect(() => {
        getStore();
    }, [storeLoading, dataset, collection]);

    return (<div>
        <div className="hcContentContainer hcMarginBottom5 hcBorderBottom hcMarginTop2">
            {!storeLoading && (<div className="hcBarDataset hcBasicSideMargin">
                <span>
                <span className="hcSmallTxt hcTxtColorGreyMid">Dataset</span>
                    <select className="" name="" value={dataset} onChange={(event) => {
                        setDatasetIndex(event.target.selectedIndex);
                        setDataset(store.dataSets[event.target.selectedIndex].dataSet);
                        setCollection(store.dataSets[event.target.selectedIndex].indexes[0].collection_id);
                        setCollectionIndex(store.dataSets[event.target.selectedIndex].indexes[0].collection);
                        setCollections(store.dataSets[event.target.selectedIndex].indexes);
                        let struc: ISearchParams = {
                            dataset: dataset,
                            collection: collection,
                            collection_index: collectionIndex,
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
                    <select value={collection}
                            onChange={(event) => {
                                setCollectionIndex(store.dataSets[datasetIndex].indexes[event.target.selectedIndex].collection);
                                setCollection(store.dataSets[datasetIndex].indexes[event.target.selectedIndex].collection_id);
                                setCollectionSelectIndex(event.target.selectedIndex);
                                let struc: ISearchParams = {
                                    dataset: dataset,
                                    collection: collection,
                                    collection_index: collectionIndex,
                                    page: 1,
                                    searchvalues: []
                                }
                                navigate("/search/" + Base64.encode(JSON.stringify(struc)));
                                setRefresh(!refresh)
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