/*
Q1. Which one of these is a correct Source expression?  
Answer: 2 + 3
*/


/* Q2.
const two = 3;
const seven = 4;
const three = 7;
(two * three) + seven;

Answer: 25
*/

/*
Q3. We can declare names to refer to values by using Source's const keyword. For example, we could evaluate

const foo = 10;
to refer to the value 10 by the name foo. We can also use expressions to calculate the value. Therefore, with the statement

const bar = 10 + 20;
the name bar will refer to the value 30. Your task here is to declare a constant foobar, which refers to the sum of the values of foo and bar.
*/

const foo = 10;
const bar = 10 + 20;
// your solution goes here
const foobar = foo + bar;


/* 
Q4. We can declare names to refer to functions by using Source's function keyword. For example, we could evaluate

function foo() {
    return 10;
}
to declare the name foo to refer to a function with no parameter that always returns 10.

Declare a function bar with no parameter that always returns 20.
*/

// your solution goes here
function bar() {
    return 20;
}



/* Q5.

In the lecture, you have seen a function square as follows:

function square(x) {
    return x * x;
}
Declare a function square_of_difference with two number parameters that returns the square of the difference between the two numbers. For example, square_of_difference(2, 5) should return 9, which is the square of the difference 3 between 2 and 5.

Your square_of_difference function should apply the square function.

*/

function square(x) {
    return x * x;
}

// your solution goes here
function abs(x) {
    return x>=0 ? x : -x;
}
function square_of_difference(x, y) {
    return square(abs(x-y));
}