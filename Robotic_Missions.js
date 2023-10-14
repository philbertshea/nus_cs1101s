//import {ev3_speak} from "ev3";
// Mission 1
/*
// Q1
ev3_speak("Hello");

// Q2

const motorL = ev3_motorB(); //replace with whatever left motor is
const motorR = ev3_motorC(); //replace with whatever right motor is

ev3_motorSetSpeed(motorL, 180);
ev3_motorSetSpeed(motorR, 180);
// Actually gets the motor to move
ev3_motorStart(motorL); 
ev3_motorStart(motorR); 
// Lets the motor move for one second
ev3_pause(1000);
// Stops the motor
ev3_motorStop(motorL);
ev3_motorStop(motorR);


// Q3
const motorL = ev3_motorB(); //replace with whatever left motor is
const motorR = ev3_motorC(); //replace with whatever right motor is

ev3_motorSetSpeed(motorL, -165);
ev3_motorSetSpeed(motorR, 165);

ev3_motorStart(motorL); 
ev3_motorStart(motorR); 

ev3_pause(1000);

ev3_motorStop(motorL);
ev3_motorStop(motorR);
*/

/*
// Q4 
const motorL = ev3_motorB(); //replace with whatever left motor is
const motorR = ev3_motorC(); //replace with whatever right motor is

function straight(dist) { // distance is in cm
    ev3_motorSetSpeed(motorL, 18 * dist);
    ev3_motorSetSpeed(motorR, 18 * dist);
    // Actually gets the motor to move
    ev3_motorStart(motorL); 
    ev3_motorStart(motorR); 
    // Lets the motor move for one second
    ev3_pause(1000);
    // Stops the motor
    ev3_motorStop(motorL);
    ev3_motorStop(motorR);
}

function rotate(clockwise) {
    if (clockwise) {
        ev3_motorSetSpeed(motorL, 165);
        ev3_motorSetSpeed(motorR, -165);
    } else {
        ev3_motorSetSpeed(motorL, -165);
        ev3_motorSetSpeed(motorR, 165);
    }

    ev3_motorStart(motorL); 
    ev3_motorStart(motorR); 

    ev3_pause(1000);

    ev3_motorStop(motorL);
    ev3_motorStop(motorR);
}

straight(10);
rotate(false);
straight(5);
rotate(true);
straight(15);

*/

// Mission 2

// Q1
// Your program here.
/*
const sensor = ev3_ultrasonicSensor();
let i = 0;
while(i < 10) {
    i = i + 1;
    ev3_pause(1000);
    display(ev3_ultrasonicSensorDistance(sensor));

}*/

