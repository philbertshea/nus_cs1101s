import {rcross, show, circle, square, blank, beside, stack, make_cross, quarter_turn_right, beside_frac, stack_frac} from "rune";

function moony_1(bottom_right) {
    return beside(stack(circle, square), 
                  stack(blank, bottom_right));
}

//show(moony_1(circle));

function moony_2(n) {
    return n===1 
           ? circle
           : moony_1(moony_2(n-1));
}

//show(moony_2(5));

function moony(n) {
    return n === 1
           ? circle
           : beside_frac(1/n, 
                         stack_frac(1/n, circle, square),
                         stack_frac(1/n, blank, moony(n-1)));
}

//show(moony(5));

function moony_i(n) {
    function iter(result, count) {
        return count > n
               ? result
               : iter(
                      beside_frac(
                          1/count,
                          stack_frac(1/count, circle, square),
                          stack_frac(1/count, blank, result)),
                      count+1);
    }
    return iter(circle, 1);
}

show(moony_i(5));

//show(beside_frac(1/3, stack_frac(1/3, circle, square), stack_frac(1/3, blank, moony_1(circle))));