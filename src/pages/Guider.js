import { useEffect, useState } from 'react';
import { ip } from '../shared/ip';
import Chat from './chat';
import style from './Guider.module.css';
import { useParams } from 'react-router-dom';
import Modal from './Modal';

// const data1 = {
//     email: 'dalsfkj',
//     coutry: 'dkl',
//     city: 'dkl',
//     rating: 3.5,
//     des: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pulvinar magna massa, nec venenatis arcu laoreet vel. Donec sagittis pulvinar neque. Proin tellus nibh, vehicula a placerat vel, vulputate lobortis eros. Nam rhoncus tortor maximus, molestie odio in, congue velit. Suspendisse ut malesuada nulla. Mauris lacinia, nisi vel rhoncus pulvinar, justo odio eleifend neque, sed rhoncus nisl elit ac nibh. Mauris venenatis nunc sed pretium viverra. Nullam laoreet enim ac odio pretium hendrerit. Nulla facilisis ex nec diam vestibulum, ac sodales ligula euismod.Fusce non nisl vel eros luctus feugiat. Praesent erat diam, imperdiet fermentum tellus quis, tempor iaculis orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras quis ligula commodo, hendrerit turpis in, laoreet felis. Cras vulputate mollis convallis. Aliquam imperdiet urna ac tortor blandit, in finibus risus ornare. Cras pretium tortor quis est varius, nec auctor ipsum auctor. Sed blandit tellus odio, quis fermentum eros hendrerit et. Suspendisse imperdiet turpis nisi, non lobortis velit tempor quis. Ut sodales eget arcu eu molestie. In eget placerat purus, gravida volutpat quam. Ut nec mauris neque. Fusce ut sodales quam. Mauris maximus sapien non eros feugiat hendrerit. Praesent id semper sapien, id ultricies elit. Vestibulum viverra dapibus enim non luctus.Aenean id posuere ex. Quisque at tempus mi. Nullam a dictum sapien. In nec volutpat libero, vulputate euismod arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur a metus iaculis, egestas quam in, vehicula mi. Proin rutrum purus vitae justo fringilla malesuadaPraesent ullamcorper suscipit ante at eleifend. Maecenas sit amet scelerisque felis. Ut gravida, dolor ut imperdiet cursus, nisi dui varius erat, a viverra lorem turpis sed elit. Proin at sapien id tellus venenatis elementum at quis nisi. Nullam euismod arcu erat, vitae consequat quam varius eu. Vivamus mi magna, dapibus eget tellus id, consequat maximus metus. Integer urna mauris, rhoncus a nibh eu, vehicula viverra purus. Nam congue aliquam mi, in dictum odio condimentum et. Vivamus sed hendrerit neque, a aliquam dolor. Proin maximus porta lorem, quis posuere nisl mattis at. Nam eu tempor lacus. Suspendisse varius, neque ac vehicula mattis, arcu libero aliquet purus, a consequat dolor orci sit amet elit. Etiam enim nisi, porttitor et efficitur id, consectetur eu neque. Vivamus non risus ac magna euismod tincidunt a sed velit. Donec faucibus massa eget vehicula aliquet. Aenean molestie nulla at finibus finibus.Donec vehicula purus sem, a vestibulum ipsum semper a. Praesent venenatis tempus velit at cursus. Ut imperdiet, est et efficitur sagittis, felis erat fringilla libero, et maximus nulla ipsum vel est. Nam consectetur, nibh at feugiat gravida, felis nulla feugiat libero, nec vulputate enim justo quis felis. Sed rutrum leo at orci lobortis, sed semper metus viverra. Nullam faucibus ac enim sagittis dictum. Integer convallis nulla vitae ornare fermentum. Quisque orci sapien, malesuada non ex nec, dapibus commodo tortor. Mauris et metus orci. Sed lacinia odio quis nisi consequat, vitae ultrices eros lobortis. Aenean ut lacinia magna, ut dapibus massa. Donec tincidunt enim ut maximus euismod. Cras vulputate quis eros vitae egestas. In ut porttitor urna, quis suscipit mauris. Suspendisse vel mauris in nibh ultricies hendrerit id non est. Fusce sagittis diam sed varius fringilla.',
// };

const Guider = () => {
    const [data, setData] = useState({});
    const [chatModal, setChatModal] = useState(false);
    const [ranking, setRanking] = useState(0);
    const [modal, setModal] = useState(false);
    const parm = useParams();

    useEffect(() => {
        GetUserData();
        GetUserRantingData();
    }, []);
    const GetUserData = async () => {
        try {
            const response = await fetch(ip + 'account/' + parm.email, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('네트워크 응답이 좋지 않습니다');
            }

            const data = await response.json();
            setData(data);
            // console.log('Server Response:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const GetUserRantingData = async () => {
        try {
            const response = await fetch(ip + 'travelers/' + parm.email, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('네트워크 응답이 좋지 않습니다');
            }

            const data = await response.json();
            setRanking(data.rating);
            // console.log('Server Response:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className={style.main}>
            <h1 className={style.title}>Guider : {data.username}</h1>
            <div className={style.introduction}>
                <div className={style.imgbody}>
                    <img className={style.img} src={data.avatar} alt="profile Img" />
                </div>
                <div className={style.content}>
                    <p>Email : {data.email}</p>
                    <p>Country : {data.country}</p>
                    <p>City : {data.city}</p>
                    <p>Rating : {ranking}</p>
                </div>
            </div>
            <div className={style.des}>
                <p>{data.description}</p>
            </div>
            <div className={style.chatComportant}>
                <button className={style.btn} onClick={() => setChatModal(true)}>
                    Try to Chat
                </button>
            </div>
            {chatModal && <Chat setChatModal={setChatModal} />}
            <div>
                <button onClick={() => setModal(true)} className={style.btn}>
                    Ok
                </button>
            </div>
            {modal && <Modal />}
        </div>
    );
};

export default Guider;
