let progress = 0;

function finishLesson(){

progress = 100;

document.getElementById("progress").style.width = progress + "%";

alert("คุณเรียนจบบทนี้แล้ว!");
}


function checkQuiz(){

let q1 = document.querySelector('input[name="q1"]:checked');
let q2 = document.querySelector('input[name="q2"]:checked');

if(!q1 || !q2){
alert("กรุณาตอบให้ครบทุกข้อ");
return;
}

let score = 0;

if(q1.value === "b"){
score++;
}

if(q2.value === "c"){
score++;
}

if(score === 2){
    document.getElementById("result").innerHTML =
    "✅ ได้ " + score + " / 2 <br>🎉 จบบทเรียนแล้ว!";
}else{
    document.getElementById("result").innerHTML =
    "❌ ได้ " + score + " / 2 <br>ลองอีกครั้ง!";
}

}