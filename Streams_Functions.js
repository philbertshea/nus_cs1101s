// Streams
// A stream is EITHER an empty list (null) OR a pair whose tail is a nullary function that returns a stream

const s1 = null;
const s2 = pair(1, () => null);
const s3 = pair(1, () => pair(-1, () => s3)); // infinite stream, alternating ones

function stream_tail(s) {
    // Calls the tail and returns the stream given by the nullary function
    return tail(s)();
}

function stream_ref(s, n) {     // Θ(n) Get nth element
    return n === 0 ? head(s)
                    : stream_ref(stream_tail(s), n-1);
}

function stream_map(f, s) {     // Θ(1) Apply f to each element
    return is_null(s) ? null
            : pair(f(head(s)), 
                    () => stream_map(f, stream_tail(s)));
}

function stream_map_opt(f, s) { // Memoized Stream Map
    return is_null(s) ? null
            : pair(f(head(s)), 
                    memo_fun(() => stream_map_opt(f, stream_tail(s))));
}
function stream_filter(p, s) {  // Θ(n) Apply filter p on elements
    return is_null(s) ? null
            : p(head(s))
            ? pair(head(s), () => stream_filter(p, stream_tail(s)))
            : stream_filter(p, stream_tail(s));
}

function eval_stream(s, n) {    // Θ(n) Print n elements in a list
    return n === 0 ? null
            : pair(head(s), eval_stream(stream_tail(s), n - 1));
}

function enum_stream(low, hi) {     // [low, [low+1, ... [hi, null]]]
    return low > hi ? null
            : pair(low, 
                    () => enum_stream(low + 1, hi));
}

function integers_from(n) {         // [n, [n+1, ... inf]]
    return pair(n, () => integers_from(n+1));
}

// No Fours Application
const pos_int = integers_from(1);
const no_fours = stream_filter(x => x % 4 !== 0, pos_int); // [1, 2, 3, 5, 6, 7, 9 ...]
const y = stream_map(x => x * 10, no_fours);    // [10, 20, 30, 50, ...]
stream_ref(no_fours, 3); // Return 5
eval_stream(y, 5); // Return list(10, 20, 30, 50, 60)

// Fibonacci Numbers with Streams
function fib_gen(a, b) {
    return pair(a, () => fib_gen(b, a + b));
}
const fibs = fib_gen(0, 1); // 0, 1, 1, 2, 3, 5, ... 

// More and More: 1, 1, 2, 1, 2, 3, ...
function more(a, b) {   // a is current, b is target
    return a > b ? more(1, 1 + b)
            : pair(a, () => more(a + 1, b));
}

const more_and_more = more(1, 1); // 1, 1, 2, 1, 2, 3, ...


// More Streams Functions
function add_streams(s1, s2) {  // Add ith element of s1 to ith element of s2
    return is_null(s1) ? s2
            : is_null(s2) ? s1
            : pair(head(s1) + head(s2),
                    () => add_streams(stream_tail(s1),
                                      stream_tail(s2)));
}

function mul_streams(s1, s2) { // Multiply ith element of s1 by ith element of s2
    return is_null(s1) ? s2
            : is_null(s2) ? s1
            : pair(head(s1) * head(s2),
                    () => mul_streams(stream_tail(s1),
                                      stream_tail(s2)));
}

function scale_stream(s, f) {  // Multiply each element by f
    return stream_map(x => x * f, s);
}

function replace(s, a, b) {     // Replace all instances of a with b
    return is_null(s) ? null
            : pair((head(s) === a) ? b : head(s),
                () => replace(stream_tail(s), a, b));
}

function list_to_inf_stream(xs) { // Convert list to infinite stream
    function helper(ys) {
        return is_null(ys) 
                ? helper(xs)
                : pair(head(ys), () => helper(tail(ys)));
    }
    return is_null(xs) ? null : helper(xs);
}

// MEMOISATION FOR STREAMS
function memo_fun(fun) {
    let already_run = false;
    let result = undefined;
    function mfun() {
        if (!already_run) {
            result = fun();
            already_run = true;
            return result;
        } else {
            return result;
        }
    }
    return mfun;
}

// Memoized ms displays only ONCE
function ms(m, s) {
    display(m);
    return s;
}
const onesA = pair(1, () => ms("A", onesA));
const onesB = pair(1, memo_fun(() => ms("B", onesB)));
stream_ref(onesA, 3); // "A" "A" "A"
stream_ref(onesB, 3); // "B"


