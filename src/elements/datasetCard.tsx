import React from "react";
import {useNavigate} from "react-router-dom";
import {IMetaData} from "../misc/interfaces";

function DatasetCard(props: {dataset: string, metadata: IMetaData}) {
    let nav = useNavigate();

    function licence(lic: string) {
        switch (lic) {
            case "https://creativecommons.org/licenses/by-sa/4.0/":
                return "CC BY-SA 4.0";
            case "https://creativecommons.org/publicdomain/zero/1.0/":
                return "CC0 1.0";
                default:
                    return "";

        }
    }
    return (
        <li className="hcCardGaDataset incCard hcCardGaDataset--float" aria-label="Dataset card">
            <div><img
                src="https://d33wubrfki0l68.cloudfront.net/8f5e3d2e2a41e122519fa6876cc80765dc241fad/8858e/images/icons/icon_ga-dataset.png"
                alt="Dataset" className="hcGaIcon hcGaIcon--big"/></div>
            <div className="hcDataSetHeaderLink" onClick={() => {nav('dataset/' + props.dataset);}}><h2>{props.metadata.title}</h2>
            </div>
            <p className="hcSmallTxt">{props.metadata.description}</p>
            <hr className="hcMarginBottom1_5 hcMarginTop1_5"/>

            <dl aria-label="Information about the dataset">
                <dt>License</dt>
                <dd className="hcDataSetHeaderLink" onClick={() => {window.open(props.metadata.license)}}>{licence(props.metadata.license)}</dd>
                <dt>Data provider</dt>
                <dd>{props.metadata.dataProvider}</dd>
                <dt>Publisher</dt>
                <dd>{props.metadata.publisher}</dd>

            </dl>
        </li>
    )
}

export default DatasetCard;