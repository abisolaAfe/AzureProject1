
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../Styling/LoginPage.css';
import { useTasks } from '../jsFiles/TaskContext';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';

Modal.setAppElement('#root'); // Set the root element for accessibility

function LoginPage() {
    const { instance } = useMsal();
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();
    const { completeTask } = useTasks();
    const [isModalOpen, setIsModalOpen] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            completeTask(1); // Mark login task as completed
            navigate('/home'); // Navigate to home after successful login
        }
    }, [isAuthenticated, completeTask, navigate]);

    const handleLogin = () => {
        instance.loginRedirect({
            scope: ["user.read"]
        });
        completeTask(1);
        console.log('Client ID:', process.env.REACT_APP_CLIENT_ID);
        navigate('/home');
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="login-container">
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Credential Information"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2>Thank you for visiting my website</h2>
                <p>
                    To help you explore with ease, I've provided a guest credential
                    for quick access. However, you can also create a personal account to explore using your own information.
                </p>
                <p><strong>Username:</strong> seeker@never2much.uk</p>
                <p><strong>Password:</strong> BeyondLimit001</p>
                <p>*Please scroll down at the Home page to request access to carry out tasks as required*</p>
                <button onClick={closeModal}>Close</button>
            </Modal>
            <div className="embed-container">
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '0',
                    paddingTop: '56.2225%',
                    paddingBottom: '0',
                    boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
                    marginTop: '0em',
                    marginBottom: '0em',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    willChange: 'transform'
                }}>
                    <iframe
                        loading="lazy"
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: '0',
                            left: '0',
                            border: 'none',
                            padding: '0',
                            margin: '0'
                        }}
                        title="Design"
                        src="https://www.canva.com/design/DAGJJw6x-A8/61eHq36BL-Xa8oHpnZL02A/view?embed"
                        allowFullScreen="allowfullscreen"
                        allow="fullscreen"
                    ></iframe>
                </div>
            </div>
            <button className="login-button" onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginPage;




















