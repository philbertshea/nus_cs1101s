function repeat(v, k) {     // Return list(v, ... v)
    return build_list(x => v, k);
    // OR
    return map(x => v, enum_list(1, k));
}

function expand_list(L, k) {    // L = list(7, 8) k = 3 return list(7, 7, 7, 8, 8, 8)
    return accumulate((x, ys) => append(repeat(x, k), ys), null, L);
}

function expand_matrix(M, k) {
    return map(x => expand_list(x, k), expand_list(M, k));
}
expand_matrix(list(list(1, 2, 3), list(4, 5, 6)), 3);

function unique(xs) {
    // Recursive
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const wish = unique(tail(xs));
        return head(xs) !== head(wish) ? pair(head(xs), wish) : wish;
    }
}

function unique_i(xs) {
    function iter(ys, result) {
        if (is_null(xs)) {
            return result;
        } else {
            return is_null(result) || head(ys) !== head(result)
                    ? pair(head(ys), result)
                    : result;
        }
    }
    return iter(reverse(xs), null);
}

function accumulate_tree(f1, f2, initial, tree) {
    return is_null(tree)
            ? initial
            : f2(is_list(head(tree))
                    ? accumulate_tree(f1, f2, initial, head(tree))
                    : f1(head(tree)),
                accumulate_tree(f1, f2, initial, tail(tree)));
}

// Matrices: list(list(1, 2, 3), list(4, 5, 6), list(7, 8, 9))
function get_elem(M, r, c) {
    
}

// Array to list
function array_to_list(arr) {
    const len = array_length(arr);
    let xs = null;
    for (let i=len - 1; i>=0; i=i-1) {
        xs = pair(arr[i], xs);
    }
    return xs;
}

// List to Array
function list_to_array(xs) {
    const A = [];
    let count = 0;
    while (!is_null(xs)) {
        A[count] = head(xs);
        count = count + 1;
        xs = tail(xs);
    }
    return A;
}

display(array_to_list([1, 2, 3, 4, 5]));        // Return list(1, 2, 3, 4, 5)
display(list_to_array(list(1, 2, 3, 4, 5)));    // Return [1, 2, 3, 4, 5]

// Apply list of functions: list(head, tail, tail) onto 
function apply(p, xs) {
    return is_null(p) 
            ? t
            : apply(tail(p), (head(p))(t));
}

// Last Comes First (Circular Right Shift)
function last_comes_first(xs) {
    if (is_null(tail(xs))) {
        return xs;
    } else {
        const wish = last_comes_first(tail(xs));
        return pair(head(wish), pair(head(xs), tail(wish)));
    }
}

function first_comes_last(xs) {
    if (is_null(xs)) {
        return xs;
    } else {
        return accumulate(x => pair(x), list(head(xs)), tail(xs));
    }
}

// Fib_List without Append
function fib_list(N) {
    function helper(count, rev) {
        return count === N
                ? rev
                : helper(count + 1,
                            pair(head(rev) + head(tail(rev)), rev));
    }
    return reverse(helper(2, list(1, 0)));
}

// Binary Arithmetic Operation
function eval_BAE(bae) {
    function apply_binary(op, s1, s2) {
        return op === "+" ? s1 + s2
                : op === "-" ? s1 - s2
                : op === "*" ? s1 * s2
                : op === "/" ? s1 / s2
                : error("Invalid Operator");
    }
    if (is_number(bae)) {
        return bae;
    } else {
        const op = head(tail(bae));
        const left = eval_BAE(head(bae));
        const right = eval_BAE(head(tail(tail(bae))));
        return op(left, right);
    }
}

function negate_BAE(bae) {  // Only for "+" and "*" BAE
    if (is_number(bae)) {
        return -bae;
    } else {
        const op = head(tail(bae));
        const left = head(bae);
        const right = head(tail(tail(bae)));
        if (op === "+") {
            return list(negate_BAE(left), op, negate_BAE(right));
        } else {
            return list(negate_BAE(left), op, right);
        }
    }
}

// Check if xs1 list is a permutation of xs2
function are_permutation(xs1, xs2) {
    if (is_null(xs1) || is_null(xs2)) {
        return is_null(xs1) && is_null(xs2);
    } else {
        const x1 = head(xs1);
        return !is_null(member(x1, xs2)) &&
                are_permutation(tail(xs1), remove(x1, xs2));
    }
}

function combinations(xs, k) {
    if (k===0) {
        return list(null);
    } else if (is_null(xs)) {
        return null;
    } else {
        const s1 = combinations(tail(xs), k - 1);
        const s2 = combinations(tail(xs), k);
        const has_x = map(x => pair(head(xs), x), s2);
        return append(has_x, s2);
    }
}

// const klistB = list(list(0, 6, 3), list(8, 6, 10), list(5, 1, 25));
// k-list of degree 3 and depth 2

// make_k_list(3, 2) returns list(list(0, 0, 0), list(0, 0, 0), list(0, 0, 0))
function make_k_list(k, d) {
    if (d === 0) {
        return 0;
    } else {
        let klist = null;
        for (let i = 0; i < k; i = i + 1) {
            klist = pair(make_k_list(k, d - 1), klist);
        }
        return klist;
    }
}

