/* Proceso de validacion antes de introducir un numero a esta funcion:

        Puede ser numero o string.(si es numero pierde presicion al convertirlo a string)
        Puede tener comas o no.
        Puede tener numeros decimales o enteros
        *Puede ser negativo

        NO puede tener caracteres extraños en medio de los numeros, unicamente un negativo al comienzo para señalar que el numero es negativo
        NO puede tener mas de un punto decimal
        NO puede tener letras
        NO puede tener ceros a la izquierda

    */

    /* Proceso de preparacion de datos dentro de la funcion:

        **separar la parte decimal de la parte entera
        X-Elimina el negativo al inicio y almacena en una variable que se trata de un numero negativo
        X-Dividir numeros en grupos de tres

*/

export function numberToTextES(number){

    const specialNumbers = {
        'once': 11,
        'doce': 12,
        'trece': 12,
        'catorce': 14,
        'quince': 15,
        'dieciséis': 16,	
        'diecisiete':	17,
        'dieciocho': 18,
        'diecinueve':	19,
        'veinte': 20,
        'veintiuno': 21,
        'veintidós': 22,
        'veintitrés': 23,
        'veinticuatro': 24,
        'veinticinco': 25,
        'veintiséis': 26,
        'veintisiete': 27,
        'veintiocho': 28,
        'veintinueve': 29
    },
        unitNumbers = {
        'cero': 0,
        'uno': 1,
        'dos': 2,
        'tres': 3,
        'cuatro': 4,
        'cinco': 5,
        'seis': 6,
        'siete': 7,
        'ocho': 8,
        'nueve': 9,
        'diez': 10
    },
        tenNumbers = {
        'diez':10,
        'veinte': 20,
        'treinta': 30, 
        'cuarenta': 40, 
        'cincuenta': 50, 
        'sesenta': 60, 
        'setenta': 70, 
        'ochenta': 80, 
        'noventa': 90
    },
        hundredNumbers = {
        'cien': 100,
        'doscientos': 200,
        'trescientos': 300,
        'cuatrocientos': 400,
        'quinientos': 500,
        'seiscientos': 600,
        'setecientos': 700,
        'ochocientos': 800,
        'novecientos': 900
    };

    let resultText = '',
        numberArr = [],
        isNegative = false;

    
    //Declaring functions
    function splitNumber(numberStr){
        numberStr = numberStr.split('').reverse().join('');
        numberStr = numberStr.match(/.{1,3}/g);
        numberStr = numberStr.map(str => parseInt(str.split('').reverse().join('')));
        numberStr = numberStr.reverse();

        return numberStr
    };

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    };

    function getTenPart(num){
        let out,
            unitPart = num % 10,
            tenPart = (Math.floor(num / 10)) * 10;

        if (num < 29){
            if (num <= 10){
                out = getKeyByValue(unitNumbers, num);
            }else{
                out = getKeyByValue(specialNumbers, num);
            };
        }else{
            out = getKeyByValue(tenNumbers, tenPart);

            if(unitPart !== 0){
                out+= ' y ' + getKeyByValue(unitNumbers, unitPart);
            };
        };

        return out;
    };

    function getBasicUnits(num, replaceUno){
        let result,
            hundredPart = Math.floor(num/100) * 100,
            tenPart = num % 100;

        if(num < 100){
            result = getTenPart(num);
        }

        if(num > 100 && tenPart !== 0){
            result = getKeyByValue(hundredNumbers, hundredPart) + ' ' + getTenPart(tenPart);
        }

        if (num >= 100 && tenPart === 0){
            result = getKeyByValue(hundredNumbers, hundredPart);
        }

        if(num > 100 && num < 200 && tenPart !== 0){
            result = 'ciento ' + getTenPart(tenPart);
        }

        if(replaceUno && result && result.indexOf('uno') >= 0 ){
            result = result.replace('uno', 'un')
        }

        return result;
    }

    //Procesing the number

    if(!isNaN(number)){
        number = number.toString();
    }

    if(number.charAt(0) === '-'){
        isNegative = true;
        number = number.substr(1);
    }

    numberArr = splitNumber(number);

    //converting to text
    if (numberArr.length === 1){
        resultText = getBasicUnits(numberArr[0]);
    }

    if(numberArr.length === 2){
        if (numberArr[0] > 1){
            resultText = getBasicUnits(numberArr[0],true)
        }

        resultText += ' mil ';

        if(numberArr[1] > 0){
            resultText += getBasicUnits(numberArr[1])
        }
    }

    if(numberArr.length === 3){

        if(numberArr[0]>1){
            resultText = getBasicUnits(numberArr[0], true) + ' millones ';
        }else{
            resultText = 'Un millon ';
        };

        if(numberArr[1]>0){
            if(numberArr[1] > 1){
                resultText += getBasicUnits(numberArr[1], true) + ' ';
            };
            
            resultText += 'mil ';
        };

        if(numberArr[2]>0){
            resultText += getBasicUnits(numberArr[2])
        }
    };

    if(numberArr.length === 4){

        if(numberArr[0]>1){
            resultText += getBasicUnits(numberArr[0], true) + ' ';
        }

        resultText+='mil ';

        if(numberArr[1]>0){
            resultText += getBasicUnits(numberArr[1], true) + ' ';
        };
        
        resultText += ' millones ';

        if(numberArr[2]>0){
            if(numberArr[2] > 1){
                resultText += getBasicUnits(numberArr[2], true) + ' ';
            };
            
            resultText += 'mil ';
        };

        if(numberArr[3]>0){
            resultText += getBasicUnits(numberArr[3])
        }

    };

    if(numberArr.length === 5){

        if(numberArr[0]>1){
            resultText+= getBasicUnits(numberArr[0],true) + ' billones '
        }else{
            resultText+= 'un billon'
        }

        if(numberArr[1]>0){
            if(numberArr[1]>1){
                resultText += getBasicUnits(numberArr[1], true);
            }
                resultText+= ' mil ';
        }

        if(numberArr[2]>0){
            resultText += getBasicUnits(numberArr[2], true) + ' millones ';
        };

        if(numberArr[3]>0){
            if(numberArr[3] > 1){
                resultText += getBasicUnits(numberArr[3], true) + ' ';
            };
            
            resultText += 'mil ';
        };

        if(numberArr[4]>0){
            resultText += getBasicUnits(numberArr[4])
        }
    };

    if(numberArr.length === 6){

        if(numberArr[0]>1){
            resultText+= getBasicUnits(numberArr[0],true);
        }
        
        resultText+= ' mil ';

        if(numberArr[1]>1){
            resultText+= getBasicUnits(numberArr[1],true);
        }
        
        resultText+= ' billones ';
        
        if(numberArr[2]>0){
            if(numberArr[2]>1){
                resultText += getBasicUnits(numberArr[2], true);
            }
                resultText += ' mil ';
        }

        if(numberArr[3]>0){
            resultText += getBasicUnits(numberArr[3], true) + ' millones ';
        };
 
        if(numberArr[4]>0){
            if(numberArr[4] > 1){
                resultText += getBasicUnits(numberArr[4], true) + ' ';
            };
            
            resultText += 'mil ';
        };

        if(numberArr[5]>0){
            resultText += getBasicUnits(numberArr[5])
        }
    }
    
    //returning the result

    resultText = resultText.trim();

    if (isNegative){
        resultText = 'Negativo ' + resultText;
    }

    return resultText;
}

export function numberToTextEN(){

}