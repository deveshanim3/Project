// Import the necessary Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import {collection, addDoc, onSnapshot, deleteDoc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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

const addReminderBtn = document.getElementById("addReminder");
addReminderBtn.addEventListener("click", async () => {
    const loanName = document.getElementById("loanName").value;
    const amount = document.getElementById("amount").value;
    const dueDate = document.getElementById("dueDate").value;

    if (loanName && amount && dueDate) {
        try {
            await addDoc(collection(db, "reminders"), {
                loanName,
                amount,
                dueDate,
            });
            alert("Reminder added successfully!");
        } catch (error) {
            console.error("Error adding reminder:", error);
        }
    } else {
        alert("Please fill all fields!");
    }
});

// Display Reminders in Real Time
const reminderList = document.getElementById("reminderList");
onSnapshot(collection(db, "reminders"), (snapshot) => {
    reminderList.innerHTML = "";
    snapshot.forEach((doc) => {
        const reminder = doc.data();
        const li = document.createElement("li");
        li.innerHTML = `
            ${reminder.loanName} - $${reminder.amount} - Due: ${reminder.dueDate} 
            <button data-id="${doc.id}" class="deleteReminder">Mark as Paid</button>
        `;
        reminderList.appendChild(li);
    });

    // Attach event listeners to delete buttons
    document.querySelectorAll(".deleteReminder").forEach((button) => {
        button.addEventListener("click", async (e) => {
            const id = e.target.getAttribute("data-id");
            try {
                await deleteDoc(doc(db, "reminders", id));
                alert("Reminder marked as paid!");
            } catch (error) {
                console.error("Error deleting reminder:", error);
            }
        });
    });
});

