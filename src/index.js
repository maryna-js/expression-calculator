function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace(/ /g,'');
    const checkBrackets = () => {
        let counter = 0;

        for (var k=0; k < expr.length; ++k) {
            if (expr[k] === '(' ) {counter++;}
            if ((expr[k] === ')' )) {
                counter--;
                //if (counter<0 ) {throw new Error("ExpressionError: Brackets must be paired")}
            }
        }
        return counter === 0;
    
    };
    if (!checkBrackets()) {throw new Error("ExpressionError: Brackets must be paired");}
    //split for parentheses
    const split = (expr, operator) => {

        const result = [];
        let brackets = 0;
        let current = "";
        
        for (let i=0; i<expr.length; ++i) {
            const brack = expr[i];
            if (brack == '(' ) {brackets++;}
            else if (brack == ')') {brackets--;}
            
            if (brackets == 0 && operator == brack) {
                result.push(current);
                current = "";} 
            else current += brack;
        }
        if (current != "") {
            result.push(current);}
        
        return result;
    };
        //parse by division
        const parseByDivision = (expr) => {
            const numberString = split(expr, '/');
            const numbers = numberString.map(noStr => {
                if (noStr[0] == '(' && noStr[noStr.length-1] == ')') {
                    const exprs = noStr.substr(1, noStr.length - 2);
                    // recursive call to the main function
                    return parseByPlus(exprs);
                }
                
                
                return +noStr;});
            const initialValue = numbers[0];
            const result = numbers.slice(1).reduce((acc, no) => {
                if (no === 0) {throw "TypeError: Division by zero.";}
                
                else {
                return acc / no;}}, initialValue);
            return result;
        };
    //parse by * and / operator
    const parseByMultiple = (expr) => {
        const numberString = split(expr, '*');
        const numbers = numberString.map(noStr => {
            if (noStr[0] == '(' && noStr[noStr.length-1] == ')') {
                const exprs = noStr.substr(1, noStr.length - 2);
                // recursive call to the main function
                return parseByPlus(exprs);
            }
            
            
            return parseByDivision(noStr)});
        const initialValue = 1.0;
        const result = numbers.reduce((acc, no) => acc * no, initialValue);
        return result;
    };


    //   parse by -,*,/ operator
    const parseBySubstr = (expr) => {
        const numberString = split(expr, '-');
        const numbers = numberString.map(noStr => parseByMultiple(noStr));
        const initialValue = numbers[0];
        const result = numbers.slice(1).reduce((acc, no) => acc - no, initialValue);
        return result;
    };

    // parse by +,-,*/ operator 
    const parseByPlus = (expr) => {
        const numberString = split(expr, '+');
        const numbers = numberString.map(noStr => parseBySubstr(noStr));
        const initialValue = 0.0;
        const result = numbers.reduce((acc, no) => acc + no, initialValue);
        return result;
    };

    const result = parseByPlus(expr, '+');
    return result;

}

module.exports = {
    expressionCalculator
}