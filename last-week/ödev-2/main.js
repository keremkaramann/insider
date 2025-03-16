$(function () {
  let appendLocation = ".ins-api-users";
  const oneDay = 24 * 60 * 60 * 1000;
  let currentTime = new Date().getTime();

  const buildCss = () => {
    const css = `
      .ins-api-users{
        display:flex;
        align-items: center;
        flex-direction: column;
        gap: 20px;
      }
      .user_container{
        border: 1px solid #000;
        padding: 20px 40px;
      }
      .delete-btn{
        padding: 10px;
        border-radius: 5px;
        background-color: red;
        color: white;
        cursor: pointer;
      }
      .fetch-btn {
       padding: 10px;
        border-radius: 5px;
        background-color: green;
        color: white;
        cursor: pointer;
      }
        `;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  };

  buildCss();

  const fetchUsers = async () => {
    const storedData = localStorage.getItem("users");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const expired = currentTime - parsedData.timestamp > oneDay;

      if (!expired) {
        renderUsers(parsedData.data);
        return;
      } else {
        localStorage.removeItem("users");
      }
    }
    try {
      const resp = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await resp.json();

      localStorage.setItem(
        "users",
        JSON.stringify({
          data: data,
          timestamp: currentTime,
        })
      );
      renderUsers(data);
    } catch (error) {
      console.log("FetchUsers Func Error", error);
    }
  };

  const renderUsers = (data) => {
    $(".ins-api-users").empty();
    data.forEach((user) => {
      let userDiv = `
            <div class="user_container">
            <h3>${user.name}</h3>
                <p>${user.email}</p>
                <p>${user.address.street}</p>
                <p>${user.address.city}</p>
                <button class="delete-btn" id="${user.id}" >Kullanıcıyı Sil</button>
                </div>
            `;
      $(".ins-api-users").append(userDiv);
    });
    $(".delete-btn").on("click", function () {
      const userId = $(this).attr("id");
      deleteUser(userId);
    });
  };

  const deleteUser = (userId) => {
    const localStorageData = localStorage.getItem("users");
    if (localStorageData) {
      const localData = JSON.parse(localStorageData);
      const updatedUserData = localData.data.filter(
        (user) => user.id !== parseInt(userId)
      );
      if (updatedUserData.length === 0) {
        localStorage.removeItem("users");
      } else {
        currentTime = new Date().getTime();
        localStorage.setItem(
          "users",
          JSON.stringify({
            data: updatedUserData,
            timestamp: currentTime,
          })
        );
      }
      renderUsers(updatedUserData);
    }
  };

  const observeChanges = () => {
    const targetNode = document.querySelector(appendLocation);
    const config = { childList: true };

    const observer = new MutationObserver(() => {
      if (
        !$(appendLocation).children().length &&
        !sessionStorage.getItem("fetchClicked")
      ) {
        const fetchBtn =
          '<button class="fetch-btn">Kullanıcıları Geri Getir</button>';
        $(appendLocation).append(fetchBtn);
        $(".fetch-btn").on("click", () => {
          sessionStorage.setItem("fetchClicked", "true");
          fetchUsers();
        });
      }
    });

    observer.observe(targetNode, config);
  };

  observeChanges();

  fetchUsers();
});
