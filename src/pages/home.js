import { Link, useNavigate } from 'react-router-dom';
import style from './home.module.css';
import { useState } from 'react';

const listOptions = [
    {
        name: 'Korea',
        cities: ['Busan', 'Seoul'],
    },
    {
        name: 'Vietnam',
        cities: ['Ho Chi Minh City', 'Ha Noi'],
    },
];

// const userDate = {
//     email: 'vlcks@gm',
//     role: 'gard',
// };

// const guiderList1 = [
//     { email: 'vdadf1', country: 'cads', city: 'Dd' },
//     { email: 'vdadf2', country: 'cads', city: 'Dd' },
//     { email: 'vdadf3', country: 'cads', city: 'Dd' },
//     { email: 'vdadf4', country: 'cads', city: 'Dd' },
//     { email: 'vdadf5', country: 'cads', city: 'Dd' },
//     { email: 'vdadf6', country: 'cads', city: 'Dd' },
// ];

const Home = ({ loggedIn, userData, email, guiderList }) => {
    const [currentCountry, setCurrentCountry] = useState('Korea');
    const navigator = useNavigate();
    console.log(guiderList);
    return (
        <div className={style.main}>
            {/* Header */}
            <header className={style.nav}>
                <img src="/logo.png" />
                <Link className={style.a}>About</Link>
                <Link className={style.a}>Contact</Link>
                {!loggedIn ? (
                    <div>
                        <Link className={style.link} to="/login">
                            Login
                        </Link>
                        <Link className={style.link} to="/register">
                            Register
                        </Link>
                    </div>
                ) : (
                    <>
                        <h1
                            className={style.myPage}
                            onClick={() => {
                                navigator(`/setting/${userData.email}`);
                            }}
                        >
                            {userData.email}
                        </h1>
                        {/* <Link className={style.myPage} to=`/setting/${email}`>{email}</Link> */}
                        {/* <p>{userData.role}</p> */}
                    </>
                )}
            </header>

            {/* Main Content */}
            {!loggedIn ? (
                <div className={style.logginFrist}>
                    <h1>Please login first.</h1>
                </div>
            ) : userData.role === 'Traveler' ? (
                <div className={style.guiderList}>
                    <h1 className={style.title}>Guiders</h1>
                    <div className={style.selects}>
                        <h1>Country</h1>
                        <select
                            name="country"
                            onChange={(e) => {
                                setCurrentCountry(e.target.value);
                            }}
                        >
                            {listOptions.map((item, idx) => (
                                <option key={idx}>{item.name}</option>
                            ))}
                        </select>
                        <h1>City</h1>
                        <select name="city">
                            {listOptions
                                .find((item) => item.name === currentCountry)
                                ?.cities.map((city, idx) => (
                                    <option key={idx}>{city}</option>
                                ))}
                        </select>
                    </div>

                    {/* Guider List */}
                    <div className={style.body}>
                        <div className={style.guiderGrid}>
                            {guiderList.map((item, idx) => (
                                <div
                                    className={style.guiderItem}
                                    onClick={() => {
                                        navigator(`/guider/${item.email}`);
                                    }}
                                    key={idx}
                                >
                                    <div className={style.imgContainer}>
                                        <img className={style.avatar} src={item.avatar} alt="avatar" />
                                    </div>
                                    <div className={style.itemContainer}>
                                        <h1>{item.email}</h1>
                                        <h1>{item.country}</h1>
                                        <h1>{item.city}</h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={style.ranking}>
                            {guiderList.map((item, idx) => (
                                <div
                                    className={style.rankingItem}
                                    onClick={() => {
                                        navigator(`/guider/${item.email}`);
                                    }}
                                    key={idx}
                                >
                                    <h1 className={style.rankingNum}>#{idx + 1}</h1>
                                    <div className={style.des}>
                                        <img className={style.img} src={item.avatar} alt="profile img" />
                                        <h1>{item.email}</h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={style.guiderList}>
                    <h1 className={style.title}>My Contact</h1>

                    {/* Guider List */}
                    {guiderList.map((item, idx) => (
                        <div className={style.guiderItem} key={idx}>
                            <h1>{item.email}</h1>
                            <h1>{item.country}</h1>
                            <h1>{item.city}</h1>
                            <button className={style.btn}>OK</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
