import React from "react";
import {HOME, SERVICE_SERVER} from "../misc/config";
import {useState, useEffect} from "react";
import {ICloseDetail, IDetails, IDetailItem, IResultList} from "../misc/interfaces";
import wrench from "../assets/img/wrench32.png";
import paper from "../assets/img/linedpaper32.png";
import paper_plus from "../assets/img/linedpaperplus32.png";
import paper_min from "../assets/img/linedpaperminus32.png";
import back from "../assets/img/leftarrow32.png";
import {fromBase64} from "js-base64";


//function Details(props: { dataset: string, collection: string, uri: string, close: ICloseDetail, detail: boolean }) {
function Details(props: {parStr: string}) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<IDetails>({title: "", uri: "", items: []});
    const [human, setHuman] = useState(true);
    const [complete, setComplete] = useState(false);

    async function fetch_data() {
        if (loading) {
            const url = SERVICE_SERVER + "get_item";
            /*const params = {
                dataset: props.dataset,
                collection: props.collection,
                uri: props.uri
            }*/
            const params = fromBase64(props.parStr);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Origin': HOME
                },
                body: JSON.stringify(params)
            });
            const json: IDetails = await response.json();
            setData(json);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetch_data();
    }, [loading]);


    return (

        <div className="hcContentContainer">
            <div className="browseTools">
                <div className="navImage" onClick={() => {
                    window.history.back();
                }}><img src={back} alt="Back to resultlist" title="Back to resultlist"/></div>
                <div className="navImage" onClick={() => {
                    setHuman(!human)
                }}>
                    {human ? (
                        <img src={wrench} alt="RDF view" title="RDF view"/>
                    ) : (<img src={paper} alt="Text view" title="Text view"/>)}
                </div>
                <div className="navImage" onClick={() => {
                    setComplete(!complete)
                }}>
                    {complete ? (
                        <img src={paper_min} alt="Hide empty properties" title="Hide empty properties"/>
                    ) : (
                        <img src={paper_plus} alt="Show empty properties" title="Show empty properties"/>
                    )}</div>
            </div>
            {loading ? (<h1>Loading...</h1>) : (
                <div>
                    <h2>{data.title}</h2>
                    { !human && (<h3>uri: {data.uri}</h3>)}
                    <div className="hcStackFormItems">
                        {data.items.map((item, index) => {
                            if (complete || item.values.length > 0)
                                return (
                                    <div key={index}>
                                        {human ? (
                                            <div className="detLabel">{item.label}</div>
                                        ) : (<div className="detLabel">{item.notion}</div>)}

                                        <div className="hcMarginBottom1">
                                            {item.values.length === 0 && (<div>-</div>)}
                                            {item.values.map((value) => {
                                                return (
                                                    <div>{value.substring(0, 4) === "http"  && value.substring(0, 29) !== "https://data.goldenagents.org" ? (
                                                        <div className="hcClickable" onClick={() => {
                                                            window.open(value)
                                                        }}>{value}</div>) : (<div>{value}</div>)} </div>);
                                            })}
                                        </div>
                                    </div>
                                )
                        })}


                    </div>
                </div>)}
        </div>

    )
}

export default Details;