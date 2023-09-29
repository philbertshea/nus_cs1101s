function make_active_list(xs) {
    return p => p < 0 || p >= length(xs) ? null : list(list_ref(xs, p));
}

const alist = make_active_list(list(8, 3, 5));

function act_length(as) {
    return is_null(as(0)) ? 0 : 1 + act_length(x => as(x+1));
}
act_length(alist);

function act_append(as, bs) {
    return p => p < act_length(as) 
                ? as(p)
                : bs(p - act_length(as));
}

const as = make_active_list(list(11, 22));
const bs = make_active_list(list(33, 44));
const cs = act_append(as, bs);
cs(3);

function sum(as, f) {
    return accumulate((x, ys) => f(head(as(x))) + ys,
                      0,
                      enum_list(0, act_length(as) - 1));
}

sum(as, x => x + 2);

function active_list_to_list(as) {
    return build_list(i => head(as(i)), act_length(as));
}

active_list_to_list(as);
