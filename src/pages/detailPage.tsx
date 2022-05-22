import React from 'react';
import PageHeader from "../pageElements/pageHeader";
import Details from "../components/details";


function DetailPage(props: {parStr: string}) {
    return (
        <div>
            <PageHeader />
            <Details parStr={props.parStr}/>
        </div>
    )
}
export default DetailPage;