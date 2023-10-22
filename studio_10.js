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

mcc(365, 5);  // Expected result: 1730
