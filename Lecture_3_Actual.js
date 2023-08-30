import { beside, heart, show, stack } from "rune";

function iter(rune, n, current_fractal) {
   return n === 1
      ? current_fractal
      : iter(rune, n - 1,
             beside(rune, stack(current_fractal,
                                current_fractal)));
}
function fractal_4(rune, n) {
    return iter(rune, n, rune);
}

show(fractal_4(heart, 5));

function fractal_r(pic, n) {
    function helper(prev, count) {
        const new_col = stack(prev, prev);
        return count===n-1
               ? new_col
               : beside(new_col, 
                        helper(new_col, count+1));
    }
    return n===1 
           ? pic
           : beside(pic, helper(pic, 1));
}
show(fractal_r(heart, 5));


// Passing functions to functions
function f(g,x) {
    return g(g(x));
}

function g(y) {
    return y + 1;
}
f(g,7);