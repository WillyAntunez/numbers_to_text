export function numberToText(number){

    const specialNumbers = {
        'once': 11,
        'doce': 12,
        'trece': 13,
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
    },
        decimals = {
        'décima': 1,
        'centésima': 2,
        'milésima': 3,
        'diezmilésima': 4,
        'cienmilésima': 5,
        'millonésima' : 6,
        'diezmillonésima': 7,
        'cienmillonésima': 8,
        'milmillonésima': 9,
        'diezmilmillonésima': 10,
        'cienmilmillonésima': 11,
        'billonesima': 12
    };

    let resultText = '',
        intArr,
        decimalArr,
        fullNumber = number,
        isNegative = false;

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
            if(result.indexOf('veintiuno')>0){
                result = result.replace('uno', 'ún')
            }else{
                result = result.replace('uno', 'un')
            }
        }

        return result;
    }

    function transformToText(numberArr) {

        let resultText = '';

        function getThousands(){
            if(numberArr[0] > 1){
                resultText += getBasicUnits(numberArr[0], true) + ' ';
            };
            if(numberArr[0] >= 1){
                resultText += 'mil ';
            }
    
            numberArr.shift();
        };
    
        function getMillions(singular, plural){
            if(numberArr[0] === 1 && resultText === ''){
                resultText += `un ${singular} `
            }else{
                if(numberArr[0]>=1){
                    resultText += getBasicUnits(numberArr[0], true);
                }
                resultText += ` ${plural} `
            }
    
            numberArr.shift();
        };

        if(numberArr.length>=10){
            getThousands();
        };
    
        if(numberArr.length>=9){
            getMillions('cuatrillon', 'cuatrillones')
        };
    
        if(numberArr.length>=8){
            getThousands();
        };
    
        if(numberArr.length>=7){
            getMillions('trillon', 'trillones');
        };
    
        if(numberArr.length>=6){
            getThousands();
        };
        
        if(numberArr.length>=5){
            getMillions('billon', 'billones')
        };
        
        if(numberArr.length>=4){
            getThousands();
        };
    
        if(numberArr.length>=3){
            getMillions('millon', 'millones');
        };
    
        if(numberArr.length>=2){
            getThousands();
        };
    
        if(numberArr[0]>=1 && numberArr.length>=1){
            resultText += getBasicUnits(numberArr[0]);
        };
    
        if(numberArr[0] === 0 && resultText === ''){
            resultText = 'cero'
        };    

        return resultText;
    }

    if(fullNumber.charAt(0) === '-'){
        isNegative = true;
        fullNumber = fullNumber.replace('-', '');
    }

    if(fullNumber.charAt(0) === '0'){
        fullNumber = fullNumber.replace(/^0+/, '');
    } 

    if(fullNumber.includes('.')){
        fullNumber = fullNumber.split('.');
    
        intArr = fullNumber[0];
        if(intArr === ''){
            intArr = '0';
        }

        decimalArr = fullNumber[1];
        decimalArr = decimalArr.replace(/0+$/, '');
        decimalArr = decimalArr.replace(/^0+/, '');
        if(decimalArr === ''){
            decimalArr = '0';
        }
        
        intArr = splitNumber(intArr);
        decimalArr = splitNumber(decimalArr);
    }else{
        intArr = fullNumber;
        if(intArr === ''){
            intArr = '0';
        };
        intArr = splitNumber(intArr);
    }

    if(decimalArr && decimalArr[0] !== 0){
        resultText = transformToText(intArr);

        if(decimalArr.length === 1 && decimalArr[0] === 1){
            resultText += ' con una '
        }else{
            resultText += ' con ' + transformToText(decimalArr).replace('uno', 'un') + ' ';
        }
        resultText += getKeyByValue(decimals, fullNumber[1].length);

        if(decimalArr[0]>1){
            resultText += 's';
        } 
    }else{
        resultText = transformToText(intArr);
    }

    if(isNegative){
        resultText = 'negativo ' + resultText;
    }

    resultText = resultText.trim();

    resultText = resultText.split('');
    resultText[0] = resultText[0].toUpperCase();
    resultText = resultText.join('');

    resultText+= '.'

    return resultText;
}
