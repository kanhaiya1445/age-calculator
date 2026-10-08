const dobInput=document.getElementById("dob");
const calculateBtn=document.getElementById("calculateBtn");
const resetBtn=document.getElementById("resetBtn");
const result=document.getElementById("result");
const error=document.getElementById("error");

function startOfDay(d){return new Date(d.getFullYear(),d.getMonth(),d.getDate());}
function daysBetween(a,b){return Math.floor((startOfDay(b)-startOfDay(a))/86400000);}
function formatDate(d){return d.toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric",weekday:"long"});}

function calculateAge(){
  error.textContent="";
  if(!dobInput.value){error.textContent="Please enter your date of birth.";result.classList.add("hidden");return;}

  const [y,m,d]=dobInput.value.split("-").map(Number);
  const dob=new Date(y,m-1,d);
  const today=new Date();
  const todayDay=startOfDay(today);
  if(dob>todayDay){error.textContent="Date of birth cannot be in the future.";result.classList.add("hidden");return;}

  let years=today.getFullYear()-y;
  let birthdayThisYear=new Date(today.getFullYear(),m-1,d);
  if(todayDay<birthdayThisYear) years--;

  let lastBirthday=new Date(y+years,m-1,d);
  let months=0;
  let cursor=new Date(lastBirthday);
  while(true){
    const next=new Date(cursor.getFullYear(),cursor.getMonth()+1,cursor.getDate());
    if(next<=todayDay){months++;cursor=next;}else break;
  }
  const days=daysBetween(cursor,todayDay);

  const totalMonths=years*12+months;
  const totalDays=daysBetween(dob,todayDay);

  let nextBirthday=new Date(today.getFullYear(),m-1,d);
  if(nextBirthday<=todayDay) nextBirthday=new Date(today.getFullYear()+1,m-1,d);
  const birthdayDays=daysBetween(todayDay,nextBirthday);

  document.getElementById("years").textContent=years;
  document.getElementById("months").textContent=months;
  document.getElementById("days").textContent=days;
  document.getElementById("totalMonths").textContent=totalMonths.toLocaleString();
  document.getElementById("totalDays").textContent=totalDays.toLocaleString();
  document.getElementById("birthdayDays").textContent=birthdayDays.toLocaleString();
  document.getElementById("birthdayDate").textContent=formatDate(nextBirthday);

  document.getElementById("info").innerHTML=
    `You were born on <strong>${formatDate(dob)}</strong>.<br>
     Your next birthday will be on <strong>${formatDate(nextBirthday)}</strong>.`;

  result.classList.remove("hidden");
}

function reset(){
  dobInput.value="";
  result.classList.add("hidden");
  error.textContent="";
  dobInput.focus();
}

calculateBtn.addEventListener("click",calculateAge);
resetBtn.addEventListener("click",reset);
dobInput.addEventListener("keydown",e=>{if(e.key==="Enter")calculateAge();});
