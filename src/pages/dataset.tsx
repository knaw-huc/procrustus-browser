import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import {useState} from "react";
import {getServiceServer} from "../misc/config";
import {IDatasetCollections, IDatasetCollectionProps, IMetaData} from "../misc/interfaces";
import ClassContent from "../elements/classContent";

function Dataset() {
    const nav = useNavigate();
    const params = useParams();
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const SERVICE = getServiceServer();
    const [data, setData] = useState<IDatasetCollections>({dataSetId: "", dataSetName: "", items: []});
    const [metaData, setMetaData] = useState<IMetaData>({
        "title": "",
        "description": "",
        "imageUrl": "",
        "license": "",
        "publisher": "",
        "creator": "",
        "contributor": "",
        "dataProvider": "",
        "subject": "",
        "source": "",
        "created": "",
        "modified": "",
        "sparqlEndpoint": ""
    })
    const [mdLoading, setMdLoading] = useState(true);

    async function fetch_data() {
        const url = SERVICE + "get_entities/" + params.dataset_id;
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }

    async function fetch_metadatadata() {
        const url = SERVICE + "get_metadata/" + params.dataset_id;
        const response = await fetch(url);
        const json = await response.json();
        setMetaData(json);
        setMdLoading(false);
    }

    function collection_label(item: IDatasetCollectionProps) {
        if (item.title !== null) {
            return item.title;
        } else {
            if (item.shortenedUri.indexOf('http') !== -1) {
                if (item.shortenedUri.indexOf('#') !== -1) {
                    let nameParts = item.shortenedUri.split('#');
                    return nameParts[1];
                } else {
                    let nameParts = item.shortenedUri.split('/').reverse();
                    return nameParts[0];
                }
            } else {
                let nameParts = item.shortenedUri.split(':');
                if (nameParts.length > 1) {
                    return nameParts[1];
                } else {
                   return item.shortenedUri;
                }
            }

        }
    }

    useEffect(() => {
        fetch_data()
    }, [loading]);

    useEffect(() => {
        fetch_metadatadata();
    }, [mdLoading]);
    return (
        <div>
            <div className="hcContentContainer hcMarginBottom2 hcMarginTop2">
                <div className="hcBasicSideMargin ">
                    <div onClick={() => {nav("/")}} className="hcClickable">&#9668; Back to all datasets</div>

                </div>
            </div>
            <main className="hcContentContainer hcMarginBottom5 hcMarginTop2">

                {mdLoading ? (<div>Loading metadata</div>) : (
        <div className="hcBasicSideMargin hcGaLayoutSplit">
            <div>
                <div className="hcLabel"><img
                    src="https://d33wubrfki0l68.cloudfront.net/8f5e3d2e2a41e122519fa6876cc80765dc241fad/8858e/images/icons/icon_ga-dataset.png"
                    alt="dataset" className="hcGaIcon hcGaIcon--big"/> Golden agents dataset</div>
                <h1>{metaData.title}</h1>
                <p>{metaData.description}</p>

                <div className="hcGaLayoutSplit">
                    <a className='ga-searcChoiceLink' href='/ga-data-browser-class-detail'><strong>Browse this
                        dataset</strong> <br/><small>Browse trought the content of this dataset</small></a>
                    <a href="https://ga-wp3.sd.di.huc.knaw.nl/" className="ga-searcChoiceLink"><strong>Query this
                        dataset</strong><br/><small>Use SPARQL or use the querybuilder if your not familiar
                        SPARQL.</small></a>
                </div>
            </div>
            <div className="hcGaLayoutSplit">
                <div>
                    <dl aria-label="Information about the dataset">
                        <dt>License</dt>
                        <dd>CC-BY-SA</dd>

                        <dt>Organisation</dt>
                        <dd>Huygens Institute</dd>

                    </dl>

                </div>
            </div>

        </div>)}


        <div className="hcBasicSideMargin hcMarginTop5"><h2>Classes</h2></div>

        <div className="hcTabs hcTabsVert ">

            <div className="hcTabLabels">
                {loading ? (<div>Loading...</div>) :
                    (<div>
                        {data.items.map((item, index) => {
                            return (<div className="hcTabLabel" id="tab-list-dwc_col_Persons" key={index} onClick={() => {setIndex(index)}}><img
                                src="https://d33wubrfki0l68.cloudfront.net/3c2fb16a8dfe7a5599a2178f96f7bc657c8172f2/a6676/images/icons/icon_ga-class.png"
                                alt="Class" className="hcGaIcon"/>{collection_label(item)}</div>)
                        })}
                    </div>)}

            </div>
            <div className="hcTabAllContent">
                {loading ? (<div>Loading...</div>) :
                    (<div>
                        {data.items.map((item, i) => {
                            return (<div>{ index === i && (<ClassContent dataset={params.dataset_id as string} collection={item.collectionId} label={collection_label(item)} total={item.total}/>)}</div>);
                        })}
                    </div>)}


            </div>
        </div>


        </main></div>)


}

export default Dataset;