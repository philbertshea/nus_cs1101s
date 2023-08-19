function sum(term, a, next, b) {
    return a>b ? 0 : term(a) + sum(term, next(a), next, b);
}

function inc(x) {
    return x+1;
}
function is_even(x) {
    return x % 2 === 0;
}
function cube(x) {
        return x * x * x;
    }
    
function integral(f, a, b, dx) {
    function int_next(x) {
        return x + dx;
    }
    return sum(f, a + dx/2, int_next, b) * dx;
}

function sum_cubes(a, b) {
    
    return sum(cube, a, inc, b);
}

function id(x) {
    return x;
}

function integral2(f, a, b, n) {
    const h = (b-a)/n;
    const origA = a;
    function int_next(x) {
        return x + h;
    }
    function int_term(x) {
        return ((x===origA || x===origA+n*h) ? 1 : is_even((x-origA)/h) ? 2 : 4) * f(x);
        
    }
    return h/3*sum(int_term, a, int_next, a+n*h);
}
//sum_cubes(3, 5);
integral(cube, 0, 1, 0.01);
integral2(cube, 0, 1, 1000);