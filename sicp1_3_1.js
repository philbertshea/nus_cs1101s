// Integral uses the Original method 
// integral2 is my attempt at Simpson's Integral
// integral3 is the most accurate because it avoids rounding errors from repetitive addition

// FLOATING POINT PRECISION
// Most languages face issues dealing with Multiple decimals
// Solution is to use number.toPrecision(number_of_digits) [Round it off]
// Or import Decimal class

function sum(term, a, next, b) {
    return a>b ? 0 : term(a) + sum(term, next(a), next, b);
}

function inc(x) {
    return x+1;
}
function is_even(x) {
    return x % 2 <0.1;
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
    function int_next(x) {
        return x + h;
    }
    function int_term(x) {
        const iter = (x-a)/h;
        const prefix = ((iter===0 || iter===n) 
        ? 1 
        : is_even((x-a)/h) 
        ? 2 
        : 4);
        const y = prefix * f(x);
        
        display("Run : ");
        display(iter);
        display("Prefix : ");
        display(prefix);
        display("term(x): ");
        display(y);
        return y;
        
    }
    return h/3*sum(int_term, a, int_next, b);
}

function integral3(f, a, b, n) {
    function helper(h) {
        function y(k) { 
            return f((k * h) + a);
        }
	function term(k) {
            return k === 0 || k === n
                   ? y(k)
                   : k % 2 === 0
                     ? 2 * y(k)
                     : 4 * y(k);
        }
        return sum(term, 0, inc, n) * (h / 3);
    }
    return helper((b - a) / n);
}


function testRounding() {
    const x = 0;
}
//sum_cubes(3, 5);
//integral(cube, 0, 1, 0.01);
integral2(cube, 0, 1, 1000);
//integral3(cube, 0, 1, 1000);
0.001*0.001*0.001;






