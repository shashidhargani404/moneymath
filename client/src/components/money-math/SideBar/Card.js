import React from 'react'

function Card(props) {
    return (
        <div id="Card">
            <h4>{props.title}</h4>
            <h1>$ {props.total}/-</h1>
            <p>{props.body}</p>
        </div>
    )
}

export default Card