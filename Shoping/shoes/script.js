// import {addToCart}from '../Test1.js';
const dresses = [
  {
    name: " Nike Air Max ",
    Image:
      "https://www.shutterstock.com/image-photo/nike-air-max-transparent-sole-600w-2484672877.jpg  ",
    price: 2440,
  },
  {
    name: "Adidas Ultraboost  ",
    Image:
      " https://www.shutterstock.com/image-photo/brazil-june-6-2024-adidas-260nw-2472094571.jpg ",
    price: 3599,
  },
  {
    name: "Puma RS-X ",
    Image:
      " https://assets.ajio.com/medias/sys_master/root/20240612/2RDu/666aa7f76f60443f310d963a/-473Wx593H-469582489-black-MODEL.jpg ",
    price: 8499,
  },
  {
    name: "Reebok Classic Leather ",
    Image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQiMNzy6bSJ1C8lI8NNecTiYrgX9b69GA-33SswhGXbFC1Nk8ET-RoX7lcvmtr3P-b_L7cvQtGNjVk9RgTkOmPcefQ5dNwmoK5HgG6mGisPQcTvGrdcC17Ntg",
    price: 1349,
  },
  {
    name: "Skechers D'Lites  ",
    Image:
      " https://www.skechers.in/on/demandware.static/-/Sites-skechers_india/default/dw6c338258/images/large/193642271676-1.jpg ",
    price: 2500,
  },
  {
    name: " Converse Chuck Taylor All Star ",
    Image:
      "https://www.converse.in/media/catalog/product/a/0/a08527c_a_107x1.jpg?auto=webp&format=pjpg&width=640&height=800&fit=cover  ",
    price: 2800,
  },
  {
    name: " Vans Old Skool ",
    Image:
      " https://img.freepik.com/premium-vector/shoes-vans-old-skool-shoe-vector-image-illustration_776624-54.jpg ",
    price: 4590,
  },
  {
    name: "Gucci Ace Sneakers  ",
    Image:
      " https://assets.levelshoes.com/cdn-cgi/image/width=720,height=1008,quality=85,format=webp/media/catalog/product/7/6/760775facmz4049_1.jpg?ts=20240629040516 ",
    price: 7366,
  },
  {
    name: " Louis Vuitton Trainer Sneaker ",
    Image:
      " https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lv-trainer-sneaker--BS9U1PDN20_PM2_Front%20view.jpg ",
    price: 7800,
  },
  {
    name: " Sparx   ",
    Image:
      "https://assets.ajio.com/medias/sys_master/root/20250707/kLSB/686bc4afe590ff066e2b4182/-473Wx593H-467300834-grey-MODEL.jpg ",
    price: 6800,
  },
  {
    name: "  Bata   ",
    Image:
      "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/2024/AUGUST/23/eBc6a1te_b360a4a9caaf4e5b812e4cedc1c67001.jpg ",
    price: 5440,
  },
  {
    name: " Puma    ",
    Image:
      " https://images.unsplash.com/photo-1608231387042-66d1773070a5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVtYSUyMHNob2V8ZW58MHx8MHx8fDA%3D ",
    price: 2440,
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

    qtyLabel.appendChild(incBtn);
    qtyLabel.appendChild(qtySpan);
    qtyLabel.appendChild(decBtn);

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
