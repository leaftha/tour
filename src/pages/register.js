import { useState } from 'react';
import { ip } from '../shared/ip';
import style from './register.module.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage = ({ setLoggedIn }) => {
    const [currentCountry, setCurrentCountry] = useState('Korea');
    const [role, setRole] = useState('Traveler');
    const navigator = useNavigate();
    console.log(typeof setLoggedIn);
    var listOptions = [
        {
            name: 'Korea',
            cities: ['Busan', 'Seoul'],
        },
        {
            name: 'Vietnam',
            cities: ['Ho Chi Minh City', 'Ha Noi'],
        },
    ];
    const resgiterHandler = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const username = e.target.username.value;
        const password = e.target.password.value;
        const country = e.target.country.value;
        const city = e.target.city.value;
        const role = e.target.role.value;

        console.log('Email:', email);
        console.log('Password:', password);

        const ResgitData = { email, username, password, country, city, role };
        console.log(ResgitData);
        try {
            const response = await postData(ip + 'register', ResgitData);
            navigator('/');
            console.log('Server Response:', response);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const postData = async (url, data) => {
        console.log(data);
        console.log(typeof data);
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data),
        });
        var result = await response.json();
        console.log(result);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return result;
    };
    return (
        <div className={style.main}>
            <form className={style.body} onSubmit={resgiterHandler}>
                <div className={style.inputItme}>
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Email" required />
                </div>
                <div className={style.inputItme}>
                    <label>Name</label>
                    <input name="username" placeholder="userName" required />
                </div>
                <div className={style.inputItme}>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Password" required />
                </div>
                <div className={style.selects}>
                    <select
                        name="country"
                        onChange={(e) => {
                            setCurrentCountry(e.target.value);
                        }}
                    >
                        {listOptions.map((item, idx) => (
                            <option>{item.name}</option>
                        ))}
                    </select>
                    <select name="city">
                        {listOptions
                            .filter((item) => item.name === currentCountry)[0]
                            .cities.map((citys, idx) => (
                                <option>{citys}</option>
                            ))}
                    </select>
                    <select
                        onChange={(e) => {
                            setRole(e.target.value);
                        }}
                        name="role"
                    >
                        <option>Traveler</option>
                        <option>Guider</option>
                    </select>
                </div>

                <button className={style.btn} type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
