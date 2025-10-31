const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '5stokqgl',
  dataset: 'production',
  apiVersion: '2025-01-23',
  useCdn: true,
  token: 'sk2ffh2oa4FBSI4QQTGzoQcgdYPW13HFCUZHAOwuAPEktYrgIJ4rWBxYORZv1r0vNZGxqnZUaS61m54kqMrkd3zASooge8wXZNHMsX0OANztfl2ar5GyUmVcxo1pYHIC0c7Q0IroSRnJohWvxEF3jQc3BvP91PCrE5S0FSZWVerlX72Ltcft'
});

async function testSanity() {
  try {
    console.log('Testing Sanity API...');
    
    // Test 1: Check if we can connect
    const products = await client.fetch('*[_type == "product"]');
    console.log('Products found:', products.length);
    console.log('Products:', products);
    
    // Test 2: Check specific fields
    const productNames = await client.fetch('*[_type == "product"]{name, price, category}');
    console.log('Product names:', productNames);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testSanity(); 