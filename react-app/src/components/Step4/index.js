import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState} from "react";
import visaLogo from "../../images/visa-logo-png-2015.png";
import amexLogo from "../../images/American_Express-Logo.wine.png";
import masterLogo from "../../images/Mastercard-Logo.wine.png";
import "./Step4.css"

function Step4({ handleSubmit, hourlyRate, location, taskDate, taskerName, trustAndSupportFee, setShouldSubmit}){
    const history = useHistory();
    // const trustAndSupportFee = 12.54;
    const totalRate = Number(hourlyRate) + Number(trustAndSupportFee);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cardLogo, setCardLogo] = useState(null);


    const handleCofirm = () => {
        handleSubmit()
        history.push('/tasks/current')
    }

    //HandleSubmit is called when isConfirmed is true
    useEffect(() => {
        if (isConfirmed) {
            handleSubmit();
            history.push('/tasks/current');
        }
    }, [isConfirmed]);

    const handleChange = (e) => {
        setCardNumber(e.target.value);
        getCardType(e.target.value);
    }

    const getCardType = (number) => {
        const firstDigit = number.toString().charAt(0);
        switch(firstDigit){
            case '3':
                setCardLogo(amexLogo);
                break;
            case '4':
                setCardLogo(visaLogo);
                break;
            case '5':
                setCardLogo(masterLogo);
                break;
            default:
                setCardLogo("");
        }
    }


    return (
        <>
        <div className="form-step4-description">
            <i class="fa-solid fa-list"></i>
          <p className='step2-text'>You`re almost done! We just need a few more details to connect you with your Tasker.</p>
        </div>
        <div className='main-container'>
            <div className='payment-method'>
                <h2 className='payment-text'>Payment Method</h2>
                <div className='card-input-container'>
                    <label>
                        <input
                            type="text"
                            name="cardNumber"
                            maxLength="16"
                            onChange={handleChange}
                            placeholder='Card Number'
                        />
                    </label>
                    {cardLogo && <img className="card-logo" src={cardLogo} alt="card-logo" />}
                </div>
            </div>

            <div className='taskdetails'>
                <div className='general-taskdetails'>
                    <p>{`${taskerName}`}</p>
                    <div className='date-icon'>
                    <i class="fa-regular fa-calendar"></i>
                    <p>{`Date: ${taskDate}`}</p>
                    </div>
                    <div className='location-icon'>
                    <i class="fa-solid fa-location-dot"></i>
                    <p>{`Location: ${location}`}</p>
                    </div>
                </div>
                <div className='price-details'>
                    <div className='price-icon'>
                        <i class="fa-solid fa-tag"></i>
                        <h4>Price Details</h4>
                    </div>
                    <div className='price-item'>
                        <p>Hourly Rate </p>
                        <p>{Number(hourlyRate)}/hr</p>
                    </div>
                    <div className='price-item'>
                        <p>Trust and Support Fee</p>
                        <p>{parseFloat(trustAndSupportFee).toFixed(2)}/hr</p>
                    </div>
                    <div className='price-item'>
                        <p>Total Price </p>
                        <p>{totalRate.toFixed(2)}/hr</p>
                    </div>
                </div>
            </div>
            <div className='button-container'>
                {taskDate ?
                <button  className='select-button' type="button" onClick={handleCofirm}>Confirm & Chat</button>
                :
                <p>Please go to Step 3 and add a date.</p>
                }
            </div>

        </div>
        </>
    )
}

export default Step4
