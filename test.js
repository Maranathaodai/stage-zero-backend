const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testEndpoint() {
  console.log('🧪 Testing Dynamic Profile Endpoint\n');
  
  try {
    // Test main endpoint
    console.log('1. Testing GET /me endpoint...');
    const response = await axios.get(`${BASE_URL}/me`);
    
    console.log('✅ Status Code:', response.status);
    console.log('✅ Content-Type:', response.headers['content-type']);
    console.log('✅ Response Body:');
    console.log(JSON.stringify(response.data, null, 2));
    
    // Validate response structure
    const data = response.data;
    const requiredFields = ['status', 'user', 'timestamp', 'fact'];
    const userFields = ['email', 'name', 'stack'];
    
    console.log('\n2. Validating response structure...');
    
    // Check required fields
    for (const field of requiredFields) {
      if (!data[field]) {
        console.log(`❌ Missing required field: ${field}`);
        return false;
      }
      console.log(`✅ Field '${field}' present`);
    }
    
    // Check user object fields
    for (const field of userFields) {
      if (!data.user[field]) {
        console.log(`❌ Missing user field: ${field}`);
        return false;
      }
      console.log(`✅ User field '${field}' present`);
    }
    
    // Validate timestamp format
    const timestampRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    if (!timestampRegex.test(data.timestamp)) {
      console.log('❌ Invalid timestamp format');
      return false;
    }
    console.log('✅ Timestamp format valid');
    
    // Validate status
    if (data.status !== 'success') {
      console.log('❌ Invalid status value');
      return false;
    }
    console.log('✅ Status value valid');
    
    console.log('\n3. Testing health endpoint...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check status:', healthResponse.status);
    console.log('✅ Health response:', JSON.stringify(healthResponse.data, null, 2));
    
    console.log('\n4. Testing multiple requests for dynamic behavior...');
    const requests = [];
    for (let i = 0; i < 3; i++) {
      requests.push(axios.get(`${BASE_URL}/me`));
    }
    
    const responses = await Promise.all(requests);
    const timestamps = responses.map(r => r.data.timestamp);
    const facts = responses.map(r => r.data.fact);
    
    // Check if timestamps are different (dynamic)
    const uniqueTimestamps = new Set(timestamps);
    if (uniqueTimestamps.size > 1) {
      console.log('✅ Timestamps are dynamic');
    } else {
      console.log('⚠️  Timestamps are identical (might be cached)');
    }
    
    // Check if facts are different
    const uniqueFacts = new Set(facts);
    if (uniqueFacts.size > 1) {
      console.log('✅ Cat facts are dynamic');
    } else {
      console.log('⚠️  Cat facts are identical (API might be cached)');
    }
    
    console.log('\n🎉 All tests passed! Your endpoint is working correctly.');
    return true;
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure the server is running:');
      console.log('   npm start');
      console.log('   or');
      console.log('   npm run dev');
    }
    
    return false;
  }
}

// Run tests
testEndpoint().then(success => {
  process.exit(success ? 0 : 1);
});
