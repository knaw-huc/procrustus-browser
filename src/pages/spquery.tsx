import React from "react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Yasgui from "@triply/yasgui";
import "@triply/yasgui/build/yasgui.min.css";

export default function Spquery() {
    const params = useParams();
    const uri: string = params.dataset_id as string;
    localStorage.removeItem("yagui__config");

    function yasMerin() {
        const list = document.getElementsByClassName("yasgui");

        if (list.length === 0) {
            const yasgui = new Yasgui(document.getElementById("yasgui") as HTMLElement, {requestConfig: {
                    endpoint: decodeURIComponent(uri)
                }});
        }
    }

    useEffect(() => {
        yasMerin();
    });

    return (<div id="yasgui"/>);
}
