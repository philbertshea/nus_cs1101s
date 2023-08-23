import {rcross, make_cross, heart, from_url, show, stackn, stack, stack_frac, beside, beside_frac, quarter_turn_left, quarter_turn_right} from "rune";

function besiden(n, rune) {
    function bes_iter(result, count) {
        return count > n ? result : bes_iter(beside_frac(1/count, rune, result), count+1);
    }
    return bes_iter(rune, 1);
}

/*
function persian(rune, count) {
    const top_bottom = besiden(count, rune);
    const left_right = stackn(count-2, rune);
    const less_top_bottom = beside_frac((count-1)/count, beside_frac(1/(count-1), left_right, make_cross(rune)), left_right);
    // your answer here
    return stack_frac((count-1)/count, stack_frac(1/(count-1), top_bottom, less_top_bottom), top_bottom);
}
*/

function persian2(rune, count) {
    const top_bottom = besiden(count, rune);
    const left_right = stackn(count-2, rune);
    const less_top_bottom = helper(beside_frac, count, left_right, make_cross(rune));
    // your answer here
    return helper(stack_frac, count, top_bottom, less_top_bottom);
}

function helper(frac, count, border, middle) {
    return frac((count-1)/count, frac(1/(count-1), border, middle), border);
}
// Tests

show(persian2(heart, 7));
show(persian2(make_cross(rcross), 5));
const paw = from_url("https://i.imgur.com/GJg95B8.png");
show(persian2(paw, 5));