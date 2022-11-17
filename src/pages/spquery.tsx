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
                return "http://sparql2.goldenagents.org/rijksmuseum";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__stcn":
                return "http://sparql2.goldenagents.org/stcn";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__schrijverskabinet":
                return "http://sparql2.goldenagents.org/schrijverskabinet"
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__notarissennetwerk":
                return "http://sparql2.goldenagents.org/notarissennetwerk";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__saa":
                return "http://sparql2.goldenagents.org/saa";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__jaikwil":
                return "http://sparql2.goldenagents.org/saa";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__bredius":
                return "http://sparql2.goldenagents.org/bredius";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__corporatiestukken":
                return "http://sparql2.goldenagents.org/corporatiestukken";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__ggd":
                return "http://sparql2.goldenagents.org/ggd";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__ecartico":
                return "http://sparql2.goldenagents.org/ecartico";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__onstage":
                return "http://sparql2.goldenagents.org/onstage";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__htr":
                return "http://sparql2.goldenagents.org/saa";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__poc":
                return "http://sparql2.goldenagents.org/poc";
            case "u692bc364e9d7fa97b3510c6c0c8f2bb9a0e5123b__nta":
                return "http://sparql2.goldenagents.org/stcn";
            default:
                return "https://sparql2.goldenagents.org/all";
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
