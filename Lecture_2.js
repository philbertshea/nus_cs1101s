import {heart, show, sail, rcross, nova, stack_frac} from "rune";

const heartsail = stack_frac(0.5, heart, sail);
// returns a stacked image where 50% is the heart and 50% is the sail.
// i.e. returns the same result as stack(heart, sail)

show(heartsail);

const rcrossnova = stack_frac(0.2, rcross, nova);
// returns a stacked image where 20% is the rcross and 80% is the nova.

show(rcrossnova);

const trisection = stack_frac(1/3, heart, 
stack_frac(1/2, heart, heart));
// Evaluate the INNER stack_frac first. 
// INNER stack_frac returns a 50/50 stacked heart-heart = hh
// THEN, evaluate the OUTER stack_frac.
// Outer stack_frac stacks heart (33%) with the hh (66%)
// Hence, this returns a final image with 3 hearts, each heart having 33% of the picture.

const quadrisection = stack_frac(1/4, heart, 
stack_frac(1/3, heart, 
stack_frac(1/2, heart, heart)));
// Creates a final image with 4 hearts, each heart having 25% of the image.

show(trisection);
show(quadrisection);

// My attempt: Linear, Recursive Process 
function section(n, rune) {
    return sect_iter(n, rune);
}
// From 1/4 --> 1/3 --> 1/2 --> heart
function sect_iter(count, rune) {
    return count===1 ? rune : stack_frac(1/count, rune, sect_iter(count-1, rune));
}

// My attempt: Linear, Iterative Process
function section_i(n, rune) {
    function sect_iter_i(result, count, rune) {
    return count>n ? result : sect_iter_i(stack_frac(1/count, rune, result), count+1, rune);
}
    return sect_iter_i(rune, 2, rune);
}

show(section_i(6, heart));

show(section(6, heart));