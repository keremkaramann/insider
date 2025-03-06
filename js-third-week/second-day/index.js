$(function () {
  const url = "https://jsonplaceholder.typicode.com/users";
  let start = 0;
  let limit = 4;
  let loading = false;
  let noData = false;

  const loadingSpinner = $('<span class="loader"></span>');
  $(".spinner_container").append(loadingSpinner);
  loadingSpinner.hide();

  function fetchUsers() {
    //fetch users
    $.get(`${url}?_start=${start}&_limit=${limit}`)
      .done(function (data) {
        console.log(data);

        if (data.length === 0) {
          noData = true;
          return;
        }

        data.forEach((user) => {
          $("#userList").append(`
          <div class="container">
            <p><span>Name:</span>${user.name}</p>
            <p><span>Email: </span>${user.email}</p>
            <p><span>City:</span>${user.address.city}</p>
            <p><span>Company Name:</span>${user.company.name}</p>
        </div>`);
        });
        start += limit;
      })
      .fail(function () {
        alert("API ERROR! Veri yüklenirken hata oluştu!");
        console.log("Hata:", textStatus, errorThrown);
      })
      .always(function () {
        loading = false;
        loadingSpinner.hide();
      });
  }

  fetchUsers();

  $(window).on("scroll", function () {
    let scrollTop = $(window).scrollTop();
    let documentHeight = $(document).height();
    let windowHeight = $(window).height();

    /*     console.log("top", scrollTop);
    console.log("document", documentHeight);
    console.log("height", windowHeight); */

    if (scrollTop + windowHeight >= documentHeight && !loading && !noData) {
      console.log("Sayfanın sonuna yaklaşıldı, yeni veriler çekiliyor...");
      loading = true;
      loadingSpinner.show();
      setTimeout(fetchUsers, 1000);
    }
  });
});
