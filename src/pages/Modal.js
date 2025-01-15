import style from './Modal.module.css';

const Modal = ({ setModal }) => {
    return (
        <div
            className={style.main}
            onClick={() => {
                setModal(false);
            }}
        >
            <div className={style.body} onClick={(e) => e.stopPropagation()}>
                <div>
                    <h1>set a date</h1>
                    <input type="date" />
                    <input type="date" />
                </div>
                <div>
                    <h1>set a money</h1>
                    <input type="number" />
                    <p>$</p>
                </div>

                <div>
                    <button>send</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
