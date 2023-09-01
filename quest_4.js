const pair = (x, y) => f => f(x, y);

const head = p => p((x, y) => x);  // complete lambda expression
const tail = p => p((x, y) => y);  // complete lambda expression
/*
const increment_repeater =
    r => f => x => f(r(f)(x));  
const zero_repeater = f => x => x;
const decrement_repeater =
    repeater =>
        head(
            repeater(
                p => pair(tail(p), increment_repeater(tail(p)))
            )(pair(zero_repeater, zero_repeater))
       );
const twice = f => x => f(f(x));
const thrice = increment_repeater(twice);
const also_twice = decrement_repeater(thrice);
*/
const zero_repeater = f => x => x;
const one_repeater = f => x => f(zero_repeater, () => zero_repeater(f)(x));
const two_repeater = f => x => f(one_repeater, () => one_repeater(f)(x));
const three_repeater = f => x => f(two_repeater, () => two_repeater(f)(x));

const to_int = repeater => repeater((iter_count, x) => x() + 1)(0);

const increment_repeater = repeater => f => x => f(repeater, () => repeater(f)(x));

const add_repeaters = (repeater1, repeater2) => repeater1((iter_count, x) => increment_repeater(x()))(repeater2);
// f(one_repeater, () => one_repeater(f)(x));
// Treat code like an abstraction. Observe that when warn("ALERT")
// is called, code calls display(x) three times
// Just use this structure, adding a parenthesis () behind x 

const decrement_repeater = repeater => f => x => repeater(f)(x);

//const decrement_repeater = repeater => f => x => f();

display(to_int(decrement_repeater(three_repeater)));






const warn = three_repeater(
                (iter_count, x) => display(x()));
                
warn("ALERT"); // displays "ALERT" 3 times

//to_int(add_repeaters(two_repeater,
                     //three_repeater));  // should return 5

const bigwarn = increment_repeater(three_repeater)(
                                                    (iter_count, x) => display(x()));
const test = add_repeaters(three_repeater, two_repeater);
test((iter_count, x) => display(x()))("HI");

bigwarn("ALERT.");
// Let's try with one_repeater to see how it works.
// one_repeater((iter_count, x) => display(x()))("ALERT")
// ((iter_count, x) => display(x()))(zero_repeater, () => zero_repeater((iter_count, x) => display(x()))("ALERT"))
// display(zero_repeater((iter_count, x) => display(x()))("ALERT"))
// display((x => x)("ALERT"))
// display("ALERT")

// two_repeater(increment_repeater)(three_repeater)
// increment_repeater(one_repeater, () => one_repeater(increment_repeater)(three_repeater))