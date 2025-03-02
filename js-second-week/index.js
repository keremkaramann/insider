const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskList = document.getElementById("taskList");

// Görev formunu gönderme işlemi
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    // Başlık zorunlu, öncelik seçilmeli
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    const priorityRadio = document.querySelector(
      'input[name="priority"]:checked'
    );

    if (!title) throw new Error("Başlık zorunludur!");
    if (!priorityRadio) throw new Error("Öncelik seçmelisiniz!");

    const priority = priorityRadio.value;

    // Yeni görev oluşturma
    const task = {
      title,
      description,
      priority,
      completed: false,
    };

    // Görevi listeye ekleme
    addTaskToList(task);

    // Formu temizleme
    taskTitle.value = "";
    taskDescription.value = "";
    document
      .querySelectorAll('input[name="priority"]')
      .forEach((input) => (input.checked = false));
  } catch (error) {
    alert(error.message); // Hata mesajını göster
  }
});

// Görev ekleme fonksiyonu
function addTaskToList(task) {
  const li = document.createElement("li");
  if (task.completed) {
    li.classList.add("completed");
  } else {
    li.classList.remove("completed");
  }

  li.innerHTML = `
            <div>
            <span class="doTask-title"> Başlık: </span>
             <span>${task.title}</span>
            </div>
            <div>
            <span class="doTask-title"> Öncelik: </span>
            <span>${task.priority}</span>
            </div>
            <div>
            <span class="doTask-title"> Açıklaması: </span>
             <span>${taskDescription.value}</span>
            </div>
            <button class="complete-btn">Tamamlandı</button>
            <button class="delete-btn">Sil</button>
        `;

  // Tamamlandı butonuna tıklama
  li.querySelector(".complete-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    task.completed = !task.completed;
    li.classList.toggle("completed", task.completed);
  });

  // Silme butonuna tıklama
  li.querySelector(".delete-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
  });

  taskList.appendChild(li);
}
