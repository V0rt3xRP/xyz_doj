// script.js

const scriptURL = 'https://script.google.com/macros/s/AKfycbwhoZReGbKAexaG_toh1iYg7moEHcz4ZRiIfDgaosWVzBRkxWtNY_GkHM00f-KrXJi5/exec'; // Replace with your Google Apps Script URL

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
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

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
