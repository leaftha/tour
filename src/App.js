import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import LoginPage from './pages/loggin';
import RegisterPage from './pages/register';
import { ip } from './shared/ip';
import { useEffect, useState } from 'react';
import Guider from './pages/Guider';
import Setting from './pages/setting';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState({});
    const [guiderList, setGuiderList] = useState([]);

    const GetUserData = async () => {
        try {
            const response = await fetch(ip + `account/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            //console.log(response.status);
            const data = await response.json();
            setUserData(data);
            //console.log('Server Response:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const GetGuiderList = async () => {
        try {
            const response = await fetch(ip + 'account/type/Guider', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('네트워크 응답이 좋지 않습니다');
            }

            const data = await response.json();

            setGuiderList(data);
            // console.log('Server Response:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        if (loggedIn) {
            GetUserData();
            GetGuiderList();
        }
    }, [loggedIn]);

    return (
        <Routes>
            <Route path="/" element={<Home loggedIn={loggedIn} userData={userData} guiderList={guiderList} />} />
            <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/register" element={<RegisterPage />} setLoggedIn={setLoggedIn} />
            <Route path="/setting/:email" element={<Setting userData={userData} />} />
            <Route path="/guider/:email" element={<Guider userData={userData} />} />
        </Routes>
    );
}

export default App;
