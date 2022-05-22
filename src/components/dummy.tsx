import React from "react";
import {useState, useEffect} from "react";
import wrench from "../assets/img/wrench32.png";
import paper from "../assets/img/linedpaper32.png";
import paper_plus from "../assets/img/linedpaperplus32.png";
import paper_min from "../assets/img/linedpaperminus32.png";
import back from "../assets/img/leftarrow32.png";

function Dummy() {
    const [human, setHuman] = useState(true);

    return (
        <div className="hcContentContainer">
            <div className="browseTools">
                <div className="navImage"><img src={back} alt="Back to resultlist" title="Back to resultlist"/></div>
                <div className="navImage" onClick={() => {
                    setHuman(!human)
                }}>
                    {human ? (
                        <img src={wrench} alt="RDF view" title="RDF view"/>
                    ) : (<img src={paper} alt="Text view" title="Text view"/>)}
                </div>
                <div className="navImage">
                        <img src={paper_plus} alt="Show empty properties" title="Show empty properties"/>
                    </div>
            </div>
            <div>
                <h2>Christiaan Huygens</h2>
                { !human && (<h3>uri: http://www.vondel.humanities.uva.nl/ecartico/persons/10001</h3>)}
                <div className="hcStackFormItems">
                    <div>
                        {human ? (
                            <div className="detLabel">type</div>
                        ) : (<div className="detLabel">rdf:type</div>)}
                    </div>
                    <div className="hcMarginBottom1">
                        <div className="hcClickable">http://schema.org/Person<br/>
                        http://xmlns.com/foaf/0.1/Person</div>
                    </div>
                    <div>
                        {human ? (
                            <div className="detLabel">spouse</div>
                        ) : (<div className="detLabel">schema-org:spouse</div>)}
                    </div>
                    <div className="hcMarginBottom1">
                        <div className="hcClickable">Suzanna Hoefnagel</div>
                    </div>
                    <div>
                        {human ? (
                            <div className="detLabel">deathPlace</div>
                        ) : (<div className="detLabel">schema-org:deathPlace</div>)}
                    </div>
                    <div className="hcMarginBottom1">
                        <div className="hcClickable">Den Haag</div>
                    </div>
                    <div>
                        {human ? (
                            <div className="detLabel">deathDate</div>
                        ) : (<div className="detLabel">schema-org:deathDate</div>)}
                    </div>
                    <div className="hcMarginBottom1">
                        1624-02-07
                    </div>
                    <div>
                        {human ? (
                            <div className="detLabel">name</div>
                        ) : (<div className="detLabel">schema-org:name</div>)}
                    </div>
                    <div className="hcMarginBottom1">
                        Christiaan Huygens
                    </div>
                    <div>
                        {human ? (
                            <div className="detLabel">foaf_name</div>
                        ) : (<div className="detLabel">foaf:name</div>)}
                    </div>
                    <div className="hcMarginBottom1">
                        Christiaan Huygens
                    </div>
                    <div>
                        {human ? (
                            <div className="detLabel">hasOccupation</div>
                        ) : (<div className="detLabel">schema-org:hasOccupation</div>)}
                    </div>
                    <div className="hcMarginBottom1">
                        {human ? (<div className="hcClickable">
                            secretaris (1584-1624)<br/>
                            secretaris (1578-1584)<br/>
                            diplomat
                        </div>) : (
                        <div className="hcClickable">
                            secretaris (1584-1624) http://www.vondel.humanities.uva.nl/ecartico/persons/10001#jt13497<br/>
                            secretaris (1578-1584) http://www.vondel.humanities.uva.nl/ecartico/persons/10001#jt27482<br/>
                            diplomat http://www.vondel.humanities.uva.nl/ecartico/persons/10001#jt27483
                        </div> )}
                    </div>
                    <div>
                        {human ? (
                            <div className="detLabel">birthPLace</div>
                        ) : (<div className="detLabel">schema-org:birthPlace</div>)}
                    </div>
                    <div className="hcMarginBottom1">
                        <div className="hcClickable">Terheijden</div>
                    </div>
                    <div>
                        {human ? (
                            <div className="detLabel">label</div>
                        ) : (<div className="detLabel">rdfs:label</div>)}
                    </div>
                    <div className="hcMarginBottom1">
                        Christiaan Huygens
                    </div>
                    <div>
                        {human ? (
                            <div className="detLabel">sameAs</div>
                        ) : (<div className="detLabel">schema-org:sameAs</div>)}
                    </div>
                    <div className="hcMarginBottom1">
                        <div className="hcClickable">
                            http://data.bibliotheken.nl/id/dbnla/huyg010<br/>
                            http://data.bibliotheken.nl/id/thes/p069855773<br/>
                            http://viaf.org/viaf/71826217<br/>
                            http://www.biografischportaal.nl/persoon/00817930<br/>
                            http://www.wikidata.org/entity/Q1741833
                        </div>
                    </div>
                    <div>
                        {human ? (
                            <div className="detLabel">birthDate</div>
                        ) : (<div className="detLabel">schema-org:birthDate</div>)}
                    </div>
                    <div className="hcMarginBottom1">
                        1551-04-22
                    </div>
                    <div>
                        {human ? (
                            <div className="detLabel">gender</div>
                        ) : (<div className="detLabel">schema-org:gender</div>)}
                    </div>
                    <div className="hcMarginBottom1">
                        http://schema.org/Male
                    </div>
                    <div>
                        {human ? (
                            <div className="detLabel">foaf_gender</div>
                        ) : (<div className="detLabel">foaf:gender</div>)}
                    </div>
                    <div className="hcMarginBottom1">
                        http://schema.org/Male
                    </div>
                    <div>
                        {human ? (
                            <div className="detLabel">owl_sameAs</div>
                        ) : (<div className="detLabel">owl:sameAs</div>)}
                    </div>
                    <div className="hcMarginBottom1">
                        <div className="hcClickable">
                            http://data.bibliotheken.nl/id/dbnla/huyg010<br/>
                            http://data.bibliotheken.nl/id/thes/p069855773<br/>
                            http://viaf.org/viaf/71826217<br/>
                            http://www.biografischportaal.nl/persoon/00817930<br/>
                            http://www.wikidata.org/entity/Q17418337
                        </div>
                    </div><div>
                    {human ? (
                        <div className="detLabel">children</div>
                    ) : (<div className="detLabel">schema-org:children</div>)}
                </div>
                    <div className="hcMarginBottom1">
                        <div className="hcClickable">
                            Maurits Huygens<br/>
                            Geertruid Huygens<br/>
                            Constantijn Huygens I
                        </div>
                    </div>
                </div>
                <div className="hcInvertedItems">
                    <h3>Appears as:</h3>
                    <div>
                        {human ? (
                            <div className="detLabel">primaryTopic of</div>
                        ) : (<div className="detLabel">foaf:primaryTopic of</div>)}
                    </div>
                    <div className="hcMarginBottom1">
                        <div className="hcClickable">
                            http://www.vondel.humanities.uva.nl/ecartico/persons/10001#description
                        </div>
                    </div>
                    <div>
                        {human ? (
                            <div className="detLabel">spouse of</div>
                        ) : (<div className="detLabel">schema-org:spouse of</div>)}
                    </div>
                    <div className="hcMarginBottom1">
                        {human ? (<div className="hcClickable">
                            Suzanna Hoefnagel
                        </div>) : (
                            <div className="hcClickable">
                                Suzanna Hoefnagel - http://www.vondel.humanities.uva.nl/ecartico/persons/10002
                            </div>)}
                    </div>
                    <div>
                        {human ? (
                            <div className="detLabel">parent of</div>
                        ) : (<div className="detLabel">schema-org:parent of</div>)}
                    </div>
                    <div className="hcMarginBottom1">
                        {human ? (<div className="hcClickable">
                            Constantijn Huygens I<br/>
                            Geertruid Huygens<br/>
                            Maurits Huygens<br/>
                        </div>) : (
                        <div className="hcClickable">
                            Constantijn Huygens I - http://www.vondel.humanities.uva.nl/ecartico/persons/3958<br/>
                            Geertruid Huygens - http://www.vondel.humanities.uva.nl/ecartico/persons/30435<br/>
                            Maurits Huygens - http://www.vondel.humanities.uva.nl/ecartico/persons/30407
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dummy;