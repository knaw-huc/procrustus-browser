import React from "react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Yasgui from "@triply/yasgui";
import "@triply/yasgui/build/yasgui.min.css";

export default function Spquery() {
    const params = useParams();
    const [ep, setEp] = useState((endpoints()));

    function endpoints() {
        switch (params.dataset_id) {
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__rijksmuseum":
                return "http://sparqladmin2.goldenagents.org/repositories/rijksmuseum";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__stcn":
                return "http://sparqladmin2.goldenagents.org/repositories/stcn";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__schrijverskabinet":
                return "http://sparqladmin2.goldenagents.org/repositories/schrijverskabinet"
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__notarissennetwerk":
                return "http://sparqladmin2.goldenagents.org/repositories/notarissennetwerk";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__saa":
                return "http://sparqladmin2.goldenagents.org/repositories/saa";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__jaikwil":
                return "http://sparqladmin2.goldenagents.org/repositories/saa";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__bredius":
                return "http://sparqladmin2.goldenagents.org/repositories/bredius";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__corporatiestukken":
                return "http://sparqladmin2.goldenagents.org/repositories/corporatiestukken";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__ggd":
                return "http://sparqladmin2.goldenagents.org/repositories/ggd";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__ecartico":
                return "http://sparqladmin2.goldenagents.org/repositories/ecartico";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__onstage":
                return "http://sparqladmin2.goldenagents.org/repositories/onstage";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__htr":
                return "http://sparqladmin2.goldenagents.org/repositories/saa";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__poc":
                return "http://sparqladmin2.goldenagents.org/repositories/poc";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__nta":
                return "http://sparqladmin2.goldenagents.org/repositories/stcn";
            default:
                return "https://sparql.goldenagents.org/sparql";
        }
    }

    function yasMerin() {
        const list = document.getElementsByClassName("yasgui");
        if (list.length === 0) {
            const yasgui = new Yasgui(document.getElementById("yasgui") as HTMLElement, {requestConfig: {
                    endpoint: ep,
                }});
        }
    }

    useEffect(() => {
        yasMerin();
    });

    return (<div id="yasgui"/>);
}
