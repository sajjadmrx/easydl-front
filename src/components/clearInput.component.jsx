import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react"

export function  ClearButtonComponent(props){
    const setLocalInput = props.setLocalInput
    return (
        <div className={'absolute -top-4 -bottom-2 m-auto left-0  btn'} onClick={()=>setLocalInput('')}>
            <FontAwesomeIcon icon={['fas', 'broom']} className='absolute -top-1 bottom-0 m-auto left-2 cursor-pointer '/>
        </div>
    )
}

function ClickHandler(input){
    input.value = ''
}