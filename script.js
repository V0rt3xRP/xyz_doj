// Replace with your actual Google Apps Script Web App URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbzM4vezxbeHJhqA3lNA-SK_ykyCCndqGkL_wKs0mW-DbRInDl4MVgLqsR10VhPUxHc-/exec';

async function submitForm(event) {
    event.preventDefault();

    const form = document.getElementById('contactForm');
    const formData = new FormData(form);

    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'), // Added phone field
        message: formData.get('message')
    };

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            mode: 'no-cors'
        });

        alert('Message submitted successfully!');
        form.reset();
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}

