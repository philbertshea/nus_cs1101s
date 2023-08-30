// Q1

const z = 1;

function f_2(g) {
    const z=3;
    return g(z);
}

display(f_2(y => y+z));

// Q2

function my_sum_i(n) {
    function iter(result, count) {
        return count > n
               ? result
               : iter(
                   count * (count + 1) + result,
                   count + 1);
    }
    return iter(0,1);
}

function my_sum_r(n) {
    return n < 1
           ? 0
           : my_sum_r(n-1) + n*(n+1);
}
display(my_sum_i(3));
display(my_sum_r(3));

// Q4

function sum(term, a, next, b) {
    return a > b
           ? 0
           : term(a) + sum(term, next(a), next, b);
}

function my_sum_via_sum(n) {
    return sum(x => x*(x+1), 1, x => x+1, n);
}

display(my_sum_via_sum(3));

// Q5

function sum_i(term, a, next, b) {
    function iter(result, count) {
        return count > b
               ? result
               : iter(term(count) + result,
                      next(count));
    }
    return iter(0,a);
}

function my_sum_via_sum_i(n) {
    return sum(x => x*(x+1), 1, x => x+1, n);
}

display(my_sum_via_sum_i(3));

// Q6 

const x = 5;

function f(g) {
    const x = 3;
    return x => x + g(x);
}

function g(f, y) {
    const h = (y, f) => y(f);
    return h(f, y);
}

display((f(x => 2 * x))(4));
display(g(y => y + 2, x));

