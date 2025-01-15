import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
        console.log(eiitData);
        try {
            const response = await postData(ip + 'account/' + parm.email, eiitData);
            console.log('Server Response:', response);
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
            console.log(result);
        }

        return result;
    };

    return (
        <div>
            <div>
                <img src={ImgUrl} alt="User" />
                <input
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
                <div>
                    <input
                        value={username}
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                    />

                    <div>
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
                    <textarea
                        value={des}
                        onChange={(e) => {
                            setDes(e.target.value);
                        }}
                    />
                </div>
                <button
                    onClick={() => {
                        editHandler();
                    }}
                >
                    Change
                </button>
            </div>
        </div>
    );
};

export default Setting;
