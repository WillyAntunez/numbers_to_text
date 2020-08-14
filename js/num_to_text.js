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
    },
        thousand = 1000,
        million = 1000000;
        
    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    function getTenPart(num){
        let out,
            unitPart = num % 10,
            tenPart = (Math.floor(num / 10)) * 10;

        if(num <= 10){
            out = getKeyByValue(unitNumbers, num);
        }else if( num > 10 && num <= 29){
            out = getKeyByValue(specialNumbers, num);
        }else if(num > 29 && unitPart !== 0){
            out = getKeyByValue(tenNumbers, tenPart) + ' y ' + getKeyByValue(unitNumbers, unitPart);
        }else if(num > 29 && unitPart === 0){
            out = getKeyByValue(tenNumbers, tenPart);
        }

        return out;
    }

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

    function getThousandUnits(num) {
        let result,
            thousandPart = Math.floor(num / 1000),
            basicUnitsPart = num % 1000;

        if(num > 2000 && basicUnitsPart !== 0){
            result  = getBasicUnits(thousandPart,true) + ' mil ' + getBasicUnits(basicUnitsPart);
        }

        if(num > 2000 && basicUnitsPart === 0){
            result  = getBasicUnits(thousandPart,true) + ' mil ';
        }

        if(num > 1000 && num < 2000 && basicUnitsPart !== 0){
            result = 'mil ' + getBasicUnits(basicUnitsPart);
        }

        if(num === 1000){
            result = 'mil ';
        } 

        return result;
    }

    function getMillionUnits(num) {
        let result,
            millionPart = Math.floor(num / 1000000),
            unitPart = num % 1000000;
        
        if (millionPart < 1000 && millionPart > 1){
            result = getBasicUnits(millionPart, true) + ' millones ';
        }
        if (millionPart >= 1000 && millionPart > 1){
            result = getThousandUnits(millionPart) + ' millones ';
        }
        if (millionPart === 1){
            result = 'un millon '
        }

        if(unitPart<1000 && unitPart!=0){
            result += getBasicUnits(unitPart)
        }
        if(unitPart>1000 && unitPart!=0){
            result += getThousandUnits(unitPart)
        }

        return result;
    }

    
    console.log(getMillionUnits(999999999999))
    
}

export function numberToTextEN(){



}