
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useTasks } from '../jsFiles/TaskContext';
import getAppToken2 from '../jsFiles/getAppToken2'; // Adjust the path as needed

const subscriptionId = process.env.REACT_APP_SUBSCRIPTION_ID;
const resourceGroupName = 'CloudProject';
const vmName = 'infinite';
const bastionUrl = process.env.REACT_APP_BASTION_URL;

const BastionConnect = () => {
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const { completeTask } = useTasks();

    const fetchVmStatus = async () => {
        setLoading(true);
        setStatus('');
        try {
            const appToken = await getAppToken2();
            const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${vmName}/InstanceView?api-version=2021-07-01`;

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${appToken}`,
                    'Content-Type': 'application/json',
                },
            });

            const vmStatus = response.data.statuses.find(status => status.code.includes('PowerState'));
            setStatus(vmStatus.displayStatus);
        } catch (error) {
            console.error('Error fetching VM status:', error);
            setStatus('Error fetching status');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (status === 'VM running') {
            window.open(bastionUrl, '_blank');
        }
    }, [status]);

    const handleButtonClick = () => {
        fetchVmStatus();
        completeTask(7);
    };

    return (
        <div>
            
            <Button variant="contained" color="primary" onClick={handleButtonClick}>
                Check VM Status
            </Button>
            {loading ? (
                <CircularProgress />
            ) : (
                status && <p>Status: {status}</p>
            )}
        </div>
    );
};

export default BastionConnect;















