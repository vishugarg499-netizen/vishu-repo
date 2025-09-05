const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = [];

// Add a new transaction
function addTransaction(e) {
  e.preventDefault();
  if (!text.value || !amount.value) return alert('Please enter description and amount');

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();
  text.value = '';
  amount.value = '';
}

// Add transaction to UI
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
    ${transaction.text} <span>${sign}₹${Math.abs(transaction.amount).toFixed(2)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">×</button>
  `;
  list.appendChild(item);
}

// Update balance, income, expenses
function updateValues() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((a, t) => a + t, 0).toFixed(2);
  const income = amounts.filter(a => a > 0).reduce((a, t) => a + t, 0).toFixed(2);
  const expense = (amounts.filter(a => a < 0).reduce((a, t) => a + t, 0) * -1).toFixed(2);

  balance.innerText = total;
  money_plus.innerText = income;
  money_minus.innerText = expense;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  init();
}

// Initialize and render all transactions
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

form.addEventListener('submit', addTransaction);
init();

