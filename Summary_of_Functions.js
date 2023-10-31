// Wishful Thinking: 
function a(n) {
    if (n === 0) {
        return 0; // Base Case
    } else {
        const wish = a(n-1);
        return pair(x, wish); // Act on the wish
    }
}
// Recursive Fibonacci  Time Θ(2^n)  Space Θ(n) 
function fib(n) {
    return n<=1 ? n : fib(n-1) + fib(n-2);
}
// Recursive Factorial  Time Θ(n)  Space Θ(n) 
function factorial(n) {
    return n<=1 ? 1 : n * factorial(n-1);
}
// Iterative

// Rick-The-Rabbit: How many ways to hop/skip/jump up n steps
function rick_the_rabbit(n) {
    return n<0 ? 0 
           : n===0 ? 1
           : rick_the_rabbit(n-1) // Rick Hops - 1 step
             + rick_the_rabbit(n-2) // Rick Skips - 2 steps
             + rick_the_rabbit(n-3); // Rick Jumps - 3 steps
}

// Count Change 
function first_denom(kinds) {
    return kinds === 1 ? 5
           : kinds === 2 ? 10
           : kinds === 3 ? 20
           : kinds === 4 ? 50
           : kinds === 5 ? 100 : 0;
}

function cc(amount, kinds) {
    return amount === 0 ? 1
           : amount < 0 || kinds === 0 ? 0
           : cc(amount - first_denom(kinds), kinds) // Use the first coin
             + cc(amount, kinds - 1); // Do not use the first coin
}

// High-Order: Sum of terms from a to b inclusive
// Recursive Sum  Time Θ(n)  Space Θ(n) 
function sum(term, a, next, b) {
    return a > b
           ? 0
           : term(a) 
             + sum(term, next(a), next, b);
}

// Iterative Sum  Time Θ(n)  Space Θ(1) 
function sum_i(term, a, next, b) {
    // For Iterative, use a function to store accumulator/result and count
    function iter(result, count) {
        return count > b    // End with count>b
               ? result     // Return result
               : iter(term(count) + result,
                      next(count));
    }
    return iter(0, a); // Start with result=0, count=a
}

// Sum Skip Cubes using Sum: a^3 + (a+2)^3 + ... + b^3
function sum_skip_cubes(a, b) {
    const cube = x => x*x*x;
    const plus_two = x => x+2;
    return sum(cube, a, plus_two, b);
}

//              1
//          1       1
//      1       2       1
// Pascal on Row and Pos
function pascal(row, pos) {
    return pos === 0 || pos === row
           ? 1
           : pascal(row - 1, pos - 1)
             + pascal(row - 1, pos);
}

// Recursive Length Time Θ(n)  Space Θ(n) 
function length(xs) {
    return is_null(xs) ? 0
           : 1 + length(tail(xs));
}

// Iterative Length Time Θ(n)  Space Θ(1) 
function length_i(xs) {
    function iter(ys, count) {
        return is_null(ys) 
                ? count
                : iter(tail(ys), count+1);
    }
    return iter(xs, 0);
}

// Recursive Append Time Θ(len(xs))  Space Θ(len(xs)) 
function append(xs, ys) {
    return is_null(xs) 
            ? ys
            : pair(head(xs), append(tail(xs), ys));
}

// Recursive Reverse Time Θ(n^2)  Space Θ(n^2)
function reverse(xs) {
    return is_null(xs)
            ? null
            : append(reverse(tail(xs)), list(head(xs)));
}

// Iterative Reverse Time Θ(n)  Space Θ(1)
function reverse_i(xs) {
    function iter(orig, rev) {
        return is_null(orig)
                ? rev
                : iter(tail(orig), pair(head(orig), rev));
    }
    return iter(xs, null);
}

// Normal Map
function map(f, xs) {
    return is_null(xs)
           ? xs
           : pair(f(head(xs)), map(f, tail(xs)));
}

// Map-Dependent Functions
const copy_list = xs => map(x=>x, xs);
const scale_list = (k, xs) => map(x=>k*x, xs);
const square_list = xs => map(x=>x*x, xs);

