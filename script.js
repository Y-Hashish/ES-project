fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((data) => {
    // 1. Rename to 'products' (plural) to avoid naming collisions
    const products = data.products;
    const parent = document.getElementById("products");

    for (var i = 0; i < 4; i++) {
      var p = products[i];
      // }
      // products.forEach((p) => {
      // 2. Create elements INSIDE the loop so each product gets its own HTML
      const productCard = document.createElement("div");
      const image = document.createElement("img");
      const title = document.createElement("h5");
      const stock = document.createElement("div");
      const price = document.createElement("div");
      const overlay = document.createElement("div");
      const imageContainer = document.createElement("div");

      imageContainer.classList.add("image-container");
      overlay.classList.add("overlay");

      imageContainer.append(image);
      imageContainer.append(overlay);

      productCard.classList.add("new-arrival-items");
      // 3. Populate the data
      image.src = p.images[0];
      title.textContent = p.title;

      if (Number(p.stock) > 0) {
        stock.textContent = `Stock: ${p.stock}`;
        stock.classList.add("in-stock");
      } else {
        stock.textContent = "Out of stock";
        stock.classList.add("out-stock");
      }

      price.textContent = `$${p.price}`;
      // 4. Append the inner elements to the individual product card
      //   productCard.append(image);
      productCard.append(imageContainer);
      productCard.append(title);
      productCard.append(stock);
      productCard.append(price);
      // 5. Finally, append the finished card to the main parent div
      parent.append(productCard);
      // });
    }
  })
  .catch((error) => {
    // It is always a good idea to catch network errors!
    console.error("Error fetching products:", error);
  });

fetch("https://dummyjson.com/products/category/tops")
  .then((res) => res.json())
  .then((data) => {
    // 1. Rename to 'products' (plural) to avoid naming collisions
    const products = data.products;
    const parent = document.getElementById("top-selling");

    for (var i = 0; i < 4; i++) {
      var p = products[i];
      // }
      // products.forEach((p) => {
      // 2. Create elements INSIDE the loop so each product gets its own HTML
      const productCard = document.createElement("div");
      const image = document.createElement("img");
      const title = document.createElement("h5");
      const stock = document.createElement("div");
      const price = document.createElement("div");
      const overlay = document.createElement("div");
      const imageContainer = document.createElement("div");

      imageContainer.classList.add("image-container");
      overlay.classList.add("overlay");

      imageContainer.append(image);
      imageContainer.append(overlay);

      productCard.classList.add("new-arrival-items");
      // 3. Populate the data
      image.src = p.images[0];
      title.textContent = p.title;

      if (Number(p.stock) > 0) {
        stock.textContent = `Stock: ${p.stock}`;
        stock.classList.add("in-stock");
      } else {
        stock.textContent = "Out of stock";
        stock.classList.add("out-stock");
      }

      price.textContent = `$${p.price}`;
      // 4. Append the inner elements to the individual product card
      //   productCard.append(image);
      productCard.append(imageContainer);
      productCard.append(title);
      productCard.append(stock);
      productCard.append(price);
      // 5. Finally, append the finished card to the main parent div
      parent.append(productCard);
      // });
    }
  })
  .catch((error) => {
    // It is always a good idea to catch network errors!
    console.error("Error fetching products:", error);
  });
