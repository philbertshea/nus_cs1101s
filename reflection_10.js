function add_streams(s1, s2) {
return is_null(s1)
        ? s2
        : is_null(s2)
        ? s1
        : pair(head(s1) + head(s2),
                () => add_streams(stream_tail(s1),
                                    stream_tail(s2)));
}

// Q1
const x = stream_map(display, enum_stream(0, 10)); // Displays 0
stream_ref(x, 3);   // Displays 1, 2, 3
stream_ref(x, 5);   // Displays 1, 2, 3, 4, 5

// Q1
function memo_fun(f) {
    let already_run = false;
    let result = undefined;
    function mfun() {
        if (!already_run) {
            result = f();
            already_run = true;
            return result;
        } else {
            return result;
        }
    }
    return mfun;
}

function stream_map_optimized(f, s) {
    return is_null(s)
            ? null
            : pair(f(head(s)),
                    memo_fun(() => stream_map_optimized(f, stream_tail(s)) ));
}

const x = stream_map_optimized(display, enum_stream(0, 10));    // Displays 0
stream_ref(x, 3);   // Displays 1, 2, 3
stream_ref(x, 5);   // Displays 4, 5


// Q2

function zip_list_of_streams(ss) {
    return pair(head(head(ss)), () =>
                zip_list_of_streams(append(tail(ss), stream_tail(head(ss)))));
}
/*
function zip_list_of_streams(ss) {
    // ss is a list of streams
    return pair
}*/
// Q3

// IMPT: Wishful Thinking! (New Way)
// We spot patterns that suggest we just recursively call partial sums itself in later iterations
// Shifting the result to the right each time.
function partial_sums_1(s) {
    return pair(head(s), () => add_streams(stream_tail(s), partial_sums_1(s)));
}

function partial_sums_2(s) {
    return add_streams(s, pair(0, () => partial_sums_2(s)));
}


const ones = pair(1, () => ones);
const integers = integers_from(1);
eval_stream(partial_sums_1(integers), 10);

