import React from 'react';
import {useState} from "react";
import {IRefresh} from "./misc/interfaces";
import "./assets/css/style.css";
import "./assets/css/huc-ga.css";

import PageHeader from "./pageElements/pageHeader";
import Header from "./pageElements/header";
// @ts-ignore
import {Outlet, OutletProps} from "react-router-dom";


function App() {

  return (
   <div>
     <PageHeader/>
      <Outlet/>
   </div>
  );
}

export default App;
