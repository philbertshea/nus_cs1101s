// Q1

const DONT_CARE = undefined; // Ignore this, do not edit.

// When thinking about base cases,
// do the simplest thing possible
// and leave the hard work to the computer.

function choose(n, r) {
    return (n < r || n < 0 || r < 0) // Change this condition.
           ? 0
           : (r === n || r === 0) // Change this condition.
	       ? 1
           : DONT_CARE; // DO NOT EDIT.
}


// Q2

// Suppose you need to choose R items from N items.
// Consider the first item.
// - We can either choose it, or not choose it.

// If we choose the first item:
// - How many more items must we choose from the remaining N - 1 items?
const CHOOSE_FIRST_ITEM = choose(N - 1, R - 1); // Edit arguments only.
// Example: choose(N + 4, R - 7);

// If we don't choose the first item:
// - How many more items must we choose from the remaining N - 1 items?
const NOT_CHOOSE_FIRST_ITEM = choose(N - 1, R); // Edit arguments only.

// Express your answers in terms of choose, N and R.
// They have been pre-declared.



// Q3

function choose(n, r) {
    return (n < r || n < 0 || r < 0) // Change this condition.
           ? 0
           : (r === n || r === 0) // Change this condition.
	       ? 1
           // Inductive case goes here.
           : choose(n - 1, r) + choose(n - 1, r - 1); // YOUR SOLUTION HERE.
}

/* CONCEPT:
1. Build the base cases first. When is 0 returned, and when is 1 returned?
2. Build the inductive case. 
- The number of ways to choose r out of n objects is the SUM of:
Case 1. the number of ways to choose r-1 out of n-1 objects (first object chosen)
AND
Case 2. the number of ways to choose r out of n-1 objects (first object NOT chosen)

--> Note that this process REDUCES the value of n 
--> Hence, we can progressively reach the base cases.
*/



// Q4
// Sum the first n odd natural numbers.
function sum_odd(n) {
    // YOUR SOLUTION HERE
    const term = x => x;
    const a = 1;
    const next = x => x + 2;
    const b = 2 * n - 1;
    return sum(term, a, next, b);
}



// Q5

// Sum the first n odd numbers less than or equal to n.
function sum_odd_lte(n) {
    // YOUR SOLUTION HERE
    const term = x => x;
    const a = 1;
    const next = x => x + 2;
    return sum(term, a, next, n);
}


// Q6

function accumulate(combiner, term, a, next, b, base) {
    // YOUR SOLUTION HERE
    return a > b
           ? base
           : combiner(
               term(a), 
               accumulate(combiner, term, next(a), next, b, base));
}

// Example uses:

// function sum(term, a, next, b) {
//   return accumulate( (x, y) => x + y, term, a, next, b, 0);
// }

// function product(term, a, next, b) {
//   return accumulate( (x, y) => x * y, term, a, next, b, 1);
// }

// function fact(n) {
//     return product(x => x, 1, x => x + 1, n);
// }