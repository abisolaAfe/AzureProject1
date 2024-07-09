
import React, { useEffect } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import '../Styling/LoginPage.css';
import { useTasks } from '../jsFiles/TaskContext';

function LoginPage() {
    const { instance } = useMsal();
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();
    const { completeTask } = useTasks();

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

    return (
        <div className="login-container">
            <div className="embed-container">
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '0',
                    paddingTop: '56.2225%',
                    paddingBottom: '0',
                    boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
                    marginTop: '0em' , //'1.6em',
                    marginBottom: '0em', //'0.9em',
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
                        title= "Design"
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


















