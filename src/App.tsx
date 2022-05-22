import React from 'react';
import {useState} from "react";
import {useEffect} from "react";
import './assets/css/style.css';
import SearchPage from "./pages/searchPage";
import DetailPage from "./pages/detailPage";
import {HOME} from "./misc/config";

function App() {
    const eqs = window.location.hash.substr(1);
    let pg = "";
    let pr = ""
    try {
        const bs = eqs.split("/");
        if (bs.length === 2) {
            pg = bs[0];
            pr = bs[1];
        } else {
            pg = "search";
            pr = "none";
        }
    } catch {
        window.location.href = HOME + '#search';
    }
    console.log(pg);
    const [page, setPage] = useState<string>(pg);
    const [params, setParams] = useState<string>(pr);

    function goToUrl() {
        const eqs = window.location.hash.substr(1);
        try {
            const bs = eqs.split("/");
            if (bs.length === 2) {
                setPage(bs[0]);
                setParams(bs[1]);

            }
        } catch {
            window.location.href = HOME + '#search';
        }

    }

    window.onhashchange=goToUrl;

    return (
        <div className="App">
            {page === "detail" ? (<DetailPage parStr={params} />) : (<SearchPage parStr={params}/>) }
        </div>
    );
}

export default App;
