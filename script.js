// script.js

const scriptURL = 'https://script.google.com/macros/s/AKfycbzJojTQb_phi-8NmAmZKTLFhK9O6g3_gwWML4UWX9ABLa8x4F4l6DrYIsVNfYWjByeW/exec'; // Replace with your Google Apps Script URL

async function submitForm(event) {
    event.preventDefault();

    console.log("Form submitted");

    const form = document.getElementById('contactForm');
    const formData = new FormData(form);

    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    console.log("Data to be sent:", data);

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            mode: 'no-cors' // Add this line to bypass CORS (with limited response handling)
        });
        

        console.log("Response received:", response);

        const result = await response.json();
        if (result.result === 'success') {
            alert('Message submitted successfully!');
            form.reset();
        } else {
            alert('Failed to submit. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}

