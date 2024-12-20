// Import the necessary Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrEqEwOsto_MfwiSOSQTabZEU_LpysjoM",
  authDomain: "login-81612.firebaseapp.com",
  projectId: "login-81612",
  storageBucket: "login-81612.firebasestorage.app",
  messagingSenderId: "406935022931",
  appId: "1:406935022931:web:d7ab7152f53274db67c5a6",
  measurementId: "G-9PFLMNSHCS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        document.getElementById("username").textContent = userData.name;  // Display the name in the span
      } else {
        console.log("No user data found in Firestore");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  } else {
    console.log("No user is logged in");
  }
});

// Logout functionality
document.getElementById('logout').addEventListener('click', () => {
  alert('User logged out!');
  window.location.href = 'index.html'; 
});
