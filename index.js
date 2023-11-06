let inputSlider=document.querySelector("[data-len-slider]");
let dataNo=document.querySelector(".gg");
let showpass=document.querySelector("[show-pass]");
let popup=document.querySelector("[popup-msg]");
let dataCp=document.querySelector("[data-copy]");
let upper=document.querySelector("#upper-case");
let lower=document.querySelector("#lower-case");
let symbol=document.querySelector("#symbole");
let num=document.querySelector("#number");
let generatebtn=document.querySelector("#generate-button");
let indicator=document.querySelector("[data-indicator]");
let allCheckbox=document.querySelectorAll("input[type=checkbox]");

let allsymb="!@#$%^&*()_+=}]{[||:;<,>>?/";

// if (upper.checked = ture) {
//    console.log("box is tik");
// }

let password="";

let passwordlen=10;

let checkcount=0;

let setcolor="";



 function handleslider(){
    inputSlider.value=passwordlen;
    dataNo.innerText=passwordlen;
}
handleslider();

function setindicator(color){
  indicator.style.backgroundColor = color;
}



function getrandomint(min,max){
   let data=Math.floor( Math.random() * (max - min))+min ;
   return data
}

function number(){
  return getrandomint(0,9);
}

function up(){
  return String.fromCharCode(getrandomint(97,123));
}

function low(){
  return  String.fromCharCode(getrandomint(65,91));
}

function symb() {
   let Randnum=getrandomint(0,allsymb.length);
   return allsymb.charAt(Randnum);
}


function calstrength(){
   let hasUpper = false;
   let hasLower = false;
   let hasNumber = false;
   let hasSymbol = false;

   if (upper.checked) hasUpper = true;
   if (lower.checked) hasLower = true;
   if (num.checked) hasNumber = true;
   if (symbol.checked) hasSymbol = true;

   if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordlen >= 8) {
       setindicator("#0f0");
   } else if (
       (hasLower || hasUpper) &&
       (hasNumber || hasSymbol) &&
       passwordlen >= 6
   ) {
       setindicator("#ff0");
   } else {
       setindicator("#f00");
   }

}
 
// showpass.innerText=password;
// console.log(showpass);
// console.log(number());

async function copyContent(){
   try {
      await navigator.clipboard.writeText(showpass.value);
      popup.innerText="copied";
   } catch (error) {
      console.log(error);
   }
   
   popup.classList.add("active");

   setTimeout(() => {
      popup.classList.remove("active")
   }, 2000);

}

inputSlider.addEventListener("input",(e)=>{
   passwordlen=e.target.value;
   handleslider();
})




function hanleCheckBox() {
   checkcount=0;
   allCheckbox.forEach((checkbox)=>{
      if (checkbox.checked) {
         checkcount++;
         console.log(checkcount);
      }
      console.log(checkbox);
});

   if (passwordlen < checkcount) {
      passwordlen = checkcount;
      handleslider();
   }
 
}


allCheckbox.forEach((checkbox)=>{
 checkbox.addEventListener("change",hanleCheckBox);
});


dataCp.addEventListener("click",(e)=>{
   if (showpass.value) {
      copyContent();
   }
});


// function suffulepass(){

// }

generatebtn.addEventListener("click",()=>{

   console.log("bhai enter to ho gya hai");

   if (checkcount==0) return;

   console.log("if bhi chal gya");

   if(checkcount>passwordlen){
      passwordlen=checkcount;
      handleslider();
   }

   // STORING EVERY CHARECTER WHICH ARE CHECKED IN fnArr 
   console.log("starting");

   let password="";

   let funArr=[];

   if (upper.checked) {
      funArr.push(up);
   }

   if (lower.checked) {
      funArr.push(low);
   }

   if (num.checked) {
      funArr.push(number);
   }

   if (symbol.checked) {
      funArr.push(symb);
   }


   console.log("loop start");

// STORING CHARECTER IN password VARIABLE FROM FN_ARR
   for(let i=0;i<Array.length;i++){
      console.log("loop ke andar bhi chala gya");
      password+=funArr[i]();
      // console.log(password);
   }


   //
   for(let i=0;i<passwordlen-funArr.length;i++){

       let randomIndex=getrandomint(0,funArr.length);
        password+=funArr[randomIndex]();

   }

   // password=suffulepass();

   console.log("showing password",password);
   showpass.value=password;

   console.log(showpass);
   console.log(showpass.value);
   showpass.innerText=password;
   calstrength();   

});