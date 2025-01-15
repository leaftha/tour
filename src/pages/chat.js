import style from './chat.module.css';

const Chat = ({ setChatModal }) => {
    return (
        <div className={style.main}>
            <div className={style.header}>
                <h1 className={style.title}>chat</h1>
                <p onClick={() => setChatModal(false)} className={style.closeButton}>
                    X
                </p>
            </div>
            <div className={style.chatBody}>
                <p>test1</p>
                <p>test2</p>
                <p>test3</p>
            </div>

            <div className={style.inputComportent}>
                <input className={style.input} />
                <img src="/send-icon.png" alt="send btn img" />
            </div>
        </div>
    );
};
export default Chat;
