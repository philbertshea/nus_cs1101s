// Insertion Sort: List, Recursive
function insertion_sort(xs) {
    return is_null(xs)
           ? xs
           : insert(head(xs), insertion_sort(tail(xs)));
}
function insert(x, xs) {
    return is_null(xs)
           ? list(x)
           : x <= head(xs)
           ? pair(x, xs)
           : pair(head(xs), insert(x, tail(xs)));
}

// Selection Sort: Recursive
function selection_sort(xs) {
    if (is_null(xs)) {
        return xs;
    } else {
        const x = smallest(xs);
        return pair(x, selection_sort(remove(x, s)));
    }
}
function smallest(xs) {
    return accumulate((x, y) => x < y ? x : y, head(xs), tail(xs));
}

// Merge Sort: Recursive
function merge_sort(xs) {
    if (is_null(xs)) {
        return xs;
    } else {
        const mid = math_floor(length(xs)/2);
        const left_wish = merge_sort(take(xs, mid));
        const right_wish = merge_sort(drop(xs, mid));
        return merge(left_wish, right_wish);
    }
}
function merge(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else {
        const x = head(xs);
        const y = head(ys);
        return x < y 
               ? pair(x, merge(tail(xs), ys))
               : pair(y, merge(xs, tail(ys)));
    }
}
function take(xs, n) {
    return n === 0
           ? null
           : pair(head(xs), take(tail(xs), n-1));
}
function drop(xs, n) {
    return n === 0
           ? xs
           : drop(tail(xs), n - 1);
}

// Normal Append
// Create new pairs in xs and reuse pairs in ys
function append(xs, ys) {
    return is_null(xs)
           ? ys
           : pair(head(xs), append(tail(xs), ys));
}

// Destructive Append: Recursive
// Change the original values of xs and ys
function d_append(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else {
        const wish = d_append(tail(xs), ys);
        set_tail(xs, wish);
        return xs;
    }
}

const a = list(1, 3, 5);
const b = list(2, 4);
const c = append(a, b); // creates 3 new pairs and reuses b. a and b are still the same
const d = d_append(a, b); // no new pairs created. a is now the same as d. b is still the same

// Normal Map
function map(f, xs) {
    return is_null(xs)
           ? xs
           : pair(f(head(xs)), map(f, tail(xs)));
}

// Destructive Map: No Return
function d_map(f, xs) {
    if (!is_null(xs)) {
        set_head(xs, head(xs));
        d_map(f, tail(xs));
    }
}

// Destructive Map: With Return
function d_map(f, xs) {
    if (is_null(xs)) {
        return xs;
    } else {
        const wish = d_map(f, tail(xs));
        set_head(xs, f(head(xs)));
        set_tail(xs, wish);
        return xs;
    }
}

// Normal filter
function filter(pred, xs) {
    return is_null(xs)
           ? xs
           : pred(head(xs))
           ? pair(head(xs), filter(pred, tail(xs)))
           : filter(pred, tail(xs));
}

// Destructive Filter: With Return
function d_filter(pred, xs) {
    if (is_null(xs)) {
        return xs;
    } else {
        const wish = d_filter(pred, tail(xs));
        if (pred(head(xs))) {
            set_tail(xs, wish);
            return xs;
        } else {
            return wish;
        }
    }
}

// Reverse Array

// Linear Search: Array
function linear_search(A, v) {
    const len = array_length(A);
    let i = 0;
    while (i<len && A[i] !== v) {
        i = i + 1;
    }
    // Return true if found, else return false
    return (i<len);
    // Return index if found, else return -1
    return (i<len) ? i : -1;
}

// BINARY SEARCH ONLY WORKS FOR SORTED ARRAYS!!
// Binary Search: Array, Recursive
function binary_search(A, v) {
    function search(low, high) {
        if (low < high) {
            return false;
        } else {
            const mid = math_floor((low + high)/2);
            return (v === A[mid]) // return true if found
                   ||
                   (v < A[mid]
                    ? search(low, mid - 1)
                    : search(mid + 1, high));
        }
    }
}

// Alternative Binary Search
// search_low: low,mid-1  |  search_high: mid+1,high  |  not_found: low>high
function binary_search(A, v) {
    let low = 0;
    let high = array_length(A) - 1;
    while (low <= high) {
        const mid = math_floor((low + high) / 2);
        if (v === A[mid]) {
            break;
        } else if (v < A[mid]) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return (low <= high);
}

// Selection Sort: Array
function selection_sort(A) {
    const len = array_length(A);
    for (let i=0; i<len-1; i=i+1) {
        let min_pos = find_min_pos(A, i, len-1);
        swap(A, j, min_pos);
    }
}

function swap(A, x, y) {
    // MUST pass in A
    const temp = A[x];
    A[x] = A[y];
    A[y] = temp;
}

function find_min_pos(A, low, high) {
    let min_pos = low;
    for (let j = low + 1; j <= high; i = i + 1) {
        if (A[j] < A[min_pos]) {
            min_pos = j;
        }
    }
}


// Insertion Sort: Array
function insertion_sort(A) {
    const len = array_length(A);
    for (let i=1; i<len; i = i + 1) {
        let j = i-1;
        while (j>=0 && A[j] > A[j+1]) {
            swap(A, j, j+1);
            j = j - 1;
        }
    }
}