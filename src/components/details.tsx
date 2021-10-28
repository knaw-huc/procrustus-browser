import React from "react";
import PageHeader from "../pageElements/pageHeader";

function Details() {
    return (

            <div className="hcContentContainer">
                <h1>Albertanus</h1>
                <div className="hcStackFormItems">
                    <div className="detLabel">schema_birthDate</div>
                    <div className="hcMarginBottom1">-</div>

                    <div className="detLabel">schema_deathDate</div>
                    <div className="hcMarginBottom1">1246</div>

                    <div className="detLabel">schema_givenName</div>
                    <div className="hcMarginBottom1">-</div>

                    <div className="detLabel">rdfs_label</div>
                    <div className="hcMarginBottom1">Albertanus (-1246)</div>

                    <div className="detLabel">rdf_type</div>
                    <div className="hcMarginBottom1 hcClickable">http://schema.org/Person</div>

                    <div className="detLabel">schema_alternateNameList</div>
                    <div className="hcMarginBottom1">- Albertano<br/>- Albertanus<br/>- Albertanus Brixiensis</div>

                    <div className="detLabel">rdfs_commentList</div>
                    <div className="hcMarginBottom1">P2P: 200 Albertanus\"%of Brescia</div>

                    <div className="detLabel">schema_familyName</div>
                    <div className="hcMarginBottom1">Albertanus</div>

                    <div className="detLabel">_inverse_foaf_primaryTopic</div>
                    <div className="hcMarginBottom1 hcClickable">https://data.goldenagents.org/datasets/ufab7d657a250e3461361c982ce9b38f3816e0c4b/stcn_20200226/.well-known/genid/dc8a1a0aa34c5882491c2ed494399bb7_node1dupkk4p7x2118790</div>





                </div>
            </div>

    )
}

export default Details;