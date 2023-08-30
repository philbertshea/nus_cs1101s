// Understanding Compound Lambda and Compound Functions

// There are two arrows here. 
// twice takes in some function f and returns x => f(f(x))
const twice = f => x => f(f(x));
const plus_one = x => x + 1;

// Apply twice on plus_one (f => x =>       f      (      f    (x)))(x => x + 1)
// Replace f with x => x + 1     x => (x => x + 1)((x => x + 1)(x))
// twice(plus_one) returns       x => plus_one    (plus_one    (x))
display(twice(plus_one));

// Apply twice on plus_one ((f => x =>       f      (      f    (x)))(x => x + 1))(1)
// Replace f with x => x + 1     (x => (x => x + 1)((x => x + 1)(x)))(1)
//                                A     C    C       B    B      A
// Replace xA with 1                   (x => x + 1)((x => x + 1)(1))

// Replace xB with 1                   (x => x + 1)(      1 + 1)
// Evaluate 1+1                        (x => x + 1)(2)
//                                      C    C 
// Replace xC with 2                         2 + 1
// twice(plus_one)(1) returns                3
display(twice(plus_one)(1));

const twice_2 = f => (x => f(f(x)));
// The additional parenthesis AT THE BACK makes no difference to the implementation
display(twice_2(plus_one));
display(twice_2(plus_one)(1));

// const twice_3 = (f => x) => f(f(x));
// This gives Syntax Error. Cannot add parenthesis containing => BEFORE another =>

// Similarly, we can stack three arrows as such:
// thrice takes in some function f and returns x => y => f(f(f(y)))
const thrice = f => (g, h) => x => f(g(h(x)));
const double = x => 2*x;
const minus_two = x => x - 2;

// Apply thrice on plus_one (f => (g, h) => x =>      f      (      f    (x)))(x => x + 1)
// Replace f with x => x + 1      (g, h) => x => (x => x + 1)((x => x + 1)(x))
// thrice (plus_one) returns      (g, h) => x => plus_one    (plus_one    (x))
display(thrice(plus_one));

// display(thrice(plus_one)(double));
// Error: Expected two arguments, got one.

display(thrice(plus_one)(double, minus_two));
