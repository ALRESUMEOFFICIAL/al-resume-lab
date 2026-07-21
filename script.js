/* =================================
   AL RESUME LAB
   Main JavaScript
================================= */


/* ================================
   MOBILE MENU
================================ */


const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");


if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        navLinks.classList.toggle("active");

    });

}



/* ================================
   SMOOTH SCROLL
================================ */


document.querySelectorAll("a[href^='#']")
.forEach(link=>{


    link.addEventListener("click",function(e){

        const target =
        document.querySelector(this.getAttribute("href"));


        if(target){

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth"

            });

        }


    });


});



/* ================================
   SCROLL ANIMATION
================================ */


const revealElements =
document.querySelectorAll(
".feature-card, .trust-card, .step-card, .price-card, .testimonial-card"
);



const revealOnScroll = ()=>{


    revealElements.forEach(element=>{


        const position =
        element.getBoundingClientRect().top;


        const screenHeight =
        window.innerHeight;



        if(position < screenHeight - 100){


            element.classList.add("fade-up");


        }



    });


};


window.addEventListener(
"scroll",
revealOnScroll
);


revealOnScroll();




/* ================================
   ATS SCORE COUNTER
================================ */


const score =
document.querySelector(".score-number");


if(score){


let value = 0;

const target = 92;


const counter = setInterval(()=>{


    value++;

    score.innerHTML=value+"%";


    if(value>=target){

        clearInterval(counter);

    }


},20);



}




/* ================================
   RESUME UPLOAD PREVIEW
================================ */


const uploadInput =
document.querySelector("#resumeUpload");


const fileName =
document.querySelector(".file-name");



if(uploadInput){


uploadInput.addEventListener(
"change",
function(){


if(this.files.length > 0){


fileName.innerHTML =
"Selected: "
+
this.files[0].name;


}


});


}




/* ================================
   BUTTON CLICK EFFECT
================================ */


const buttons =
document.querySelectorAll("button,.btn-primary");


buttons.forEach(btn=>{


btn.addEventListener("click",()=>{


btn.style.transform="scale(.96)";


setTimeout(()=>{


btn.style.transform="";


},150);



});


});



/* ================================
   PAGE LOADING
================================ */


window.addEventListener(
"load",
()=>{


document.body.classList.add("loaded");


});



console.log(
"AL Resume Lab Loaded Successfully 🚀"
);
/* =================================
   DRAG & DROP RESUME UPLOAD
================================= */


const dropArea =
document.querySelector(".upload-box");

const resumeInput =
document.querySelector("#resumeUpload");


if(dropArea && resumeInput){


    ["dragenter","dragover"]
    .forEach(eventName=>{


        dropArea.addEventListener(
        eventName,
        (e)=>{


            e.preventDefault();

            dropArea.classList.add("active");


        });


    });



    ["dragleave","drop"]
    .forEach(eventName=>{


        dropArea.addEventListener(
        eventName,
        (e)=>{


            e.preventDefault();

            dropArea.classList.remove("active");


        });


    });



    dropArea.addEventListener(
    "drop",
    (e)=>{


        const files =
        e.dataTransfer.files;


        if(files.length){

            resumeInput.files = files;

            showFile(files[0]);

        }


    });



    resumeInput.addEventListener(
    "change",
    ()=>{


        if(resumeInput.files.length){

            showFile(
            resumeInput.files[0]
            );

        }


    });


}



function showFile(file){


const allowed = [

"application/pdf",

"application/msword",

"application/vnd.openxmlformats-officedocument.wordprocessingml.document"

];


const message =
document.querySelector(".upload-message");



if(!allowed.includes(file.type)){


if(message){

message.innerHTML =
"❌ Only PDF or DOCX files allowed";

}


return;

}



if(message){

message.innerHTML =
"✅ "+file.name+" Ready For ATS Check";

}



}



/* =================================
   ATS CHECK BUTTON
================================= */


const atsButton =
document.querySelector("#checkATS");


const loadingBox =
document.querySelector(".analysis-loading");


const resultBox =
document.querySelector(".ats-result");



if(atsButton){


atsButton.addEventListener(
"click",
()=>{


if(loadingBox){

loadingBox.style.display="block";

}



if(resultBox){

resultBox.style.display="none";

}




setTimeout(()=>{


if(loadingBox){

loadingBox.style.display="none";

}



if(resultBox){

resultBox.style.display="block";

}


startATSAnimation();



},3000);



});

}




/* =================================
   ATS RESULT ANIMATION
================================= */


function startATSAnimation(){


const score =
document.querySelector("#atsScore");


if(score){


let current=0;

let finalScore=87;



let timer=setInterval(()=>{


current++;

score.innerHTML=current+"%";


if(current>=finalScore){

clearInterval(timer);

}



},25);



}



}



/* =================================
   NAVBAR ACTIVE LINK
================================= */


const sections =
document.querySelectorAll("section");


const links =
document.querySelectorAll(".nav-links a");



window.addEventListener(
"scroll",
()=>{


let current="";


sections.forEach(section=>{


const top =
window.scrollY;


if(top >= section.offsetTop-150){


current =
section.getAttribute("id");


}



});



links.forEach(link=>{


link.classList.remove("active");


if(link.getAttribute("href")
.includes(current)){


link.classList.add("active");


}


});



});

  /* =================================
   AI ATS ANALYSIS ENGINE (FRONTEND)
================================= */


const analyzeResume = (resumeText)=>{


let keywords = [

"leadership",
"communication",
"management",
"experience",
"skills",
"education",
"certification",
"project",
"achievement",
"technology"

];


let matched = 0;


keywords.forEach(word=>{


if(resumeText
.toLowerCase()
.includes(word)){


matched++;

}


});



let score =
Math.floor(
(matched / keywords.length) * 100
);



return score;



};





/* =================================
   ATS REPORT GENERATOR
================================= */


function generateATSReport(score){


let report = {

overallScore: score,

keywordMatch:
score > 70 ? "Strong" : "Needs Improvement",

format:

score > 80
?
"ATS Friendly"
:
"Improve Formatting",


suggestions:[]

};



if(score < 80){

report.suggestions.push(
"Add more job-related keywords"
);

}



if(score < 70){

report.suggestions.push(
"Improve professional summary"
);

}



report.suggestions.push(
"Add measurable achievements"
);



return report;


}




/* =================================
   DISPLAY ATS RESULT
================================= */


function showATSReport(data){


const result =
document.querySelector(".ats-result");


if(!result) return;



result.innerHTML = `

<div class="report-card">

<h2>
AI ATS Report
</h2>


<h1>
${data.overallScore}%
</h1>


<p>
Keyword Match:
<strong>
${data.keywordMatch}
</strong>
</p>


<p>
Format Status:
<strong>
${data.format}
</strong>
</p>


<h3>
AI Suggestions
</h3>


<ul>

${data.suggestions
.map(item=>`
<li>${item}</li>
`)
.join("")}

</ul>


</div>

`;



}





/* =================================
   SAVE ANALYSIS HISTORY
================================= */


function saveATSHistory(report){


let history =
JSON.parse(
localStorage.getItem("atsHistory")
)
||
[];



history.push({

score:
report.overallScore,

date:
new Date()
.toLocaleDateString()

});



localStorage.setItem(
"atsHistory",
JSON.stringify(history)
);



}





/* =================================
   GET USER ATS HISTORY
================================= */


function getATSHistory(){


return JSON.parse(

localStorage.getItem("atsHistory")

)
||
[];


}




console.log(
"AI ATS Engine Ready 🤖"
);
