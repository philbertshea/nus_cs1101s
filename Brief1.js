// Brief 1 : Runology

import {rcross, show, stack, heart, red, nova, quarter_turn_right, stackn, repeat_pattern} from "rune";

// Turn Upside Down : NOT FLIP
function turn_upside_down(rune) {
    return quarter_turn_right(quarter_turn_right(rune));
}
// Quarter turn left --> 3*quarter_turn_right works too.
function quarter_turn_left(rune) {
    return quarter_turn_right(turn_upside_down(rune));
}
// Beside: Stack Side by Side
function beside(rune1, rune2) {
    return quarter_turn_left(stack(quarter_turn_right(rune1),
                                    quarter_turn_right(rune2)));
}
// Create m x n Quilt
function quilt(height, width, rune) {
    return stackn(height, quarter_turn_right(stackn(width, quarter_turn_left(rune))));
}

show(stack(heart, quarter_turn_left(heart)));
show(beside(nova, heart));
show(quilt(2,3,rcross));

// Make Cross with any rune
function make_cross(rune) {
    return stack(
            beside(quarter_turn_right(rune), turn_upside_down(rune))
            ,beside(rune, quarter_turn_left(rune)));
}

show(make_cross(rcross));

// Repeat Pattern takes in counter n, function to apply for n times, and rune involved.
show(repeat_pattern(5, make_cross, heart));