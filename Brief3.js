import {make_point, x_of, y_of, unit_circle, unit_line, draw_points, draw_connected_full_view_proportional, draw_points_full_view} from "curve";

// unit_circle_2 takes in some t
// and returns a point (cos(2 pi t), sin(2 pi t))
function unit_circle_2(t) {
    return make_point(math_cos(2 * math_PI * t),
                      math_sin(2 * math_PI * t));
}

function unit_line_2(t) {
    return make_point(t, 0.5);
}

// Try to adjust the value passed to "draw_points"
// The positions of points changes. 
// 1: t = 0, t = 1 <both endpoints>
// 2: t = 0, t = 0.5, t = 1
// 3: t = 0, t = 0.33, t = 0.66, t = 1
draw_points(2)(unit_line_2); // Call 1

// Try to adjust the value passed to "draw_points_full_view"
// The positions of points changes. 
// 1: t = 0, t = 1 <both endpoints>
// 2: t = 0.2, ?
// 3: 3 points
draw_points_full_view(3)(unit_circle_2); // Call 2

// We use draw_connected to create line segments
// Lines are drawn between the points
// 1: one line between t = 0, t = 1 
// 2: one horizontal line (no closed shape between two lines)
// 3: a triangle 
// 200: Sufficiently large to generate the complete circle
draw_connected_full_view_proportional(200)(unit_circle_2); // Call 3

// Spiral Curves
// Idea is to make use of unit_circle points, but multiply t to the x and y coords
// of the point p from unit circle, such that the distance from origin increases
function spiral_one(t) {
    const p = unit_circle(t);
    return make_point(t * x_of(p), t * y_of(p));
}

draw_connected_full_view_proportional(200)(spiral_one); // Call 4

// Note that draw_connected takes in function that only has one parameter
// If we need more than one parameter, we have to introduce helper or nested functions


function spiral(rev) { // Return a spiral with some number of revolutions
    return t => {
        // p must be defined in this block, not outside, because it relies on t
        const p = unit_circle((t * rev) % 1); 
        // Multiply t by rev, such that the range of t*rev is [0, rev]
        // * 1 such that we are still returning [0, 1], BUT the value of t
        // goes through rev rounds from 0 to 1 and back to 0
        
        // E.g. rev = 5
        // t = 0 unit_circle(0)         rd 1
        // t = 0.1 unit_circle(0.5)     rd 1
        // t = 0.19 unit_circle(0.95)   rd 1
        // t = 0.2 unit_circle(0)       rd 2
        // t = 0.3 unit_circle(0.5)     rd 2
        // t = 0.39 unit_circle(0.95)   rd 2
        // ...
        // t = 0.99 unit_circle(0.95)   rd 5
        make_point(t * x_of(p), t * y_of(p));
    };
}



import {make_sound, play} from "sound";

const pitch_A_wave = t => math_sin(2 * math_PI * 440 * t);

const C_maj_chord_wave =
    t => 1 * math_sin(2 * math_PI * 261.63 * t) +
         1 * math_sin(2 * math_PI * 329.63 * t) + 
         1 * math_sin(2 * math_PI * 392.00 * t);
         
const C_maj_chord = make_sound(C_maj_chord_wave, 1.5);

play(C_maj_chord);