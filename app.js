// Import the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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

// Login functionality
window.login = async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Login Successful!");
    console.log("User logged in:", userCredential.user);
    window.location.href="home.html"
  } catch (error) {
    alert("Error: " + error.message);
  }
};

// Register functionality
window.register = async () => {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const name = document.getElementById("registerName").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: user.email 
    });

    alert("Registration Successful!");
    console.log("User registered:", userCredential.user);
    window.location.href = "home.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
};


// Show/hide forms
window.showLogin = () => {
  document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("registerForm").classList.add("hidden");
};

window.showRegister = () => {
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("registerForm").classList.remove("hidden");
};