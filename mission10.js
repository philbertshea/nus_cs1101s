// Copy your function red_rectangle_stream from TASK 1 here.
// TASK 2

// Copy your function red_rectangle_stream from TASK 1 here.
import {install_filter, set_dimensions, keep_aspect_ratio, set_fps, start, image_width, image_height} from "pix_n_flix";

function red_rectangle_stream(s) {
    // your solution goes here
    function helper(img) {
        let left_i = HEIGHT;
        let left_j = WIDTH;
        let right_i = 0;
        let right_j = 0;
        for (let i=0; i<HEIGHT; i=i+1) {
            for (let j=0; j<WIDTH; j=j+1) {
                if (img[i][j][0] === 255 && img[i][j][1] === 0 && img[i][j][2] === 0) {
                    left_i = i < left_i ? i : left_i;
                    left_j = j < left_j ? j : left_j;
                    right_i = i > right_i ? i : right_i;
                    right_j = j > right_j ? j : right_j;
                }
            }
        }
        return pair(pair(left_i, left_j), pair(right_i, right_j));
    }
    return stream_map(helper, s);
}

function stream_combine(f, s1, s2) {
    // your solution goes here
    return pair(f(head(s1), head(s2)), 
                () => stream_combine(f, stream_tail(s1), stream_tail(s2)));
}


// Trim the given image using the given rectangle.
// Returns an image that includes all purely red
// pixels of the given image.

function trim(image, rectangle) {
    const trimmed = [];
    const i_min = head(head(rectangle));
    const j_min = tail(head(rectangle));
    const i_max = head(tail(rectangle));
    const j_max = tail(tail(rectangle));

    for (let i = i_min; i <= i_max; i = i + 1) {
        const new_i = i - i_min;
        trimmed[new_i] = [];
        for (let j = j_min; j <= j_max; j = j + 1) {
            const new_j = j - j_min;
            trimmed[new_i][new_j] = image[i][j];
        }
    }
    return trimmed;
}

// Example:
/*
function find_shield(s) {
    const now = display(head(s));
    check_colour(now);
}

let grays = [];
let mem = [];
function check_colour(A) {
    const width = array_length(A[0]);
    const height = array_length(A);
    for (let i=0; i<height; i=i+1) {
        for (let j=0; j<width; j=j+1) {
            const is_red = A[i][j][0] === 255
                         && A[i][j][1] === 0
                         && A[i][j][2] === 0;
            const is_black = A[i][j][0] === 0
                         && A[i][j][1] === 0
                         && A[i][j][2] === 0;
            const is_white = A[i][j][0] === 255
                         && A[i][j][1] === 255
                         && A[i][j][2] === 255;             
            if (!is_red && !is_white && !is_black) {
                grays[array_length(grays)] = [i, j, A[i][j]];
            }
            const len = array_length(mem);
            if (mem[i] === undefined) {
                mem[i] = [];
            }
            mem[i][j] = is_white ? "White" : is_black ? "Black" : is_red ? "Red" : "Other";
        }
    }
}



function check_diff(A, B) {
    for (let i=0; i<19; i=i+1) {
        for (let j=0; j<19; j=j+1) {
            const same = A[i][j][0] !== B[i][j][0]
                         && A[i][j][1] !== B[i][j][1]
                         && A[i][j][2] === B[i][j][2];
            if (!same) {
                mem[array_length(mem)] = pair(i, j);
            }
        }
    }
}
*/



const FPS = 15;
function make_image(width, height) {
    const img = [];
    for (let i = 0; i < height; i = i + 1) {
        const row = [];
        img[i] = row;
        for (let j = 0; j < width; j = j + 1) {
            const pixel = [];
            row[j] = pixel;
            for (let z = 0; z < 4; z = z + 1) {
                pixel[z] = 255;
            }
        }
    }
    return img;
}

function stream_to_filter(s) {
    // your solution goes here
    
    function filter(src, dest) {
        const img = head(s);
        for (let i = 0; i < HEIGHT; i = i + 1) {
            for (let j = 0; j < WIDTH; j = j + 1) {
                dest[i][j][0] = img[i][j][0];
                dest[i][j][1] = img[i][j][1];
                dest[i][j][2] = img[i][j][2];
                dest[i][j][3] = img[i][j][3];
            }
        }
        if (!is_null(stream_tail(s))) {
            s = stream_tail(s);
        }
    }
    return filter;
}


function zoom(factor) {
    function filter(src) {
        // your solution here
        const width = 19;
        const height = 19;
        const ends = [height/2 - height/factor/2, width/2 - width/factor/2]; // starting points for top left
        let dest = [];
        
        for (let i = 0; i < height; i = i + 1) {
            for (let j = 0; j < width; j = j + 1) {
                const a = math_floor(ends[0] + (i/factor));
                const b = math_floor(ends[1] + (j/factor));
                if (dest[i] === undefined) {
                    dest[i] = [];
                }
                dest[i][j] = src[a][b];
            }
        }
        return dest;
    }
    return filter;
}

function scale_up(src) {
    let dest = make_image(HEIGHT, WIDTH);
    for (let i=0; i<HEIGHT; i=i+1) {
        for (let j=0; j<WIDTH; j=j+1) {
            const a = math_floor(i/HEIGHT*19);
            const b = math_floor(j/WIDTH*19);
            dest[i][j] = src[a][b];
        }
    }
    return dest;
}


const focused_stream = stream_combine(
                           trim,
                           anomaly_stream,
                           red_rectangle_stream(anomaly_stream));

const zoomed_stream = stream_map((image) => zoom(2)(image), focused_stream);
const scaled_stream = stream_map((image) => scale_up(image), zoomed_stream);
//display(scaled_stream);
// find_shield(focused_stream);

install_filter(stream_to_filter(scaled_stream));

//install_filter(zoom(2)); 
set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();
// Example:=

// Should return a close-up of the anomaly, a 19x19 image of black,
// red and white pixels.

/*
Q1: What color it might absorb?
ANS: The shield likely Absorbs BLUE.


Q2: What color of laser beam would you use?
ANS: Use a BLUE laser.


Q3: Which part of the shield would you target?
ANS: Target the CENTRE of the shield. 


Q4: How did you find the answer?
ANS: At first, I used find_colour and find_shield functions to identify the colours in the 19*19 pixel. However, it only showed occasional gray spots
These gray spots seem to be the stars and are irrelevant to the search for the shield. I then used stream_to_filter, make_image, zoom and scale_up functions to zoom into the centre (white) shield and scale up to 400*300.
Using filters to visualise, I can see fluctuating yellow spots at the CENTRE of the white shield. Hence the shield reflects yellow (red+green) and absorbs its complement, blue. Shoot blue.
  
*/