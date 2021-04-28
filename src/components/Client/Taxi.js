import React, { useState } from 'react';
import { rating } from '../../utils/configs';
import axios from 'axios';

const Taxi = () => {
    const [message, setMessage] = useState('')
    
    const onSelect = (event) => {
        axios.post('/taxi/rate', {
            rate: event.target.id
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        setMessage('Thank you for using our services.')
    }

    const rateButton = rating.map((rate) => {
        return (
            <div key={rate} className="form-check form-check-inline">
                <input onChange={(event) => onSelect(event)} className="form-check-input" type="radio" name="inlineRadioOptions" id={rate} />
                <label className="form-check-label" htmlFor={rate}>{rate}</label>
            </div>
        )
    });

    return (
        <div className="text-center border position-absolute top-50 start-50 translate-middle" style={{ width: "700px", height: "500px" }}>
            <div className="text-center border position-absolute top-0 start-50 translate-middle-x mt-2" style={{ width: "660px", height: "395px" }}>
                <p>Taxi/map</p>
            </div>
            <div className="text-center position-absolute bottom-0 start-50 translate-middle-x mb-4" style={{ width: "350px", height: "60px" }}>
                <h5 className="mb-1">Rate the driver</h5>
                {rateButton}
            </div>
            <h6 className="text-center position-absolute bottom-0 start-50 translate-middle-x mb-2">{message}</h6>
        </div>
    )
}

export default Taxi;
