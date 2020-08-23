import { numberToText } from "./num_to_text.js";

function validateNumber(num){
    const isValid = /^-?[0-9]\d*(\.\d+)?$/.test(num);
    return isValid;
}

//console.log(validateNumber('-01.10'))

console.log(numberToText('0'));

