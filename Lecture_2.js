import {heart, show, sail, rcross, nova, stack_frac, quarter_turn_right} from "rune";

const heartsail = stack_frac(0.5, heart, sail);
// returns a stacked image where 50% is the heart and 50% is the sail.
// i.e. returns the same result as stack(heart, sail)

show(heartsail);

const rcrossnova = stack_frac(0.2, rcross, nova);
// returns a stacked image where 20% is the rcross and 80% is the nova.

show(rcrossnova);

const trisection = stack_frac(1/3, heart, 
stack_frac(1/2, heart, heart));
// Evaluate the INNER stack_frac first. 
// INNER stack_frac returns a 50/50 stacked heart-heart = hh
// THEN, evaluate the OUTER stack_frac.
// Outer stack_frac stacks heart (33%) with the hh (66%)
// Hence, this returns a final image with 3 hearts, each heart having 33% of the picture.

const quadrisection = stack_frac(1/4, heart, 
stack_frac(1/3, heart, 
stack_frac(1/2, heart, heart)));
// Creates a final image with 4 hearts, each heart having 25% of the image.

show(trisection);
show(quadrisection);

// My attempt: Linear, Recursive Process 
function stackn(n, rune) {
    return n===1 ? rune : stack_frac(1/n, rune, stackn(n-1, rune));
}
// From 1/4 --> 1/3 --> 1/2 --> heart

show(stackn(6, heart));

// My attempt: Linear, Iterative Process
function stackn_i(n, rune) {
    function sect_iter_i(result, count) {
    return count>n ? result : sect_iter_i(stack_frac(1/count, rune, result), count+1);
}
    return sect_iter_i(rune, 2);
}

show(stackn_i(6, sail));


// Define repeat_pattern
/*
repeat_pattern(3, make_cross, sail);
            Should Lead to
make_cross(make_cross(make_cross(sail)));
*/


// My attempt: Linear, Recursive Process
function repeat_pattern(n, func, rune) {
    // Call func n times on the rune
    return n===0 ? rune : func(repeat_pattern(n-1, func, rune));
}

show(repeat_pattern(3, quarter_turn_right, heart));

// My attempt: Linear, Iterative Process
function repeat_pattern_i(n, func, rune) {
    function repeat_iter_i(result, count) {
        return count===0 ? result : repeat_iter_i(func(result), count-1);
    }
    return repeat_iter_i(rune, n);
}

show(repeat_pattern_i(2, quarter_turn_right, heart));


// Define Fibonacci

// My attempt: Linear, Recursive Process
function fibonacci(n) {
    return n===1 ? 1 : n * fibonacci(n-1);
}
// My attempt: Linear, Iterative Process
function fibonacci_i(n) {
    function fib_iter(result, count) {
        return count===1 ? result : fib_iter(count*result, count-1);
    }
    return fib_iter(1, n);
}

display(fibonacci(4));
display(fibonacci_i(5));