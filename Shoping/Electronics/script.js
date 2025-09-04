 const  Electronics = [
 {
    name: " Tablets",
    Image: " https://cdn.pixabay.com/photo/2019/03/19/17/55/tab-4066426_1280.png",
    price:  45999,
  },
  {
    name: "Smartwatch",
    Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRort7UIUuZ56aGGKt9V68pn1yOSiZSdAcsdg&s ",
      price: 2999,
  },
  {
    name: " Bluetooth Earphones",
    Image: " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ga5zOABwbqVUiIXsSFFlYVtsTOiCc7Z-yg&s",
    price:999 ,
  },
  {
    name: "Smart TV",
    Image: " https://media.istockphoto.com/id/467946398/photo/contemporary-curved-led-smart-tv-design.jpg?s=612x612&w=0&k=20&c=s-eIL1kSR1YalWVGFk9sIvt0XbJMQGIlLlzUUbw6jLA=",
    price: 22999,
  },
  {
    name: " Air Conditioner",
    Image: "https://cdn.pixabay.com/photo/2021/09/08/07/20/air-conditioner-6605973_1280.jpg ",
    price: 30999,
  },
  {
    name: "Refrigerator ",
    Image: "https://img.freepik.com/premium-photo/silver-steel-fridge-model-isolated-white-background_124507-67356.jpg ",
    price: 18999,
  },
  {
    name: " Smart Light",
    Image: "https://images.unsplash.com/photo-1711006155490-ec01a0ecf0de?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D ",
    price: 599,
  },
  {
    name:  "Smart Camera",
    Image: " https://okos.in/cdn/shop/files/1_6b96dc50-8a1f-4ef9-82e1-b10b2b0ce7b7.jpg?v=1735385946",
    price: 1999,
  },
  {
    name: "Smart Plug",
    Image: " https://cdn.shopify.com/s/files/1/0648/5478/6148/files/61V-MmvlplL._SL1500.jpg?v=1722602749",
    price: 749,
  },
  {
    name: "PlayStation 5",
    Image: "https://bsmedia.business-standard.com/_media/bs/img/article/2023-10/11/full/1697008191-1052.jpg?im=FeatureCrop,size=(826,465)",
    price: 49999,
  },
  {
    name: "Gaming Laptop ",
    Image: " https://t4.ftcdn.net/jpg/07/41/01/41/360_F_741014161_o9PTiiWFB2gWrLPiflaQOxB0n6OxcJPB.jpg",
    price: 75999,
  },
  {
    name: " VR Headset",
    Image: " https://m.media-amazon.com/images/I/61RgUtmRymL.jpg",
    price: 24999,
  }
   
];

const cart = {};

const productGrid = document.getElementById("productGrid");
const cartSection = document.getElementById("cartSection");

function renderProducts() {
 Electronics.forEach((Electronics, index) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src =Electronics.Image;
    img.alt = Electronics.name;

    const name = document.createElement("div");
    name.className = "product-name";
    name.textContent = Electronics.name;

    const price = document.createElement("div");
    price.className = "product-price";
    price.textContent = `₹${Electronics.price}`;

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
        cart[Electronics.name] = {
          ...Electronics,
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
