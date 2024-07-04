import axios from 'axios';
import CryptoJS from 'crypto-js';

// Function to create a JWT token
const createJWTToken = (secret) => {
    const header = {
        alg: "HS256",
        typ: "JWT"
    };

    const payload = {
        user: 'user',
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // Token expiration time set to 1 hour
    };

    // Encode the header and payload to Base64URL
    const encodeBase64URL = (obj) => {
        return btoa(JSON.stringify(obj))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    };

    const encodedHeader = encodeBase64URL(header);
    const encodedPayload = encodeBase64URL(payload);

    // Create the signature using HMAC SHA-256
    const signature = CryptoJS.HmacSHA256(`${encodedHeader}.${encodedPayload}`, secret).toString(CryptoJS.enc.Base64)
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

    // Return the complete JWT
    return `${encodedHeader}.${encodedPayload}.${signature}`;
};

// Function to get the application token
const getAppToken2 = async () => {
    const jwtSecret = process.env.REACT_APP_JWT_SECRET; // Retrieve the JWT secret from the environment variables
    const jwtToken = createJWTToken(jwtSecret); // Create the JWT token

    try {
        const response = await axios.get('https://beezolalinkapp.azurewebsites.net/api/GetTokenFunction', {
            headers: {
                'Authorization': `Bearer ${jwtToken}` // Include JWT in the request headers
            }
        });

        if (response.status === 200) {
            const data = response.data;
            return data.accessToken; // Assuming the backend returns the token as { accessToken: 'token' }
        } else {
            throw new Error('Failed to retrieve token from backend');
        }
    } catch (error) {
        console.error("Error fetching app token from backend", error);
        throw new Error("Failed to acquire application access token from backend");
    }
};

export default getAppToken2;
