function scale_stream(c, stream) {
    return stream_map(x => c * x, stream);
}
const A = pair(1, () => scale_stream(2, A));

eval_stream(A, 3);

function mul_streams(a, b) {
    return pair(head(a) * head(b), 
                () => mul_streams(stream_tail(a), stream_tail(b)));
}

const integers = integers_from(1);
const B = pair(1, () => mul_streams(B, integers));

eval_stream(B, 5);


function one_gen(num) {
    return pair(num, () => one_gen(-1 * num));
}
const alt_ones1 = one_gen(1);
eval_stream(alt_ones1, 5);

const alt_ones2 = pair(1, () => pair(-1, () => alt_ones2));
eval_stream(alt_ones2, 5);

const alt_ones3 = pair(1, () => scale_stream(-1, alt_ones3));
eval_stream(alt_ones3, 5);

const ones = pair(1, () => ones);
let pos = false;
function f(x) {
    pos = !pos;
    return pos ? x : -x;
}
const alt_ones4 = stream_map(f, ones);

eval_stream(alt_ones4, 5);