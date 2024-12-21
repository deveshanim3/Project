import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBrEqEwOsto_MfwiSOSQTabZEU_LpysjoM",
    authDomain: "login-81612.firebaseapp.com",
    projectId: "login-81612",
    storageBucket: "login-81612.firebasestorage.app",
    messagingSenderId: "406935022931",
    appId: "1:406935022931:web:d7ab7152f53274db67c5a6",
    measurementId: "G-9PFLMNSHCS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const historyList = document.getElementById("historyList");

async function fetchHistory() {
    try {
        const querySnapshot = await getDocs(collection(db, "history"));
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                const historyItem = doc.data();
                const li = document.createElement("li");
                li.innerHTML = `
                    <strong>${historyItem.loanName}</strong><br>
                    Amount: $${historyItem.amount}<br>
                    Due Date: ${historyItem.dueDate}<br>
                    Annual Interest Rate: ${historyItem.annualInterestRate}%<br>
                    Tenure: ${historyItem.tenureYears} years<br>
                    Monthly EMI: $${historyItem.monthlyEMI}<br>
                    Total Payable: $${historyItem.totalPayable}
                `;
                historyList.appendChild(li);
            });
        } else {
            historyList.innerHTML = "<p>No loan history available.</p>";
        }
    } catch (error) {
        console.error("Error fetching history:", error);
    }
}

fetchHistory();
