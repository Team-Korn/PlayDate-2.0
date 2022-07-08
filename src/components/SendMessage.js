import React from 'react'

function SendMessage(props) {
    const { text } = props.message;

    return <p>{text}</p>
}

export default SendMessage