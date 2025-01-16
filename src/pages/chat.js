import { useState } from 'react';
import style from './chat.module.css';

const Chat = ({ setChatModal }) => {
    var [listChat, setListChat] = useState([]);
    var [currentPrompt, setCurrentPrompt] = useState('');
    function generateText(prompt) {
        if (prompt.includes('hello') || prompt.includes(' hi ')) {
            return 'Hello, how can I help you?';
        }
        if (prompt.includes('help')) {
            return 'What can I help you with?';
        }
        if (prompt.includes('korea')) {
            return 'You can find guiders in Korea, especially me, to help you discovering the country :D!';
        }
        if (prompt.includes('viet')) {
            return 'You can find guiders in Vietnam, especially me, to help you discovering the country :D!';
        }
        return "I can't understand what you mean, could you specify again?";
    }
    return (
        <div className={style.main}>
            <div className={style.header}>
                <h1 className={style.title}>chat</h1>
                <p onClick={() => setChatModal(false)} className={style.closeButton}>
                    X
                </p>
            </div>
            <div className={style.chatBody}>
                {listChat.map((item) => (
                    <p>{item}</p>
                ))}
            </div>

            <div className={style.inputComportent}>
                <input
                    className={style.input}
                    onChange={(e) => {
                        setCurrentPrompt(e.target.value);
                        console.log('prompt: ', currentPrompt);
                    }}
                />
                <img
                    src="/send-icon.png"
                    alt="send btn img"
                    onClick={(e) => {
                        const prompt = currentPrompt;
                        setListChat([...listChat, prompt]);
                        setListChat((prev) => [...prev, generateText(prompt)]);
                        setCurrentPrompt('');
                    }}
                />
            </div>
        </div>
    );
};
export default Chat;
