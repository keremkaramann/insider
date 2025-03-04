$(function () {
  // DOM hazır olduğunda çalışacak kodlar

  const studentData = [
    {
      name: "Ali",
      grade: 100,
      course: "Yazılım",
    },
    {
      name: "Ayşe",
      grade: 90,
      course: "Math",
    },
    {
      name: "Joe",
      grade: 30,
      course: "Jquery",
    },
  ];

  /* input focus */
  $(".inputArea input").focus(function () {
    $(this).css({
      "background-color": "rgba(36, 117, 250, 0.3)",
      transform: "scale(1.05)",
    });
  });

  $(".inputArea input").blur(function () {
    $(this).css({
      "background-color": "rgba(202, 2, 2, 0.3)",
      transform: "scale(1)",
    });
  });

  function updateTable() {
    $("#students tbody").empty();

    studentData.forEach(function (student) {
      const row = `
            <tr>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.grade}</td>
            </tr>
        `;
      $("#students tbody").append(row);
    });
  }

  updateTable();

  $("#formBtn").click(function () {
    const studentName = $("#studentName").val();
    const courseName = $("#studentCourse").val();
    const studentGrade = $("#studentGrade").val();

    if (studentName && courseName && studentGrade) {
      const newStudent = {
        name: studentName,
        course: courseName,
        grade: studentGrade,
      };

      studentData.push(newStudent);

      updateTable();

      //clear inputs
      $("#studentName").val("");
      $("#studentCourse").val("");
      $("#studentGrade").val("");
    } else {
      alert("Lütfen Tüm Alanları Doldurun");

      $("#studentName").val("");
      $("#studentCourse").val("");
      $("#studentGrade").val("");
    }
  });
});
