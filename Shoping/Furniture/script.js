const Furniture = [
  {
    name: " Sofa Set ",
    Image:
      " https://img.freepik.com/free-psd/view-sofa-interior-design-decor_23-2151772696.jpg ",
    price: 18999,
  },
  {
    name: "Wooden Dining Table",
    Image:
      "https://cdn.decornation.in/wp-content/uploads/2020/03/solid-wood-dining-table-2.jpg",
    price: 12999,
  },
  {
    name: "Recliner Sofa",
    Image:
      "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/26026282/2025/3/27/6610d9c4-9f87-487e-bc32-c42ead1e4bd91743091979979-HOKIPO-Brown-140-GSM-Stretchable-3-Seater-Recliner-Sofa-Cove-1.jpg",
    price: 24999,
  },
  {
    name: "Queen Size Bed",
    Image:
      "https://img.freepik.com/free-photo/beautiful-view-modern-bedroom-white-colors_181624-59963.jpg?semt=ais_hybrid&w=740&q=80",
    price: 19999,
  },
  {
    name: "TV Unit",
    Image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdUu_c_30xWVUjL-XBZ2gd79yQS5xBEehzpA&s",
    price: 7499,
  },
  {
    name: "Study Desk",
    Image:
      "https://www.nilkamalfurniture.com/cdn/shop/files/FLSDSCHOLARSDWLT.jpg?v=1732690632",
    price: 3499,
  },
  {
    name: "Wardrobe with Mirror",
    Image:
      "https://assets.telkitchens.co.uk/srcane/uploads/2021/07/09093757/9-Mirrored-Wardrobe-Designs-Ideas-Unique-Wardrobes-Designs.jpg",
    price: 16999,
  },
  {
    name: "Bookshelf",
    Image:
      "https://media.istockphoto.com/id/505773698/photo/illustration-of-white-shelves-for-decoration.jpg?s=612x612&w=0&k=20&c=MbG-IQrF0xwAuelnZirCFFhkDB-DTLnjd5YXt1uFsRE=",
    price: 2999,
  },
  {
    name: "Coffee Table",
    Image:
      "https://www.zorin.co.in/cdn/shop/files/Ace_Liftstyle_B_W.jpg",
    price: 2899,
  },
  {
    name: "Office Chair",
    Image:
      "https://drogo.in/cdn/shop/files/81agFk617HL.jpg?v=1749299058",
    price: 5599,
  },
  {
    name: "Bedside Table",
    Image:
      "https://ik.imagekit.io/2xkwa8s1i/img/npl_modified_images/ESRA/WSBDESRA_LS_1.jpg?tr=w-3840",
    price: 1899,
  },
  {
    name: "Laptop Table",
    Image:
      "https://m.media-amazon.com/images/I/31urzPIxpwL._SY300_SX300_QL70_FMwebp_.jpg",
    price: 5599,
  },
];

const cart = {};

const productGrid = document.getElementById("productGrid");
const cartSection = document.getElementById("cartSection");

function renderProducts() {
  Furniture.forEach((Furniture, index) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = Furniture.Image;
    img.alt = Furniture.name;

    const name = document.createElement("div");
    name.className = "product-name";
    name.textContent = Furniture.name;

    const price = document.createElement("div");
    price.className = "product-price";
    price.textContent = `₹${Furniture.price}`;

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
        cart[Furniture.name] = {
          ...Furniture,
          quantity: qty,
        };
        addToCart();
        //import { addToCart } from './Test2.js';
        renderCart();
      } else {
        alert("Quantity must be greater than 0 to add to cart.");
      }
    };
    //   // ❤️ Heart Icon
    // const heart = document.createElement("i");
    // heart.className = "bi bi-heart heart-icon";
    // heart.onclick = () => {
    //   heart.classList.toggle("bi-heart-fill");
    //   heart.classList.toggle("bi-heart");
    // };
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
