let progress = 0;

function finishLesson(){

progress = 100;

document.getElementById("progress").style.width = progress + "%";

alert("คุณเรียนจบบทนี้แล้ว!");
}


function checkQuiz(){

let answer = document.querySelector('input[name="q1"]:checked');

if(!answer){
alert("กรุณาเลือกคำตอบ");
return;
}

if(answer.value === "c"){
document.getElementById("result").innerHTML = "✅ ถูกต้อง! <br>จบบทเรียนแล้ว!👍🎉";

}else{
document.getElementById("result").innerHTML = "❌ ตอบผิด";
}

}