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
const db = firebase.firestore();

// Load posts from Firestore and display them
async function loadPosts() {
    const postContainer = document.getElementById('postContainer');

    // Check if postContainer exists to avoid the "null" error
    if (!postContainer) {
        console.error("postContainer element not found in the DOM.");
        return;
    }

    postContainer.innerHTML = ''; // Clear any existing content

    try {
        const snapshot = await db.collection('posts').orderBy('date', 'desc').get();

        // Check if the collection is empty
        if (snapshot.empty) {
            postContainer.innerHTML = '<p>No posts found.</p>';
            return;
        }

        snapshot.forEach(doc => {
            const post = doc.data();
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <small>${post.date?.toDate().toLocaleDateString()}</small>
            `;
            postContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error("Error loading posts:", error);
        postContainer.innerHTML = '<p>Failed to load posts. Check console for details.</p>';
    }
}

// Login and role-based redirection for login.html
async function login(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Force a token refresh to get the latest custom claims
        await user.getIdToken(true);

        // Retrieve custom claims (role) for the user
        const token = await user.getIdTokenResult();
        const role = token.claims.role;

        console.log("User role:", role); // Debugging line

        if (role === "pd") {
            window.location.href = "pd-dashboard.html";
        } else if (role === "dmv") {
            window.location.href = "dmv-dashboard.html";
        } else if (role === "admin") {
            window.location.href = "admin.html";
        } else {
            messageDiv.innerText = "Unauthorized access.";
            auth.signOut();
        }
    } catch (error) {
        console.error("Error logging in:", error);
        messageDiv.innerText = "Login failed: " + error.message;
    }
}

// Handle authentication button click for login/logout
function handleAuthButtonClick() {
    const user = auth.currentUser;
    if (user) {
        auth.signOut().then(() => {
            alert("You have been logged out.");
            window.location.href = "index.html";
        }).catch(error => {
            console.error("Error logging out:", error);
        });
    } else {
        window.location.href = "login.html";
    }
}


