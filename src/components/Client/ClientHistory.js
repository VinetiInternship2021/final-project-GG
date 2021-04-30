import React from 'react';
import { ClientMenu } from '../../utils/ClientMenu';

const ClientHistory = () => {
    const menuItems = ClientMenu();

    return (
        <div className="position-relative">
            <div className="card text-center position-absolute top-0 start-0 ms-4 mt-3" style={{ width: "150px", height: "125px" }}>
                <ul className="list-group list-group-flush">
                    {menuItems}
                </ul>
            </div>
            <div className="card text-center position-fixed top-50 start-50 translate-middle" style={{ width: "300px", height: "166px" }}>
                <p>history</p>
            </div>
        </div>
    )
}

export default ClientHistory;
