//   let cartCount = 0;

//   export function addToCart() {
//     cartCount++;
//     document.getElementById("lblCount").innerText = cartCount;
//   }

//   function LoadCart() {
//     alert("Cart opened. Total items: " + cartCount);
//   }
//  function resetCart() {
//   cartCount = 0;
//   document.getElementById("lblCount").innerText = cartCount;
// }
// // Run this once when page loads
window.onload = function () {
  cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  document.getElementById("lblCount").innerText = cartCount;
};

// function addToCart() {
//   cartCount++;
//   localStorage.setItem("cartCount", cartCount);
//   document.getElementById("lblCount").innerText = cartCount;
// //  LoadCart();
// }
// let cartCount = 1;
//   function addToCart() {
//     cartCount++;
//     document.getElementById("lblCount").innerText = cartCount;
//   }

// function LoadCart() {
//   alert("Cart opened. Items: " + cartCount);
// }

// cartUtils.js
let count = localStorage.getItem("cartCount");
let cartValue = document.getElementById("lblCount");

!count ? 0 : count;

let updateDisplay = () => {
  cartValue.innerHTML = count;
};

updateDisplay();

let addToCart = () => {
  //"increment cart value"
  count++;
  updateDisplay();
   accessingData();
  localStorage.setItem("cartCount", count);
};

let accessingData = () => {
  let h2 = document.querySelector(".product");
  console.log(h2);
};

function toggleWishlist(el) {
  el.classList.toggle("active");
  const icon = el.querySelector("i");
  if (el.classList.contains("active")) {
    icon.classList.remove("bi-heart");
    icon.classList.add("bi-heart-fill");
  } else {
    icon.classList.remove("bi-heart-fill");
    icon.classList.add("bi-heart");
  }
}
