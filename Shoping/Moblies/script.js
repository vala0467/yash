// import {addToCart}from '../Test1.js';
const moblies = [
  {
    name: " Samsung Galaxy S25 Ultra  ",
    Image:
      "https://m.media-amazon.com/images/I/71-d7XDbhIL._UF1000,1000_QL80_.jpg ",
    price: 117999,
  },
   {
    name: " Xiaomi 15 Ultra  ",
    Image:
      " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSZ0XpE00tVRfovtQVanyoise8QE_DGnke6g&s",
    price: 109999,
  },
   {
    name: " vivo X200 Pro  ",
    Image:
      " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVJZdk47iNwceELRkNBXWLz8NAHfyf1shWCw&s ",
    price: 87980,
  },
   {
    name: "  OPPO Find X8 Pro ",
    Image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTW_K_oH2ntv5-KXl6J_yBZEpugvJgH6kACw&s ",
    price:  85000,
  },
   {
    name: " Apple iPhone 16 Pro Max  ",
    Image:
      " https://www.designinfo.in/wp-content/uploads/2024/09/Apple-iPhone-16-Pro-128GB-Natural-Titanium-6.webp ",
    price: 133900,
  },
   {
    name: " OnePlus 13  ",
    Image:
      " https://image01-in.oneplus.net/media/202412/17/052a246708df8233d079b3502aeeb327.png ",
    price: 67997,
  },
   {
    name: " Motorola Razr 50 Ultra  ",
    Image:
      " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHUkVDdu-02CzPgU5m_dor-aYmG1lo2Qanpw&s ",
    price: 99998,
  },
   {
    name: " Samsung Galaxy S25 Edge ",
    Image:
      " https://m.media-amazon.com/images/I/71l8KLPYmWL._UF1000,1000_QL80_.jpg ",
    price: 104999,
  },
   {
    name: " Samsung Galaxy S25   ",
    Image:
      " https://images.samsung.com/is/image/samsung/p6pim/in/ps_2504/gallery/in-galaxy-s25-s937-sm-s937bzscins-thumb-546082704  ",
    price:  80999,
  },
   {
    name: " Google Pixel 9 Pro  ",
    Image:
      " https://i.guim.co.uk/img/media/2f6082f5edb313aa955a3df84e140f9854b4274e/84_124_5168_3100/master/5168.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=32695a12c90e0cf21712e2ffafa24c39 ",
    price: 99999,
  },
   {
    name: " iQOO 13 ",
    Image:
      " https://m.media-amazon.com/images/I/51jAxBrJCtL.jpg ",
    price: 55990 ,
  },
   {
    name: "  	POCO F7 ",
    Image:
      " https://fdn.gsmarena.com/imgroot/news/25/06/poco-f7-specs-leak/popup/-x372/gsmarena_005.jpg ",
    price: 31999,
  },
];
//import { addToCart, LoadCart } from '../Test1.js  '; // adjust path as needed

// import addToCart from "../homeScript";
const cart = {};

const productGrid = document.getElementById("productGrid");
const cartSection = document.getElementById("cartSection");

function renderProducts() {
  moblies.forEach(( moblie, index) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = moblie.Image;
    img.alt = moblie.name;

    const name = document.createElement("div");
    name.className = "product-name";
    name.textContent = moblie.name;

    const price = document.createElement("div");
    price.className = "product-price";
    price.textContent = `₹${moblie.price}`;

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
        cart[moblie.name] = {
          ...moblie,
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
