import React from "react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Yasgui from "@triply/yasgui";
import "@triply/yasgui/build/yasgui.min.css";
import {Base64} from "js-base64";

export default function Spquery() {
    const params = useParams();
    const uri: string = params.dataset_id as string;
    const [ep, setEp] = useState(decodeURIComponent(uri));

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
