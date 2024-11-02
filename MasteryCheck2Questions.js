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

// Fill up the below to show the environment after running the above code.

/*      Global      | --- |
                    ^
        Program     f:= func_obj (->prog)
                    
                    ...

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

// What happens if I remove the line "mem[n] = result"?

// Q3: Streams

const altones = pair(1, () => pair(-1, () => altones)); // O(?)

function stream_map(f, s) { 
    return is_null(s) 
            ? null
            : pair(f(head(s)), 
                    () => stream_map(f, stream_tail(s)));
}
stream_map(x => x+1, altones);          // O(?)

function eval_stream(s, n) {    
    return n === 0 ? null
            : pair(head(s), eval_stream(stream_tail(s), n - 1));
}

eval_stream(zeros, 5);                  // O(?)