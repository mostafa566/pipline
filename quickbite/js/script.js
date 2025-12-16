// Food data
const foods = [
  { id: 1, name: "Burger", price: 5.99, image: "images/burger.jpg" },
  { id: 2, name: "Pizza", price: 8.99, image: "images/pizza.jpg" },
  { id: 3, name: "Sushi", price: 12.99, image: "images/sushi.jpg" }
];

// Load menu on index.html
if (document.getElementById("menu")) {
  const menuContainer = document.getElementById("menu");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Update cart count
  document.getElementById("cart-count").innerText = cart.length;

  foods.forEach(food => {
    const card = document.createElement("div");
    card.classList.add("food-card");
    card.innerHTML = `
      <img src="${food.image}" alt="${food.name}">
      <h3>${food.name}</h3>
      <p>$${food.price.toFixed(2)}</p>
      <button onclick="addToCart(${food.id})">Add to Cart</button>
    `;
    menuContainer.appendChild(card);
  });
}

function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const food = foods.find(f => f.id === id);
  cart.push(food);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${food.name} added to cart`);
  if (document.getElementById("cart-count")) {
    document.getElementById("cart-count").innerText = cart.length;
  }
}

// Load cart on cart.html
if (document.getElementById("cart-items")) {
  const cartContainer = document.getElementById("cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name} - $${item.price.toFixed(2)}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartContainer.appendChild(div);
    total += item.price;
  });

  document.getElementById("total-price").innerText = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
