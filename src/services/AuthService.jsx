import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const AuthService = {
  // Method to fetch JWT from cookies
  getToken() {
    return Cookies.get('Auth_Token');
  },

  // Method to validate the token
  isValidToken() {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const decoded = jwtDecode(token);

      // Check if the token has expired
      const currentTime = Date.now() / 1000; // in seconds
      if (decoded.exp <= currentTime) {
        return false;
      }

      // Check if the payload has the expected structure
      if (
        typeof decoded.sub === 'string' &&
        Array.isArray(decoded.user) &&
        decoded.user.length > 0 &&
        Array.isArray(decoded.user[0]) &&
        decoded.user[0].length > 0 &&
        typeof decoded.user[0][0] === 'object'
      ) {
        return true;
      }

      return false;
    } catch (error) {
      console.error('Invalid Token:', error);
      return false;
    }
  },

  // Method to get user information from JWT
  getUserFromToken() {
    const token = this.getToken();

    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Return the user object if it matches the expected structure
        if (
          Array.isArray(decoded.user) &&
          decoded.user.length > 0 &&
          Array.isArray(decoded.user[0]) &&
          decoded.user[0].length > 0 &&
          typeof decoded.user[0][0] === 'object'
        ) {
          return decoded.user[0][0]; // Extract the user object
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
      }
    }

    return null;
  }
};

export default AuthService;