// Normal filter
function filter(pred, xs) {
    return is_null(xs)
           ? xs
           : pred(head(xs))
           ? pair(head(xs), filter(pred, tail(xs)))
           : filter(pred, tail(xs));
}

// Filter-Dependent Functions
const even_num = xs => filter(x => x%2===0, xs);
const greater_than_k = (k, xs) => filter(x => x>k, xs);

function accumulate(op, initial, xs) {
    return is_null(xs)
            ? initial
            : op(head(xs), accumulate(op, initial, tail(xs)));
}

// Accumulate-Dependent Functions
const list_sum = xs => accumulate((x, y) => x+y, 0, xs);
const flatten = xs => accumulate(append, null, xs);

function map(f, xs) {
    return accumulate((x, ys) => pair(f(x), ys), null, xs);
}
function filter(pred, xs) {
    return accumulate((x, ys) => pred(x) 
                                ? pair(x, ys) 
                                : ys, 
                        null, xs);
}
function filtered_accumulate(pred, op, initial, xs) {
    return accumulate((x, ys) => pred(x) 
                                ? op(x, ys) 
                                : ys, 
                       initial, xs);
}

// A Tree of <numbers> is a list whose elements are <numbers> OR trees of <numbers>
// list(1, 2, 3, 4) | null | list(list(1, 2), 3, 4)

// Count items in tree: list(list(1, 2), 3, 4)
function count_data_items(tree) {
    if (is_null(tree)) {
        return 0;
    } else if (is_list(head(tree))) {
        return count_data_items(head(tree)) + count_data_items(tail(tree));
    } else {
        return 1 + count_data_items(tail(tree));
    }
}

// Map for Tree
function map_tree(f, tree) {
    return map(sub_tree => 
                !is_list(sub_tree)  // Use is_pair for efficiency
                ? f(sub_tree)
                : map_tree(f, sub_tree),
               tree);
}

// Tree Sum
function tree_sum(tree) {
    return is_null(tree)
            ? 0
            : !is_pair(head(tree))
            ? head(tree) + tree_sum(tail(tree))
            : tree_sum(head(tree)) + tree_sum(tail(tree));
}

// Accumulate for Tree
function accumulate_tree(f, op, initial, tree) { 
    // f applies to each item, op acts between item and existing accumulated value
    const fun = (x, ys) => !is_pair(x) 
                            ? op(f(x), ys)
                            : op(accumulate_tree(f, op, initial, x), ys);
    return accumulate(fun, initial, tree);
}

// Dependent Functions
const count_data_items = tree => accumulate_tree(x => 1, (x, y) => x + y, 0, tree);
const tree_sum = tree => accumulate_tree(x => x, (x, y) => x + y, 0, tree);
const flatten = tree => accumulate(x => list(x), append, null, tree);

// Remove Duplicates
function remove_duplicates(xs) {
    return accumulate((x, ys) => is_null(member(x, ys))
                                    ? pair(x, ys) : ys,
                        null, xs);
}

function remove_duplicates_first(xs) {
    return accumulate((x, ys) => pair(x, remove_duplicates(filter(z => z!==x, ys))),
                        null, xs);
}
remove_duplicates_filter(list(1, 2, 1, 3, 4, 5, 1));

// Make Up Amount
function makeup_amount(x, coins) {
    if (x === 0) {
        return list(null);
    } else if (x < 0 || is_null(coins)) {
        return null;
    } else {
        const combi_A = makeup_amount(x, tail(coins)); // Do not use first coin
        const combi_B = makeup_amount(x - head(coins), tail(coins));
        const combi_C = map(x => pair(head(coins), x), combiB); // Use the first coin
        return append(combi_A, combi_C);
    }
}

// Permutations
function permutations(s) {
    return is_null(s)
            ? list(null)
            : accumulate(append, null, 
                map(x => 
                    map(p => pair(x, p),
                        permutations(remove(x, s))), s));
}


// Accumulate for Binary Search Tree
function accumulate_bst(op, initial, bst) {
    if (is_null(bst)) {
        return initial;
    } else {
        const left_wish = accumulate_bst(op, initial, left_subtree(bst));
        const right_wish = accumulate_bst(op, initial, right_subtree(bst));
        const x = value_of(bst);
        return op(left_wish, op(x, right_wish));
    }
}

