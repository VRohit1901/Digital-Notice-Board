const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const announcementList = document.querySelector(".announcementList");
const deleteAllBtn = document.querySelector(".footer button");
let button = document.querySelector('.inputField button');

button.addEventListener('click', () => {
  if(!window.Notification) return;
  Notification
  .requestPermission()
  .then(showNotification)
});

inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; 
  if(userEnteredValue.trim() != 0){
    addBtn.classList.add("active"); 
  }else{
    addBtn.classList.remove("active");
  }
}

showTasks(); 

addBtn.onclick = ()=>{
  let userEnteredValue = inputBox.value;
  let getLocalStorageData = localStorage.getItem("announcement");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData);
  }
  listArray.push(userEnteredValue);
  localStorage.setItem("announcement", JSON.stringify(listArray));
  showTasks();
  addBtn.classList.remove("active");
}

function showTasks(){
  let getLocalStorageData = localStorage.getItem("announcement");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  if(listArray.length > 0){ 
    deleteAllBtn.classList.add("active");
  }else{
    deleteAllBtn.classList.remove("active");
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  announcementList.innerHTML = newLiTag; 
  inputBox.value = "";
}

function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("announcement");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1);
  localStorage.setItem("announcement", JSON.stringify(listArray));
  showTasks(); 
}

deleteAllBtn.onclick = ()=>{
  listArray = [];
  localStorage.setItem("announcement", JSON.stringify(listArray));
  showTasks();
}

function showNotification(permission){
    if(permission !== 'granted') return;
    let notification = new Notification('New Announcement', {
        body:listArray[listArray.length-1],
        icon:'assets/logo.png'        
    })
    notification.onclick = () => {
        window.location.href= "https://vrohit1901.github.io/Digital-Notice-Board/student.html"
    }
}