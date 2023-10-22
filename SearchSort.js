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
// 2 | 13 | 26 | 40j <-> 8i
// 2 | 13 | 26j <-> 8 | 40 
// 2 | 13j <-> 8 | 26 | 40   
// 2j </> 8 | 13 | 26 | 40   
// 2 | 8 | 13 | 26 | 40
function insertion_sort(A) {
    const len = array_length(A);
    for (let i=1; i<len; i = i + 1) { // Start from i=1 (2nd element)
        let j = i-1;                  // Let j point to previous element
        while (j>=0 && A[j] > A[j+1]) { // while j is bigger than j+1
            swap(A, j, j+1);            // Swap j and j+1
            j = j - 1;                  // Decrement j, i.e. compare the swapped element with the next left element
        }       
    }
}
// Note that in each while-swap, we are pushing the value of original A[i]
// Back by one index, then comparing it with the next left item
// We can save A[i] value as x, then push the left values right instead

// Insertion Sort: Array. In-Place, Destructive
// 2 | 13 | 26 | 40j -> 8i   x=8
// 2 | 13 | 26j -> 40 | 40   x=8
// 2 | 13j -> 26 | 26 | 40   x=8
// 2j \> 13 | 13 | 26 | 40   x=8
// 2 | 8 | 13 | 26 | 40
function insertion_sort(A) {
    const len = array_length(A);
    for (let i=1; i<len; i=i+1) {
        const x = A[i];             // Save the value of x
        let j = i-1;                // Let j point to the left element
        while(j>=0 && A[j]>x) {     // While the j element is larger than x
            A[j+1] = A[j];          // Copy value of j element to j+1 element
            j = j - 1;              // Decrement j by 1: Search for the left element
        }
        A[j+1]=x;
    }
}


// Merge Sort: Array. No Return. In-Place, Destructive
// Because of No Return, we can skip returning values in base cases
function merge_sort(A) {
    merge_sort_helper(A, 0, array_length(A) - 1);
}
function merge_sort_helper(A, low, high) {
    if (low<high) {
        const mid = math_floor((low + high)/2);
        merge_sort_helper(A, low, mid);
        merge_sort_helper(A, mid + 1, high);
        merge(A, low, mid, high);
    }
}
function merge(A, low, mid, high) {
    const B = [];
    let left = low;     // left points to first element of Left Half    [low to mid]
    let right = mid + 1;// right points to first element of Right Half  [mid+1 to high]
    let x = 0;
    
    while (left<=mid && right<=high) { // While Neither Half has finished iterating
        if (A[left] <= A[right]) {  // If first element of left half <= right half
            B[x] = A[left];         // Assign B[x] the value of A[left]
            left = left + 1;        // Left points to the next element
        } else {
            B[x] = A[right];        // Assign B[x] to the value of A[right]
            right = right + 1;      // Right points to the next element
        }                           
        x = x + 1;                  // In each round, increment x by one
    }
    // Above while loop terminates when either left half or right half has finished iterating
    // We need to assign the remaining values
    
    while (left<=mid) {             // Assign the remaining values in left half to B
        B[x] = A[left];
        x = x + 1;
        left = left + 1;
    }
    
    while (right<=high) {           // Assign the remaining values in right half to B
        B[x] = A[right];
        x = x + 1;
        right = right + 1;
    }
    
    for (let k=0; k<high-low+1; k=k+1) {
        A[low+k] = B[k];            // Copy these results back to A
    }
}

// Memoised Fibonacci
const mem = [];
function mfib(n) {
    if (mem[n] !== undefined) { // If mem[n] stored, return it directly
        return mem[n];
    } else {
        const result = n<=1 ? n : mfib(n-1) + mfib(n-2); 
        // Else using the fibonacci formula, return base case or recursive call
        mem[n] = result;        // Store result in mem[n]
        return result;          // Return result
    }
}

// Memoization
function memoize(f) {
    const mem = [];
    function mf(x) {
        if (mem[x] !== undefined) {
            return mem[x];
        } else {
            const result = f(x); // If not applied carefully, this will call the non-memoised version
            mem[x] = result;
            return result;
        }
    }
    return mf;
}
const mfib = memoize(n => n<=1 ? n
                               : mfib(n-1) + mfib(n-2));
                               
// Copy Array before doing Sort, if Qn says do not change original A
function copy(A) {
    for (let i=0; i<array_length(A); i=i+1) {
        B[i] = A[i];
    }
    return B;
}

                             