import React from 'react';

export default () => {
    return (
        <>
            <div id='select'>
                <h5 id='h'>Login</h5>
                <p>Select user type</p>
                <button className="btn btn-outline-success mb-1" type="submit">Client</button>
                <br />
                <button className="btn btn-outline-success" type="submit">Driver</button>
            </div>
        </>
    )
}