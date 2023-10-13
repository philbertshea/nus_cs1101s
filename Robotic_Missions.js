//import {ev3_speak} from "ev3";
// Mission 1

// Q1
ev3_speak("Hello Vera");

// 2
// this isnt right i think the position is not exact to cm, 
// i think the position refers to the radii of rotation of the motor 
// we may need to consider the radius of the wheel
// let radius = r; circumference = 2math_PIradius;
// so lets say we use the ev3_runForTime
// we need to find revolution per sec 
// with circumference and rev per sec i think we can find the time 
// then we can make the bot move 10cm...

// Assuming the diameter of the robot wheels is 5.6cm as indicated online.


const motorL = ev3_motorB(); //replace with whatever left motor is
const motorR = ev3_motorC(); //replace with whatever right motor is

ev3_motorSetSpeed(motorB, 204.63);
ev3_motorSetSpeed(motorC, 204.63);
// Actually gets the motor to move
ev3_motorStart(motorB); 
ev3_motorStart(motorC); 
// Lets the motor move for one second
ev3_pause(100);
// Stops the motor
ev3_motorStop(motorB);
ev3_motorStop(motorC);


// Q3 

ev3_runToRelativePosition(motorR, 385.724, 385.724);
ev3_pause(1000);
ev3_motorGetPosition(motorR);


// Q4 Alt
const motorL = ev3_motorB(); //replace with whatever left motor is
const motorR = ev3_motorC(); //replace with whatever right motor is

function straight(dist) { // distance is in cm
    ev3_motorSetSpeed(motorB, 20.463 * dist);
    ev3_motorSetSpeed(motorC, 20.463 * dist);
    // Actually gets the motor to move
    ev3_motorStart(motorB); 
    ev3_motorStart(motorC); 
    // Lets the motor move for one second
    ev3_pause(100);
    // Stops the motor
    ev3_motorStop(motorB);
    ev3_motorStop(motorC);
}

function rotate(deg, clockwise) { // in degrees
    ev3_runToRelativePosition(clockwise ? motorL : motorR, 4.28582 * deg, 4.28582 * deg);
    ev3_pause(1000);
    ev3_motorGetPosition(motorR);
}

straight(10);
rotate(90, false);
straight(5);
rotate(90, true);
straight(15);

/*
// Q4

const anticlock90 = ev3_runForTime(motorR,time,speed) 
//time and speed same as clock90

ev3_pause(1000);
ev3_runToAbsolutePosition(ev3_motorA(),10,1);
ev3_runToAbsolutePosition(ev3_motorB(),10,1);
ev3_pause(1000);
anticlock90;
ev3_pause(1000);
ev3_runToAbsolutePosition(ev3_motorA(),5,1);
ev3_runToAbsolutePosition(ev3_motorB(),5,1);
ev3_pause(1000);
clock90;
ev3_pause(1000);
ev3_runToAbsolutePosition(ev3_motorA(),15,1);
ev3_runToAbsolutePosition(ev3_motorB(),15,1);
*/







// Mission 2

// Q1
// Your program here.
const sensor = ev3_ultrasonicSensor();
const stopNow = false;
while(!stopNow) {
    ev3_ultrasonicSensorDistance(sensor);
    ev3_pause(1000);
}

// Q2
const sensor = ev3_ultrasonicSensor();
const motorL = ev3_motorB(); //replace with whatever left motor is
const motorR = ev3_motorC(); //replace with whatever right motor is

ev3_motorSetSpeed(motorB, 100);
ev3_motorSetSpeed(motorC, 100);
    // Actually gets the motor to move
ev3_motorStart(motorB); 
ev3_motorStart(motorC); 

while(ev3_ultrasonicSensorDistance(sensor) > 10) {
    ev3_pause(100);
}
// within 10cm
ev3_motorStop(motorB);
ev3_motorStop(motorC);

// Stopped

ev3_motorSetSpeed(motorB, -20.463 * 6); // 6cm per sec
ev3_motorSetSpeed(motorC, -20.463 * 6); // 6cm per sec

// Start reversing
ev3_motorStart(motorB); 
ev3_motorStart(motorC); 
ev3_pause(5000); // run for 5s
ev3_motorStop(motorB); 
ev3_motorStop(motorC); 

// Q3

const sensor = ev3_ultrasonicSensor();
const motorL = ev3_motorB(); //replace with whatever left motor is
const motorR = ev3_motorC(); //replace with whatever right motor is

ev3_motorSetSpeed(motorB, 100);
ev3_motorSetSpeed(motorC, 100);
    // Actually gets the motor to move
ev3_motorStart(motorB); 
ev3_motorStart(motorC); 

while (ev3_ultrasonicSensorDistance(sensor) > 10) {
    ev3_pause(100);
}
// Stopped
ev3_motorStop(motorB);
ev3_motorStop(motorC);

// Rotate 50% left 50% right
function rotate(deg, clockwise) { // in degrees
    ev3_runToRelativePosition(clockwise ? motorL : motorR, 4.28582 * deg, 4.28582 * deg);
    ev3_pause(1000);
    ev3_motorGetPosition(motorR);
}

rotate(90, math_random() < 0.5);

// Walk for length of box

function straight(dist) { // distance is in cm
    ev3_motorSetSpeed(motorB, 20.463 * dist);
    ev3_motorSetSpeed(motorC, 20.463 * dist);
    // Actually gets the motor to move
    ev3_motorStart(motorB); 
    ev3_motorStart(motorC); 
    // Lets the motor move for one second
    ev3_pause(100);
    // Stops the motor
    ev3_motorStop(motorB);
    ev3_motorStop(motorC);
}

straight();//lengthofbox


