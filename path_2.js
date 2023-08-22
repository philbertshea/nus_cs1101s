/*
Q1.
Do you need to know how runes are implemented in the rune module, in order to effectively use them?
Ans: No
*/

/*
Q2.
Consider the following Source program:

import { heart, blue, red, stack } from "rune";

stack(blue(heart), red(heart));
Will you see any rune when you evaluate this program?
Ans: No
*/

/*
Q3.
Consider the following Source program:

import { heart, blue, red, show } from "rune";

show(blue(heart));
const x = 2;
show(red(heart));
x + 3;
Which of the following most accurately describes the rune result of the program?

Ans : Both the blue heart and red heart can be displayed.
*/

/*
Q4.
The love function returns a rune as the result of putting a red heart on top of whatever rune that is passed as argument. 

*/

function love(rune) {
    // edit the return expression
    return stack(red(heart), rune);
}

show(love(blue(nova)));

/*
Q5.
The stackn(n, rune) function stacks n copies of a given rune with equal spacing. For example, show(stackn(4, nova)); will produce the following:

Previously, in the lecture, we observed how to use stack and rotations to create the beside function. Use a similar idea to create the besiden(n, rune) that puts n copies of a given rune side by side with equal spacing. For example,
*/
function besiden(n, rune) {
    // edit the return expression
    return quarter_turn_left(stackn(n, quarter_turn_right(rune)));
}

show(besiden(5, heart));

/*
Q6.
Answer: 4 hearts are shown.
*/

import { heart, nova, beside, stackn, show } from "rune";

function fancy(x) {
    return stackn(4, beside(x, nova));
}

show(fancy(heart));


