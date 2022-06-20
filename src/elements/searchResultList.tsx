import React from "react";
import {IResultList, IShowDetail} from "../misc/interfaces";
import SearchResultDetail from "./searchResultsDetail";

function SearchResultList(props: {list: IResultList, open: IShowDetail}) {
    return (
        <div>
            {props.list.items.map((item, index) => {
                return (<SearchResultDetail key={index} item={item} open={props.open}/>);
            })}
        </div>
    )
}

export default SearchResultList;