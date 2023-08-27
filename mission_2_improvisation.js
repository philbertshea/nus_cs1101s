import {rcross, show, beside, stack, make_cross, quarter_turn_right, square, blank, beside_frac, stack_frac} from "rune";
// Q1

// Try to avoid using a helper function 
// How to avoid use of a helper? stackn is not defined.
/*

function fractal(pic, n) {
    return fract_iter(pic, 1, n);
}

function fract_iter(pic, count, n) {
    return count===n
           ? stacker(pic, count)
           : beside(stacker(pic, count), 
                    fract_iter(pic, count + 1, n));
}

function stacker(pic, n) {
    return n===1
           ? pic
           : stack(stacker(pic, n-1), stacker(pic, n-1));
}
*/

// Q1 Alternative: Avoid using helper function
// Key idea: Save previous rune and stack previous rune onto previous rune


function fractal(pic, n) {
    return n===1 
           ? pic
           : beside(pic, 
                    fract_iter(pic, n-1, pic));
}

function fract_iter(pic, remain, prev) {
    const new_col = stack(prev, prev);
    return remain===1
           ? new_col
           : beside(new_col, 
                    fract_iter(pic, remain-1, new_col));
}

// Test
show(fractal(make_cross(rcross), 5));


// Q3 : Apply quarter_turn_right on the "Argument Behind"
// This is to avoid filtering for the first case.
function hook(frac) {
    // your answer here
    return stack(square, 
                 beside_frac(1-frac, blank, square));
}

function spiral(thickness, depth) {
    // Instead of applying quarter_turn_right on the "Thing to Add"
    // Try applying quarter_turn_right on the "Argument behind"
    return depth>0
           ? stack_frac(
               thickness, 
               hook(thickness/2), 
               quarter_turn_right(
                   spiral(thickness, depth-1)))
           : blank;
}

show(spiral(1 / 5, 20));