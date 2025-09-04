// import {addToCart}from '../Test1.js';
const  groceres = [
 {
    name: "India Gate Basmati Rice - 5kg",
    Image: "https://m.media-amazon.com/images/I/413ddhGiWmL._SX300_SY300_QL70_FMwebp_.jpg",
    price: 599,
  },
  {
    name: "Tata Salt - 1kg",
    Image: "https://m.media-amazon.com/images/I/614mm2hYHyL.jpg",
    price: 25,
  },
  {
    name: "Fortune Sunflower Oil - 1L",
    Image: "https://5.imimg.com/data5/SELLER/Default/2021/6/FH/IP/UF/45780338/1-litre-fortune-refined-sunflower-oil-1000x1000.jpg",
    price: 130,
  },
  {
    name: "Aashirvaad Atta - 5kg",
    Image: "https://www.bbassets.com/media/uploads/p/l/204629_23-aashirvaad-select-atta.jpg",
    price: 260,
  },
  {
    name: "Maggi 2-Minute Noodles - 560g (Pack of 8)",
    Image: "https://homedelivery.ramachandran.in/media/catalog/product/cache/04c5c5c4276fe9dba74400abc896c29c/7/1/71hap8mqgsl._sl1500_.jpg",
    price: 110,
  },
  {
    name: "Amul Taaza Milk - 1L",
    Image: "https://www.bbassets.com/media/uploads/p/l/306926_4-amul-homogenised-toned-milk.jpg",
    price: 66,
  },
  {
    name: "Tata Tea Gold - 1kg",
    Image: "https://m.media-amazon.com/images/I/61r35uDpV4L._UF350,350_QL80_.jpg",
    price: 540,
  },
  {
    name: "Parle-G Biscuits - 800g",
    Image: "https://www.jiomart.com/images/product/original/492490082/parle-g-original-gluco-biscuit-200-g-product-images-o492490082-p591542736-0-202205231809.jpg",
    price: 65,
  },
  {
    name: "Dettol Antiseptic Liquid - 500ml",
    Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2r7zoO36KcNMQtwHgjTTgZq9PplYfCeiGSg&s",
    price: 165,
  },
  {
    name: "Colgate Strong Teeth Toothpaste - 200g",
    Image: "https://images-eu.ssl-images-amazon.com/images/I/61XMUdBuJ6L._AC_UL600_SR600,600_.jpg",
    price: 95,
  },
  {
    name: "Dabur Honey - 500g",
    Image: "https://m.media-amazon.com/images/I/41RhjqOCLEL._SX300_SY300_QL70_FMwebp_.jpg",
    price: 199,
  },
  {
    name: "Surf Excel Matic Top Load - 2kg",
    Image: "https://m.media-amazon.com/images/I/413qfrhdNHL._SX300_SY300_QL70_FMwebp_.jpg",
    price: 410,
  }
   
];
//import { addToCart, LoadCart } from '../Test1.js  '; // adjust path as needed

// import addToCart from "../homeScript";
const cart = {};

const productGrid = document.getElementById("productGrid");
const cartSection = document.getElementById("cartSection");

function renderProducts() {
  groceres .forEach((grocery, index) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = grocery.Image;
    img.alt =grocery.name;

    const name = document.createElement("div");
    name.className = "product-name";
    name.textContent = grocery.name;

    const price = document.createElement("div");
    price.className = "product-price";
    price.textContent = `₹${grocery.price}`;

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
        cart[grocery.name] = {
          ...grocery,
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
