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
var stock;
function fetchSingleProduct(id) {
  fetch("https://dummyjson.com/products/" + id)
    .then((res) => res.json())
    .then((p) => {
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
feather.replace();
