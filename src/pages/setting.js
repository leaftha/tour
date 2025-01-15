import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from './setting.module.css';
import { ip } from '../shared/ip';
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
const Setting = () => {
    const [ImgUrl, setImgUrl] = useState('');
    const [username, setUserName] = useState('');
    const [country, setCounry] = useState('Korea');
    const [city, setCity] = useState('Busan');
    const [des, setDes] = useState('');
    const parm = useParams();
    const navigator = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(ip + `account/${parm.email}`);
                const response = await fetch(ip + `account/${parm.email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                // console.log('Response Data:', data);
                setUserName(data.username);
                console.log(data);
                setImgUrl(data.avatar);
                setCounry(data.country);
                setCity(data.city);
                setDes(data.description);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, []);

    const editHandler = async () => {
        // const eiitData = { username, country, city, des, ImgUrl };
        const eiitData = {
            avatar: ImgUrl,
            city: city,
            country: country,
            username: username,
            phone: '1233214',
            description: des,
        };
        try {
            const response = await postData(ip + 'account/' + parm.email, eiitData);

            console.log('Server Response:', response);
            navigator('/');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const postData = async (url, data) => {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        var result = response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return result;
    };

    return (
        <div className={style.main}>
            <div className={style.imgChanger}>
                <img src={ImgUrl} alt="User" />
                <input
                    className={style.fileInput}
                    onChange={(e) => {
                        var imgFile = e.target.files[0];
                        if (imgFile) {
                            var reader = new FileReader();
                            reader.onloadend = () => {
                                setImgUrl(reader.result);
                            };
                            reader.readAsDataURL(imgFile);
                        }
                    }}
                    type="file"
                    name="myImage"
                    accept="image/png, image/gif, image/jpeg"
                />
            </div>
            <div className={style.body}>
                <div className={style.Namecontent}>
                    <labe className={style.inputTitle}>User Name</labe>
                    <input
                        className={style.inputBox}
                        value={username}
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                    />
                </div>

                <div className={style.seletBody}>
                    <label className={style.inputTitle}>Country</label>
                    <div className={style.select}>
                        <select
                            value={country}
                            name="country"
                            onChange={(e) => {
                                setCounry(e.target.value);
                            }}
                        >
                            {listOptions.map((item, idx) => (
                                <option>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <label className={style.inputTitle}>City</label>
                    <div className={style.select}>
                        <select
                            name="city"
                            value={city}
                            onChange={(e) => {
                                setCity(e.target.value);
                            }}
                        >
                            {listOptions
                                .filter((item) => item.name === country)[0]
                                .cities.map((city, idx) => (
                                    <option>{city}</option>
                                ))}
                        </select>
                    </div>
                </div>
                <h1 className={style.inputTitle}>Description</h1>
                <textarea
                    className={style.description}
                    value={des}
                    onChange={(e) => {
                        setDes(e.target.value);
                    }}
                />
            </div>
            <button
                className={style.btn}
                onClick={() => {
                    editHandler();
                }}
            >
                Change
            </button>
        </div>
    );
};

export default Setting;