// Last Comes First
function last_comes_first(xs) {
    if (is_null(xs)) {
        return xs;
    } else {
        const wish = last_comes_first(tail(xs));
        return pair(head(wish), pair(head(xs), tail(wish)));
    }
}

// List Sorting

// Insertion Sort: List, Recursive
// 2 | 13 | 26 | 40 | 8x  [8x]
// 2 | 13 | 26 | 40x      [40x > 8] --> [8, 40]
// 2 | 13 | 26x           [26x > 8, 40] --> [8, 26x < 40] --> [8, 26, 40]
// 2 | 13x                [13x > 8, 26, 40] --> [8, 13 < 26, 40] --> [8, 13, 26, 40]
// 2x                     [2x < 8, 13, 26, 40] --> [2, 8, 13, 26, 40]

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

// Insertion Sort with Compare
function insertion_sort_cmp(xs, cmp) {
    return is_null(xs) ? xs
            : insert_cmp(head(xs),
                         insertion_sort_cmp(tail(xs), cmp),
                         cmp);
}
function insert_cmp(x, xs, cmp) {
    return is_null(xs) ? list(x)
            : cmp(x, head(xs)) 
            ? pair(x, xs)
            : pair(head(xs), insert_cmp(x, tail(xs), cmp));
}

// Insertion_sort_cmp Functions
insertion_sort_cmp(list(6, 3, 8, 5, 1), (x,y) => x <= y); // 1 3 5 6 8
insertion_sort_cmp(list(6, 3, 8, 5, 1), (x,y) => x >= y); // 8 6 5 3 1
insertion_sort_cmp(list(6, 3, 8, 5, 1), (x,y) => false);  // 1 5 8 3 6


// Selection Sort: Recursive
// 2s | 13 | 26 | 40 | 8      [2, ..]
//      13 | 26 | 40 | 8s     [2, 8, ..]
//      13s| 26 | 40          [2, 8, 13, ..]
//           26s| 40          [2, 8, 13, 26, ..]
//                40s         [2, 8, 13, 26, 40]
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
//  13 | 2   |   26 | 40 | 8
// [13 | 2]     [26    |  40 | 8]     
// [13] c [2]   [26]     [40 | 8]
// [2 | 13]     [26]     [40] c [8]
// [2 | 13]     [26]  c  [8 | 40]
// [2 | 13]  c  [8 | 26 | 40]
// 2 | 8 | 13 | 26 | 40
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

// Comparing Normal and Destructive Functions

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

// Recursive Reverse Time Θ(n^2)  Space Θ(n^2)
function reverse(xs) {
    return is_null(xs)
            ? null
            : append(reverse(tail(xs)), list(head(xs)));
}

// Destructive Reverse
function d_reverse(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const wish = d_reverse(tail(xs));
        set_tail(tail(xs), xs);
        set_tail(xs, null);
        return wish;
    }
}

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

// Normal Accumulate
function accumulate(op, initial, xs) {
    return is_null(xs)
            ? initial
            : op(head(xs), accumulate(op, initial, tail(xs)));
}

// Array Functions
array_length([1, 2, 3]); // Return 3

// Destructive Array Mapping
function map_array(f, arr) {
    const len = array_length(arr);
    for (let i=0; i<len; i=i+1) {
        arr[i] = f(arr[i]);
    }
}

// New-Copy Array Mapping
function map_array(f, arr) {
    const new_arr = [];
    const len = array_length(arr);
    for (let i=0; i<len; i=i+1) {
        new_arr[i] = f(arr[i]);
    }
}

// List Length
function list_length(xs) {
    let count = 0;
    for (let p=xs; !is_null(p); p=tail(p)) {
        count = count + 1;
    }
    return count;
}

