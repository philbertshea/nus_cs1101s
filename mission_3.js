// Mission 3: Beyond the second dimension

// Q1

function steps(r1, r2, r3, r4){
    // Each rune is created by scaling by 1/2 and translating to their respective positions
    // Observe that from the middle, each rune is displaced by either positive 0.5 or negative 0.5
    // in both the x and y directions.
    // Therefore, using a similar concept as the implementation of besiden/stackn,
    // We can overlay the runes while ensuring equal spacing between layers.
    return overlay_frac(1/4, translate(-0.5, -0.5, scale(1/2,r4)),
            overlay_frac(1/3, translate(-0.5, 0.5, scale(1/2,r3)), 
            overlay_frac(1/2, translate(0.5, 0.5, scale(1/2,r2)), 
            translate(0.5, -0.5, scale(1/2,r1)))));
    // your answer here
}


// Tests
show(steps(rcross, triangle, corner, nova));
hollusion(steps(rcross, triangle, corner, nova));


// Q2

function cone(n, rune){
    // An iter function is defined within cone
    // This gives an iterative process, by doing the computations within the cone function
    function iter(result, count) {
        return count>n 
                ? result :
                iter(
                    overlay_frac(
                        1/count,
                        scale((n+1-count)/n, rune), 
                        result
                    ), 
                    count+1
                );
    }
    
    return iter(rune, 2);
    // your answer here
}

// Tests
show(cone(4, circle));
hollusion(cone(15, circle));