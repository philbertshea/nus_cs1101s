// Brief 1 : Runology

import {rcross, show, stack, heart, red, nova, quarter_turn_right, stackn, repeat_pattern} from "rune";

function turn_upside_down(rune) {
    return quarter_turn_right(quarter_turn_right(rune));
}
function quarter_turn_left(rune) {
    return quarter_turn_right(turn_upside_down(rune));
}
function beside(rune1, rune2) {
    return quarter_turn_left(stack(quarter_turn_right(rune1),
                                    quarter_turn_right(rune2)));
}
function quilt(height, width, rune) {
    return stackn(height, quarter_turn_right(stackn(width, quarter_turn_left(rune))));
}
//show(stack(heart, quarter_turn_left(heart)));
// show(beside(nova, heart));
//show(quilt(2,3,rcross));
function make_cross(rune) {
    return stack(
            beside(quarter_turn_right(rune), turn_upside_down(rune))
            ,beside(rune, quarter_turn_left(rune)));
}

//show(make_cross(rcross));
show(repeat_pattern(5, make_cross, heart));