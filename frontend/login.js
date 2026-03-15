document.querySelector(".login-form").addEventListener("submit", function(e){

e.preventDefault();

const email = document.getElementById("username").value;
const password = document.getElementById("password").value;

fetch("http://localhost:3000/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email:email,
password:password
})

})

.then(res => res.json())

.then(data => {

if(data.message === "Login success"){

alert("เข้าสู่ระบบสำเร็จ");

window.location.href = "index1.htm";

}

else{

alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");

}

})

.catch(error => {

console.log(error);

});

});