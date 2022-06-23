import {RenderProps} from './Renderer';
import {Base64} from 'js-base64';
import React from 'react';

export default function DefaultRenderer({item}: RenderProps) {
    return <div className="hcMarginBottom1">
        {item.values.length === 0 && (<div>-</div>)}
        {item.values.map((field, index) => {
            let val = field.value;
            if (field.link !== undefined) {
                if (field.link.dataset === "extern") {
                    return (
                        <div key={index}
                             onClick={() => {
                                 window.open(val);
                             }}>{val} <span className="hcClickableSpan">[➚]</span></div>);
                } else {
                    return (
                        <div className="hcClickableBlock" key={index}
                             onClick={() => {
                                 window.location.href = '/detail/' + Base64.encode(JSON.stringify(field.link));
                             }}>{val}</div>);
                }
            } else {
                return (
                    <div key={index}>{val}</div>);
            }
        })}
    </div>;
};
