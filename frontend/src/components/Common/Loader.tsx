import React from 'react';
import '../../styles/global.scss';

const Loader = () => {
    return (
        <div className="loader">
            <div className="loader-spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

export default Loader;
