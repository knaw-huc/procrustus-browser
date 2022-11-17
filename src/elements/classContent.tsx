import React from "react";
import {useState, useEffect} from "react";
import {ICollectionProps} from "../misc/interfaces";
import {getServiceServer} from "../misc/config";


function ClassContent(props: {dataset: string, collection: string, label: string, total: number}) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ICollectionProps>({uri: "", shortenedUri: "", properties: []});
    const SERVICE = getServiceServer();

    async function fetch_data() {
        const url = SERVICE + "get_compact_collection_properties/" + props.dataset + '/' + props.collection ;
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }

    function show_label(name: string) {
        return name;
    }

    useEffect(() => {
        fetch_data();
    }, [loading]);

    return (
        <div className="hcTabContent hcClrBg_Grey05 hcBasicPading" id="tab-content-dwc_col_Persons">
            <h2>{props.label} ({props.total})</h2>
            <div className="hcUriType">dwc_col_Persons</div>
            Members of KNAW and Dutch scientific societies and Dutch instrument makers<br/>


            <div className="hcMarginTop2 hcColumnsAuto">

                <div className="hcLabel hcCell--x2">Property</div>
                <div className="hcLabel hcCell--x2">URI</div>
                <div className="hcLabel">Density</div>

            </div>

            {loading ? (<div>Loading...</div>) : (
            <ul className="hcLists">
                {data.properties.map((item, i) => {
                    const density = item.density.toString();
                    return (<li className="hcListItem hcColumnsAuto" key={i}>
                        <div className="hcCell--x2"><img
                            src="https://d33wubrfki0l68.cloudfront.net/3b6b7e1950a6d51a018ea398e2c17c5104702217/46c09/images/icons/icon_ga-property.png"
                            alt="Property" className="hcGaIcon"/>{show_label(item.shortenedUri)}</div>
                        <div className="hcUriType hcCell--x2 hcBreakAll">{item.uri}</div>
                        <div>
                            <div className="hcDensity">
                                <div className="hcDensityBar" style={{width: density + '%' }}>{item.density}%</div>
                            </div>
                        </div>
                    </li>)
                })}

            </ul>)}


        </div>
    )
}

export default ClassContent;