let questions = [
    {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ]
  },
    {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet"
    ]
  },
    {
    numb: 3,
    question: "What does PHP stand for?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor"
    ]
  },
    {
    numb: 4,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language"
    ]
  },
    {
    numb: 5,
    question: "What does XML stand for?",
    answer: "eXtensible Markup Language",
    options: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language"
    ]
  },
];
const quiz_box = document.getElementsByClassName("quiz_box")[0];
const result_box = document.getElementsByClassName("result_box")[0];
const option_list = document.getElementsByClassName("option_list")[0];
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

$(document).ready(()=>{
    $(".start_btn").click(()=> {
        $("#info").show()
    })
    $(".gakJadi").click(()=> {
        $("#info").hide()
    })
    $(".lanjut").click(()=> {
        $("#info").hide()
        $(".quiz_box").show()
        mulai(0, 1, 15, 0)
    })
})

let params = [15, 0, 1, 0, 0]
let [timeValue, que_count, que_numb, userScore, widthValue] =  params;
let counter, counterLine;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

$(".quit").click(()=>{ //jika tombol keluar ditekan
    $(".result_box").hide()
    window.location.reload(); //reload windows
})
function mulai(satu, dua, tiga, empat){
    showQuetions(satu); //tampilkan pertanyaan
    queCounter(dua); //tampilkan urutan pertanyaan
    startTimer(tiga); //memanggil kembali waktu
    startTimerLine(empat); //memanjangkan timeline
}

function clear(satu, dua){
    clearInterval(satu); //menghilangkan waktu
    clearInterval(dua); //cmenghilangkan time line
}

$(".restart").click(()=>{ //Ketika tombol ulangi diklik
    $(".quiz_box").show()
    $("#result_box").hide()
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    mulai(0, 1, 15, 0,)
    clear(counter, counterLine)
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show"); 
})
$(".next_btn").click(()=>{ //jika tombol lanjut diklik
    if(que_count < questions.length - 1){ 
        que_count++; 
        que_numb++;
        mulai(que_count, que_numb, timeValue, widthValue)
        clear(counter, counterLine)
        timeText.textContent = "Time Left"; 
        next_btn.classList.remove("show");
    }else{
        $(".quiz_box").hide()
        $("#result_box").css("display", "flex")
        clear(counter, counterLine)
        showResult(); 
    }
})


// mengambil pertanyaan
function showQuetions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option d-flex justify-content-between btn btn-outline-dark py-3 px-4 my-2"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option d-flex justify-content-between btn btn-outline-dark py-3 px-4 my-2"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option d-flex justify-content-between btn btn-outline-dark py-3 px-4 my-2"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option d-flex justify-content-between btn btn-outline-dark py-3 px-4 my-2"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag; 
    const option = option_list.querySelectorAll(".option");

    // menyetel fungsi onclickpada semua opsi jawaban
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// membuat elemen icon
let tickIconTag = '<div class="icon tick"><i class="bi bi-check-circle" style="font-size: 1rem;"></i></i></div>';
let crossIconTag = '<div class="icon cross"><i class="bi bi-dash-circle" style="font-size: 1rem;"></i></div>';
//if user clicked on option
function optionSelected(answer){
    clear(counter, counterLine)
    let userAns = answer.textContent; //mengambil jawaban user
    let correcAns = questions[que_count].answer; //mengambil jawaban yg benar
    const allOptions = questions[que_count].options.length;
    if(userAns == correcAns){ //jika jawaban benar
        userScore += 1; //skor nambah 1
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);  //nambahin icon benar
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); //nambahin icon salah
        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //nyari jawaban benar
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                //nambahin icon benar
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");
}
// menampilkan hasil
function showResult(){
    const scoreText = result_box.querySelector(".score_text");
    let scoreTag = '<p>Nilai kamu : ' + ((userScore/questions.length) * 100) + '</p>';
    scoreTag +='<span">Jawaban benar '+ userScore +' dari '+ questions.length +'</span>'
    scoreText.innerHTML = scoreTag; 
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ 
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled");
            }
            next_btn.classList.add("show"); 
        }
    }
}
function startTimerLine(time){
    counterLine = setInterval(timer, 10);
    function timer(){
        time += 0.063; //upgrading time value with 1
        time_line.style.width = time + "%";
        if(time > 99){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index){
    let totalQueCounTag = index +' dari '+ questions.length +' pertanyaan';
    bottom_ques_counter.innerHTML = totalQueCounTag;  
}