import * as React from 'react'
import {IdName} from "../models/idName";

export interface FilterComponentProps {
    title: string
    options: IdName[]
    onChange?: (value: string) => void;
}

export function FilterComponent(props: FilterComponentProps) {
    return (
        <div className={"filter"}>
            <span>{props.title}</span>
            <select onChange={event => props.onChange ? props.onChange(event.target.value) : undefined}>
                <option></option>
                {props.options.map((option: IdName) =>
                    <option key={option.id} value={option.id}>{option.name}</option>
                )}
            </select>
        </div>
    )
}