/*
// Q2
const sensor = ev3_ultrasonicSensor();
const motorL = ev3_motorB(); //replace with whatever left motor is
const motorR = ev3_motorC(); //replace with whatever right motor is

ev3_motorSetSpeed(motorL, 100);
ev3_motorSetSpeed(motorR, 100);
    // Actually gets the motor to move
ev3_motorStart(motorL); 
ev3_motorStart(motorR); 

while(ev3_ultrasonicSensorDistance(sensor) > 100) {
    ev3_pause(100);
}
// within 10cm
ev3_motorStop(motorL);
ev3_motorStop(motorR);

// Stopped

function reverse(dist) { // distance is in cm
    ev3_motorSetSpeed(motorL, -18 * dist);
    ev3_motorSetSpeed(motorR, -18 * dist);
    // Actually gets the motor to move
    ev3_motorStart(motorL); 
    ev3_motorStart(motorR); 
    // Lets the motor move for one second
    ev3_pause(1000);
    // Stops the motor
    ev3_motorStop(motorL);
    ev3_motorStop(motorR);
}

reverse(30);
*/
// Q3
/*
const sensor = ev3_ultrasonicSensor();
const motorL = ev3_motorB(); //replace with whatever left motor is
const motorR = ev3_motorC(); //replace with whatever right motor is

ev3_motorSetSpeed(motorL, 100);
ev3_motorSetSpeed(motorR, 100);
    // Actually gets the motor to move
ev3_motorStart(motorL); 
ev3_motorStart(motorR); 

while (ev3_ultrasonicSensorDistance(sensor) > 100) {
    ev3_pause(100);
}
// Stopped
ev3_motorStop(motorL);
ev3_motorStop(motorR);

// Rotate 50% left 50% right

function rotate(clockwise) {
    if (clockwise) {
        ev3_motorSetSpeed(motorL, 165);
        ev3_motorSetSpeed(motorR, -165);
    } else {t
        ev3_motorSetSpeed(motorL, -165);
        ev3_motorSetSpeed(motorR, 165);
    }

    ev3_motorStart(motorL); 
    ev3_motorStart(motorR); 

    ev3_pause(1000);

    ev3_motorStop(motorL);
    ev3_motorStop(motorR);
}

const rand = math_random() < 0.5;
rotate(rand);

// Walk for length of box

function straight(dist) { // distance is in cm
    ev3_motorSetSpeed(motorL, 18 * dist);
    ev3_motorSetSpeed(motorR, 18 * dist);
    // Actually gets the motor to move
    ev3_motorStart(motorL); 
    ev3_motorStart(motorR); 
    // Lets the motor move for one second
    ev3_pause(1000);
    // Stops the motor
    ev3_motorStop(motorL);
    ev3_motorStop(motorR);
}

straight(10);
rotate(!rand);
let i = 0;
while(i < 2) {
    if(ev3_ultrasonicSensorDistance(sensor) > 200) {
        i = i + 1;
    }
    rotate(rand);
    straight(15);
    rotate(!rand);
}
straight(50);
*/



// Mission 3

// Q1

const colorsensor = ev3_colorSensor();
const touchsensor = ev3_touchSensor2();
while(!ev3_touchSensorPressed(touchsensor)) {
    ev3_pause(1000);
    display(ev3_reflectedLightIntensity(colorsensor));
}

/*
const colorsensor = ev3_colorSensor();
const touchsensor = ev3_touchSensor2();
let i = 0;
if (i = false){
    terminate
}
while(i < 10 || ev3_touchSensorPressed(touchsensor)) {
    i = i + 1;
    ev3_pause(1000);
    display(ev3_reflectedLightIntensity(colorsensor));
}*/




// Q2

const motorL = ev3_motorB(); 
const motorR = ev3_motorC(); 
const colorsensor = ev3_colorSensor();
const touchsensor = ev3_touchSensor2();

function straight(dist) { // distance is in cm
    ev3_motorSetSpeed(motorL, 18 * dist);
    ev3_motorSetSpeed(motorR, 18 * dist);
    // Actually gets the motor to move
    ev3_motorStart(motorL); 
    ev3_motorStart(motorR); 
    // Lets the motor move for one second
    ev3_pause(1000);
    // Stops the motor
    ev3_motorStop(motorL);
    ev3_motorStop(motorR);
}

function rotate(degrees) {
    ev3_motorSetSpeed(motorL, 165/90*degrees);
    ev3_motorSetSpeed(motorR, -165/90*degrees);

    ev3_motorStart(motorL); 
    ev3_motorStart(motorR); 

    ev3_pause(1000);

    ev3_motorStop(motorL);
    ev3_motorStop(motorR);
}

let i = 0;
function walk() {
    while(display(ev3_reflectedLightIntensity(colorsensor)) < 1) {
        straight(5);
        ev3_pause(3000);
    }
    i = 0;
}

for(i=0; i<10; i = i + 1) {
    if (ev3_touchSensorPressed(touchsensor)){
        break; 
    }
    if (display(ev3_reflectedLightIntensity(colorsensor)) < 1) {
        walk();
        break;
    } else {
        rotate(20 * i * (i%2=== 0 ? -1 : 1));
    } 
}




