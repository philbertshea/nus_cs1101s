function sum(term, a, next, b) {
    return a>b ? 0 : term(a) + sum(term, next(a), next, b);
}


function integral(f, a, b, dx) {
    function int_term(x) {
        return f(x + dx/2);
    }
    function int_next(x) {
        return x + dx;
    }
    return sum(int_term, a, int_next, b);
}