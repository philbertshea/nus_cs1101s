function eval_postfix_exp(pfe) {
    let stash = [];
    let scount = 0;
    let len = array_length(pfe);
    let pcount = 0;
    
    while (pcount < len) {
        if (is_number(pfe[pcount])) {
            stash[scount] = pfe[pcount];
            scount = scount + 1;
        } else {
            const result = pfe[pcount] === "+" 
                            ? stash[scount - 2] + stash[scount - 1]
                            : pfe[pcount] === "-"
                            ? stash[scount - 2] - stash[scount - 1]
                            : pfe[pcount] === "*"
                            ? stash[scount - 2] * stash[scount - 1]
                            : pfe[pcount] === "/"
                            ? stash[scount - 2] / stash[scount - 1]
                            : error("Invalid");
            stash[scount - 2] = result;
            stash[scount - 1] = undefined;
            scount = scount - 1;
        }
        pcount = pcount + 1;
    }
    return stash[0];
}
eval_postfix_exp([30, 3, "/", 2, "*", 7, 8, 5, "+", "-", "+"]);