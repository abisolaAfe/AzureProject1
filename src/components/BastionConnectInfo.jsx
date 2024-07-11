import React from 'react';
import '../Styling/BastionConnectInfo.css'; // Import the CSS file
import BastionConnect from './connectWithBastion';
const BastionConnectInfo = () => {
   
    return (
        <div className="bastion-connect">
            <h1>Connect to VM via Bastion</h1>
            <div className="tasks">
                <h2>Tasks</h2>
                <p>There is a folder on the desktop. Create a text file in the folder and write any text and save it. On completion, refresh the app page and browse the file share from the header to confirm your created file has been updated.</p>
                <p>Try accessing the web app from the browser and also try to browse any other website from the browser.</p>
                <p>That completes Tasks 9 and 10 respectively, thanks for your time in advance.</p>
            </div>
            <div className="instructions">
                <h2>Instructions to connect to Bastion</h2>
                <p>Follow the instructions in the diagrams below:</p>
                
                <div className="instruction-images">
                    <div>
                        <h3>Step 1</h3>
                        <img src={`${process.env.PUBLIC_URL}/bastion11.jpeg`} alt="Instruction 1" />
                    </div>
                    <div>
                        <h3>Step 2</h3>
                        <img src={`${process.env.PUBLIC_URL}/today.png`} alt="Instruction 2" />
                        <p><strong>VM Username:</strong> Seeker001</p>
                    </div>
                </div>
                <p>Click the button to check VM status & Connect with VM</p>
                <div>
                    <BastionConnect />
                </div>
            </div>
        </div>
    );
};

export default BastionConnectInfo;
