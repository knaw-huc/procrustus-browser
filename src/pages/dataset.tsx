import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import {useState} from "react";
import {getServiceServer, getHome} from "../misc/config";
import {IDatasetCollections, IDatasetCollectionProps, IMetaData} from "../misc/interfaces";
import ClassContent from "../elements/classContent";
import {licence} from "../misc/functions";
import {Base64, encodeURL} from "js-base64";

function Dataset() {
    const nav = useNavigate();
    const params = useParams();
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const SERVICE = getServiceServer();
    const [data, setData] = useState<IDatasetCollections>({dataSetId: "", dataSetName: "", items: []});
    const [metaData, setMetaData] = useState<IMetaData>({
        "title": "",
        "description": [],
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

    function goSearch() {
        switch (params.dataset_id) {
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__rijksmuseum":
                nav("/search/eyJkYXRhc2V0IjoidTY5MmJjMzY0ZTlkN2ZhOTdiMzUxMGM2YzBjOGYyYmI5YTBlNTEyM2JfX3JpamtzbXVzZXVtIiwiY29sbGVjdGlvbiI6ImVkbV9BZ2VudCIsImNvbGxlY3Rpb25faW5kZXgiOiJyaWprc211c2V1bV9lZG1fYWdlbnQiLCJwYWdlIjoxLCJzZWFyY2h2YWx1ZXMiOltdfQ==");
                break;
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__stcn":
                nav("/search/search/eyJkYXRhc2V0IjoidTY5MmJjMzY0ZTlkN2ZhOTdiMzUxMGM2YzBjOGYyYmI5YTBlNTEyM2JfX3N0Y24iLCJjb2xsZWN0aW9uIjoic2NoZW1hX0Jvb2siLCJjb2xsZWN0aW9uX2luZGV4Ijoic3Rjbl9zY2hlbWFfYm9vayIsInBhZ2UiOjEsInNlYXJjaHZhbHVlcyI6W119");
                break;
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__schrijverskabinet":
                nav("/search/eyJkYXRhc2V0IjoidTY5MmJjMzY0ZTlkN2ZhOTdiMzUxMGM2YzBjOGYyYmI5YTBlNTEyM2JfX3NjaHJpanZlcnNrYWJpbmV0IiwiY29sbGVjdGlvbiI6InNjaGVtYV9QZXJzb24iLCJjb2xsZWN0aW9uX2luZGV4Ijoic2NocmlqdmVyc2thYmluZXRfc2NoZW1hX3BlcnNvbiIsInBhZ2UiOjEsInNlYXJjaHZhbHVlcyI6W119");
                break;
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__notarissennetwerk":
                nav("/search/eyJkYXRhc2V0IjoidTY5MmJjMzY0ZTlkN2ZhOTdiMzUxMGM2YzBjOGYyYmI5YTBlNTEyM2JfX25vdGFyaXNzZW5uZXR3ZXJrIiwiY29sbGVjdGlvbiI6InBudl9QZXJzb25OYW1lIiwiY29sbGVjdGlvbl9pbmRleCI6Im5vdGFyaXNzZW5uZXR3ZXJrX3Budl9wZXJzb25uYW1lIiwicGFnZSI6MSwic2VhcmNodmFsdWVzIjpbXX0=");
                break;
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__jaikwil":
                nav("/search/eyJkYXRhc2V0IjoidTY5MmJjMzY0ZTlkN2ZhOTdiMzUxMGM2YzBjOGYyYmI5YTBlNTEyM2JfX2phaWt3aWwiLCJjb2xsZWN0aW9uIjoicG52X1BlcnNvbk5hbWUiLCJjb2xsZWN0aW9uX2luZGV4IjoiamFpa3dpbF9wbnZfcGVyc29ubmFtZSIsInBhZ2UiOjEsInNlYXJjaHZhbHVlcyI6W119");
                break;
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__bredius":
                nav("/search/eyJkYXRhc2V0IjoidTY5MmJjMzY0ZTlkN2ZhOTdiMzUxMGM2YzBjOGYyYmI5YTBlNTEyM2JfX2JyZWRpdXMiLCJjb2xsZWN0aW9uIjoic2NoZW1hX1BlcnNvbiIsImNvbGxlY3Rpb25faW5kZXgiOiJicmVkaXVzX3NjaGVtYV9wZXJzb24iLCJwYWdlIjoxLCJzZWFyY2h2YWx1ZXMiOltdfQ==");
                break;
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__corporatiestukken":
                nav("/search/eyJkYXRhc2V0IjoidTY5MmJjMzY0ZTlkN2ZhOTdiMzUxMGM2YzBjOGYyYmI5YTBlNTEyM2JfX2NvcnBvcmF0aWVzdHVra2VuIiwiY29sbGVjdGlvbiI6InBudl9QZXJzb25OYW1lIiwiY29sbGVjdGlvbl9pbmRleCI6ImNvcnBvcmF0aWVzdHVra2VuX3Budl9wZXJzb25uYW1lIiwicGFnZSI6MSwic2VhcmNodmFsdWVzIjpbXX0=");
                break;
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__ggd":
                nav("/search/eyJkYXRhc2V0IjoidTY5MmJjMzY0ZTlkN2ZhOTdiMzUxMGM2YzBjOGYyYmI5YTBlNTEyM2JfX2dnZCIsImNvbGxlY3Rpb24iOiJzY2hlbWFfUGVyc29uIiwiY29sbGVjdGlvbl9pbmRleCI6ImdnZF9zY2hlbWFfcGVyc29uIiwicGFnZSI6MSwic2VhcmNodmFsdWVzIjpbXX0=");
                break;
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__ecartico":
                nav("/search/eyJkYXRhc2V0IjoidTY5MmJjMzY0ZTlkN2ZhOTdiMzUxMGM2YzBjOGYyYmI5YTBlNTEyM2JfX2VjYXJ0aWNvIiwiY29sbGVjdGlvbiI6Imh0dHBzX19fc2NoZW1hX29yZ19QZXJzb24iLCJjb2xsZWN0aW9uX2luZGV4IjoiZWNhcnRpY29faHR0cHNfX19zY2hlbWFfb3JnX3BlcnNvbiIsInBhZ2UiOjEsInNlYXJjaHZhbHVlcyI6W119");
                break;
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__onstage":
                nav("/search/eyJkYXRhc2V0IjoidTY5MmJjMzY0ZTlkN2ZhOTdiMzUxMGM2YzBjOGYyYmI5YTBlNTEyM2JfX29uc3RhZ2UiLCJjb2xsZWN0aW9uIjoiaHR0cHNfX19zY2hlbWFfb3JnX1BlcnNvbiIsImNvbGxlY3Rpb25faW5kZXgiOiJvbnN0YWdlX2h0dHBzX19fc2NoZW1hX29yZ19wZXJzb24iLCJwYWdlIjoxLCJzZWFyY2h2YWx1ZXMiOltdfQ==");
                break;
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__nta":
                nav("/search/eyJkYXRhc2V0IjoidTY5MmJjMzY0ZTlkN2ZhOTdiMzUxMGM2YzBjOGYyYmI5YTBlNTEyM2JfX250YSIsImNvbGxlY3Rpb24iOiJzY2hlbWFfUGVyc29uIiwiY29sbGVjdGlvbl9pbmRleCI6Im50YV9zY2hlbWFfcGVyc29uIiwicGFnZSI6MSwic2VhcmNodmFsdWVzIjpbXX0=");
                break;



        }
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
                {metaData.description.map((line, i) => {
                    return (<div className="hcDescLine" key={i}>{line}</div>)
                })}

            </div>
            <div className="hcGaLayoutSplit">
                <div>
                    <dl aria-label="Information about the dataset">
                        <dt>License</dt>
                        <dd className="hcDataSetHeaderLink" onClick={() => {window.open(metaData.license)}}>{licence(metaData.license)}</dd>
                        <dt>Data provider</dt>
                        <dd>{metaData.dataProvider}</dd>
                        <dt>Publisher</dt>
                        <dd>{metaData.publisher}</dd>
                        <dt>Creator</dt>
                        <dd>{metaData.creator}</dd>
                        {metaData.contributor !== "" && <dt>Contributor</dt>}
                        {metaData.contributor !== "" && <dd>{metaData.contributor}</dd>}
                        {metaData.subject !== "" && <dt>Subject</dt>}
                        {metaData.subject !== "" && <dd>{metaData.subject}</dd>}
                        {metaData.source !== "" && <dt>Source</dt>}
                        {metaData.source !== "" && <dd  className="hcDataSetHeaderLink" onClick={() => {window.open(metaData.source)}}>{metaData.source}</dd>}

                    </dl>

                        <div onClick={() => {goSearch()}} className='ga-searcChoiceLink hcDataSetHeaderLink hcMarginTop3'><strong>Browse this
                            dataset</strong> <br/><small>Browse trough the content of this dataset</small></div>
                        <div onClick={() => {window.open(getHome() + "/query/" + encodeURIComponent(metaData.sparqlEndpoint))}} className='ga-searcChoiceLink hcDataSetHeaderLink hcMarginTop1'><strong>Query this
                            dataset</strong><br/><small>Use SPARQL in Yasgui.</small></div>

                </div>

            </div>
            <div className="hcGaLayoutSplit">
                <div>
                    {(metaData.imageUrl !== null && metaData.imageUrl.indexOf("https:") > -1) ? (<img className="datasetMetadataImg" src={metaData.imageUrl}/>) : (<div/>)}

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