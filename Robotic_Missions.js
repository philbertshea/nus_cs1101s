// Mission 1

// Q1
ev3_speak("Hello World");

// Q2
// this isnt right i think the position is not exact to cm, 
// i think the position refers to the radii of rotation of the motor 
// we may need to consider the radius of the wheel
// let radius = r; circumference = 2math_PIradius;
// so lets say we use the ev3_runForTime
// we need to find revolution per sec 
// with circumference and rev per sec i think we can find the time 
// then we can make the bot move 10cm...

// Assuming the diameter of the robot wheels is 5.6cm as indicated online.


const motorL = //ev3_motorA(); replace with whatever left motor is
const motorR = //ev3_motorB(); replace with whatever right motor is

ev3_runToAbsolutePosition(motorL, 3.57, 1);
ev3_runToAbsolutePosition(motorR, 3.57, 1);
ev3_pause(1000);

// Q3

ev3_gyroSensorAngle(ev3_gyroSensor());

// code should turn only one wheel up till gyroSensor detects that ~80 
// degree turn is completed - underestimate due to network latency etc. 
// & inertial sensor errors

// or just trial and approximate a time and speed for which the motor will
// run to achieve a 90 degree turn - easier let's just do this

const clock90 = ev3_runForTime(motorL,time,speed); //time and speed need to trial
clock90;


// Q3 Alternative: By absolutePosition

ev3_runToAbsolutePosition(motorR, r * math_PI/5.6, 1)
ev3_pause(1000);

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