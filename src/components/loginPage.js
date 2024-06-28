/*import React, {useEffect } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import '../Styling/LoginPage.css';
//import { TaskContext } from '../jsFiles/TaskContext';
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
        instance.loginRedirect(
            {
               scope: ["user.read"]
            });
        completeTask(1);
        navigate('/home');
       

    };

    return (
        <div className="login-container">
            <h1>Login Page</h1>
            <button className="login-button" onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginPage;*/
/*import React, { useContext } from 'react';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginRequest } from '../configFiles/msalConfig';
import { useTasks } from '../jsFiles/TaskContext';

const LoginPage = () => {
    const { instance } = useMsal();
    const navigate = useNavigate();
    const { completeTask, setUserId } = useTasks();

    const fetchUserId = async (accessToken) => {
        const graphResponse = await axios.get('https://graph.microsoft.com/v1.0/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return graphResponse.data.id;
    };

    const handleLogin = async () => {
        try {
            const loginResponse = await instance.loginPopup(loginRequest);
            const accessToken = loginResponse.accessToken;
            const userId = await fetchUserId(accessToken);
            setUserId(userId);
            completeTask(1); // Mark Task 1 as complete
            navigate('/home');
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="login-container">
            <h1>Login Page</h1>
            <button className="login-button" onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;
*/
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
                {/*<a href="https://www.canva.com/design/DAGJJw6x-A8/61eHq36BL-Xa8oHpnZL02A/view?utm_content=DAGJJw6x-A8&utm_campaign=designshare&utm_medium=embeds&utm_source=link" target="_blank" rel="noopener">Sign-up (Website)</a> by Adegoke Abisola*/}
            </div>
            <button className="login-button" onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginPage;


















