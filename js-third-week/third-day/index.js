$(function () {
  let cards = [];
  function fetchUsers() {
    $.get("https://randomuser.me/api/?results=5")
      .done(function (data) {
        data.results.forEach((user) => {
          let newCard = $(`
              <div class="card">
              <div>
              <img src=${user.picture.medium} alt=""/>
              </div>
              <div>
              <p>Name: ${user.name.title}.${user.name.last}</p>
             <p>Origin: ${user.location.country}</p>
             <p>Email: ${user.email}</p>
             <button class="shakeButton">Shake Efekti Uygula</button>
              </div>
          </div>
            `);
          cards.push(newCard);

          $(".card_container").append(newCard);
          $(".slider").append(newCard);
        });

        $(".card").fadeIn(800);
      })
      .fail(function () {
        alert("API ERROR!");
      });
  }

  fetchUsers();

  //shake func
  $(".card_container").on("click", ".shakeButton", function () {
    $(this).closest(".card").effect("shake", { times: 3, distance: 10 }, 500);
  });
  $(".slider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: true,
  });
});
