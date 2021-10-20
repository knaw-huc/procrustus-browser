import React from "react";
import {IResultList} from "../misc/interfaces";
import SearchResultDetail from "./searchResultsDetail";

function SearchResultList(props: {list: IResultList}) {
    return (
        <div>
            {props.list.items.map((item) => {
                return (<SearchResultDetail item={item}/>);
            })}
        </div>
    )
}

export default SearchResultList;