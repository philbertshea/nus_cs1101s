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