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

// Apply thrice on plus_one (f => (g, h) => x =>      f      (g(h(x)))(x => x + 1)
// Replace f with x => x + 1      (g, h) => x => (x => x + 1)(g(h(x)))
// thrice (plus_one) returns      (g, h) => x => plus_one    (g(h(x)))
display(thrice(plus_one));

// display(thrice(plus_one)(double));
// Error: Expected two arguments, got one.

// When double and minus_two are evaluated, we put them at the back of the expression, waiting to be substituted in.
//                           (f => (g, h) => x =>      f      (     g       (   h       (x)))(x => x + 1)(x => 2 * x, x => x - 2)
// Replace f with x => x + 1       (g, h) => x => (x => x + 1)(     g       (   h       (x)))(x => 2 * x, x => x - 2)
// Replace g with x => 2 * x  AND  h with x => x - 2  IN THE SAME STEP (they are paired parameters)
// This is returned and saved in y:          x => (x => x + 1)((x => 2 * x)((x => x - 2)(x)))
const y = thrice(plus_one)(double, minus_two);
display(y);

//                       A     D    D       C        C   B    B      A     
// Apply y to input 5   (x => (x => x + 1)((x => 2 * x)((x => x - 2)(x))))(5)
// Replace xA with 5          (x => x + 1)((x => 2 * x)((x => x - 2)(5)))
// Replace xB with 5          (x => x + 1)((x => 2 * x)(      5 - 2))
// Evaluate 5 - 2             (x => x + 1)((x => 2 * x)(      3))
// Replace xC with 3          (x => x + 1)(      2 * 3)
// Evaluate 2 * 3             (x => x + 1)(      6)
// Replace xD with 6                6 + 1
// Evaluate 6 + 1                   7
display(y(5));

// Involve Functions
function a(x,y) {
    // The x and y parameter is NEVER USED!
    // x in f(g(h(x))) references parameter of lambda
    return f => (g, h) => x => f(g(h(x)));
}

// x and y taken in by a DOES NOT HAVE ANY EFFECT. They are NOT used.
// However, we MUST quote a(x, y) to call it successfully
// Replace a(-10, 20) with lambda

// a(-10, 20)                       (plus_one)(double, minus_two)(5)
// (f => (g, h) => x => f(g(h(x)))) (plus_one)(double, minus_two)(5)
// Returns 7
display(a(-10, 20)(plus_one)(double, minus_two)(5));

// 22/23 RA Q3
function fun(x) {
    return t => (u, v) => (x => 2 * x)(t + u + v + x);
}