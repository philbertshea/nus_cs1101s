/*
function bubblesort_list(L) {
    function helper(xs, count) {
        if (count > 1) {
        for (let i=0; i<count - 1; i = i + 1) {
            display(xs);
            const first = head(xs);
            const second = head(tail(xs));
            if (first > second) {
                set_head(xs, second);
                set_head(tail(xs), first);
            }
            xs = tail(xs);
        }
        helper(L, count - 1);
    }
    }
    helper(L, length(L));
}

function bubblesort_list(L) {
    const len = length(L);
    let xs = L;
    for (let i=len-1; i>=1; i=i-1) {
        for (let j=0; j<1; j=j+1) {
            const first = head(xs);
            const second = head(tail(xs));
            if (first > second) {
                set_head(xs, second);
                set_head(tail(xs), first);
            }
            xs = tail(xs);
        }
    }
}

function bubblesort_array(A) {
    const len = array_length(A);
    for (let i=len-1; i>=1; i=i-1) {
        for (let j=0; j<i; j=j+1) {
            if (A[j] > A[j+1]) {
                const temp = A[j];
                A[j] = A[j+1];
                A[j+1] = temp;
            }
        }
    }
}

const L = list(5, 4, 3, 2, 1, 9);
bubblesort_list(L);
L;


const mem = [];

function read(n, k) {
    display(n);
    return mem[n] === undefined
           ? undefined
           : mem[n][k];
}

function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    }
    mem[n][k] = value;
}

function first_denomination(kinds_of_coins) {
    return kinds_of_coins === 1 ?   5 :
           kinds_of_coins === 2 ?  10 :
           kinds_of_coins === 3 ?  20 :
           kinds_of_coins === 4 ?  50 :
           kinds_of_coins === 5 ? 100 : 0;
}

// The non-memoized version.
function cc(amount, kinds_of_coins) {
    return amount === 0
           ? 1
           : amount < 0 || kinds_of_coins === 0
           ? 0
           : cc(amount, kinds_of_coins - 1)
             +
             cc(amount - first_denomination(kinds_of_coins),
                kinds_of_coins);
}

// The memoized version.
// n is the amount in cents, and k is the number of denominations.
function mcc(n, k) {
    // Your solution here.
    if (n === 0) {
        return 1;
    } else if (n < 0 || k === 0) {
        return 0;
    } else if (read(n, k) !== undefined) {
        return read(n, k);
    } else {
        const result = mcc(n, k - 1)
                       +
                       mcc(n - first_denomination(k),
                             k);
        write(n, k, result);
        return result;
    }
    
}

// Answer:
function mcc(n, k) {
    if (n>=0 && k>=0 && read(n, k) !== undefined) {
        return read(n, k);
    }
}

mcc(365, 5);  // Expected result: 1730


function swap(M, i1, j1, i2, j2) {
    let temp = M[i1][j1];
    M[i1][j1] = M[i2][j2];
    M[i2][j2] = temp;
}
function rotate_90_right(M) {
    const rows = array_length(M);
    const cols = array_length(M[0]);
    const half_len = math_floor(cols/2);
    for (let i=0; i<rows; i=i+1) {
        for (let j=i+1; j<cols; j=j+1) {
            swap(M, i, j, j, i);
        }
    }
    for (let i=0; i<rows; i=i+1) {
        for (let j=0; j<half_len; j=j+1) {
            swap(M, i, j, i, cols - 1 - j);
        }
    }
    return M;
}

function rotate_180(M) {
    const rows = array_length(M);
    const cols = array_length(M[0]);
    const half_row = math_floor(rows/2);
    const half_col = math_floor(cols/2);
    for (let i=0; i<half_row; i=i+1) {
        for (let j=0; j<cols; j=j+1) {
            swap(M, i, j, rows - 1 - i, j);
        }
    }
    for (let i=0; i<rows; i=i+1) {
        for (let j=0; j<half_col; j=j+1) {
            swap(M, i, j, i, cols - 1 - j);
        }
    }
    return M;
}

function rotate(M) {
    const rows = array_length(M);
    const cols = array_length(M[0]);
    const half_row = math_floor(rows/2);
    const half_col = math_floor(cols/2);
    // Swap left half
    for (let i=0; i<rows; i=i+1) {
        for (let j=0; j<half_col; j=j+1) {
            swap(M, i, j, rows - 1 - i, j);
        }
    }
    // Swap right half
    for (let i=0; i<rows; i=i+1) {
        for (let j=half_col; j<cols; j=j+1) {
            rotate
        }
    }
}
const M = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
//rotate_90_right(M);
rotate_180(M);
M;
*/

function permutations(s) {
    return is_null(s)
           ? list(null)
           : accumulate(
               (x, ys) => x + ys, 
               null,
               map(x => 
                    map(p => pair(x, p),
                        permutations(remove(x, s))),
                   s));
}

function test(s) {
    return accumulate(
            (x, ys) => x + ys,
            0,
            s);
}
test(list(1));
// permutations(list(1));





