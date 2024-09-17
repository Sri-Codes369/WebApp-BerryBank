import axios from 'axios';
import Cookies from 'js-cookie';

let lastActivityTime = new Date().getTime();

const extendTokenIfNeeded = async () => {
  const now = new Date().getTime();
  const timeSinceLastActivity = now - lastActivityTime;
// console.log(lastActivityTime);
// console.log(timeSinceLastActivity);
// console.log('--------------');



  // If the user has been active and the token is about to expire (within 1 minute)
  if (timeSinceLastActivity < 600000) { // User active within last 10 minutes
    try {
      const response = await axios.post('http://localhost:8080/api/extend-token',{},{withCredentials:true});
      
      if (response.status === 200) {
        console.log('Token extended successfully');
        // Optionally update your application state with the new token here
      }
    } catch (error) {
      console.error('Error extending token:', error);
      // Handle token refresh failure, possibly log out the user if necessary
    }
  }
};

// Track user interaction
const trackUserActivity = () => {
  window.addEventListener('mousemove', () => {
    lastActivityTime = new Date().getTime();
  });
  
  window.addEventListener('keydown', () => {
    lastActivityTime = new Date().getTime();
  });
};

// Initialize the service
const initializeTokenService = () => {
  trackUserActivity();
  
  // Periodically check for token extension
  setInterval(extendTokenIfNeeded, 60000); // Check every 1 minute
};

export default initializeTokenService;
