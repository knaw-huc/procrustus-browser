import React from "react";
import {useNavigate} from "react-router-dom";
import {useParams, useSearchParams} from "react-router-dom";

function Switch() {
    const [params, setParams] = useSearchParams();

    return <div>
        <div className="hcContentContainer">
            <div className="hcBasicSideMargin hcMarginTop1 hcMarginBottom1">
                <h1>Switch</h1>
                <div>{params.get("uri")}</div>
            </div>
        </div>
    </div>
}

export default Switch;