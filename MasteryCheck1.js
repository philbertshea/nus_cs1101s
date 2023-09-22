// Scope Question
// RA Flashbacks
function w(x) { // takes in 10 as x: but x is never used
    const w = x => x + 1; // the x here refers to lambda parameter
    
    return x => (y, z) => w(x + y + n); // x here refers to lambda parameter
    //     1    (2, 3)       (x => x + 1)(1 + 2 + 20)  // w comes from inside, n comes from outside
}

const x = 1; // Constant declaration
const n = 20;
//display(w(10)(1)(2, 3));




// Higher Order Functions Question

function sum(term, a, next, b) {
    // idea of passing in functions as arguments
    // as well as returning functions as return values
    
    // sum takes in the range endpoints [a and b]
    // as well as lambda functions term and next
    return a > b
           ? 0
           : term(a) + sum(term, next(a), next, b);
}

function sum_of_alternate_squares(a, b) {
    return sum(x => x * x, a, x => x + 2, b);
}
display(sum_of_alternate_squares(1, 3)); 
// returns 1^2 + 3^2

// leibniz formula for pi -> 1 - 1/3 + 1/5 - 1/7 + ... = pi/4
function alternating_reciprocal(n) {
    return n % 4 === 1      
           ? 1 / n          // 1, 5, 9...
           : -1 / n;        // 3, 7, 11...
}

function leibniz(n) {
    return sum(alternating_reciprocal, 1, x => x + 2 , n * 2);
}

// Increase the value of n to increase precision
// n corresponds to number of terms
//display(4 * leibniz(1000)); 

// If f refers to a function, what is the difference between g(f) and g(f(2))?

// g = func => ; f = 
// g = x => ; f = x => 
function f(y) {
    return x => x + y;
}


// Iterative and Recurve Process Question

function factorial_r(n) {
    // Recursive Factorial: n * applied OUTSIDE of recursive call
    // gives rise to a chain of deferred operations
    return n <= 1
           ? 1
           : n * factorial_r(n - 1) * factorial_r(n - 2);
}
factorial_r(3);
// 3 * factorial_r(2) * factorial_r(1)
// 3 * (2 * factorial_r(1) * factorial_r(0)) * factorial_r(1)
// 3 * (2 * 1 * factorial_r(0)) * factorial_r(1)
// 3 * (2 * factorial_r(0)) * factorial_r(1)
// 3 * (2 * 1) * factorial_r(1)
// 3 * 2 * factorial_r(1)

// 6 * factorial_r(1)
// 6 * 1
// 6

// 3 * 2 * 1
// 6

// 5 * factorial(4)
// 5 * (4 * (3 * (2 * 1))) returns 120
//display(factorial_r(5));

function factorial_i(n) {
    // Iterative factorial: By placing the computation inside 
    // the recursively-called iter function, we ensure that
    // the computation is done BEFORE the recursive call
    // and stored as an argument in the function
    // Therefore, there is no chain of deferred operations
    function iter(result, count) {
        return count > n
               ? result
               : iter(count * result, count + 1);
    }
    return iter(1, 1);
}

// iter(1 * 1, 1 + 1)
// iter(1, 2)
// iter(2 * 1, 2 + 1)
// iter(2, 3)
// iter(2 * 1, 3)
// iter(3 * 2, 4)
// iter(4 * 6, 5)
// iter(5 * 24, 6)
// iter(120, 6) returns 120

function f(g) { 
    g(2000);
    return 3; } 
f(x => 1 + 2);

//display(factorial_i(5));