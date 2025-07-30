// import {addToCart}from '../Test1.js';
const dresses = [
  {
    name: " Samsung Galaxy S25 Ultra  ",
    Image:
      "https://m.media-amazon.com/images/I/71-d7XDbhIL._UF1000,1000_QL80_.jpg ",
    price: 117999,
  },
   
];
//import { addToCart, LoadCart } from '../Test1.js  '; // adjust path as needed

// import addToCart from "../homeScript";
const cart = {};

const productGrid = document.getElementById("productGrid");
const cartSection = document.getElementById("cartSection");

function renderProducts() {
  dresses.forEach((dress, index) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = dress.Image;
    img.alt = dress.name;

    const name = document.createElement("div");
    name.className = "product-name";
    name.textContent = dress.name;

    const price = document.createElement("div");
    price.className = "product-price";
    price.textContent = `₹${dress.price}`;

    const qtyLabel = document.createElement("div");
    qtyLabel.textContent = "Qty: ";

    const qtySpan = document.createElement("span");
    qtySpan.textContent = "0";
    qtySpan.id = `qty-${index}`;
 const incBtn = document.createElement("button");
    incBtn.textContent = "+";
    incBtn.onclick = () => {
      qtySpan.textContent = parseInt(qtySpan.textContent) + 1;
    };
    

    const decBtn = document.createElement("button");
    decBtn.textContent = "-";
    decBtn.onclick = () => {
      if (parseInt(qtySpan.textContent) > 0) {
        qtySpan.textContent = parseInt(qtySpan.textContent) - 1;
      }
    };
 
    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to Cart";
    // addToCartBtn.addEventListener("click", addToCart);
    addToCartBtn.onclick = () => {
      const qty = parseInt(qtySpan.textContent);
      if (qty > 0) {
        cart[dress.name] = {
          ...dress,
          quantity: qty,
        };
        addToCart();
        //import { addToCart } from './Test2.js';
        renderCart();
      } else {
        alert("Quantity must be greater than 0 to add to cart.");
      }
    };
      // ❤️ Heart Icon
      const heart = document.createElement("i");
      heart.className = "bi bi-heart heart-icon";
      heart.onclick = () => {
        heart.classList.toggle("bi-heart-fill");
        heart.classList.toggle("bi-heart");
      };


    qtyLabel.appendChild(decBtn);
    qtyLabel.appendChild(qtySpan);
    qtyLabel.appendChild(incBtn);
    
    card.appendChild(heart);
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(qtyLabel);
    card.appendChild(addToCartBtn);
    productGrid.appendChild(card);
  });
}

function renderCart() {
  cartSection.innerHTML = "";
  let total = 0;
  for (const item in cart) {
    const cartItem = cart[item];
    const div = document.createElement("div");
    div.className = "cart-item";
    div.textContent = `${cartItem.name} - Qty: ${cartItem.quantity} - ₹${
      cartItem.quantity * cartItem.price
    }`;
    total += cartItem.quantity * cartItem.price;
    cartSection.appendChild(div);
  }

  const totalDiv = document.createElement("div");
  totalDiv.className = "cart-total";
  totalDiv.textContent = `Total Amount: ₹${total}`;
  cartSection.appendChild(totalDiv);
}

// Initialize
//import { addToCart } from './Test2.js'; // ✅ Adjust path based on folder structure
let count = localStorage.getItem("cartCount");
let addToCart = () => {
  //"increment cart value"
  count++;
  // updateDisplay();
  localStorage.setItem("cartCount", count);
};

renderProducts();
