/*
function memo_fun(fun) {
    let already_run = false;
    let result = undefined;
    function mfun() {
        if (!already_run) {
            result = fun();
            already_run = true;
            return result;
        } else {
            return result;
        }
    }
    return mfun;
}

const onesB = pair(1, memo_fun(() => ms("A", onesB)));
function ms(m, s) {
    display(m);
    return s;
}
stream_ref(onesB, 3);
/*
function m_integers_from(n) {
return pair(n, 
memo_fun(() => ms("M: " + stringify(n), 
m_integers_from(n + 1))));
}

const m_int = m_integers_from(1);
m_int()


// Given s1 = 1, 1, 2, ... and s2 = 3, 3, 4, ...
// Return 1, 1, 2, 3, 3, 4, 1, ...
function seq_streams(s1, s2) {
    function add_stream(xs, ys) {
        if (is_null(xs)) {
            if (ys !== s2) {
                return pair(head(ys), () => add_stream(xs, stream_tail(ys)));
            } else {
                //display("Loop!");
                return pair(head(s1), () => add_stream(stream_tail(s1), s2));
            }
        } else {
            if (xs !== s1) {
                //display("hi");
                return pair(head(xs), () => add_stream(stream_tail(xs), ys));
            } else {
                return pair(head(ys), () => add_stream(null, stream_tail(ys)));
            } 
        }
    }
    
    const merged = pair(head(s1), () => add_stream(stream_tail(s1), s2));
    return merged;
}

const ones = pair(1, () => pair(1, () => ones));
const twos = pair(2, () => twos);
eval_stream(seq_streams(ones, twos), 10);


// Given s1 = 1, 2, ... and s2 = 3, 4, ...
// Return 1, 3, 2, 4, ...
function zip_streams(s1, s2) {
    function helper(xs, ys, count) {
        return (count%2 === 0) 
                ? pair(head(xs), () => helper(stream_tail(xs), ys, count + 1))
                : pair(head(ys), () => helper(xs, stream_tail(ys), count + 1));
    }
    return helper(s1, s2, 0);
}
eval_stream(zip_streams(ones, twos), 10);
*/

function dest_map(fun, xs) {
    if (!is_null(xs)) {
        const h = head(xs);
        set_head(xs, fun(h));
        dest_map(fun,tail(xs));
    }
}
const L = list(1, 2, 3);
dest_map(x => y => x + y, L);