display(build_list(x => x + 1, 3));

function make_image(rows, columns, func) {
    const row = r => build_list(c => func(r, c),  columns);
    return build_list(row, rows);
}

display_list(make_image(3, 4, (r, c) => r + c));

//const e = (x => x(x(x)))(x => x(x));

//const f = (x => x(x))(x => x(x(x)));

function ring_state(ring) {
    return head(ring);
}
function ring_id(ring) {
    return tail(ring);
}
function make_ring(state, id) {
    return pair(state, id);
}

function check_free(first_state, rings) {
    if (is_null(rings)) {
        return true;
    } else {
        return ring_state(head(rings)) === first_state &&
               ring_id(head(rings)) === length(rings) &&
               tail(accumulate(
                        (r, p) => pair(head(p) + 1,
                                       tail(p) && 
                                       ring_state(r) === "off" &&
                                       ring_id(r) === head(p)),
                        pair(1, true), tail(rings)));
    }
}

const rings = list(make_ring("on", 3),  make_ring("off", 2), make_ring("off", 1));
check_free("on", rings);