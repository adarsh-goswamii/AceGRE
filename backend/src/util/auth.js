const fetch = require('node-fetch');

const getGoogleUserData = async (token) => {
  try {
    // Verify the token by making a request to Google's userinfo endpoint
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return res.status(401).json({ message: 'Invalid Google token' });
    }

    const userInfo = await response.json();
    return userInfo;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getGoogleUserData
}