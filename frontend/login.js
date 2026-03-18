
/*
document.querySelector(".login-form").addEventListener("submit", async function(e){

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if(username === "" || password === ""){
        alert("กรุณากรอกข้อมูลให้ครบ");
        return;
    }

    // ดูค่าที่กรอกใน console
    console.log("username:", username);
    console.log("password:", password);

    const res = await fetch("http://localhost:8888/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            username:username,
            password:password
        })

    });

    const data = await res.json();
    console.log("Response:", data);

    if(data.message === "Login success"){
        alert("เข้าสู่ระบบสำเร็จ");
        window.location.href = "index1.html";
    }else{
        alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }

});

*/
// เลือก form ที่ใช้สำหรับ login
document.querySelector(".login-form").addEventListener("submit", async function(e){

e.preventDefault();
   
    //console.log("username:", username);
   // console.log("password:", password);
const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value.trim();

const res = await fetch("http://localhost:8888/register",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
    email:email,
    password:password
    })
    });
    const data = await res.json();
    alert("สมัครสำเร็จ");

    window.location.href = "index1.html";


});