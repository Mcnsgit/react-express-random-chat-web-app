import React from 'react';

const MessageList = ({ messages }) => {
    return (
        <div className="message-list">
            <ul>
            {messages.map((message, index) => (
                    <li><div key={index} className="message"><p>{message}</p></div></li>
                ))}
                 </ul>
             </div>
    );
};