console.log("JS ทำงาน");
document.querySelector(".course-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("กำลังส่ง fetch...");
    
    try {
        const res = await fetch("http://localhost:8888/check-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.ok && data.message === "User found") {
            alert("ลงทะเบียนเรียนสำเร็จ");
            window.location.href = "/frontend/study/success.html";
        } else {
            alert("❌ email หรือ password ไม่ถูกต้อง");
        }

    } catch (error) {
        console.error(error);
        alert("❌ เกิดข้อผิดพลาดในการเชื่อมต่อ server");
    }
});