// break and continue
// break_cont(list("John", "2", "Mary", "1", "Peter")) displays 
// "Hi John" --> "Hi Mary"
function break_cont(xs) {       
    while (is_null(xs)) {
        if (head(xs) === "1") {
            break; // Ends the whole while loop
        } else if (head(xs) === "2") {
            continue;
        }
        display("Hi " + head(xs));
        xs = tail(xs);
    }
}

// Reverse Array
function reverse_array(A) {
    const len = array_length(A);
    const half_len = math_floor(len/2);
    for (let i=0; i<half_len; i=i+1) {
        swap(A, i, len-1-i);
    }
}

function swap(A, i, j) { // MUST pass in array A
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

// Create a 2D Zero Matrix
function zero_matrix(rows, cols) {
    const M = [];
    for (let r=0; r<rows; r=r+1) {
        M[r] = [];
        for (let c=0; c<cols; c=c+1) {
            M[r][c] = 0;
        }
    }
    return M;
}

// Matrix Multiplication
function matrix_mult(A, B) {    // Takes in two non-empty SQUARE matrices of equal order
    const rows = array_length(A);
    const cols = array_length(A[0]);
    const M = [];
    for (let r=0; r<rows; r=r+1) {
        M[r] = [];
        for (let c=0; c<cols; c=c+1) {
            M[r][c] = 0;
            for (let k=0; k<cols; k=k+1) {
                // Increment for each multiplication
                M[r][c] = M[r][c] + A[r][k] * B[k][c];
            }
        }
    }
    return M;
}


// Search and Sort for Arrays

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
        if (low > high) {
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
// [6i | 3 | 8 | 5 | 1min]     
// 1 [ 3i=min | 8 | 5 | 6 ]
// 1 | 3 [ 8i | 5min | 6 ]
// 1 | 3 | 5 [ 8i | 6min ]
// 1 | 3 | 5 | 6 | 8
function selection_sort(A) {
    const len = array_length(A);
    for (let i=0; i<len-1; i=i+1) {
        let min_pos = find_min_pos(A, i, len-1);
        swap(A, i, min_pos);
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
        A[j+1] = x;
    }
}


// Merge Sort: Array. No Return. In-Place, Destructive
// Because of No Return, we can skip returning values in base cases
function merge_sort(A) {
    merge_sort_helper(A, 0, array_length(A) - 1);
}
function merge_sort_helper(A, low, high) {
    if (low < high) {
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
            const result = f(x);
            mem[x] = result;
            return result;
        }
    }
    return mf;
}

// Argument passed to memoize involves call to mfib itself
const mfib = memoize(n => n<=1 ? n
                               : mfib(n-1) + mfib(n-2));
                              
// Return nCk                              
function choose(n, k) {
    return k >= n ? 0
            : k === 0 || k === n ? 1
            : choose(n-1, k) + choose(n-1, k-1);
}

// Memoized n choose k: Use of read and write
const mem = [];
function read(n, k) {
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
function mchoose(n, k) {        // Time and Space theta((n-k)k) O(nk)
    if (read(n, k) !== undefined) {
        return read(n, k);
    } else {
        const result = k >= n ? 0
                        : k === 0 || k === n ? 1
                        : mchoose(n-1, k) + mchoose(n-1, k-1);
        write(n, k, result);
        return result;
    }
}

// Copy Array before doing Sort, if Qn says do not change original A
function copy(A) {
    for (let i=0; i<array_length(A); i=i+1) {
        B[i] = A[i];
    }
    return B;
}

// Efficient Searching (NO Altering of A)
function make_search(A) {
    const B = copy(A);                  // n time
    merge_sort(B);                      // n log n time
    return x => binary_search(B, x);    // k * log n time, k is no. of times search is called
}


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
            : pair(head(s1) + head(s2),     // Mulstream: head(s1) * head(s2)
                    () => add_streams(stream_tail(s1),
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

// After printing each element starting from 2, 
// Filter away the multiples of the printed element in the remaining items
// This also removes the element itself, hence the sieve behind starts with another prime
function sieve(s) {
    return pair(head(s), 
                () => sieve(stream_filter(
                            x => x % head(s) !== 0, stream_tail(s))));
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

// Loop Stream: 1, 2, 3 --> 1, 2, 3, 1, 2, 3, inf
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