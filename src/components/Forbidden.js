import React from 'react';
// Stateless function component displays when course user id doesn't match authenticated user id
const Forbidden = () => {

    return (
        <main>
        <div className="wrap">
            <h2>Forbidden</h2>
            <p>Oh oh! You can't access this page.</p>
        </div>
    </main>

    )
};

export default Forbidden;