const y = "hi";
true ? 1 : y<1 ? 2 : 3;

function rev(xs) {
    return accumulate((x, ys) => append(ys, list(x)), 
                      null,
                      xs);
}
rev(list(1, 2, 3));

function rev2(xs) {
    function helper(orig, reversed) {
        return is_null(orig)
               ? reversed
               : helper(tail(orig), pair(head(orig), reversed));
    }
    return helper(xs, null);
}

rev2(list(1, 2, 3));

is_list(null);

build_list(x => x + 1, 3);
// [f(0), [f(1), [f(2), null]]]

enum_list(1, 3);

map(x => x + 1, enum_list(1, 3));
// [f(0), [f(1), [f(2), null]]]

function search(lo, hi, f, count) {
    if (hi === lo || count > 50) {
        display(count);
        return lo;
    } else {
        const guess = math_floor((lo + hi) / 2);
        return f(guess) ? search(guess + 1, hi, f, count + 1)
                        : search(lo, guess - 1, f, count + 1);
    }
}

search(0, 100, x => x < 70 ? true : false, 0);

member(0, list(1, 2, 4, 5, 7));

function helper(count, x, ys) {
    return count === 0 
           ? ys
           : pair(x, helper(count - 1, x, ys));
}

accumulate((x, ys) => helper(3, x, ys), null, list(1, 2, 3));

const expand_list = (L, k) => accumulate((x, ys) => append(build_list(n => x, k), ys), null, L);

function expand_matrix(M, k) {
    return map(r => expand_list(r, k), M);
}

expand_matrix(list(list(1, 2, 3), list(4, 5, 6)), 3);