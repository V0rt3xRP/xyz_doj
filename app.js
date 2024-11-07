// Firebase configuration (replace with your actual Firebase config values)
const firebaseConfig = {
    apiKey: "AIzaSyD7GGnzUOhzdtfkG4On1CY3ACa4rMF1Xag",
    authDomain: "doj-forums.firebaseapp.com",
    projectId: "doj-forums",
    storageBucket: "doj-forums.firebasestorage.app",
    messagingSenderId: "160810119528",
    appId: "1:160810119528:web:2684720d62260ee38de6dd",
    measurementId: "G-VBZ4TF80YB"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Update the login/logout button based on login status
auth.onAuthStateChanged((user) => {
    const authButton = document.getElementById("authButton");
    if (user) {
        authButton.textContent = "Logout";
    } else {
        authButton.textContent = "Login";
    }
});

// Handle login/logout button click
function handleAuthButtonClick() {
    const user = auth.currentUser;
    if (user) {
        // If the user is logged in, log them out
        auth.signOut().then(() => {
            alert("You have been logged out.");
            window.location.href = "index.html";
        });
    } else {
        // If the user is not logged in, redirect to the login page
        window.location.href = "login.html";
    }
}

// Login function for login.html
async function login(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Retrieve custom claims (role) for the user
        const token = await user.getIdTokenResult();
        const role = token.claims.role;

        // Redirect based on role
        if (role === "pd") {
            window.location.href = "pd-dashboard.html";
        } else if (role === "dmv") {
            window.location.href = "dmv-dashboard.html";
        } else {
            messageDiv.innerText = "Unauthorized access.";
            auth.signOut();
        }
    } catch (error) {
        console.error("Error logging in:", error);
        messageDiv.innerText = "Login failed: " + error.message;
    }
}


// Form submission (replace scriptURL with your Google Apps Script URL)
const scriptURL = 'https://script.google.com/macros/s/AKfycbzM4vezxbeHJhqA3lNA-SK_ykyCCndqGkL_wKs0mW-DbRInDl4MVgLqsR10VhPUxHc-/exec';

async function submitForm(event) {
    event.preventDefault();

    const form = document.getElementById('contactForm');
    const formData = new FormData(form);

    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
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


