var stock;
let selectedSize = null; // NEW: Tracks the clicked size
let currentProduct = null;
document.addEventListener("DOMContentLoaded", () => {
  const urlQuery = window.location.search;

  const urlPrams = new URLSearchParams(urlQuery);
  const id = urlPrams.get("id");

  if (id) {
    fetchSingleProduct(id);
  } else {
    window.location.href = "index2.html";
  }
});
var reviews = document.getElementById("reviews");
var stock;
function fetchSingleProduct(id) {
  fetch("https://dummyjson.com/products/" + id)
    .then((res) => res.json())
    .then((p) => {
      currentProduct = p;
      const track = document.getElementById("slider-track");
      const rating = document.getElementById("rating");
      const price = document.getElementById("prod-price");
      const discount = document.getElementById("prod-discount");
      const name = document.getElementById("prod-name");
      const discrip = document.getElementById("prod-discrip");
      const ratingValue = document.getElementById("rating-value");
      const stockValue = document.getElementById("stock-value");
      stock = p.stock;
      if (p.stock > 0) {
        stockValue.textContent = `In Stock : ${p.stock}`;
        stockValue.classList.add("in-stock");
      } else {
        stockValue.textContent = `Out of Stock`;
        stockValue.classList.add("out-stock");
      }
      name.textContent = p.title;
      rating.innerHTML = generateStarRating(p.rating);
      ratingValue.textContent = `${p.rating}/5`;
      price.textContent = "$" + p.price;
      discount.textContent = p.discountPercentage + "% off";
      discrip.textContent = p.description;

      p.images.forEach((e) => {
        const img = document.createElement("img");
        img.src = e;
        img.classList.add("slide");
        track.appendChild(img);
        console.log(p);
      });
      p.reviews.forEach((e) => {
        const reviewCard = document.createElement("div");
        const reviewRating = document.createElement("div");
        const reviewName = document.createElement("h4");
        const reviewText = document.createElement("p");
        const reviewDate = document.createElement("span");
        reviewCard.classList.add("review-card");

        reviewRating.innerHTML = generateStarRating(e.rating);
        reviewName.textContent = e.reviewerName;
        reviewText.textContent = e.comment;
        reviewDate.textContent = new Date(e.date).toLocaleDateString();

        reviewCard.append(reviewRating, reviewName, reviewText, reviewDate);
        reviews.appendChild(reviewCard);
      });

      const title = document.getElementById("title");
      const category = document.getElementById("category");
      const brand = document.getElementById("brand");
      const dimensions = document.getElementById("dimensions");
      const warranty = document.getElementById("warranty");
      const shipping = document.getElementById("shipping");
      const discrip2 = document.getElementById("discrip");
      const rate = document.getElementById("rate");
      rate.innerHTML = generateStarRating(p.rating);
      discrip2.textContent = p.description;
      title.textContent = p.title;
      category.textContent = p.category;
      brand.textContent = p.brand;
      dimensions.textContent = `${p.dimensions.width} x ${p.dimensions.height} x ${p.dimensions.depth} cm`;
      warranty.textContent = p.warrantyInformation
        ? p.warrantyInformation
        : "No warranty information available";
      shipping.textContent = p.shippingInformation
        ? p.shippingInformation
        : "No shipping information available";
    });
}
function generateStarRating(rating) {
  // 1. Ensure the rating is a number between 0 and 5
  const safeRating = Math.max(0, Math.min(5, Number(rating)));

  // 2. Convert the rating to a percentage (e.g., 4.5 out of 5 becomes 90%)
  const percentage = (safeRating / 5) * 100;

  // 3. Return the HTML structure
  return `
    <div class="star-rating-wrapper" title="${safeRating} out of 5 stars">
      <div class="stars-empty">★★★★★</div>
      <div class="stars-filled" style="width: ${percentage}%;">★★★★★</div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("slider-track");
  const slides = document.querySelectorAll(".slide");

  let currentIndex = 0;
  const totalSlides = slides.length;

  function moveToNextSlide() {
    // 1. Increase the index by 1
    currentIndex++;

    // 2. If we reach the end, instantly reset back to the first image
    if (currentIndex >= totalSlides) {
      currentIndex = 0;
    }

    // 3. Move the track to the left by (Index * 100)%
    // e.g., Index 1 = -100%, Index 2 = -200%
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Set the slider to move automatically every 3 seconds (3000 milliseconds)
  let sliderInterval = setInterval(moveToNextSlide, 3000);

  // SENIOR PRO-TIP: Pause the auto-slider when the user hovers over it
  const sliderContainer = document.querySelector(".product-slider");

  sliderContainer.addEventListener("mouseenter", () => {
    clearInterval(sliderInterval); // Stops the timer
  });

  sliderContainer.addEventListener("mouseleave", () => {
    sliderInterval = setInterval(moveToNextSlide, 3000); // Starts it again
  });
});

const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const quantity = document.getElementById("quantity");
plus.addEventListener("click", () => {
  if (parseInt(quantity.value) < stock) {
    let currentValue = parseInt(quantity.value, 10) || 0;
    quantity.value = currentValue + 1;
  }
});
minus.addEventListener("click", () => {
  if (parseInt(quantity.value) > 1) {
    let currentValue = parseInt(quantity.value, 10) || 0;
    quantity.value = currentValue - 1;
  }
});
quantity.addEventListener("change", () => {
  let currentValue = parseInt(quantity.value, 10) || 1;

  if (currentValue > stock) {
    quantity.value = stock;
  } else if (currentValue < 1) {
    quantity.value = 1;
  }
});

const details = document.getElementById("details");
const reviewsTab = document.getElementById("reviews");

function detailstab() {
  /* CHANGED: Targeted the new inner track instead of the outer container */
  const track = document.getElementById("tabs-track");

  /* CHANGED: Details is the first item, so we move back to the start (0%) */
  track.style.transform = `translateX(0%)`;
}

function reviewstab() {
  /* CHANGED: Targeted the new inner track */
  const track = document.getElementById("tabs-track");
  /* CHANGED: Reviews is the second item, so we slide the track left by 100% */
  track.style.transform = `translateX(-100%)`;
}

const addToCart = document.getElementById("add-to-cart");
const sizeBtns = document.querySelectorAll(".size-btn");

sizeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    sizeBtns.forEach((b) => b.classList.remove("active-size"));

    btn.classList.add("active-size");

    selectedSize = btn.textContent;
  });
});

addToCart.addEventListener("click", function () {
  if (!currentProduct) {
    alert("Product is still loading...");
    return;
  }

  if (!selectedSize) {
    alert("Please select a size before adding to cart!");
    return;
  }
  const cartItem = {
    id: currentProduct.id,
    title: currentProduct.title,
    price: currentProduct.price,
    image: currentProduct.images[0], // Grab the first image for the cart thumbnail
    size: selectedSize,
    // Ensure quantity is an integer, default to 1 if something goes wrong
    quantity: parseInt(document.getElementById("quantity").value, 10) || 1,
  };

  let cart = JSON.parse(localStorage.getItem("shop_co_cart")) || [];

  const existingItemIndex = cart.findIndex(
    (item) => item.id === cartItem.id && item.size === cartItem.size,
  );

  if (existingItemIndex > -1) {
    console.log(existingItemIndex);

    cart[existingItemIndex].quantity += cartItem.quantity;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem("shop_co_cart", JSON.stringify(cart));

  const originalText = addToCart.textContent;
  addToCart.textContent = "Added to Cart ✓";
  addToCart.style.backgroundColor = "#166534"; // Optional: turn green
  addToCart.style.color = "#fff";

  // Reset the button after 2 seconds
  setTimeout(() => {
    addToCart.textContent = originalText;
    addToCart.style.backgroundColor = "";
    addToCart.style.color = "";
  }, 2000);
});
// This will return an array of all the products they added!

function local() {
  const myCartItems = JSON.parse(localStorage.getItem("shop_co_cart"));
  console.log(myCartItems);
}

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("main-nav");

  window.addEventListener("scroll", () => {
    // If the page is scrolled down more than 50px
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      // If we are at the very top of the page
      navbar.classList.remove("scrolled");
    }
  });
});

const cartPanel = document.getElementById("cart");
const overlay = document.getElementById("cart-overlay");
const btn = document.getElementById("cart-btn");

btn.addEventListener("click", () => {
  cartPanel.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Close when clicking outside
overlay.addEventListener("click", () => {
  cartPanel.classList.remove("active");
  overlay.classList.remove("active");
});
feather.replace();

const cart = document.getElementById("cart-items");
const totalPrice = document.getElementById("total");

// Call it once when the page loads
showCart();

function showCart() {
  // CRITICAL FIX: Clear the cart HTML first!
  // If you don't do this, re-running showCart() will duplicate everything on the screen.
  cart.innerHTML = "";

  let lop = JSON.parse(localStorage.getItem("shop_co_cart")) || [];

  // Calculate the initial total right away
  updateTotal(lop);

  // ADDED 'index' to the loop so we know exactly which item we are modifying
  lop.forEach((element, index) => {
    const container = document.createElement("div");
    container.classList.add("container2");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("image-container-cart");

    const dataContainer = document.createElement("div");
    dataContainer.classList.add("data-container");

    const title = document.createElement("h2");
    title.textContent = element.title;

    const price = document.createElement("span");
    // Ensure the price has a $ symbol and looks clean
    price.textContent = `$${element.price}`;
    price.classList.add("price");

    const size = document.createElement("span");
    size.textContent = "Size : " + element.size;
    size.classList.add("size");

    const counter = document.createElement("div");
    counter.classList.add("counter");

    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.classList.add("plus");

    const minusBtn = document.createElement("button");
    minusBtn.textContent = "-";
    minusBtn.classList.add("minus");

    const quantity = document.createElement("input");
    quantity.setAttribute("type", "number");
    quantity.value = parseInt(element.quantity, 10); // Added Base-10

    const img = document.createElement("img");
    img.setAttribute("src", element.image);

    const priceQuantity = document.createElement("div");
    priceQuantity.classList.add("price-quantity");

    const removeBtn = document.createElement("button");
    removeBtn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ff5858"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>';
    removeBtn.classList.add("trash");

    // --- BUTTON EVENT LISTENERS ---

    // 1. Plus Button
    plusBtn.addEventListener("click", () => {
      let currentVal = parseInt(quantity.value, 10);
      quantity.value = currentVal + 1; // Update UI

      lop[index].quantity = currentVal + 1; // Update Array
      localStorage.setItem("shop_co_cart", JSON.stringify(lop)); // Save to Storage
      updateTotal(lop); // Update the Total Price
    });

    // 2. Minus Button
    minusBtn.addEventListener("click", () => {
      let currentVal = parseInt(quantity.value, 10);
      if (currentVal > 1) {
        quantity.value = currentVal - 1; // Update UI

        lop[index].quantity = currentVal - 1; // Update Array
        localStorage.setItem("shop_co_cart", JSON.stringify(lop)); // Save to Storage
        updateTotal(lop); // Update the Total Price
      }
    });

    // 3. Remove (Trash) Button
    // 3. Remove (Trash) Button
    removeBtn.addEventListener("click", () => {
      // 1. Disable the trash button immediately so the user can't click it twice
      // while the animation is running (fixes the rapid-clicking bug)
      removeBtn.disabled = true;

      // 2. Trigger the CSS animation
      container.style.transform = "translateX(-100%)";
      container.style.opacity = "0"; // Fades it out smoothly

      // 3. Wait for the animation to finish (400ms CSS + 50ms buffer = 450ms)
      setTimeout(() => {
        // Because arrays shift when you delete things, it's safer to filter the array
        // based on the exact item, rather than relying on the original index.

        // Grab fresh data from local storage just in case it changed
        let currentCart =
          JSON.parse(localStorage.getItem("shop_co_cart")) || [];
        // Remove the specific item by filtering it out
        currentCart.splice(index, 1);

        // Save and re-render
        localStorage.setItem("shop_co_cart", JSON.stringify(currentCart));
        showCart();
      }, 450);
    });

    // --- APPENDING EVERYTHING ---
    counter.append(minusBtn, quantity, plusBtn);
    priceQuantity.append(price, counter);
    imgContainer.append(img);
    dataContainer.append(title, size, priceQuantity);
    container.append(imgContainer, dataContainer, removeBtn);

    cart.append(container);
  });
}

// --- HELPER FUNCTION: UPDATE TOTAL ---
// This function loops through whatever array you pass it, calculates the math, and updates the HTML.
function updateTotal(cartArray) {
  let total = 0;

  cartArray.forEach((item) => {
    total += parseFloat(item.price) * parseInt(item.quantity, 10);
  });

  // .toFixed(2) ensures it looks like real currency (e.g., $120.00 instead of $120)
  totalPrice.textContent = `$${total.toFixed(2)}`;
}


const input = document.getElementById("search-input");
const resultsBox = document.getElementById("search-results");

input.addEventListener("input", () => {
  const query = input.value.trim();

  if (query.length < 2) {
    resultsBox.style.display = "none";
    return;
  }

  fetch(`https://dummyjson.com/products/search?q=${query}`)
    .then(res => res.json())
    .then(data => {
      resultsBox.innerHTML = "";

      if (data.products.length === 0) {
        resultsBox.innerHTML = `<div class="search-item">No results</div>`;
      } else {
        data.products.slice(0, 6).forEach(p => {
          const item = document.createElement("div");
          item.classList.add("search-item");
          item.textContent = p.title;

          // لما تدوس عليه
          item.addEventListener("click", () => {
            window.location.href = `single-product.html?id=${p.id}`;
          });

          resultsBox.appendChild(item);
        });
      }

      resultsBox.style.display = "block";
    });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".search")) {
    resultsBox.style.display = "none";
  }
});

//category dropdown
const dropdown = document.getElementById("category-dropdown");

fetch("https://dummyjson.com/products/category-list")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((cat) => {
      const item = document.createElement("div");
      item.classList.add("category-item");
      item.textContent = cat;

      item.addEventListener("click", (e) => {


        currentPage = 1;
        e.preventDefault();
        priceValue.textContent = `Filter by your max budget`;
        renderProductsbylink(
          `https://dummyjson.com/products/category/${encodeURIComponent(cat)}`,
        );
        priceFilter(
          `https://dummyjson.com/products/category/${encodeURIComponent(cat)}`,
        );
       
      });

      dropdown.appendChild(item);
    });
  });

  const categoryMenu = document.querySelector(".category-menu");

categoryMenu.addEventListener("mouseenter", () => {
  dropdown.style.display = "block";
});

categoryMenu.addEventListener("mouseleave", () => {
  dropdown.style.display = "none";
});