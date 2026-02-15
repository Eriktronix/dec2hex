// Grab references to HTML elements
const input = document.getElementById('decimalInput');  // Input field for decimal number
const btn = document.getElementById('convertBtn');      // Button to trigger conversion
const result = document.getElementById('result');       // Span to display the hexadecimal result

// Backend endpoint:
// 1) Set PROD_API_URL to your HTTPS tunnel URL (used by GitHub Pages).
// 2) Use ?api=https://host/convert to override at runtime.
// 3) If PROD_API_URL is blank, fallback to local Flask server.
const PROD_API_URL = 'https://4wq4qb9v-5000.euw.devtunnels.ms/convert'; // Example: 'https://abcd-5000.euw.devtunnels.ms/convert'
const apiOverride = new URLSearchParams(window.location.search).get('api');
const BACKEND_URL = apiOverride || PROD_API_URL || 'http://127.0.0.1:5000/convert';

// Add a click event listener to the button
btn.addEventListener('click', async () => {
    const number = input.value;                         // Get the value from input
    if (!number) return alert("Skriv ett tal!");       // Alert if input is empty

    try {
        // Send a POST request to the backend
        const response = await fetch(BACKEND_URL, {
            method: 'POST',                               // Use POST method
            headers: {'Content-Type': 'application/json'}, // Send JSON
            body: JSON.stringify({number})               // JSON payload: {"number": 42}
        });

        const data = await response.json();             // Parse JSON response

        // Display the result or an error message
        if (data.hex) result.textContent = data.hex;   // Show hex if conversion succeeded
        else result.textContent = "Fel: Ogiltigt tal"; // Show backend error
    } catch (err) {
        // Handle network errors or unreachable backend
        result.textContent = "Fel vid anslutning";
    }
});
