// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase,
  ref,
  set,
  push,
  onChildAdded,
  update,
  remove,
 } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpLuD7K1-ICm0-WWPMczxLNNjdjQGoYCs",
  authDomain: "shayan-b306c.firebaseapp.com",
  databaseURL: "https://shayan-b306c-default-rtdb.firebaseio.com",
  projectId: "shayan-b306c",
  storageBucket: "shayan-b306c.appspot.com",
  messagingSenderId: "478670907735",
  appId: "1:478670907735:web:ac4362e8ec2ca4d6e03612",
  measurementId: "G-T2LS6W16GM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const DB = getDatabase(app);

var name = document.getElementById("name");
var age = document.getElementById("age");
var email = document.getElementById("email");
var section = document.getElementById("section");
var StudentList = [];

window.sendDataToDatabase = function () {
    var studentData = {
        name : name.value,
        age : age.value,
        email : email.value,
        section : section.value,
    };
    // console.log(studentData);

    var referKey = ref(DB);
    var randomId = push(referKey).key;
    studentData.id = randomId;
    var reference = ref(DB, `students/${studentData.id}`);
    set(reference, studentData);
};

function getDataFromDatabase() {
    var refer = ref(DB, "students");
  onChildAdded(refer, function (data) {
    // console.log(data.val())
    render(data.val());
});
}

function render(data) {
    // console.log(data);
    if (data) {
      StudentList.push(data);
    }
    studentHTMLData.innerHTML = "";
    for (var i = 0; i < StudentList.length; i++) {
      studentHTMLData.innerHTML += `<p> Student Name : ${StudentList[i].name} </p>
      <p> Age : ${StudentList[i].age}  </p>
      <p> Email : ${StudentList[i].email}  </p>
      <p> Section : ${StudentList[i].section}  </p>
      <button class="btn" onclick="editStudent(${i},'${StudentList[i].id}')"> Edit </button> <button class="btn" onclick="deleteStudent(${i},'${StudentList[i].id}')"> Delete </button>
      <hr/>`;
    }
    //   console.log(StudentList);
}
  
  window.editStudent = function (index,id) {
    //   console.log("checking....", index);
    var a = prompt('enter')
    StudentList[index].name = a
    // console.log(id);
    var refer = ref(DB, `students/${id}`);
  update(refer, {
    name: a
  });
  render();
  };
   

  window.deleteStudent = function (index, id) {
    StudentList.splice(index, 1);
    var refer = ref(DB, `students/${id}`);
    remove(refer);
  
    render();
  };
  
  window.onload = getDataFromDatabase();
  