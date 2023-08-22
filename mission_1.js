/* 
Q1. Insert exactly six characters in the program below, such that it becomes a working Source program.
*/

//The function mirror shows a rune next to its mirror image.

function mirror(rune) {
    return beside(rune, flip_horiz(rune));
}


/*The function more_love takes a rune as
argument and returns a rune that shows
it next to a red heart.*/


function more_love(rune) {
    return beside(rune, red(heart));
}

show(more_love(mirror(sail)));

/*
Q2. Write a function mosaic that takes four runes as arguments and arranges them in a 2 by 2 square, starting with the top-right corner, going clockwise.
*/

// Beside is pre-declared, hence we directly use beside as a functional abstraction
// And need not re-implement it.

function mosaic(r1, r2, r3, r4) {
    // Place r4(nova) next to r1(rcross) , and r3(corner) next to r2(sail). 
    // Then stack the former on top of the latter
    return stack(beside(r4, r1), beside(r3, r2));
}

// Test
show(mosaic(rcross, sail, corner, nova));


/*
Q3. Write a function upside_down_mosaic that takes four runes as arguments and creates a mosaic that is rotated 180 degrees.
*/

function mosaic(r1, r2, r3, r4) {
    // your answer from the previous question
    return stack(beside(r4, r1), beside(r3, r2));
}

function upside_down_mosaic(r1, r2, r3, r4) {
    // your answer here
    return turn_upside_down(mosaic(r1, r2, r3, r4));
}

// Test
show(upside_down_mosaic(rcross, sail, corner, nova));


/*
Q4. Write a function that takes five arguments: four runes and a transformation function. The function should create a mosaic using the runes and then apply the given transformation function to it and return the resulting rune. 
*/

function mosaic(r1, r2, r3, r4) {
    // your answer from a previous question
    return stack(beside(r4, r1), beside(r3, r2));
}

function transform_mosaic(r1, r2, r3, r4, transform) {
    // your answer here
    return transform(mosaic(r1, r2, r3, r4));
}

// Test
show(transform_mosaic(rcross, sail, corner, nova, make_cross));
