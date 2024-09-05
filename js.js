'use strict'
const users = [
  {
    username: "salam",
    phone: "123-456-7890",
    address: "haifa hanaemnem",
    email: "shibli.salam30@gmail.com",
    description:"hi"
  },
  {
    username: "saeed",
    phone: "234-567-8901",
    address: "234 Oak St, Othertown, OT 23456",
    email: "saeed@gmail.comt",
    description: "hi"
  },
  {
    username: "yamen",
    phone: "0545452178",
    address: "haifa",
    email: "yamen@gmail.com",
    description: "hi"
  }
];


function popup(popupID,event,x){
  const elem = document.getElementById('shadowing');
  elem.classList.add('shadow');
  
  const contain = document.getElementById(popupID);
   contain.classList.add('show');
  if (event.target === document.getElementById('add-contact'))
  {
    let addtitle= document.createElement("h1");
    addtitle.textContent="CREATE A NEW CONTACT!";
    addtitle.style.fontSize="2em";
    addtitle.style.fontWeight="bold";

    contain.prepend(addtitle);
    document.getElementById('save/add').textContent="Add";
  }
  if(x!='-1'){
  let index = x.value;
  document.getElementById('user_name').value = users[index].username;
  document.getElementById('user_number').value = users[index].phone;
  document.getElementById('user_email').value = users[index].email;
  document.getElementById('user_address').value = users[index].address;
    }
}

function close_popup(event){
if(event.target==document.getElementById('shadowing')||event==='close'){
  document.querySelector('.shadow').classList.remove('shadow'); 
  document.querySelector('.show').classList.remove('show');

  document.getElementById('editUser').innerHTML =`<div>
            <div>
              <div> <span>Name</span> <input type="text" placeholder="enter a name" value="" id="user_name"></div>
              <div> <span>Number</span><input type="tel" placeholder="enter a phone number" value="" id="user_number"></div>
            </div>
          
          
            <div>
              <div><span>Address</span><input type="text" placeholder="enter an address" value="" id="user_address"></div>
              <div><span>Email</span> <input type="text" placeholder="enter an age" value="" id="user_email"></div>
            </div>
          
            <div>
              <div><span>Description</span> <input type="text" placeholder="URL" value="" id="user_description"></div>
            </div>
          
            <div>
              <button onclick="close_popup('close')" >Close</button>
              <button id="save/add" onclick="add_edit(this)">Save</button>
          
            </div>
          
          </div>`
}

}
function deleteAll(x){
if(x.value=='all'){
const del=document.getElementById('users');
del.innerHTML="";
console.log("you have no contact in your phone book");
close_popup('close');
}
else {
  users.splice(x.value,1);
  close_popup('close');
  show_user();
 }





}



function show_user() {
  let str="";

  users.sort((a, b) => a.username.localeCompare(b.username));

  users.forEach(function (elem,index) {
    str +=`  <li class="profile">

          <div class="contact_info">
            <img src="./Images/user.png" alt="proflie_pic">
           <p id="tousername">${elem.username}</p>
          </div>

          <div class="contact_actions">
            <button onclick="popup('infoUser',event,'-1');showInfo(this)" value="${index}"><img src="./Images/name-card.png" alt="details"></button>
            <button onclick="popup('editUser',event,this);changeval(${index})" value="${index}"> <img src="./Images/pen.png" alt="edit"></button>
            <button onclick="popup('deleteContact',event);editValue(${index})" value="${index}"><img src="./Images/contact.png" alt="delete"></button>
          </div>

        </li>`
    
  })

  document.getElementById('users').innerHTML=str;
}

function changeval(ind){
  document.getElementById("save/add").value=ind;
}

function add_edit(fun){
if(fun.textContent=='Add'){
  add_user();
}
else{
  editInfo(fun);
  
}
}

function add_user(){
  users.push({
    username: document.getElementById('user_name').value,
    phone: document.getElementById('user_number').value,
    email: document.getElementById('user_email').value,
    address: document.getElementById('user_address').value,
    description: document.getElementById('user_description').value,
  });
  close_popup('close');
  show_user();
}


function showInfo(x){
  let index=x.value;
  document.getElementById('showUserName').textContent ="Name : "+users[index].username;
  document.getElementById('showUserNp').textContent ="Number Phone : "+ users[index].phone;
  document.getElementById('showUserEmail').textContent = "Email: " + users[index].email;
  document.getElementById('ShowUserAdd').textContent ="Address : "+ users[index].address;

}  

function editInfo(x){
    let index=x.value;
    users[index].username =document.getElementById('user_name').value;
    users[index].phone=document.getElementById('user_number').value  ;
    users[index].email=document.getElementById('user_email').value  ;
    users[index].address =document.getElementById('user_address').value ;
  
  close_popup('close');
  show_user();
}

function editValue(index){
  document.getElementById('deleteBttn').value=index;

}




function search() {
  // Get the search query
  let input = document.getElementById('search-engine').value.toLowerCase();
  
  let list = "";

  users.forEach(function (elem, index) {
    if (elem.username.startsWith(input)){
      list += `  <li class="profile">

          <div class="contact_info">
            <img src="./Images/user.png" alt="proflie_pic">
           <p id="tousername">${elem.username}</p>
          </div>

          <div class="contact_actions">
            <button onclick="popup('infoUser',event);showInfo(this)" value="${index}"><img src="./Images/name-card.png" alt="details"></button>
            <button onclick="popup('editUser',event);editInfo(this)" value="${index}"> <img src="./Images/pen.png" alt="edit"></button>
            <button onclick="popup('deleteContact',event);editValue(${index})" value="${index}"><img src="./Images/contact.png" alt="delete"></button>
          </div>

        </li> `;

    }
  })


  

  if(list.length==0)
    document.getElementById('users').innerHTML= `<span class="nouser">No contacts available.</span>`
  else
  document.getElementById('users').innerHTML = list;


  
}
