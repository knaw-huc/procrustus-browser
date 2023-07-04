import React from "react";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useParams, useSearchParams} from "react-router-dom";
import {ISearchParams, ISwitchItem} from "../misc/interfaces";
import {getServiceServer} from "../misc/config";
import {Base64} from "js-base64";


function Switch() {
    const [params, setParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ISwitchItem[]>([]);
    const navigate = useNavigate();
    document.title = "Golden Agents: switch";

    async function fetch_data() {
        if (params.get("uri")) {
            const url = getServiceServer() + "get_switch?uri=" + params.get("uri");
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
            setLoading(false);
        }
    }

    function getDetail(uri: string, collection:string, dataset: string) {
        const paramSet = {
            dataset: dataset,
            collection: collection,
            uri: uri
        }

        navigate('/detail/' + Base64.encodeURL(JSON.stringify(paramSet)));
        window.scroll(0, 0);
    }

    function getDataset(dataset: string) {
        navigate('/dataset/' + dataset);
        window.scroll(0, 0);
    }

    function goToIndex(dataset: string, collection: string, es_index: string) {
        let struc: ISearchParams = {
            dataset: dataset,
            collection: collection,
            collection_index: es_index,
            page: 1,
            searchvalues: []
        }
        navigate("/search/" + Base64.encode(JSON.stringify(struc)));
    }

    useEffect(() => {
        fetch_data()
    }, [loading]);

    if (params.get("uri")) {
        return (<div>
            <div className="hcContentContainer">
                <div className="hcBasicSideMargin hcMarginTop1 hcMarginBottom1">
                    <h1>Switch</h1>
                    <div className="switchURI">{params.get("uri")} appears as:</div>
                    {data.map((item, i) => {
                        return (
                            <div key={i}>
                                <div className="detLabel">Title</div>
                                <div className="hcClickable" onClick={() => {
                                    getDetail(item.uri, item.tb.index.collection_id, item.tb.dataSet);
                                }}>{item.title}</div>
                                <div className="detLabel">Dataset</div>
                                <div className="hcClickable" onClick={() => {
                                    getDataset(item.tb.dataSet);
                                }}>{item.tb.label}</div>
                                <div className="detLabel">Class</div>
                                <div className="hcClickable" onClick={() => {
                                    goToIndex(item.tb.dataSet, item.tb.index.collection_id, item.index);
                                }}>{item.tb.index.label}</div>
                                <hr/>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>)
    } else {
        return (
            <div>
                <div className="hcContentContainer">
                    <div className="hcBasicSideMargin hcMarginTop1 hcMarginBottom1">
                        <h1>Switch</h1>
                        <div>No URI provided!</div>
                    </div>
                </div>
            </div>)
    }

}

export default Switch;