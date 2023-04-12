const pass_len = document.querySelector('[data-password-length]')
const slider = document.querySelector('[data-password-length-slider]')
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/'
const number = document.querySelector('#number')
const symbol = document.querySelector('#symbols')
const lowerCase = document.querySelector('#Lowercase')
const upperCase = document.querySelector('#Uppercase')
const indicator = document.querySelector('[data-indicator]')
const allCheckBox = document.querySelectorAll('input[type="checkbox"]')
const generateBtn = document.querySelector('.generateButton')
const passDisplay = document.querySelector('[password-display]')
const displaySpan = document.querySelector('[copy-display]')
const copyBtn = document.querySelector('[data-copy]')
let passlen = 10
let cnt = 0
let password = ""
handleSlider()
setIndicator('#ccc')
function handleSlider(){
    pass_len.innerHTML = passlen;
    slider.value = passlen;
    const min = slider.min;
    const max = slider.max;
    slider.style.backgroundSize = (((passlen - min) / (max - min)) * 100) + '% 100%'
}

function getRandomInteger(min, max){
    return Math.floor(Math.random() * (max - min)) + min
}

function getRandomNumber(){
    return getRandomInteger(0,10)
}

function getRandomLowerCase(){
    return String.fromCharCode((getRandomInteger(97,123)))
}

function getRandomUpperCase(){
    return String.fromCharCode((getRandomInteger(65,91)))
}

function getRandomSymbol(){
    return symbols[getRandomInteger(0,symbols.length)]
}

slider.addEventListener('input',(e) => {
    passlen = e.target.value
    handleSlider()
})

function handleCheckBoxChange(){
    cnt = 0
    allCheckBox.forEach(element => {
        if(element.checked) cnt++;
    });

    if(passlen < cnt){
        passlen = cnt
        handleSlider()
    }
}
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passDisplay.value)
        displaySpan.innerText = "copied"
    }
    catch(e){
        displaySpan.innerText = "Failed"
    }
    displaySpan.classList.add('active')
    setTimeout(() => {
        displaySpan.classList.remove('active')
    },2000)
}

copyBtn.addEventListener('click',copyContent)

allCheckBox.forEach((e) => {
    e.addEventListener('change',handleCheckBoxChange)
})

function setIndicator(color){
    indicator.style.backgroundColor = color
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`
}
function shufflePassword(array){
    let pass = ""
    for(let i = 0; i < array.length; i++){
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    array.forEach((el) => {
        pass += el
    })
    password = pass
}
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(upperCase.checked) hasUpper = true;
    if(lowerCase.checked) hasLower = true;
    if(number.checked) hasNum = true;
    if(symbol.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

function passwordGeneration(){
    if(cnt == 0) return;
    if(cnt > passlen){
        passlen = cnt;
        handleSlider();
    }
    password = "";
    let funcArr = []
    if(number.checked) funcArr.push(getRandomNumber)
    if(symbol.checked) funcArr.push(getRandomSymbol)
    if(lowerCase.checked) funcArr.push(getRandomLowerCase)
    if(upperCase.checked) funcArr.push(getRandomUpperCase)

    for(let i = 0; i < funcArr.length; i++){
        password += funcArr[i]()
    }

    for(let i = 0; i < passlen - funcArr.length; i++){
        let randIndex = getRandomInteger(0,funcArr.length)
        password += funcArr[randIndex]()
    }
    shufflePassword(Array.from(password))
    passDisplay.value = password
    calcStrength()
}

generateBtn.addEventListener('click',passwordGeneration)