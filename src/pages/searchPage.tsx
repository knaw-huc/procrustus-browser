import React from 'react';
import PageHeader from "../pageElements/pageHeader";
import PageFooter from "../pageElements/pageFooter";
import Search from "../components/search";

function SearchPage(props: {parStr: string}) {
    return (
        <div>
            <PageHeader />
            <Search parStr={props.parStr}/>
        </div>
    )
}
export default SearchPage;