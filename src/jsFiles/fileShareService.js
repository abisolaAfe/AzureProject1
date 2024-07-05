
export const listFilesInDirectoryWithSAS = async (sasToken, directoryPath = '') => {
    const accountName = 'firststoragebezo';
    const shareName = 'firtdiary';

    // Remove leading and trailing slashes
    const sanitizedDirectoryPath = directoryPath.replace(/^\/+|\/+$/g, '');

    // Construct the URI
    const uri = `https://${accountName}.file.core.windows.net/${shareName}/${sanitizedDirectoryPath}?restype=directory&comp=list&${sasToken}`;

    console.log('Request URI:', uri);

    const response = await fetch(uri, {
        method: 'GET',
        headers: {
            'x-ms-version': '2020-02-10',
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Error fetching directory contents:', errorText);
        throw new Error(`Error fetching directory contents: ${response.statusText}`);
    }

    const data = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "application/xml");

    const entries = [];
    const results = xmlDoc.getElementsByTagName('Entries')[0];
    if (results) {
        const files = results.getElementsByTagName('File');
        for (let i = 0; i < files.length; i++) {
            const fileName = files[i].getElementsByTagName('Name')[0].textContent;
            if (fileName !== '.SystemShareInformation') {
                entries.push({
                    name: fileName,
                    type: 'File'
                });
            }
        }
        const directories = results.getElementsByTagName('Directory');
        for (let i = 0; i < directories.length; i++) {
            const directoryName = directories[i].getElementsByTagName('Name')[0].textContent;
            if (directoryName !== '.SystemShareInformation') {
                entries.push({
                    name: directoryName,
                    type: 'Directory'
                });
            }
        }
    }

    return entries;
};

export const getFileContentWithSAS = async (sasToken, filePath) => {
    const accountName = 'firststoragebezo';
    const shareName = 'firtdiary';
    const sanitizedFilePath = filePath.replace(/^\/+|\/+$/g, '');

    const uri = `https://${accountName}.file.core.windows.net/${shareName}/${sanitizedFilePath}?${sasToken}`;

    const response = await fetch(uri, {
        method: 'GET',
        headers: {
            'x-ms-version': '2020-02-10'
        }
    });

    if (!response.ok) {
        throw new Error(`Error fetching file content: ${response.statusText}`);
    }

    const content = await response.text();
    return content;
};






























