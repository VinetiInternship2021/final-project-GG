import React from 'react';
import { useHistory } from 'react-router-dom';
import { orderTypes } from '../../utils/configs';
import axios from 'axios';

const ClientOrder = () => {
    let history = useHistory();

    const onSelect = (order) => {
        axios.post('/client/order', {
            order: order
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        history.push('/taxi')
    }

    const orderButton = orderTypes.map((order) => {
        return (
            <div key={order}>
                <button onClick={() => onSelect(order)} className="btn btn-outline-success mb-1 w-50" type="submit">{order}</button>
                <br />
            </div>
        )
    })

    return (
        <div className="text-center border position-absolute top-50 start-50 translate-middle" style={{ width: "300px", height: "280px" }}>
            <h5 className="mt-3 mb-3">Choose Vehicle Type</h5>
            {orderButton}
        </div>
    )
}

export default ClientOrder;