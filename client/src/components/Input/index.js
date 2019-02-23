import React from 'react';
import './style.css';

function Input(props) {
    if (props.className === 'textarea') {
        return(
            <textarea name={props.name} rows={props.rows} cols={props.cols} value={props.value} onChange={props.onChange}/>
        );
    } else if (props.className === 'checkbox') {
        return(
            <input name={props.name} type={props.type} value={props.value} onChange={props.onChange} defaultChecked={props.default}/>
        );
    } else if (props.className === 'input') {
        if (typeof props.value != 'undefined') {
            return(
                <input name={props.name} type={props.type} size={props.size} value={props.value} onChange={props.onChange}/>
            );            
        } else if (typeof props.value === 'undefined') {
            return(
                <input name={props.name} type={props.type} onChange={props.onChange}/>
            );
        };
    };
};

export default Input;