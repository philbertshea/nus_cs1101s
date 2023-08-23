// VERY DIFFICULT!!!

// Q1

// I have declared the functions helper and fract_iter WITHIN fractal
// So that these functions can directly use the "pic" and "n" arguments taken in by fractal
// Also, since these functions will not be relevant outside of fractal, it is not necessary to place them outside of fractal.

function fractal(pic, n) {
    // your answer here
    function helper(k) {
        // Helper function takes in argument k
        // It then returns a rune with 2^k runes, stacked in equal spacing
        // helper(k) should return the same outcome as stackn(pic, 2^k)
        // This uses a Recursive process because there are deferred operations generated
        return k===0 ? pic : stack(helper(k-1), helper(k-1));
    }

    function fract_iter(count) {
        // fract_iter function does the iteration
        // This uses a Recursive Process as there are deferred operations generated
        return count===n-1 
        ? helper(count) 
        : beside(helper(count) , fract_iter(count+1));
    }
    
    return fract_iter(0);
}

// Test
show(fractal(make_cross(rcross), 3));



// --------------------------------------------   Q2

function hook(frac) {
    // your answer here
    return stack(square, beside_frac(1-frac, blank, square));
}

// Test
show(hook(1/5));




// ---------------------------------------------   Q3

import {square, blank, show, stack, rcross, make_cross, beside, stack_frac, beside_frac, quarter_turn_right, make_cross} from "rune";

// copy your hook function from Question 2 here if required

function hook(frac) {
    // your answer here
    return stack(square, beside_frac(1-frac, blank, square));
}

/*
Via trial and error, observed that the spirals are created by replacing the "blank" in spiral1 with quarter_turn_right of the same statement
const spiral1 = stack_frac(thickness, hook(thickness/2), blank);
const spiral2 = stack_frac(thickness, hook(thickness/2), quarter_turn_right(stack_frac(thickness, hook(thickness/2), blank)));
const spiral3 = stack_frac(thickness, hook(thickness/2), quarter_turn_right(stack_frac(thickness, hook(thickness/2), quarter_turn_right(stack_frac(thickness, hook(thickness/2), blank)))));
*/
function spiral(thickness, depth) {
    // Create some function iter which increments count for every iteration
    function iter(count) {
        // When count > depth, we replace the last expression with blank
        // When count === 1, we do not turn the rune right yet. So there needs to be a separate check if count === 1
        // If count > 1, then we use quarter_turn_right on top of the usual expression
        return count > depth 
                ? blank 
                : count === 1
                ? stack_frac(thickness, hook(thickness/2), iter(count+1))
                : quarter_turn_right(stack_frac(thickness, hook(thickness/2), iter(count+1)));
    }
    return iter(1);
}

/* If depth is zero, then the function will directly return blank (since count starts from 1, and 1>0 satisfying the first predicate)
    If thickness is zero, then hook(thickness/2) = hook(0) just returns blank. Then stacking blank onto blank gives blank.
    Ideally, we should filter out these situations e.g. return depth==00 || thickness===0 ? blank : ... so as to avoid unnecessary recursive calls
    However, this is not implemented in adherence to the instructions "ensure behaviour without explicit handling of these cases"
*/

// Test
show(spiral(1/5 , 20));