const HEIGHT = 19;
const WIDTH = 19;
// Copy your function red_rectangle_stream from TASK 1 here.

function red_rectangle_stream(s) {
    // your solution goes here
    function helper(img) {
        let left_i = HEIGHT;
        let left_j = WIDTH;
        let right_i = 0;
        let right_j = 0;
        for (let i=0; i<HEIGHT; i=i+1) {
            for (let j=0; j<WIDTH; j=j+1) {
                display(i, "i");
                display(j, "j");
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
/*
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

function zoom(src, factor) {
    let dest = [];
    const width = display(array_length(src[0]));
    const height = display(array_length(src));
    const ends = [height/2 - height/factor/2, width/2 - width/factor/2]; // starting points for top left

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


// Example:
const zoomed_stream = anomaly_stream;
display(stream_tail(zoomed_stream));

const focused_stream = stream_combine(
                           trim,
                           zoomed_stream,
                           red_rectangle_stream(zoomed_stream));



// Should return a close-up of the anomaly, a 19x19 image of black,
// red and white pixels.

/*
Q1: What color it might absorb?
ANS: (write your answer here)


Q2: What color of laser beam would you use?
ANS: (write your answer here)


Q3: Which part of the shield would you target?
ANS: (write your answer here)


Q4: How did you find the answer?
ANS: (answer in at most three sentences how
      you found the color and the target)

When running the code above, different runs give fluctuating values of mem:
[[18, 3, [246, 246, 246, 255]]]
[[0, 4, [120, 120, 120, 255]]]
[[1, 2, [121, 121, 121, 255]]]
[[17, 3, [192, 192, 192, 255]]]
[[0, 14, [87, 87, 87, 255]], [17, 1, [167, 167, 167, 255]]]
[[0, 16, [160, 160, 160, 255]]]
[[18, 0, [112, 112, 112, 255]]]
[ [0, 18, [158, 158, 158, 255]],
  [16, 18, [64, 64, 64, 255]],
  [18, 2, [116, 116, 116, 255]]]
  
*/