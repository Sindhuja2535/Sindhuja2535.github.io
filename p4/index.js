const customers = [
  { cart: "1234567890", pin: "1234", name: "sindhuja", balance: 1000 },
  { cart: "1234567891", pin: "2345", name: "ishitha", balance: 1500 },
];

let currentUser = null;

document.querySelector("form").onsubmit = function (e) {
  e.preventDefault();
  const cartInput = document.getElementById("cart").value.trim();
  const pinInput = document.getElementById("pin").value.trim();

  const user = customers.find(
    (c) => c.cart === cartInput && c.pin === pinInput
  );

  if (user) {
    currentUser = user;
    showDashboard();
  } else {
    showInlineMessage("Invalid card or PIN", "red");
  }
};

function showDashboard() {
  document.body.innerHTML = `
    <h1 style="text-align:center;">Welcome, ${currentUser.name}!</h1>
    <p style="text-align:center;">Balance: ₹<span id="balance">${currentUser.balance}</span></p>
    <div style="text-align:center; margin-top: 20px;">
      <select id="action-select">
        <option value="">-- Select Action --</option>
        <option value="withdraw">Withdraw</option>
        <option value="deposit">Deposit</option>
        <option value="transfer">Fund Transfer</option>
      </select>
      <div id="action-form" style="margin-top:20px;"></div>
      <div id="message" style="margin-top:20px; font-weight:bold;"></div>
    </div>
  `;

  document.getElementById("action-select").onchange = handleAction;
}

function handleAction() {
  const selected = this.value;
  const formDiv = document.getElementById("action-form");

  if (selected === "withdraw" || selected === "deposit") {
    formDiv.innerHTML = `
      <input type="number" id="amount" placeholder="Enter amount" />
      <button onclick="${selected}()">Submit</button>
    `;
  } else if (selected === "transfer") {
    formDiv.innerHTML = `
      <input type="text" id="recipient" placeholder="Recipient Card Number" />
      <input type="number" id="amount" placeholder="Amount to transfer" />
      <button onclick="transfer()">Transfer</button>
    `;
  } else {
    formDiv.innerHTML = "";
  }
}

function withdraw() {
  const amt = parseFloat(document.getElementById("amount").value);
  if (amt > 0 && currentUser.balance >= amt) {
    currentUser.balance -= amt;
    updateBalance();
    showInlineMessage(`₹${amt} withdrawn successfully.`, "green");
  } else {
    showInlineMessage("Invalid or insufficient funds.", "red");
  }
}

function deposit() {
  const amt = parseFloat(document.getElementById("amount").value);
  if (amt > 0) {
    currentUser.balance += amt;
    updateBalance();
    showInlineMessage(`₹${amt} deposited successfully.`, "green");
  } else {
    showInlineMessage("Enter a valid amount.", "red");
  }
}

function transfer() {
  const toCard = document.getElementById("recipient").value.trim();
  const amt = parseFloat(document.getElementById("amount").value);
  const receiver = customers.find(c => c.cart === toCard);

  if (!receiver) {
    showInlineMessage("Recipient not found.", "red");
    return;
  }

  if (receiver.cart === currentUser.cart) {
    showInlineMessage("Cannot transfer to self.", "red");
    return;
  }

  if (amt > 0 && currentUser.balance >= amt) {
    currentUser.balance -= amt;
    receiver.balance += amt;
    updateBalance();
    showInlineMessage(`₹${amt} transferred to ${receiver.name}.`, "green");
  } else {
    showInlineMessage("Invalid amount or insufficient funds.", "red");
  }
}

function updateBalance() {
  document.getElementById("balance").textContent = currentUser.balance;
}

function showInlineMessage(text, color = "green") {
  const msgBox = document.getElementById("message");
  if (msgBox) {
    msgBox.textContent = text;
    msgBox.style.color = color;
  }
}
