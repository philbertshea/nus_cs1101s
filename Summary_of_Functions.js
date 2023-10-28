// Wishful Thinking: 
function a(n) {
    if (n === 0) {
        return 0; // Base Case
    } else {
        const wish = a(n-1);
        return pair(x, wish); // Act on the wish
    }
}
// Recursive Fibonacci  Time Θ(2^n)  Space Θ(n) 
function fib(n) {
    return n<=1 ? n : fib(n-1) + fib(n-2);
}
// Recursive Factorial  Time Θ(n)  Space Θ(n) 
function factorial(n) {
    return n<=1 ? 1 : n * factorial(n-1);
}
// Iterative

// Rick-The-Rabbit: How many ways to hop/skip/jump up n steps
function rick_the_rabbit(n) {
    return n<0 ? 0 
           : n===0 ? 1
           : rick_the_rabbit(n-1) // Rick Hops - 1 step
             + rick_the_rabbit(n-2) // Rick Skips - 2 steps
             + rick_the_rabbit(n-3); // Rick Jumps - 3 steps
}

// Count Change 
function first_denom(kinds) {
    return kinds === 1 ? 5
           : kinds === 2 ? 10
           : kinds === 3 ? 20
           : kinds === 4 ? 50
           : kinds === 5 ? 100 : 0;
}

function cc(amount, kinds) {
    return amount === 0 ? 1
           : amount < 0 || kinds === 0 ? 0
           : cc(amount - first_denom(kinds), kinds) // Use the first coin
             + cc(amount, kinds - 1); // Do not use the first coin
}

// High-Order: Sum of terms from a to b inclusive
// Recursive Sum  Time Θ(n)  Space Θ(n) 
function sum(term, a, next, b) {
    return a > b
           ? 0
           : term(a) 
             + sum(term, next(a), next, b);
}

// Iterative Sum  Time Θ(n)  Space Θ(1) 
function sum(term, a, next, b) {
    // For Iterative, use a function to store accumulator/result and count
    function iter(result, count) {
        return count > b    // End with count>b
               ? result     // Return result
               : iter(term(count) + result,
                      next(count));
    }
    return iter(0, a); // Start with result=0, count=a
}

// Sum Skip Cubes using Sum: a^3 + (a+2)^3 + ... + b^3
function sum_skip_cubes(a, b) {
    const cube = x => x*x*x;
    const plus_two = x => x+2;
    return sum(cube, a, plus_two, b);
}

//              1
//          1       1
//      1       2       1
// Pascal on Row and Pos
function pascal(row, pos) {
    return pos === 0 || pos === row
           ? 1
           : pascal(row - 1, pos - 1)
             + pascal(row - 1, pos);
}

// Recursive Length Time Θ(n)  Space Θ(n) 
function length(xs) {
    return is_null(xs) ? 0
           : 1 + length(tail(xs));
}

// Iterative Length Time Θ(n)  Space Θ(1) 
function length(xs) {
    function iter(ys, count) {
        return is_null(ys) 
                ? count
                : iter(tail(ys), count+1);
    }
    return iter(xs, 0);
}

// Recursive Append Time Θ(len(xs))  Space Θ(len(xs)) 
function append(xs, ys) {
    return is_null(xs) 
            ? ys
            : pair(head(xs), append(tail(xs), ys));
}

// Recursive Reverse Time Θ(n^2)  Space Θ(n^2)
function reverse(xs) {
    return is_null(xs)
            ? null
            : append(reverse(tail(xs)), list(head(xs)));
}

// Iterative Reverse Time Θ(n)  Space Θ(1)
function reverse(xs) {
    function iter(orig, rev) {
        return is_null(orig)
                ? rev
                : iter(tail(orig), pair(head(orig), rev));
    }
    return iter(xs, null);
}

// Normal Map
function map(f, xs) {
    return is_null(xs)
           ? xs
           : pair(f(head(xs)), map(f, tail(xs)));
}

// Map-Dependent Functions
const copy_list = xs => map(x=>x, xs);
const scale_list = (k, xs) => map(x=>k*x, xs);
const square_list = xs => map(x=>x*x, xs);

// Normal filter
function filter(pred, xs) {
    return is_null(xs)
           ? xs
           : pred(head(xs))
           ? pair(head(xs), filter(pred, tail(xs)))
           : filter(pred, tail(xs));
}

// Filter-Dependent Functions
const even_num = xs => filter(x => x%2===0, xs);
const greater_than_k = (k, xs) => filter(x => x>k, xs);

function accumulate(op, initial, xs) {
    return is_null(xs)
            ? initial
            : op(head(xs), accumulate(op, initial, tail(xs)));
}

// Accumulate-Dependent Functions
const list_sum = xs => accumulate((x, y) => x+y, 0, xs);