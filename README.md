# Decimal.js Expression Parser

This library provides a JavaScript template string tag function for parsing and evaluating arithmetic expressions using Decimal.js. It supports arbitrary precision arithmetic, making it ideal for financial calculations, scientific computation, and anywhere precision matters. The library handles arithmetic operations, precedence, and parentheses within the template strings.

## Features

- **Arbitrary Precision**: Utilize Decimal.js for high-precision calculations.
- **Easy Syntax**: Use standard JavaScript template literals for expressions.
- **Operator Support**: Includes support for `+`, `-`, `*`, and `/` operators.
- **Parentheses Handling**: Correctly interprets parentheses to respect precedence in mathematical expressions.

## Usage

To use the Decimal.js Expression Parser, import it in your JavaScript file:

### Basic Expressions

You can perform basic arithmetic operations using the template string syntax:

```javascript
const decimal = require('decimal-script');
const Decimal = require('decimal.js');

const sum = decimal`10 + 20`;
console.log(sum.toString());  // '30'
```

### Complex Expressions with Precedence and Parentheses

The library handles complex expressions with multiple operators and parentheses:

```javascript
const decimal = require('decimal-script');
const Decimal = require('decimal.js');
const four = 4;
const two = new Decimal(2);

const complex = decimal`3 + ${four} * ${two} / (1 - 5)`;
console.log(complex.toString());
```

## License

This project is licensed under the MIT License
