import React from "react";
import {useState, useEffect} from "react";
import {IMetaDataListItem, IResultList} from "../misc/interfaces";
import DatasetCard from "../elements/datasetCard";
import {getHome, getServiceServer} from "../misc/config";

function Home() {
    const [metadata, setMetadata] = useState<IMetaDataListItem[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
            const url = getServiceServer() + "get_metadata/all";
            const response = await fetch(url);
            const json: IMetaDataListItem[] = await response.json();
            setMetadata(json);
            setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [loading]);


    return (
        <div>
            <main className="hcContentContainer hcMarginBottom5 hcMarginTop5">
                <div className="hcBasicSideMargin ">
                    <h1>Datasets of Golden Agents</h1>
                    <p>Access to distributed, heterogeneous resources (both existing and new) on creative industries in
                        the Dutch Golden Age.</p>
                    <p><a href="">Watch an introduction video</a></p>

                </div>
            </main>
            <section className="hcContentContainer colorBgGrey">
                <div className="hcBasicSideMargin hcMarginTop2  hcMarginBottom5">
                    { loading ? (
                        <div>Loading datasets...</div>
                    ) : (
                        <ul className="hcCards hcNoList" aria-label="List of datasets of Golden Agents">
                            {metadata.map((item, index) => {
                                return (<DatasetCard dataset={item.dataset} metadata={item.metadata}/>);
                            })}
                        </ul>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Home;