import TaskPage from '../jsFiles/TaskPage';
import AccesRequestPage from './accessRequestPage';
import { Link } from 'react-router-dom';
import '../Styling/Home.css';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const { accounts, inProgress } = useMsal();
    const navigate = useNavigate();
    if (accounts.length === 0 && !inProgress) {
        navigate('/');
    }

    return (
        <div className="home-container">
            <h2> Welcome {accounts[0].name} </h2>
            <div className="home-content"> 
                <TaskPage />
            </div>
            <div className="home-link">
                <Link to="/requestAccess" className="critical-tasks-link">
                    Click here to request for Accesses to perform Tasks
                </Link>
            </div>
        </div>
    );
}

export default Home;

