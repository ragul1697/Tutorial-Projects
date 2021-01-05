// Form Submit Event Listener
document.getElementById('loan-form').addEventListener('submit', function (e) {
  // Hide the results
  document.getElementById('results').style.display = 'none';
  // Show the loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate Results
function calculateResults() {
  // Input Values
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');

  // Result Display Values
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Computing Monthly Payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);


  // Displaying Results
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // Show the results
    document.getElementById('results').style.display = 'block';
    // Hide the loader
    document.getElementById('loading').style.display = 'none';
  }
  else {
    showError('Please check your numbers');
  }
}


function showError(error) {

  // Hide the results
  document.getElementById('results').style.display = 'none';
  // Hide the loader
  document.getElementById('loading').style.display = 'none';

  // Creating a Div
  const errorDiv = document.createElement('div');
  // Adding Bootstrap Classes
  errorDiv.className = 'alert alert-danger';
  // Append to Div
  errorDiv.appendChild(document.createTextNode(error));

  // Get the Parent Elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  // Display Error on top
  card.insertBefore(errorDiv, heading);

  // Clear Error after seconds
  setTimeout(clearError, 3000);
}

// Clearing Error
function clearError() {
  document.querySelector('.alert').remove();
}