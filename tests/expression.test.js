const { parseDecimalExpression } = require("../src/index.js");
const Decimal = require('decimal.js');

describe('Decimal.js Expression Parser', () => {

    describe('Basic Operations', () => {
        test('adds two numbers', () => {
            expect(parseDecimalExpression('2 + 3').toString()).toBe(new Decimal(2).plus(new Decimal(3)).toString());
        });

        test('subtracts two numbers', () => {
            expect(parseDecimalExpression('5 - 2').toString()).toBe(new Decimal(5).minus(new Decimal(2)).toString());
        });

        test('multiplies two numbers', () => {
            expect(parseDecimalExpression('4 * 2').toString()).toBe(new Decimal(4).mul(new Decimal(2)).toString());
        });

        test('divides two numbers', () => {
            expect(parseDecimalExpression('10 / 2').toString()).toBe(new Decimal(10).div(new Decimal(2)).toString());
        });

        // test('modulus of two numbers', () => {
        //     expect(parseDecimalExpression('10 % 3').toString()).toBe(new Decimal(10).mod(new Decimal(3)).toString());
        // });

        test('mixed operations with precedence', () => {
            expect(parseDecimalExpression('2 + 3 * 4').toString()).toBe(new Decimal(2).plus(new Decimal(3).mul(new Decimal(4))).toString());
        });

        test('overrides precedence with parentheses', () => {
            expect(parseDecimalExpression('(2 + 3) * 4').toString()).toBe(new Decimal(2).plus(new Decimal(3)).mul(new Decimal(4)).toString());
        });

        test('complex expression', () => {
            // const expression = '3 + 4 * 2 / (1 - 5) % 3';
            const expression = '3 + 4 * 2 / (1 - 5)';
            const result = new Decimal(3).plus(new Decimal(4).mul(new Decimal(2)).div(new Decimal(1).minus(new Decimal(5))));
            expect(parseDecimalExpression(expression).toString()).toBe(result.toString());
        });
    });

    // describe('Power Function', () => {
    //     test('calculates power of a number', () => {
    //         expect(parseDecimalExpression('2 pow 3').toString()).toBe(new Decimal(2).pow(new Decimal(3)).toString());
    //     });

    //     test('power of zero', () => {
    //         expect(parseDecimalExpression('0 pow 5').toString()).toBe(new Decimal(0).toString());
    //     });

    //     test('zero power of any number', () => {
    //         expect(parseDecimalExpression('5 pow 0').toString()).toBe(new Decimal(1).toString());
    //     });
    // });

    // describe('Square Root', () => {
    //     test('calculates square root of a number', () => {
    //         expect(parseDecimalExpression('sqrt 16').toString()).toBe(new Decimal(4).toString());
    //     });

    //     test('square root of zero', () => {
    //         expect(parseDecimalExpression('sqrt 0').toString()).toBe(new Decimal(0).toString());
    //     });
    // });

    // describe('Trigonometric Functions', () => {
    //     test('sine function', () => {
    //         expect(parseDecimalExpression('sin 90').toString()).toBe(new Decimal(Math.sin(90)).toString());
    //     });

    //     test('cosine function', () => {
    //         expect(parseDecimalExpression('cos 0').toString()).toBe(new Decimal(Math.cos(0)).toString());
    //     });

    //     test('tangent function', () => {
    //         expect(parseDecimalExpression('tan 45').toString()).toBe(new Decimal(Math.tan(45)).toString());
    //     });
    // });

    // describe('Logarithmic Function', () => {
    //     test('natural logarithm', () => {
    //         expect(parseDecimalExpression('log 1').toString()).toBe(new Decimal(0).toString());
    //     });

    //     test('logarithm of e', () => {
    //         expect(parseDecimalExpression('log 2.718').toString()).toBe(new Decimal('1').toString());
    //     });
    // });

    // describe('Absolute Value', () => {
    //     test('absolute value of a positive number', () => {
    //         expect(parseDecimalExpression('abs 5').toString()).toBe(new Decimal(5).toString());
    //     });

    //     test('absolute value of a negative number', () => {
    //         expect(parseDecimalExpression('abs -5').toString()).toBe(new Decimal(5).toString());
    //     });

    //     test('absolute value of zero', () => {
    //         expect(parseDecimalExpression('abs 0').toString()).toBe(new Decimal(0).toString());
    //     });
    // });

    // describe('Complex Expressions', () => {
    //     test('combination of operations', () => {
    //         const expression = '3 + abs -5 * sqrt 16 / (1 - sin 30)';
    //         const result = new Decimal(3).plus(new Decimal(5).mul(new Decimal(4)).div(new Decimal(1).minus(new Decimal(Math.sin(30)))));
    //         expect(parseDecimalExpression(expression).toString()).toBe(result.toString());
    //     });
    // });
});