// sum_k_list(klistB); // returns 64
function sum_k_list(klist) {
    if (is_number(klist)) {
        return klist;
    } else {
        const k = length(klist);
        let sum = 0;
        let rest = klist;
        for (let i = 0; i < k; i = i + 1) {
            sum = sum + sum_k_list(head(rest));
            rest = tail(rest);
        }
        return sum;
    }
}

// map_k_list(x => 2 * x, klistB); 
// returns list(list(0, 12, 6), list(16, 12, 20), list(10, 2, 50))
function map_k_list(f, klist) {
    if (is_number(klist)) {
        return f(klist);
    } else {
        const k = length(klist);
        let result = null;
        let rest = klist;
        for (let i = 0; i < k; i = i + 1) {
            result = pair(map_k_list(f, head(rest)), result);
            rest = tail(rest);
        }
        return reverse(result);
    }
}

// const bae = [ [8, "-", 2], "*", [7, "+", 3] ];
// make_postfix_exp(bae);  // returns [8, 2, "-", 7, 3, "+", "*"]
function make_postfix_exp(bae) {
    const pfe = [];
    let next = 0;

    function convert(sub_bae) {
        if (is_number(sub_bae)) {
            pfe[next] = sub_bae;
            next = next + 1;
        } else {
            convert(sub_bae[0]);
            convert(sub_bae[2]);
            pfe[next] = sub_bae[1];
            next = next + 1;
        }
    }
    convert(bae);
    return pfe;
}

// eval_postfix_exp(pfe);  // returns 60
function eval_postfix_exp(pfe) {
    let next = array_length(pfe) - 1;

    function evaluate() {
        const token = pfe[next];
        next = next - 1;
        if (is_number(token)) {
            return token;
        } else {
            const op = token;
            const right = evaluate();
            const left = evaluate();
            if (op === "+") {
                return left + right;
            } else if (op === "-") {
                return left - right;
            } else if (op === "*") {
                return left * right;
            } else {
                return left / right;
            }
        }
    }
    return evaluate();
}


// Count Matches `count_matches("q", 2)` should return No. of words with "q" at pos 2 in pa_words.
function count_matches(char, pos) {
    return length(filter(x => char_at(x, pos) === char, pa_words));
}

// Solve using constraints
function solve(n, constraints) {
    function good_word(w, constraints) {
        return accumulate((c, good) => char_at(w, head(c)) === tail(c) ? good : false,
                          true,
                          constraints);
    }
    const pa_words_len_n = filter(s => string_length(s) === n, pa_words);
    return filter(w => good_word(w, constraints), pa_words_len_n);
}

// Polynomial
/*p(x) =                    2       +  3 * x^2  -  5 * x^3  +  8 * x^6
is represented as `list(pair(2, 0), pair(3, 2), pair(-5, 3), pair(8, 6))`.*/

/*
const poly = list(pair(2, 0), pair(3, 2));
const p = eval_poly(poly);
p(2);  // returns 14 (= 2 + 3*(2)^2)
*/
function eval_poly(poly) {
    function p(x) {
        return accumulate(
                (t, sum) => head(t) * math_pow(x, tail(t)) + sum,
                0,
                poly);
    }
    return p;
}

/*const poly1 = list(pair(3, 2), pair(-5, 3), pair(8, 6));
const poly2 =   list(pair(4, 2), pair(5, 3));
add_poly(poly1, poly2);
// returns list([7, 2], [9, 5], [8, 6]) */
function add_poly(poly1, poly2) {
    if (is_null(poly1)) {
        return poly2;
    } else if (is_null(poly2)) {
        return poly1;
    } else {
        const coeff1 = head(head(poly1));
        const coeff2 = head(head(poly2));
        const exp1 = tail(head(poly1));
        const exp2 = tail(head(poly2));

        if (exp1 === exp2) {
            return coeff1 + coeff2 === 0
                ? add_poly(tail(poly1), tail(poly2))
                : pair(pair(coeff1 + coeff2, exp1),
                       add_poly(tail(poly1), tail(poly2)));
        } else if (exp1 < exp2) {
            return pair(head(poly1), add_poly(tail(poly1), poly2));
        } else {
            return pair(head(poly2), add_poly(poly1, tail(poly2)));
        }
    }
}

/*const poly1 = list(pair(1, 0), pair(3, 2), pair(5, 3));
const poly2 =   list(pair(2, 1), pair(7, 2));
multiply_poly(poly1, poly2);
// returns list([2, 1], [7, 2], [6, 3], [31, 4], [35, 5]) */
function multiply_poly(poly1, poly2) {
    const coeff = head;
    const exp = tail;
    return accumulate((term1, acc) =>
                         add_poly(map(term2 =>
                                        pair(coeff(term1) * coeff(term2),
                                             exp(term1) + exp(term2)),
                                      poly2),
                                  acc),
                      null,
                      poly1);
}