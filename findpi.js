function product(term, a, next, b) {
    return a > b
           ? 1
           : term(a) * product(term, next(a), next, b);
}
function find_pi(b) {
    function is_even(x) {
        return x%2 === 0;
    }
    function inc(x) {
        return x+1;
    }
    function nterm(x) {
        return is_even(x) ? 2+x : 3+x;
    }
    function dterm(x) {
        return is_even(x) ? 3+x : 2+x;
    }
    return 4*product(nterm, 0, inc, b)/product(dterm, 0, inc, b);
}

find_pi(100);