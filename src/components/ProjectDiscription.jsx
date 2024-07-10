

import React from 'react';
import '../Styling/CloudTechnologyProject.css'; // Import the CSS file

const CloudTechnologyProject = () => {
    return (
        <div className="project-container">
            <h1 className="project-title">Cloud Technology Project</h1>
            <p className="project-description">This project demonstrated knowledge of:</p>
            <ul className="knowledge-list">
                <li>Cloud computing</li>
                <li>Cloud Networking</li>
                <li>Cloud Security</li>
                <li>Cloud storage</li>
                <li>Identity and Access Management</li>
                <li>Automation</li>
            </ul>
            <p className="project-summary">I am happy to further demonstrate my knowledge and passion for cloud technology requests.</p>
            
            <img
                src={`${process.env.PUBLIC_URL}/App design2.svg`}
                alt="Cloud Technology Project Diagram"
                className="project-image"
            />
        </div>
    );
};

export default CloudTechnologyProject;



