$(function () {
  //ürün arama için debounce
  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }
  //fetchproducts

  function fetchProducts() {
    $.get(`https://fakestoreapi.com/products`)
      .done(function (data) {
        data.forEach((product) => {
          let allProduct = $("#templateCard").clone(true).removeAttr("id");
          allProduct.find(".title").text(product.title);
          allProduct.find(".rate").text(product.rating.rate);
          allProduct.find(".count").text(product.rating.count);
          allProduct.find(".priceAmount").text(product.price);
          allProduct.find("a").attr("href", product.image);
          allProduct.find("img").attr("src", product.image);
          allProduct.find("a").attr("data-caption", product.title);
          allProduct
            .find(".seeDetails")
            .attr("data-src", `#product-${product.id}`);

          // Ürün detaylarını içeren modal ekle
          const tooltipHtml = `
            <div id="product-${product.id}" class="card_tooltip">
            <div class="tooltip_container">
              <h2>${product.title}</h2>
              <img src="${product.image}" alt="${product.title}" />
              <p>${product.description}</p>
              <p><strong>Fiyat:</strong> ${product.price} TL</p>
              <p><strong>Değerlendirme:</strong> ${product.rating.rate} / 5</p>
              <p><strong>Yorum Sayısı:</strong> ${product.rating.count}</p>
              </div>
            </div>
          `;

          $(".product_container").append(tooltipHtml);

          allProduct.hide().appendTo(".product_container").fadeIn(900);

          //sepete ekle
          allProduct.find(".addToCart").on("click", function () {
            // Sepet div'ine küçük bir kopya ekle
            let cartItem = allProduct.clone(true).removeAttr("id");
            $("#cart").append(cartItem);

            // LocalStorage'a ürün ekle
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
          });
        });
      })
      .fail(function () {
        alert("API ERROR! Veri yüklenirken hata oluştu!");
        console.log("Hata:", textStatus, errorThrown);
      });
  }

  fetchProducts();
  //resim büyütme
  Fancybox.bind("[data-fancybox]", {
    Thumbs: {
      autoStart: true,
      Thumbs: false,
      Toolbar: true,
      closeButton: "inside",
    },
  });

  //arama fonksiyonu
  $("#searchProduct").on(
    "input",
    debounce(function () {
      const searchVal = $(this).val().toLowerCase();

      $(".card-element").each(function () {
        const productName = $(this).find(".title").text().toLowerCase();
        if (productName.includes(searchVal)) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }, 500)
  );

  //ürünü sil
  $(".product_container").on("click", ".deleteProduct", function () {
    $(this).closest(".card-element").remove();
  });
  //sepeti sil
  $("#clearCart").on("click", function () {
    // Sepet div'ini temizle
    $("#cart").empty();

    // LocalStorage'ı temizle
    localStorage.removeItem("cart");
  });

  function loadCartFromStorage() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.forEach((product) => {
      let cartItem = $("<div>").addClass("cart-item");
      cartItem.append(`<p>${product.title}</p>`);
      cartItem.append(
        `<img src="${product.image}" alt="${product.title}" width="50">`
      );
      cartItem.append(`<p>${product.price} $</p>`);
      $("#cart").append(cartItem);
    });
  }

  // Sayfa yüklendiğinde sepeti yükle
  loadCartFromStorage();
});
