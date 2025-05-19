const products = [
  { id: 1, name: "p1", price: 34 },
  { id: 2, name: "p2", price: 50 },
  { id: 3, name: "p3", price: 75 },
];

const cart = {};

const addToCart = (id) => {
  cart[id] = (cart[id] || 0) + 1; // Add or increment quantity
  dispCart(); // Show updated cart
};

const increment = (id) => {
  cart[id]++;
  dispCart();
};

const decrement = (id) => {
  if (cart[id] > 1) {
    cart[id]--;
  } else {
    delete cart[id]; // Remove item if quantity is 0
  }
  dispCart();
};

const dispCart = () => {
  let str = "<h2>Cart</h2>";
  products.map((value) => {
    if (cart[value.id]) {
      str += `<div>
        ${value.name} - ₹${value.price} 
        <button onclick='decrement(${value.id})'>-</button>
        ${cart[value.id]}
        <button onclick='increment(${value.id})'>+</button>
        = ₹${value.price * cart[value.id]}
      </div>`;
    }
  });
  str += `<h4 id='orderValue'></h4>`;
  root.innerHTML = str;
  dispOrderValue();
};

const dispOrderValue = () => {
  const grandTotal = products.reduce((sum, value) => {
    return sum + value.price * (cart[value.id] || 0);
  }, 0);
  orderValue.innerHTML = `Order Value: ₹${grandTotal}`;
};

const showProducts = () => {
  let str = "";
  products.map((value) => {
    str += `<div>
      <h3>${value.name}</h3>
      <h4>₹${value.price}</h4>
      <button onclick='addToCart(${value.id})'>Add to Cart</button>
    </div>`;
  });
  root.innerHTML = "<div class='row'>" + str + "</div>";
};
