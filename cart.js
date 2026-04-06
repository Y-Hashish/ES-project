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
    container.classList.add("container");

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
