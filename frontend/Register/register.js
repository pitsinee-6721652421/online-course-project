console.log("JS ทำงาน");// เช็คว่าไฟล์  jsถูกโหลดและทำงานแล้ว
document.querySelector(".course-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    

    const email = document.getElementById("email").value; // ดึงค่า email จาก input
    const password = document.getElementById("password").value; // ดึงค่า password จาก input

    console.log("กำลังส่ง fetch..."); //กำลังส่ง request ไป server
    
    try {
        const res = await fetch("http://localhost:8888/check-user", {  // ส่ง request ไป backend
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,  // ส่ง email ไป backend
                password: password  // ส่ง password ไป backend
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.ok && data.message === "User found") { // เช็คว่า request สำเร็จ และเจอ user
            alert("ลงทะเบียนเรียนสำเร็จ");
            window.location.href = "/frontend/study/success.html";
        } else {
            alert("❌ email หรือ password ไม่ถูกต้อง");
        }

    } catch (error) {    // จับ error เช่น server ปิด หรือ network มีปัญหา
        console.error(error);
        alert("❌ เกิดข้อผิดพลาดในการเชื่อมต่อ server");
    }
});