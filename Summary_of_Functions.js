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
