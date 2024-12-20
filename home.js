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
        document.getElementById("username").textContent = userData.name; 
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

document.addEventListener("DOMContentLoaded", () => {

  // EMI Calculation functionality
  document.getElementById("calculateEmi").addEventListener("click", () => {
      const principal = parseFloat(document.getElementById("principal").value);
      const rate = parseFloat(document.getElementById("rate").value) / 12 / 100; 
      const time = parseFloat(document.getElementById("time").value) * 12;

      if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal <= 0 || rate <= 0 || time <= 0) {
          alert("Please enter valid values for all fields.");
          return;
      }

      // EMI formula: [P x R x (1+R)^N] / [(1+R)^N-1]
      const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);

      document.getElementById("emiResult").textContent = emi.toFixed(2);
  });

  // Loan Calculation functionality
  document.getElementById("calculateLoan").addEventListener("click", () => {
      const totalLoan = parseFloat(document.getElementById("totalLoan").value);
      const interestRate = parseFloat(document.getElementById("interest").value) / 100;
      const duration = parseFloat(document.getElementById("duration").value);

      if (isNaN(totalLoan) || isNaN(interestRate) || isNaN(duration) || totalLoan <= 0 || interestRate <= 0 || duration <= 0) {
          alert("Please enter valid values for all fields.");
          return;
      }

      // Total payable formula: Principal + (Principal x Rate x Time)
      const totalPayable = totalLoan + (totalLoan * interestRate * duration);

      document.getElementById("loanResult").textContent = totalPayable.toFixed(2);
  });

  // Loan Reminder functionality
  document.getElementById("setReminder").addEventListener("click", () => {
      const reminderDate = document.getElementById("reminderDate").value;

      if (!reminderDate) {
          alert("Please select a valid date.");
          return;
      }

      const reminderMessage = `Reminder set for ${new Date(reminderDate).toLocaleDateString()}.`;
      document.getElementById("reminderMessage").textContent = reminderMessage;
      alert(reminderMessage);
  });
});