import PowerOnVM from "../jsFiles/powerOnVm";
import BastionConnectButton from './connectWithBastion';
import AssignAzureRoleButton from './assignAzureRole';
import RoleAssignmentButton from './RoleAssignmentButton';
import '../Styling/AccesRequestPage.css';



export default function AccesRequestPage() {
    return (
        <div className="access-request-container">
            <h2>Access Request Page</h2>
            <div className="request-item">
                <p>Request for roles required to update Artifact description</p>
                <RoleAssignmentButton />
            </div>
            <div className="request-item">
                <p>Send request for roles required to use Virtual Machine</p>
                <AssignAzureRoleButton />
            </div>
            <div className="request-item">
                <p>Power on Virtual Machine</p>
                <PowerOnVM />
            </div>
            <div className="request-item">
                <p>Click on button to connect to VM via Bastion</p>
                <BastionConnectButton />
            </div>
        </div>
    );
}