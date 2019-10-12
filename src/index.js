function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace(/ /g,'');
    //split for parentheses
    const split = (expr, operator) => {
        const result = [];
        let counter = 0;
        let current = "";
        
        for (let i=0; i<expr.length; ++i) {
            const brack = expr[i];
            if (brack == '(' ) {counter++;}
            else if (brack == ')') {counter--;}
            if (counter == 0 && operator == brack) {
                result.push(current);
                current = "";} 
            else current += brack;
        }
        if (current != "") {
            result.push(current);}
        if (counter != 0 && counter & 1 == 1 ) {throw 'ExpressionError: Brackets must be paired';}
        
        return result;
    };
        //parse by division
        const parseByDivision = (expr) => {
            const numberString = split(expr, '/');
            const numbers = numberString.map(noStr => {
                if (noStr[0] == '(') {
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
            if (noStr[0] == '(') {
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