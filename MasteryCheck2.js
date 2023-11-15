// Q1: Environment of Programs
function f(x) {
    let y = 0;
    while (y < 3) {
        const x = y + 1;
        y = y + 1;
    }
    return x + y;
}

let x = 50;
f(100);

/*      Global      | --- |
                    ^
        Program     f:= func_obj (->prog)
                    x: 50
                    ^
        f           x: 100
                    ^
        Block       y: 3    <----------------       <----------------
                    ^                       ^                       ^
        Block       x:= 1        Block      x:= 2        Block      x:= 3

Return 100 + 3 = 103
*/


// Q2: Memoisation

// Memoised Fibonacci
const mem = []; 
function mfib(n) {
    if (mem[n] !== undefined) {
        return mem[n];          // If found stored value, return that
    } else {
        const result = n<=1 ? n : mfib(n-1) + mfib(n-2); 
        mem[n] = result;        // Write result into mem
        return result;          
    }
}
mfib(3);

// Q3: Streams

const altones = pair(1, () => pair(-1, () => altones)); // Streams: Alternating Ones

function stream_map(f, s) {    // Lazy   
    return is_null(s) 
            ? null
            : pair(f(head(s)), 
                    () => stream_map(f, stream_tail(s)));
}
stream_map(x => x+1, altones);

function eval_stream(s, n) {    // Not Lazy
    return n === 0 ? null
            : pair(head(s), eval_stream(stream_tail(s), n - 1));
}

function add_streams(s1, s2) {  // Lazy
    return is_null(s1) ? s2
            : is_null(s2) ? s1
            : pair(head(s1) + head(s2),
                () => add_streams(stream_tail(s1), stream_tail(s2)));
}

const zeros = add_streams(altones, stream_tail(altones));
eval_stream(zeros, 5);