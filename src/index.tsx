import React from 'react';
import ReactDOM from 'react-dom/client';
import {useParams} from "react-router-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import './assets/css/style.css';
import App from './App';
import DetailPage from "./pages/detailPage";
import SearchPage from "./pages/searchPage";
import Switch from "./pages/switch";

//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}>
                <Route path="detail" element={<DetailPage/>}>
                    <Route path=":code" element={<DetailPage/>}/>
                </Route>
                <Route path="search" element={<SearchPage/>}>
                    <Route path=":scode" element={<SearchPage/>}/>
                </Route>
                <Route path="switch" element={<Switch/>}>
                    <Route path={":sw_code"} element={<Switch/>}/>
                </Route>
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>Invalid URL!</p>
                        </main>
                    }
                />
            </Route>

        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
