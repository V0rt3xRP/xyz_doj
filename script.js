// Replace with your actual Google Apps Script Web App URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbzJojTQb_phi-8NmAmZKTLFhK9O6g3_gwWML4UWX9ABLa8x4F4l6DrYIsVNfYWjByeW/exec';

async function submitForm(event) {
    event.preventDefault();

    const form = document.getElementById('contactForm');
    const formData = new FormData(form);

    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            mode: 'no-cors' // Bypasses CORS restrictions but limits response handling
        });

        // Since 'no-cors' mode limits access to the response, we won't be able to handle the response here.
        alert('Message submitted successfully!');
        form.reset();
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}
