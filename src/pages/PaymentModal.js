import React, { useState } from 'react';
import style from './PaymentModal.module.css';
import { formatter } from '../shared/currency';
import { ip } from '../shared/ip';
import { Link, useNavigate } from 'react-router-dom';

const Modal = (props) => {
    const navigate = useNavigate();
    var { guider, onClose, userData } = props;
    console.log("a", guider);
    var [ hour, setHour ] = useState("");
    var [ price, setPrice ] = useState("");
    var [ schedule, setSchedule ] = useState("");
    var availableHours = [
        {
            label: "6:00 - 8:00",
            value: 2,
            percentage: 1.0, // Tỉ lệ 100%
        },
        {
            label: "8:00 - 10:00",
            value: 2,
            percentage: 1.1, // Tỉ lệ 110%
        },
        {
            label: "10:00 - 12:00",
            value: 2,
            percentage: 1.2, // Tỉ lệ 120%
        },
        {
            label: "12:00 - 14:00",
            value: 2,
            percentage: 1.0,
        },
        {
            label: "14:00 - 16:00",
            value: 2,
            percentage: 0.9, // Tỉ lệ 90%
        },
        {
            label: "16:00 - 18:00",
            value: 2,
            percentage: 1.3, // Tỉ lệ 130%
        },
        {
            label: "18:00 - 20:00",
            value: 2,
            percentage: 1.2,
        },
    ];
    function handleOrder() {
        fetch(ip + "orders/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                traveler: userData.email,
                guider: guider.email,
                schedule,
                hour,
                price,
            })
        }).then((respond) => {
            navigate("/")
        })
    }
    return (
        <div className={style.main} onClick={(e) => onClose()}>
            <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                <h3>Booking time. Choose one</h3>
                <select
                    onChange={(e) => {
                        const selectedIndex = e.target.selectedIndex - 1; // Trừ 1 vì index 0 là placeholder
                        if (selectedIndex === -1) {
                            setHour("");
                            setPrice("0");
                            return;
                        }
                        const selectedHour = availableHours[selectedIndex];
                        const basePrice = 50000;
                        const calculatedPrice = basePrice * selectedHour.percentage * selectedHour.value;
                        setHour(Number(e.target.value));
                        setSchedule(selectedHour.label);
                        setPrice(calculatedPrice.toFixed(2).toString());
                    }}
                >
                    <option label="-- Choose hour --" value="" />
                    {availableHours.map((item, idx) => (
                        <option key={idx} label={item.label} value={item.value} />
                    ))}
                </select>

                <h3>Price:</h3>
                <input type="text" value={formatter.format(Number(price))} />
                <button type="button" disabled={!hour} onClick={() => handleOrder()}>Order</button>
            </div>
        </div>
    );
};

export default Modal;


