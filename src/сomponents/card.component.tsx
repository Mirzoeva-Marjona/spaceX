import React from "react";

export interface CardComponentProps {
    imgUrl: string;
    title: string;
    text: string;
    date: string;
}

export function CardComponent(props: CardComponentProps) {
    return (
        <div className="card">
            <img className="card-img" src={props.imgUrl}/>
            <div>
                <div className="card-header">
                    <div className="card-header__name">{props.title}</div>
                    <div>{props.date}</div>
                </div>
                <div className="card-text">{props.text}</div>
            </div>
        </div>
    )
}