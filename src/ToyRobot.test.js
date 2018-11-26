import ToyRobot from "./ToyRobot";

test('Instantiate ToyRobot', () => {
    let robot = new ToyRobot();
    expect(robot.tabletop.width).toBe(5);
    expect(robot.tabletop.height).toBe(5);
    expect(robot.x).toBe(null);
    expect(robot.y).toBe(null);
    expect(robot.facing).toBe(null);
});

test('Setting invalid facing of robot - 1', () => {
    let robot = new ToyRobot();
    expect(() => robot.setFacing("INVALID"))
        .toThrow(new Error("Invalid facing parameter value: INVALID"));
});

test('Setting invalid facing of robot - 2', () => {
    let robot = new ToyRobot();
    expect(() => robot.setFacing(1))
        .toThrow(new Error("Invalid facing parameter type!"));
});

test('Setting valid facing of robot', () => {
    let robot = new ToyRobot();
    robot.setFacing('NORTH');
    expect(robot.facing).toBe('NORTH');
});

test('Checking invalid placement of robot', () => {
    let robot = new ToyRobot();
    expect(() => robot.place(6, 6, 'SOUTH')).toThrow();
});

test('Checking correct placement of robot', () => {
    let robot = new ToyRobot();
    expect(robot.place(0, 0, 'SOUTH')).toBe(true);
});

test('Checking incorrect movement of robot', () => {
    let robot = new ToyRobot();
    robot.place(4, 4, 'NORTH');
    expect(() => robot.move()).toThrow();
});

test('Checking correct movement of robot', () => {
    let robot = new ToyRobot();
    robot.place(0, 0, 'NORTH');
    expect(robot.move()).toBe(true);
});

test('Rotate the robot 90 degrees anti-clock wise - without facing', () => {
    let robot = new ToyRobot();
    expect(robot.left()).toBe(false);
});

test('Rotate the robot 90 degrees anti-clock wise - with facing', () => {
    let robot = new ToyRobot();
    robot.place(0, 0, 'NORTH');
    expect(robot.left()).toBe(true);
});

test('Rotate the robot 90 degrees clock wise - without facing', () => {
    let robot = new ToyRobot();
    expect(robot.right()).toBe(false);
});

test('Rotate the robot 90 degrees clock wise - with facing', () => {
    let robot = new ToyRobot();
    robot.place(0, 0, 'NORTH');
    expect(robot.right()).toBe(true);
});

test('Announce the X,Y and F of the robot', () => {
    let robot = new ToyRobot();
    robot.place(0, 0, 'NORTH');
    expect(robot.report()).toEqual({
        X: 0,
        Y: 0,
        F: 'NORTH'
    });
});
