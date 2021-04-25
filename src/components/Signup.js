import React from 'react';

export default () => {

    const onSignupClient = (event) => {
        if (event.metaKey || event.ctrlKey) {
            return;
        }
        event.preventDefault();
        window.history.pushState({}, '', '/signup/client')
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }

    const onSignupDriver = (event) => {
        if (event.metaKey || event.ctrlKey) {
            return;
        }
        event.preventDefault();
        window.history.pushState({}, '', '/signup/driver')
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }

    return (
        <>
            <div id='select'>
                <h5 id='h'>Sign up</h5>
                <p>Select user type</p>
                <button onClick={onSignupClient} className="btn btn-outline-success mb-1" type="submit">Client</button>
                <br />
                <button onClick={onSignupDriver} className="btn btn-outline-success" type="submit">Driver</button>
            </div>
        </>
    )
}
