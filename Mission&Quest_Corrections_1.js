import {play, sine_sound, simultaneously, consecutively} from "sound";

// Pots and Pans Q3 Correction
function dial(list_of_digits) {
    // your answer here
    return consecutively(accumulate((x, y) => pair(make_dtmf_tone(get_dtmf_frequencies(x)),
                                                    pair(silence_sound(0.1), 
                                                        y)), null, list_of_digits));
}

// Pots and Pans Q4 Correction

function dial_all(list_of_numbers) {
    // Uses only accumulate
    const nodial = list(1,8,0,0,5,2,1,1,9,8,0);
    function helper(list_of_num) {
        return consecutively(list(dial(list_of_num), 
                                  make_dtmf_tone(get_dtmf_frequencies(11))));
    }
    return consecutively(accumulate((x, y) => equal(x, nodial)
                                              ? y
                                              : pair(helper(x), y), 
                                                    null, 
                                                    list_of_numbers));
}

function dial_all_2(list_of_numbers) {
    // Uses filter and accumulate
    const nodial = list(1,8,0,0,5,2,1,1,9,8,0);
    const dialme = filter(x => !equal(x, nodial), list_of_numbers);
    
    function helper(x, y) {
        return consecutively(list(dial(x), 
                                  make_dtmf_tone(get_dtmf_frequencies(11)),
                                  y));
    }
    return accumulate(helper, silence_sound(0), dialme);
}

// Premorsal Q4 Correction
function consecutively(list_of_sounds) {
    /* your answer here */
    // two_consecutively(s1, two_consecutively(s2, s3))
    return accumulate((x, y) => two_consecutively(x, y), silence_sound(0), list_of_sounds);
}
