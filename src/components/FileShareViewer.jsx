/*
import { listFilesInDirectoryWithSAS, getFileContentWithSAS } from '../jsFiles/fileShareService';
import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { azureManagementRequest } from '../configFiles/msalConfig';
import FileContentViewer from './FileContentViewer'; // Import the FileContentViewer component
import '../Styling/FileShareViewer.css'; // Import the CSS file

const FileShareViewer = ({ directoryPath = '', isTopLevel = true }) => {
    const { instance, accounts } = useMsal();
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const [selectedFileContent, setSelectedFileContent] = useState('');

    const fetchFiles = async () => {
        if (accounts.length > 0) {
            try {
                const sasToken = 'sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-08-10T20:07:13Z&st=2024-06-17T12:07:13Z&spr=https,http&sig=camCwOf5g8uMlKLA84ga5hSR0CBqgeAHYoLYLwqWae8%3D';
                const filesList = await listFilesInDirectoryWithSAS(sasToken, directoryPath);
                setFiles(filesList);
            } catch (error) {
                console.error('Error fetching files:', error);
                setError('Error fetching files');
            }
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [accounts, directoryPath]);

    const handleFileClick = async (file) => {
        if (file.type === 'File') {
            try {
                const sasToken = 'sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-08-10T20:07:13Z&st=2024-06-17T12:07:13Z&spr=https,http&sig=camCwOf5g8uMlKLA84ga5hSR0CBqgeAHYoLYLwqWae8%3D';
                const content = await getFileContentWithSAS(sasToken, `${directoryPath}/${file.name}`);
                setSelectedFileContent(content);
            } catch (error) {
                console.error('Error fetching file content:', error);
                setError('Error fetching file content');
            }
        }
    };

    return (
        <div className="file-share-viewer-container">
            <div className="file-share-viewer">
                {isTopLevel && <h2>File Share Viewer</h2>}
                {error && <p>{error}</p>}
                <ul>
                    {files.map((file) => (
                        <li key={file.name}>
                            {file.type === 'Directory' ? (
                                <details>
                                    <summary>{file.name}</summary>
                                    <FileShareViewer directoryPath={`${directoryPath}/${file.name}`} isTopLevel={false} />
                                </details>
                            ) : (
                                <a href="#" onClick={() => handleFileClick(file)}>
                                    {file.name}
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <FileContentViewer content={selectedFileContent} />
        </div>
    );
};

export default FileShareViewer;
*/

import { listFilesInDirectoryWithSAS, getFileContentWithSAS } from '../jsFiles/fileShareService';
import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import '../Styling/FileShareViewer.css';
const SAS = process.env.SAS_TOKEN;
const FileShareViewer = ({ directoryPath = '', isTopLevel = true }) => {
    const { instance, accounts } = useMsal();
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const [selectedFileContent, setSelectedFileContent] = useState('Select a file to view its content');
   
    const fetchFiles = async () => {
        if (accounts.length > 0) {
            try {
                const sasToken = process.env.REACT_APP_SAS_TOKEN;
                console.log(SAS);
                const filesList = await listFilesInDirectoryWithSAS(sasToken, directoryPath);
                setFiles(filesList);
            } catch (error) {
                console.error('Error fetching files:', error);
                setError('Error fetching files');
            }
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [accounts, directoryPath]);

    const handleFileClick = async (file) => {
        if (file.type === 'File') {
            try {
                const sasToken = process.env.REACT_APP_SAS_TOKEN;
                const content = await getFileContentWithSAS(sasToken, `${directoryPath}/${file.name}`);
                setSelectedFileContent(content);
            } catch (error) {
                console.error('Error fetching file content:', error);
                setError('Error fetching file content');
            }
        }
    };

    return (
        <div className="file-share-viewer-container">
            <div className="file-share-viewer">
                {isTopLevel && <h2>File Share Viewer</h2>}
                {error && <p>{error}</p>}
                <ul>
                    {files.map((file) => (
                        <li key={file.name}>
                            {file.type === 'Directory' ? (
                                <details>
                                    <summary>{file.name}</summary>
                                    <FileShareViewer directoryPath={`${directoryPath}/${file.name}`} isTopLevel={false} />
                                </details>
                            ) : (
                                <a href="#" onClick={() => handleFileClick(file)}>
                                    {file.name}
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="file-content-viewer">
                <pre>{selectedFileContent}</pre>
            </div>
        </div>
    );
};

export default FileShareViewer;




























