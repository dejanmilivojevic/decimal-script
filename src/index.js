const Decimal = require('decimal.js');

const operators = {};

function addOperator(operator, precedence, fn, argCount = 2) {
    operators[operator] = {
        precedence: precedence,
        operation: fn,
        argCount: argCount
    };
}

addOperator('+', 1, (a, b) => a.plus(b));
addOperator('-', 1, (a, b) => a.minus(b));
addOperator('*', 2, (a, b) => a.mul(b));
addOperator('/', 2, (a, b) => a.div(b));
// addOperator('sin', 3, (a) => new Decimal(a).sin(), 1);

function tokenize(expression) {
    const regex = /\d+\.?\d*|[+/*-]|\(|\)|\w+/g;
    return expression.match(regex);
}

function infixToPostfix(tokens) {
    const stack = [];
    const output = [];
    tokens.forEach(token => {
        if (!isNaN(parseFloat(token))) {
            output.push(token);
        } else if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            stack.pop();
        } else if (operators[token]) {
            while (stack.length && (stack[stack.length - 1] in operators) && operators[token].precedence <= operators[stack[stack.length - 1]].precedence) {
                output.push(stack.pop());
            }
            stack.push(token);
        }
    });

    while (stack.length) {
        output.push(stack.pop());
    }
    return output;
}

function evaluatePostfix(postfixTokens, precision) {
    const stack = [];
    postfixTokens.forEach(token => {
        if (!isNaN(parseFloat(token))) {
            stack.push(new Decimal(token));
        } else if (operators[token]) {
            const op = operators[token];
            const args = [];
            for (let i = 0; i < op.argCount; i++) {
                args.unshift(stack.pop());
            }
            stack.push(op.operation(...args));
        }
    });
    return stack.pop().toDecimalPlaces(precision);
}

function parseDecimalExpression(expression, precision) {
    const tokens = tokenize(expression);
    const postfix = infixToPostfix(tokens);
    return evaluatePostfix(postfix, precision);
}

function decimal(...args) {
    if (typeof args[0] === 'number') {
        const precision = args[0];
        return function (strings, ...expressions) {
            return evaluateDecimalExpression(strings, expressions, precision);
        };
    } else {
        return evaluateDecimalExpression(args[0], Array.prototype.slice.call(args, 1), Decimal.precision);
    }
}

function evaluateDecimalExpression(strings, expressions, precision) {

    const expression = strings.reduce((acc, str, i) => {
        let expr = expressions[i] !== undefined ? (expressions[i] instanceof Decimal ? expressions[i] : new Decimal(expressions[i])).toString() : '';
        return acc + str + expr;
    }, '');

    const result = parseDecimalExpression(expression, precision);
    return result;
}

module.exports = { parseDecimalExpression, decimal, addOperator };
