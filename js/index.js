import { numberToText } from "./num_to_text.js";

const $numberIn = document.getElementById('number-in'),
    $resultDiv = document.getElementById('result-div'),
    $resultOut = document.getElementById('result-out'),
    $resultBtn = document.getElementById('result-btn'),
    $error = document.getElementById('error');

let error = '';

function validateNumber(num){
    const isValid = /^-?\d{1,30}(\.\d{1,12})?$/.test(num);

    if(isValid){
        return true
    }else{
        if(/-/g.test(num) && (num.match(/-/g).length > 1 || /[0-9]-[0-9]?/.test(num))){
            error = 'Introdujiste un signo negativo de manera incorrecta.';
        }else if(/\./g.test(num) && (num.match(/\./g).length > 1 || !/\d\.\d/.test(num))){
            error = 'Introdujiste un punto de manera incorrecta.';
        }else if(/[0-9]?\.\d{12,}?$/.test(num)){
            error = 'El limite de numeros decimales (despues del punto) es de doce digitos.'
        }else if(/\d{30,}?\.?\d*?$/.test(num)){
            error = 'El limite de numeros enteros (antes del punto) es de treinta digitos.'
        }else{
            error = 'El numero que has introducido no es valido.';
        }
        
    }
   
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
        $error.textContent = error;
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