function m_integers_from(n) {
    return pair(n, memo_fun(() => ms("M: " + stringify(n), 
                                        m_integers_from(n+1))));
}
const m_integers = m_integers_from(1);
stream_ref(m_integers, 3);  // "M: 1" "M: 2" "M: 3"
stream_ref(m_integers, 5);  // "M: 4" "M: 5"

// Stream of Primes
const primes = pair(2, () => stream_filter(is_prime, int_from(3)));

// After printing each element starting from 2, 
// Filter away the multiples of the printed element in the remaining items
// This also removes the element itself, hence the sieve behind starts with another prime
function sieve(s) {
    return pair(head(s), 
                () => sieve(stream_filter(
                            x => x % head(s) !== 0, stream_tail(s))));
}

// Square Roots by Newton's Method
function improve(guess, x) {
    return average(guess, x/guess);
}
function good_enough(guess, x) {
    return math_abs(guess - x) < 0.01;
}
function sqrt_iter(guess, x) {
    if (good_enough(guess, x)) {
        return guess;
    } else {
        return sqrt_iter(improve(guess, x), x)
    }
}
function sqrt(x) {
    return sqrt_iter(1.0, x);
}

// Use Streams for Iteration
function sqrt_stream(x) {
    // Assign to some Constant, and call it Within itself.
    // ACTS ON ITSELF!
    const p = pair(1.0, () => stream_map(guess => improve(guess, x), p));
    return p;
}
eval_stream(sqrt_stream(2), 6);

// Approximate PI
function pi_summands(n) {
    return pair(1/n, () => stream_map(x => -x, pi_summands(n+2)));
}
const pi_stream = scale_stream(partial_sums(pi_summands(1)), 4);

// Partial Sums: s0, s0+s1, s0+s1+s2, ...
// E.g. partial_sums(1, 2, 3, 4...) gives 1, 3, 6, 10...
function partial_sums(s) {
    function helper(s, acc) {
        acc = acc + head(s);
        return pair(acc, () => helper(stream_tail(s), acc));
    }
    return helper(s, 0);
}
function partial_sums_2(s) {
    return pair(head(s), () => stream_map(x => x + head(s), 
                                            partial_sums(stream_tail(s))));
}
function partial_sums_3(s) {
    return add_streams(s, pair(0, () => partial_sums_3(s)));
}

// Prompt Stream
function make_prompt_stream() {
    return pair(prompt("Enter next stream element: "), make_prompt_stream);
}
const prompt_stream = make_prompt_stream();

// N of N Stream: 1, 2, 2, 3, 3, 3, 4, 4, 4, 4...
function n_of_n_stream() {
    function helper(n, count) {
        return count >= n  
                ? pair(n+1, () => helper(n+1, 1))
                : pair(n, () => helper(n, count+1));
    }
    return helper(1, 0);
}

// Shorten Stream: shorten(integers, 3) --> 1, 2, 3
function shorten_stream(s, k) {
    if (is_null(s) || k === 0) {
        return null;
    } else {
        return pair(head(s), () => shorten_stream(stream_tail(s), k-1));
    }
}

// Alternate Count: Every kth element
function every_k(s, k) {
    function helper(count, ys) {
        return count % k === 0
                ? pair(head(ys), () => helper(count + 1, stream_tail(ys)))
                : helper(count + 1, stream_tail(ys));
    }
    return helper(0, s);
}

// Array to Stream: [1, 2, 3] to stream 1, 2, 3
function array_to_stream(a) {
    const len = array_length(a);
    function helper(count) {
        return count === len
               ? null
               : pair(a[count], () => helper(count + 1));
    }
    return helper(0);
}

// Loop Stream
function loop(s) {
    // your solution goes here
    function helper(xs) {
        return is_null(stream_tail(xs)) 
                ? pair(head(xs), () => helper(s))
                : pair(head(xs), () => helper(stream_tail(xs)));
    }
    return helper(s);
}

// Stream Combine: Applies f(x, y) onto every element of s1 and s2
function stream_combine(f, s1, s2) {
    // your solution goes here
    return pair(f(head(s1), head(s2)), 
                () => stream_combine(f, stream_tail(s1), stream_tail(s2)));
}
// Zip Two Streams
function zip_streams(s1, s2) {
    function helper(xs, ys, gets1) {
        return gets1
                ? pair(head(xs), () => helper(stream_tail(xs), ys, !gets1))
                : pair(head(ys), () => helper(xs, stream_tail(ys), !gets1));
    }
    return helper(s1, s2, true);
}

// Zip List of Streams: Wishful Thinking
function zip_list_of_streams(ss) {  // ss is list(s1, s2, s3...)
    return pair(head(head(ss)),
                () => zip_list_of_streams(append(tail(ss), list(head(ss))))); // Shift first list behind
}