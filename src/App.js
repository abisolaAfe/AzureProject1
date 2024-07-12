
//import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadFilePage from './components/UploadFilePage';
import LoginPage from './components/loginPage.js';
import LogoutModal from './components/LogoutButton';
import NavBar from './components/navBar';
import Home from './components/Home';
import BlobList from './jsFiles/Bloblist';
//import { useIsAuthenticated } from '@azure/msal-react';
import TaskPage from "./jsFiles/TaskPage";  // Import the TaskPage
import { TaskProvider } from "./jsFiles/TaskContext";
import ProtectedRoute, { PublicRoute } from './configFiles/ProtectedRoute'; // Import the ProtectedRoute
import AssignAzureRoleButton from './components/assignAzureRole';
import AccesRequestPage from './components/accessRequestPage';
import FileShareViewer from './components/FileShareViewer'
import CloudTechnologyProject from './components/ProjectDiscription';
import BastionConnectInfo from './components/BastionConnectInfo';



const Pages = () => {
    //const IsAuthenticated = useIsAuthenticated();
    return (
        <Routes>
            <Route path="/" element={<PublicRoute> <LoginPage /></PublicRoute>} />
            <Route path="/description" element={ <CloudTechnologyProject />} />
            <Route
                path="/upload"
                element={
                    <ProtectedRoute>
                        <UploadFilePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/fileViews"
                element={
                    <ProtectedRoute>
                        <FileShareViewer />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/bastionConnect"
                element={
                    <ProtectedRoute>
                        <BastionConnectInfo />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/logout"
                element={
                    <ProtectedRoute>
                        <LogoutModal />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/requestAccess"
                element={
                    <ProtectedRoute>
                        <AccesRequestPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            /> 
            <Route
                path="/blobs"
                element={
                    <ProtectedRoute>
                        <BlobList />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/tasks"
                element={
                    <ProtectedRoute>
                        <TaskPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/assign-role"
                element={
                    <ProtectedRoute>
                        <AssignAzureRoleButton />
                    </ProtectedRoute>
                } />
        </Routes>
    );
};

function App() {
    return (
        <TaskProvider>
            <NavBar />
            <Pages />
         
        </TaskProvider>
    );
}

export default App;
