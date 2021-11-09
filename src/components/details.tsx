import React from "react";
import {HOME, SERVICE_SERVER} from "../misc/config";
import {useState, useEffect} from "react";
import {ICloseDetail, IDetailItem, IResultList} from "../misc/interfaces";


function Details(props: {dataset: string, collection: string, uri: string, close: ICloseDetail, detail: boolean}) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<IDetailItem[]>([]);

    async function fetch_data() {
        if (props.detail && loading) {
            const url = SERVICE_SERVER + "get_item";
            const params = {
                dataset: props.dataset,
                collection: props.collection,
                uri: props.uri
            }
            //console.log(JSON.stringify(params));

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Origin': HOME
                },
                body: JSON.stringify(params)
            });
            const json: IDetailItem[] = await response.json();
            setData(json);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetch_data();
    }, [loading]);


    return (

            <div className="hcContentContainer">
                <div className="hcClickable" onClick={() => {props.close()}}>Back</div>
                {loading ? (<h1>Loading...</h1>) : (

                <div className="hcStackFormItems">
                    {data.map((item, index) => {
                        return (<div key={index}>
                            <div className="detLabel">{item.notion}</div>
                            <div className="hcMarginBottom1">
                                {item.values.length === 0 && (<div>-</div>)}
                            {item.values.map((value) => {
                                return (<div>{value}</div>);
                            })}
                            </div></div>)
                    })}


                </div>)}
            </div>

    )
}

export default Details;