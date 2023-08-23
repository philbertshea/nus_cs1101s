import {heart, quarter_turn_right, show} from "rune";

// Substitution Model

const cost_per_meter = 199.95;

function circumference(radius) {
    return 2 * math_PI * radius;
}

function cost_of_circular_handrail(r) {
    return cost_per_meter * circumference(r);
}

display(cost_of_circular_handrail(2.1));

// Substitution Model for Runes
function turn_upside_down(rune) {
    return quarter_turn_right(quarter_turn_right(rune));
}

function quarter_turn_left(rune) {
    return quarter_turn_right(turn_upside_down(rune));
}

show(quarter_turn_left(heart));

// Repeat Pattern : Recursive Process
function square(x) {
    return x * x;
}

function repeat_pattern_r(n, pat, init) {
    return n===0 ? init : pat(repeat_pattern_r(n-1, pat, init)); 
}

// Repeat Pattern : Iterative Process
function repeat_pattern_i(n, pat, result) {
    return n===0 ? result : repeat_pattern_i(n-1, pat, pat(result));
}

display(repeat_pattern_r(3, square, 10));
display(repeat_pattern_i(3, square, 10));

// Factorial: Recursive Process
function factorial_r(n) {
    return n===1 ? 1 : n*factorial_r(n-1);
}

// Factorial: Iterative Process
function factorial_i(n) {
    return fact_iter(1, 1, n);
}

function fact_iter(product, counter, n) {
    return counter > n ? product : fact_iter(counter*product, counter+1, n);
}

display(factorial_r(4));
display(factorial_i(4));

// Fibonacci: Recursive Process
function fibonacci_r(n) {
    return n<=1 ? n : fibonacci_r(n-1) + fibonacci_r(n-2);
}

// Fibonacci: Iterative Process
function fibonacci_i(n) {
    return fib_iter(1,0,n);
}
function fib_iter(a, b, count) {
    return count === 0 ? b : fib_iter(a+b, a, count-1);
}

display(fibonacci_r(5));
display(fibonacci_i(5));