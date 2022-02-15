import React from 'react';

const Spinner = () => {
    return (
        <div className="spinner w-100 h-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;
