import React from "react";
import {HOME, SERVICE_SERVER} from "../misc/config";
import {useState, useEffect, ReactFragment} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {IDetailItem, IDetails, IParameter} from "../misc/interfaces";
import wrench from "../assets/img/wrench32.png";
import paper from "../assets/img/linedpaper32.png";
import paper_plus from "../assets/img/linedpaperplus32.png";
import paper_min from "../assets/img/linedpaperminus32.png";
import back from "../assets/img/leftarrow32.png";
import {Base64} from "js-base64";


function DetailPage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<IDetails>({title: "", uri: "", items: []});
    const [human, setHuman] = useState(true);
    const [complete, setComplete] = useState(false);
    const parStr = useParams();
    let inverseList: IDetailItem[] = [];


    async function fetch_data() {
        if (loading) {
            const url = SERVICE_SERVER + "get_human_item";
            /*const params = {
                dataset: props.dataset,
                collection: props.collection,
                uri: props.uri
            }*/
            let params = "bonzo";
            if (parStr.code !== undefined) {
                params = parStr.code
            }
            const payload = Base64.decode(params);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Origin': HOME
                },
                body: payload
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
                    <h2>{data.title} <span className="hcClickable" onClick={() => {
                        window.open(data.uri)
                    }}>[➚]</span></h2>
                    {!human && (<h3>uri: {data.uri}</h3>)}
                    <div className="hcStackFormItems">
                        {data.items.map((item, index) => {
                            if (complete || item.values.length > 0) {
                                if (item.notion.indexOf("_inverse_") === -1 )
                                {
                                return (
                                    <div key={index}>
                                        {human ? (
                                            <div className="detLabel">{item.label}</div>
                                        ) : (<div className="detLabel">{item.notion}</div>)}

                                        {<div className="hcMarginBottom1">
                                            {item.values.length === 0 && (<div>-</div>)}
                                            {item.values.map((field, index) => {
                                                let val = field.value;
                                                if (field.link !== undefined) {
                                                    if (field.link.dataset === "extern") {
                                                        return (
                                                            <div key={index}
                                                                 onClick={() => {
                                                                     window.open(val);
                                                                 }}>{val} <span className="hcClickableSpan">[➚]</span></div>);
                                                    } else {
                                                        return (
                                                            <div className="hcClickableBlock" key={index}
                                                                 onClick={() => {
                                                                     window.location.href = '/detail/' + Base64.encode(JSON.stringify(field.link));
                                                                 }}>{val}</div>);
                                                    }
                                                } else {
                                                    return (
                                                        <div key={index}>{val}</div>);
                                                }

                                            })}
                                        </div>}
                                    </div>
                                )}
                            else {
                                inverseList.push(item);
                                }
                        }})}
                    </div>
                    <div className="hcStackFormItems">
                        {inverseList.length > 0 && (
                            <div><div className="detLabel">{data.title} appears in:</div>
                            <ul className="appearsInClass">
                                {inverseList.map((item: IDetailItem, key) => {
                                    return (<React.Fragment>
                                        {item.values.map((val, index) => {
                                            let listKey = key * 10 + index;
                                            let retVal = item.label + ": " + val.value;
                                            if (val.link !== undefined) {
                                                return (<li key={listKey}>{item.label}: <span className="hcClickableSpan"  onClick={() => {
                                                    window.location.href = '/detail/' + Base64.encode(JSON.stringify(val.link));
                                                }}>{val.value}</span></li>)
                                            } else {
                                                return (<li key={listKey}>{retVal}</li>)
                                            }

                                        })}
                                    </React.Fragment>)
                                })}
                            </ul>
                            </div>
                        )}
                    </div>
                </div>)}
        </div>

    )
}

export default DetailPage;