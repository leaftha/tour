import { useNavigate } from 'react-router-dom';
import { ip } from '../shared/ip';
import style from './loggin.module.css';

const LoginPage = ({ setLoggedIn, setUserData, setEmail }) => {
    const navigator = useNavigate();
    const loginHandler = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log('Email:', email);
        console.log('Password:', password);

        const loginData = { email, password };
        try {
            const response = await postData(ip + 'login', loginData);
            setLoggedIn(true);
            setEmail(email);
            navigator('/');
            console.log('Server Response:', response);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const postData = async (url, data) => {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data),
        });
        var result = response.json();
        if (!response.ok) {
            alert('long Password');
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return result;
    };

    return (
        <div className={style.main}>
            <form onSubmit={loginHandler} className={style.body}>
                <div className={style.inputItme}>
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Email" required />
                </div>
                <div className={style.inputItme}>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Password" required />
                </div>

                <button className={style.btn} type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
