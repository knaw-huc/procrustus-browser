import React from "react";
import {useNavigate} from "react-router-dom";

function Home() {
    let nav = useNavigate();
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
                    <ul className="hcCards hcNoList" aria-label="List of datasets of Golden Agents">
                        <li className="hcCardGaDataset incCard hcCardGaDataset--float" aria-label="Dataset card">
                            <div><img
                                src="https://d33wubrfki0l68.cloudfront.net/8f5e3d2e2a41e122519fa6876cc80765dc241fad/8858e/images/icons/icon_ga-dataset.png"
                                alt="Dataset" className="hcGaIcon hcGaIcon--big"/></div>
                            <div onClick={() => {nav('dataset/u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__rijksmuseum');}}><h2>Rijksmuseum</h2>
                            </div>
                            <p className="hcSmallTxt">De hoogste ambtenaren van de belangrijkste instellingen van
                                vertegenwoordigende, bestuurlijke en rechtsprekende aard op het huidige Nederlandse
                                grondgebied.</p>
                            <hr className="hcMarginBottom1_5 hcMarginTop1_5"/>

                                <dl aria-label="Information about the dataset">
                                    <dt>Statements</dt>
                                    <dd>2131</dd>

                                    <dt>License</dt>
                                    <dd>CC-BY-SA</dd>

                                    <dt>Organisation</dt>
                                    <dd>Huygens Institute</dd>

                                </dl>


                        </li>
                        <li className="hcCardGaDataset incCard hcCardGaDataset--float" aria-label="Dataset card">
                            <div><img
                                src="https://d33wubrfki0l68.cloudfront.net/8f5e3d2e2a41e122519fa6876cc80765dc241fad/8858e/images/icons/icon_ga-dataset.png"
                                alt="Dataset" className="hcGaIcon hcGaIcon--big"/></div>
                            <a href='/ga-data-browser-dataset-detail'><h2>Stadsarchief Amsterdam: Index op
                                begraafregisters voor 1811 (gecorrigeerd)</h2></a>
                            <p className="hcSmallTxt">De hoogste ambtenaren van de belangrijkste instellingen van
                                vertegenwoordigende, bestuurlijke en rechtsprekende aard op het huidige Nederlandse
                                grondgebied.</p>
                            <hr className="hcMarginBottom1_5 hcMarginTop1_5"/>

                                <dl aria-label="Information about the dataset">
                                    <dt>Statements</dt>
                                    <dd>2131</dd>

                                    <dt>License</dt>
                                    <dd>CC-BY-SA</dd>

                                    <dt>Organisation</dt>
                                    <dd>Huygens Institute</dd>

                                </dl>


                        </li>
                        <li className="hcCardGaDataset incCard hcCardGaDataset--float" aria-label="Dataset card">
                            <div><img
                                src="https://d33wubrfki0l68.cloudfront.net/8f5e3d2e2a41e122519fa6876cc80765dc241fad/8858e/images/icons/icon_ga-dataset.png"
                                alt="Dataset" className="hcGaIcon hcGaIcon--big"/></div>
                            <a href='/ga-data-browser-dataset-detail'><h2>Het Schrijverskabinet - Panpoëticon
                                Batavûm</h2></a>
                            <p className="hcSmallTxt">De hoogste ambtenaren van de belangrijkste instellingen van
                                vertegenwoordigende, bestuurlijke en rechtsprekende aard op het huidige Nederlandse
                                grondgebied.</p>
                            <hr className="hcMarginBottom1_5 hcMarginTop1_5"/>

                                <dl aria-label="Information about the dataset">
                                    <dt>Statements</dt>
                                    <dd>2131</dd>

                                    <dt>License</dt>
                                    <dd>CC-BY-SA</dd>

                                    <dt>Organisation</dt>
                                    <dd>Huygens Institute</dd>

                                </dl>


                        </li>
                        <li className="hcCardGaDataset incCard hcCardGaDataset--float" aria-label="Dataset card">
                            <div><img
                                src="https://d33wubrfki0l68.cloudfront.net/8f5e3d2e2a41e122519fa6876cc80765dc241fad/8858e/images/icons/icon_ga-dataset.png"
                                alt="Dataset" className="hcGaIcon hcGaIcon--big"/></div>
                            <a href='/ga-data-browser-dataset-detail'><h2>Frick Collection: Montias Data</h2></a>
                            <p className="hcSmallTxt">De hoogste ambtenaren van de belangrijkste instellingen van
                                vertegenwoordigende, bestuurlijke en rechtsprekende aard op het huidige Nederlandse
                                grondgebied.</p>
                            <hr className="hcMarginBottom1_5 hcMarginTop1_5"/>

                                <dl aria-label="Information about the dataset">
                                    <dt>Statements</dt>
                                    <dd>2131</dd>

                                    <dt>License</dt>
                                    <dd>CC-BY-SA</dd>

                                    <dt>Organisation</dt>
                                    <dd>Huygens Institute</dd>

                                </dl>


                        </li>
                        <li className="hcCardGaDataset incCard hcCardGaDataset--float" aria-label="Dataset card">
                            <div><img
                                src="https://d33wubrfki0l68.cloudfront.net/8f5e3d2e2a41e122519fa6876cc80765dc241fad/8858e/images/icons/icon_ga-dataset.png"
                                alt="Dataset" className="hcGaIcon hcGaIcon--big"/></div>
                            <a href='/ga-data-browser-dataset-detail'><h2>Rijksmuseum: collectie</h2></a>
                            <p className="hcSmallTxt">De hoogste ambtenaren van de belangrijkste instellingen van
                                vertegenwoordigende, bestuurlijke en rechtsprekende aard op het huidige Nederlandse
                                grondgebied.</p>
                            <hr className="hcMarginBottom1_5 hcMarginTop1_5"/>

                                <dl aria-label="Information about the dataset">
                                    <dt>Statements</dt>
                                    <dd>2131</dd>

                                    <dt>License</dt>
                                    <dd>CC-BY-SA</dd>

                                    <dt>Organisation</dt>
                                    <dd>Huygens Institute</dd>

                                </dl>


                        </li>
                        <li className="hcCardGaDataset incCard hcCardGaDataset--float" aria-label="Dataset card">
                            <div><img
                                src="https://d33wubrfki0l68.cloudfront.net/8f5e3d2e2a41e122519fa6876cc80765dc241fad/8858e/images/icons/icon_ga-dataset.png"
                                alt="Dataset" className="hcGaIcon hcGaIcon--big"/></div>
                            <a href='/ga-data-browser-dataset-detail'><h2>Stadsarchief Amsterdam: Index op
                                ondertrouwregisters</h2></a>
                            <p className="hcSmallTxt">De hoogste ambtenaren van de belangrijkste instellingen van
                                vertegenwoordigende, bestuurlijke en rechtsprekende aard op het huidige Nederlandse
                                grondgebied.</p>
                            <hr className="hcMarginBottom1_5 hcMarginTop1_5"/>

                                <dl aria-label="Information about the dataset">
                                    <dt>Statements</dt>
                                    <dd>2131</dd>

                                    <dt>License</dt>
                                    <dd>CC-BY-SA</dd>

                                    <dt>Organisation</dt>
                                    <dd>Huygens Institute</dd>

                                </dl>


                        </li>
                        <li className="hcCardGaDataset incCard hcCardGaDataset--float" aria-label="Dataset card">
                            <div><img
                                src="https://d33wubrfki0l68.cloudfront.net/8f5e3d2e2a41e122519fa6876cc80765dc241fad/8858e/images/icons/icon_ga-dataset.png"
                                alt="Dataset" className="hcGaIcon hcGaIcon--big"/></div>
                            <a href='/ga-data-browser-dataset-detail'><h2>CREATE: Ecartico</h2></a>
                            <p className="hcSmallTxt">De hoogste ambtenaren van de belangrijkste instellingen van
                                vertegenwoordigende, bestuurlijke en rechtsprekende aard op het huidige Nederlandse
                                grondgebied.</p>
                            <hr className="hcMarginBottom1_5 hcMarginTop1_5"/>

                                <dl aria-label="Information about the dataset">
                                    <dt>Statements</dt>
                                    <dd>2131</dd>

                                    <dt>License</dt>
                                    <dd>CC-BY-SA</dd>

                                    <dt>Organisation</dt>
                                    <dd>Huygens Institute</dd>

                                </dl>


                        </li>
                        <li className="hcCardGaDataset incCard hcCardGaDataset--float" aria-label="Dataset card">
                            <div><img
                                src="https://d33wubrfki0l68.cloudfront.net/8f5e3d2e2a41e122519fa6876cc80765dc241fad/8858e/images/icons/icon_ga-dataset.png"
                                alt="Dataset" className="hcGaIcon hcGaIcon--big"/></div>
                            <a href='/ga-data-browser-dataset-detail'><h2>Stadsarchief Amsterdam: Index op
                                kwijtscheldingen</h2></a>
                            <p className="hcSmallTxt">De hoogste ambtenaren van de belangrijkste instellingen van
                                vertegenwoordigende, bestuurlijke en rechtsprekende aard op het huidige Nederlandse
                                grondgebied.</p>
                            <hr className="hcMarginBottom1_5 hcMarginTop1_5"/>

                                <dl aria-label="Information about the dataset">
                                    <dt>Statements</dt>
                                    <dd>2131</dd>

                                    <dt>License</dt>
                                    <dd>CC-BY-SA</dd>

                                    <dt>Organisation</dt>
                                    <dd>Huygens Institute</dd>

                                </dl>


                        </li>
                        <li className="hcCardGaDataset incCard hcCardGaDataset--float" aria-label="Dataset card">
                            <div><img
                                src="https://d33wubrfki0l68.cloudfront.net/8f5e3d2e2a41e122519fa6876cc80765dc241fad/8858e/images/icons/icon_ga-dataset.png"
                                alt="Dataset" className="hcGaIcon hcGaIcon--big"/></div>
                            <a href='/ga-data-browser-dataset-detail'><h2>Ja, ik wil!</h2></a>
                            <p className="hcSmallTxt">De hoogste ambtenaren van de belangrijkste instellingen van
                                vertegenwoordigende, bestuurlijke en rechtsprekende aard op het huidige Nederlandse
                                grondgebied.</p>
                            <hr className="hcMarginBottom1_5 hcMarginTop1_5"/>

                                <dl aria-label="Information about the dataset">
                                    <dt>Statements</dt>
                                    <dd>2131</dd>

                                    <dt>License</dt>
                                    <dd>CC-BY-SA</dd>

                                    <dt>Organisation</dt>
                                    <dd>Huygens Institute</dd>

                                </dl>


                        </li>
                    </ul>

                </div>
            </section>
        </div>
    )
}

export default Home;