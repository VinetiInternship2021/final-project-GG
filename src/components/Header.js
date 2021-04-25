import React from 'react';

export default () => {

    const onSignup = (event) => {
        if (event.metaKey || event.ctrlKey) {
            return;
        }
        event.preventDefault();
        window.history.pushState({}, '', '/signup')
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }

    const onLogin = (event) => {
        if (event.metaKey || event.ctrlKey) {
            return;
        }
        event.preventDefault();
        window.history.pushState({}, '', '/login')
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand">GG Clone App</a>
                <form className="d-flex">
                    <button onClick={onSignup} href='/' className="btn btn-outline-success me-1" type="submit">Sign up</button>
                    <button onClick={onLogin} className="btn btn-outline-success" type="submit">Login</button>
                </form>
            </div>
        </nav>
    )
}

