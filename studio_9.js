/*
function d_filter(pred, xs) {
    let temp = null;
    let result = null;
    
    // First item
    if (is_null(xs)) {
        return xs;
    } else {
        if (pred(head(xs))) {
            result = xs;
            temp = xs;
            xs = tail(xs);
        } else {
            temp = tail(xs);
            result = tail(xs);
            set_tail(xs, null);
            xs = temp;
        }
        
    } 
    
    while (!is_null(xs)) {
        if (!pred(head(xs))) {
            set_tail(temp, tail(xs));
            // set_tail(xs, null);
            temp = tail(temp);
            xs = temp;
        } else {
            xs = tail(xs);
        }
    }
    return result;
}

// Wishful Thinking
function d_filter_2(pred, xs) {
    if (is_null(xs)) {
        return xs;
    } else {
        const wish = d_filter_2(pred, tail(xs));
        if(pred(head(xs))) {
            set_tail(xs, wish);
        } else {
            // set_tail(xs, null);
            xs = wish;
        }
        return xs;
    }
}
const L = list(1, 2, 3, 4, 5, 6, 7, 8, 9, 11);
display(d_filter_2(x => x % 2 === 0, L));
L;


function d_filter_3(pred, xs) {
    while (!is_null(xs)) {
        if (!pred(head(xs))) {
            
        }
    }
}

let a = 10;
function foo(x) {
    let b = 0;
    function goo(x) {
        let a = 30;
        if (x <= 2) {
            a = a + x;
            b = b + x;
            // Breakpoint #4
        } else {
            // Breakpoint #3
            goo(x - 1);
        }
    }
    a = a + x;
    b = b + x;
    // Breakpoint #2
    goo(3);
}
// Breakpoint #1
foo(1);
// Breakpoint #5
*/

function count_pairs(x) {
    if (!is_pair(x)) {
        return 0;
    } else {
        return 1 + count_pairs(head(x)) + count_pairs(tail(x));
    }
}

const four_a = pair(null, null);
const four_b = pair(four_a, four_a);
const four = pair(four_b, null);
count_pairs(four);

const seven = pair(four_b, four_b);
count_pairs(seven);

const inf = list(1,2,3);
set_tail(tail(tail(inf)), inf);

function count_pairs_2(x) {
    // Array Method
    let pairs_seen = [];
    function helper(x) {
        if (!is_pair(x)) {
            return 0;
        } else {
            if (check(x)) {
                return 0;
            } else {
                pairs_seen[array_length(pairs_seen)] = x;
                return 1 + helper(head(x)) + helper(tail(x));
            }
        }
    }
    function check(x) {
        for (let i=0; i<array_length(pairs_seen); i = i + 1) {
            if (pairs_seen[i] === x) {
                return true;
            }
        }
        return false;
    }
    return helper(x);
}

count_pairs_2(inf);


function count_pairs_3(x) {
    // Array Method
    let pairs_seen = null;
    function helper(x) {
        if (!is_pair(x)) {
            return 0;
        } else {
            if (!is_null(member(x, pairs_seen))) {
                return 0;
            } else {
                pairs_seen = pair(x, pairs_seen);
                return 1 + helper(head(x)) + helper(tail(x));
            }
        }
    }
    return helper(x);
}
count_pairs_3(inf);


const A = [];
A[0][0];
