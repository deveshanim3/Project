
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
  
        alert(document.getElementById("emiResult").textContent = emi.toFixed(2));
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
  
        alert(document.getElementById("loanResult").textContent = totalPayable.toFixed(2));
    });
  
document.getElementById('logout').addEventListener('click',()=>{
    alert("User logged out!")
    console.log("working!")
    window.location.href="index.html";
})