// เลือก form ที่ใช้สำหรับ login
document.querySelector(".login-form").addEventListener("submit", async function(e){

e.preventDefault();
console.log("submit ทำงานแล้ว");
   
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
    if(res.ok){
        alert("สมัครสำเร็จ");
        window.location.href = "index1.html";
    }else{
        alert(data.message || "เกิดข้อผิดพลาด");
}

    //const data = await res.json();
    //alert("สมัครสำเร็จ");

    //window.location.href = "index1.html";


});