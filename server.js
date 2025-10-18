const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuration
const CAT_FACTS_API_URL = 'https://catfact.ninja/fact';
const API_TIMEOUT = 5000; // 5 seconds timeout


const PROFILE_INFO = {
  email: process.env.USER_EMAIL || 'maranathaokeleyodai@gmail.com',
  name: process.env.USER_NAME || 'Maranatha Okeley Odai',
  stack: process.env.USER_STACK || 'Node.js/Express'
};

// Function to fetch cat fact from external API
async function fetchCatFact() {
  try {
    const response = await axios.get(CAT_FACTS_API_URL, {
      timeout: API_TIMEOUT,
      headers: {
        'User-Agent': 'Dynamic-Profile-Endpoint/1.0'
      }
    });
    
    return response.data.fact;
  } catch (error) {
    console.error('Error fetching cat fact:', error.message);
    
    // Return fallback message if API fails
    const fallbackFacts = [
      "Cats have been companions to humans for over 9,000 years.",
      "A group of cats is called a 'clowder'.",
      "Cats spend 70% of their lives sleeping.",
      "A cat's purr vibrates at a frequency that helps heal bones.",
      "Cats have a third eyelid called a nictitating membrane."
    ];
    
    return fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
  }
}

// Function to get current UTC timestamp in ISO 8601 format
function getCurrentTimestamp() {
  return new Date().toISOString();
}

// GET /me endpoint
app.get('/me', async (req, res) => {
  try {
    console.log(`[${getCurrentTimestamp()}] GET /me - Request received`);
    
    // Fetch cat fact
    const catFact = await fetchCatFact();
    
    // Prepare response
    const response = {
      status: "success",
      user: {
        email: PROFILE_INFO.email,
        name: PROFILE_INFO.name,
        stack: PROFILE_INFO.stack
      },
      timestamp: getCurrentTimestamp(),
      fact: catFact
    };
    
    console.log(`[${getCurrentTimestamp()}] GET /me - Response sent successfully`);
    
    res.status(200).json(response);
  } catch (error) {
    console.error(`[${getCurrentTimestamp()}] GET /me - Error:`, error.message);
    
    // Return error response
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      timestamp: getCurrentTimestamp()
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: getCurrentTimestamp(),
    uptime: process.uptime()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: "Dynamic Profile Endpoint API",
    endpoints: {
      "/me": "GET - Returns profile information with cat fact",
      "/health": "GET - Health check endpoint"
    },
    timestamp: getCurrentTimestamp()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint not found",
    timestamp: getCurrentTimestamp()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(`[${getCurrentTimestamp()}] Unhandled error:`, error);
  
  res.status(500).json({
    status: "error",
    message: "Internal server error",
    timestamp: getCurrentTimestamp()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Profile endpoint: http://localhost:${PORT}/me`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`⏰ Started at: ${getCurrentTimestamp()}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});
