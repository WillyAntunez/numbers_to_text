import { numberToText } from "./num_to_text.js";

const $numberIn = document.getElementById('number-in'),
    $resultDiv = document.getElementById('result-div'),
    $resultOut = document.getElementById('result-out'),
    $resultBtn = document.getElementById('result-btn'),
    $error = document.getElementById('error');

function validateNumber(num){
    const isValid = /^-?[0-9]\d*(\.\d{0,12})?$/.test(num);
    return isValid;
};

function writeResult(num){
    $resultOut.textContent = numberToText(num);
    $resultDiv.classList.remove('hidden');
};

function hideResult(){
    $resultDiv.classList.add('hidden');
    $resultOut.textContent = '';
};

function getResult(number){
    if(number != '' && validateNumber(number)){
        writeResult(number);
        $error.textContent = ''
    }else if(number != '' && !validateNumber(number)){
        hideResult();
        $error.textContent = 'El numero que has introducido no es valido.'
    }else{
        hideResult();
        $error.textContent = '';
    }
}

$numberIn.addEventListener('keyup', e => {
    let number = $numberIn.value;
    getResult(number);
});

$resultBtn.addEventListener('click', e=>{
    let number = $numberIn.value;
    getResult(number);
});

