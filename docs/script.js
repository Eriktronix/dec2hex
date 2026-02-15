// Grab references to HTML elements
const input = document.getElementById('decimalInput');  // Input field for decimal number
const btn = document.getElementById('convertBtn');      // Button to trigger conversion
const result = document.getElementById('result');       // Span to display the hexadecimal result

// Put your backend URL in a variable for easy updates

// const BACKEND_URL = 'https://fluffy-cod-4j6xr67r6wr3q496-5000.app.github.dev/convert'; //for android tablet
const BACKEND_URL = 'https://4wq4qb9v-5000.euw.devtunnels.ms/convert'; //for PC

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