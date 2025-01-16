import { Link, useNavigate } from 'react-router-dom';
import style from './home.module.css';
import { useEffect, useState } from 'react';

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

const Home = ({ loggedIn, userData, guiderList }) => {
    const [currentCountry, setCurrentCountry] = useState('Korea');
    const [currentCity, setCurrentCity] = useState('Busan');
    const [inputName, setInputname] = useState('');
    const [userType, setUserType] = useState('Traveler');
    const [List, setList] = useState([...guiderList]);
    const navigator = useNavigate();

    useEffect(() => {
        setUserType(userData.role);
        console.log(userData, userType);
    }, [userData]);
    useEffect(() => {
        let newList = [];

        for (let user of guiderList) {
            if (user.country === currentCountry && user.city === currentCity) {
                newList.push(user);
            }
        }

        setList([...newList]);
    }, [currentCity, currentCountry, guiderList]);

    useEffect(() => {
        let newList = [];

        for (let user of guiderList) {
            console.log(user);
            if (user.username.includes(inputName)) {
                console.log(user);
                newList.push(user);
            }
        }
        setList([...newList]);
    }, [inputName]);

    return (
        <div className={style.main}>
            {/* Header */}
            <header className={style.nav} style={loggedIn ? { background: 'white' } : {}}>
                <div className={style.logos}>
                    <img src="/logo.png" />
                    <Link className={style.a}>About</Link>
                    <Link className={style.a}>Contact</Link>
                </div>
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
                <div className={style.mainBody}>
                    <div className={style.maintitle}>
                        <div>
                            <h1 className={style.Name}>LocalBuddy</h1>
                            <h1 className={style.team}>
                                <span>"LocalBuddy”</span> connects travelers with local people.
                            </h1>
                            <h1 className={style.team}>The travelers can experience more authentic local travels. </h1>
                            <h1 className={style.team}>
                                Come on and Enjoy the <span>LOCAL!</span>
                            </h1>
                        </div>
                        <div className={style.inputList}>
                            <input placeholder="Where are you going" />
                            <button className={style.btn}>Search</button>
                        </div>
                    </div>
                    <div className={style.imgGrid}>
                        <img className={style.mainImg} src="/mainImg.png" />
                        <img className={style.mainImg} src="/mainIm2.png" />
                        <img className={style.mainImg} src="/mainImg3.png" />
                    </div>
                </div>
            ) : userType === 'Traveler' ? (
                <div className={style.guiderList}>
                    <h1 className={style.title}>List of Guiders</h1>
                    <div className={style.selects}>
                        <div className={style.selectItem}>
                            <h1>Country</h1>
                            <select
                                name="country"
                                onChange={(e) => {
                                    setCurrentCountry(e.target.value);
                                    if (e.target.value === 'Vietnam') {
                                        setCurrentCity('Ho Chi Minh City');
                                    } else {
                                        setCurrentCity('Busan');
                                    }
                                }}
                            >
                                {listOptions.map((item, idx) => (
                                    <option key={idx}>{item.name}</option>
                                ))}
                            </select>
                            <h1>City</h1>
                            <select
                                name="city"
                                value={currentCity}
                                onChange={(e) => {
                                    setCurrentCity(e.target.value);
                                }}
                            >
                                {listOptions
                                    .find((item) => item.name === currentCountry)
                                    ?.cities.map((city, idx) => (
                                        <option key={idx}>{city}</option>
                                    ))}
                            </select>
                        </div>
                        <div className={style.inputNames}>
                            <input
                                placeholder="Name"
                                value={inputName}
                                onChange={(e) => setInputname(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Guider List */}
                    <div className={style.body}>
                        <div className={style.guiderGrid}>
                            {List.map((item, idx) => (
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
                                        <h1 className={style.itemContainerUsername}>{item.username}</h1>
                                        <h1>{item.country}</h1>
                                        <h1>{item.city}</h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={style.ranking}>
                            <h1 className={style.rankingTitle}>Top Ranking</h1>
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
                                        <h1>{item.username}</h1>
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
                        <div className={style.travlerItem} key={idx}>
                            <div>
                                <h1>{item.email}</h1>
                                <h1>{item.country}</h1>
                                <h1>{item.city}</h1>
                            </div>
                            <div>
                                <button className={style.btn}>OK</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* <div className={style.foot}></div> */}
        </div>
    );
};

export default Home;
