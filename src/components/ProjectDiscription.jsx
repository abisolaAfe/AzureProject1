

import React from 'react';
import '../Styling/CloudTechnologyProject.css'; // Import the CSS file

const CloudTechnologyProject = () => {
    return (
        <div className="project-container">
            <h1 className="project-title">Cloud Technology Project</h1>
            <p className="project-description">
                The objective of this project is to showcase proficiency in utilizing a wide range of cloud resources while minimizing costs. The front end of the project employs a Static Web App, while the backend handles server-side operations with Azure Function. Automation of tasks is achieved using Azure Automation and Windows Task Scheduler via runbooks.
            </p>
            <h2 className="focus-areas-title">Areas of Focus</h2>
            <ul className="knowledge-list">
                <li>Cloud Computing</li>
                <li>Cloud Networking</li>
                <li>Cloud Security</li>
                <li>Cloud Storage</li>
                <li>Identity and Access Management (IAM)</li>
                <li>Backup</li>
                <li>Automation</li>
            </ul>
            <h2 className="tools-title">Tools</h2>
            <p className="tools-list">
                Azure Static Web App, Azure Function, Automation Account, GitHub, Blob Storage, File Share, Network Security Group (NSG), Bastion, Key Vault, Virtual Machine, Virtual Network and Subnets, Router/Route Table, Storage Sync Service, Windows Task Scheduler
            </p>
            <h2 className="languages-title">Languages</h2>
            <p className="languages-list">
                JavaScript, PowerShell Scripting, Node.js
            </p>
            <p className="project-summary">
                I am happy to further demonstrate my knowledge and passion for cloud technology requests.
            </p>
            <img
                src={`${process.env.PUBLIC_URL}/App design2.svg`}
                alt="Cloud Technology Project Diagram"
                className="project-image"
            />
        </div>
    );
};

export default CloudTechnologyProject;



