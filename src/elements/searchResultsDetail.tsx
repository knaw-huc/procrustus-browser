import React from "react";
import {IResult, IShowDetail} from "../misc/interfaces";

function SearchResultDetail(props: {item: IResult, open: IShowDetail}) {
    return (
        <div className="hcColumnsAuto hcPointer hcRowCard" onClick={() => {props.open(props.item.uri)}}>
            <div className="hcCell--x2"><strong>{props.item.title}</strong></div>
            <div>{props.item.uri}</div>
        </div>
    )
}

export default SearchResultDetail;