

import React from 'react';

const BastionConnectButton = () => {
    const handleButtonClick = () => {
        window.open('https://your-bastion-url.com', '_blank');
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Connect via Bastion</button>
        </div>
    );
};

export default BastionConnectButton;













