import React from "react";
import {getHome, getServiceServer} from "../misc/config";
import {useState, useEffect, ReactFragment} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {IDetailItem, IDetails, IParameter} from "../misc/interfaces";
import wrench from "../assets/img/wrench32.png";
import paper from "../assets/img/linedpaper32.png";
import paper_plus from "../assets/img/linedpaperplus32.png";
import paper_min from "../assets/img/linedpaperminus32.png";
import back from "../assets/img/leftarrow32.png";
import {Base64} from "js-base64";
import Renderer from '../renderers/Renderer';


function DetailPage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<IDetails>({title: "", uri: "", items: []});
    const [human, setHuman] = useState(get_human());
    const [complete, setComplete] = useState(false);
    const parStr = useParams();
    let inverseList: IDetailItem[] = [];
    let sameAsList: IDetailItem[] = [];

    function get_human():boolean {
        if (localStorage.getItem('ga_human') === null) {
            localStorage.setItem('ga_human', 'true');
            return true;
        } else {
            if (localStorage.getItem('ga_human') === 'true') {
                return true;
            } else {
                return false;
            }
        }
    }

    async function fetch_data() {
        if (loading) {
            const url = getServiceServer() + "get_human_item";
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
                    'Origin': getHome()
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
                <div className="detailNavBtn" onClick={() => {
                    if (human) {
                        localStorage.setItem('ga_human', 'false');
                    } else {
                        localStorage.setItem('ga_human', 'true');
                    }
                    setHuman(!human)
                }}>
                    {human ? (
                        <button value="RDF view">RDF view</button>
                    ) : (<button value="RDF view">Text view</button>)}
                </div>
                <div className="detailNavBtn" onClick={() => {
                    setComplete(!complete)
                }}>
                    {complete ? (
                        <button value="RDF view">Hide empty properties</button>
                    ) : (
                        <button value="RDF view">Show empty properties</button>
                    )}</div>
            </div>
            {loading ? (<div className="hcContentContainer hcMarginBottom5 hcBorderBottom hcMarginTop5"><h1>Loading...</h1></div>) : (
                <div className="hcContentContainer hcMarginBottom5 hcBorderBottom hcMarginTop5" >
                    <div className="hcClickable hcMarginBottom5" onClick={() => {window.history.back();}}>Back to results</div>
                    <h2>{data.title} <span className="hcClickable" onClick={() => {
                        window.open(data.uri)
                    }}>[➚]</span></h2>
                    {!human && (<h3>uri: {data.uri}</h3>)}
                    <div className="hcStackFormItems">
                        {data.items.map((item, index) => {
                            if (complete || item.values.length > 0) {
                                if (item.notion.indexOf("_inverse_") === -1 && item.label.indexOf("sameAs") === -1 )
                                {
                                return (
                                    <div key={index}>
                                        {human ? (
                                            <div className="detLabel"><img
                                                src="https://d33wubrfki0l68.cloudfront.net/3b6b7e1950a6d51a018ea398e2c17c5104702217/46c09/images/icons/icon_ga-property.png"
                                                alt="Class" className="hcGaIcon"/>{item.label}</div>
                                        ) : (<div>
                                            <div className="detLabel"><img src="https://d33wubrfki0l68.cloudfront.net/3b6b7e1950a6d51a018ea398e2c17c5104702217/46c09/images/icons/icon_ga-property.png" alt="Class" className="hcGaIcon"/>{item.label}</div>
                                            <div className="uriLabel">{item.uri}</div>
                                        </div>)}

                                        <Renderer name={item.notion === 'foaf_depiction' ? 'media' : 'default'}
                                                  item={item} loading={<div>Loading...</div>}/>
                                    </div>
                                )}
                            else {
                                    if (item.label === "sameAs") {
                                        sameAsList.push(item);
                                    } else {
                                        inverseList.push(item);
                                    }
                                }
                        }})}
                    </div>
                    <hr/>
                    <div className="hcStackFormItems">
                        {inverseList.length > 0 && (
                            <div>
                                <div className="detLabel"><img src="https://d33wubrfki0l68.cloudfront.net/3b6b7e1950a6d51a018ea398e2c17c5104702217/46c09/images/icons/icon_ga-property.png" alt="Class" className="hcGaIcon"/>{data.title} appears in:</div>
                                <ul className="appearsInClass">
                                    {inverseList.map((item: IDetailItem, key) => {
                                        return (<React.Fragment>
                                            {item.values.map((val, index) => {
                                                let listKey = key * 10 + index;
                                                let retVal = val.value + " (" + item.label + ")";
                                                if (val.link !== undefined) {
                                                    return (<li key={listKey}>{item.label}: <span
                                                        className="hcClickableSpan" onClick={() => {
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
                        {sameAsList.length > 0 && (
                            <div>
                                <div className="detLabel"><img src="https://d33wubrfki0l68.cloudfront.net/3b6b7e1950a6d51a018ea398e2c17c5104702217/46c09/images/icons/icon_ga-property.png" alt="Class" className="hcGaIcon"/>{data.title} is the same as:</div>

                                {sameAsList.map((item: IDetailItem, key) => {
                                    return (<div>
                                        {!human && (<div className="uriLabel">{item.uri}</div>)}
                                        <ul className="appearsInClass">
                                            {(!human || item.type === "human") && (<React.Fragment>
                                                {item.values.map((val, index) => {
                                                    let listKey = key * 10 + index;
                                                    if (val.link !== undefined) {
                                                        if (val.link.dataset === "extern") {
                                                            return (<li key={listKey}>{val.value} <span onClick={() => {
                                                                window.open(val.value);
                                                            }}
                                                                                                        className="hcClickableSpan">[➚]</span></li>)
                                                        } else {
                                                            return (<li key={listKey}>{item.label}: <span
                                                                className="hcClickableSpan" onClick={() => {
                                                                window.location.href = '/detail/' + Base64.encode(JSON.stringify(val.link));
                                                            }}>{val.value}</span></li>)
                                                        }

                                                    } else {
                                                        return (<li key={listKey}>{val.value}</li>)
                                                    }

                                                })}
                                            </React.Fragment>)}</ul></div>)
                                })}

                            </div>
                        )}
                    </div>
                </div>)}
        </div>

    )
}

export default DetailPage;