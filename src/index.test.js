import { exec } from 'child_process';
import Vorpal from "vorpal";
import { vorpal } from './index.js';

let run = (args) => {
    return exec("node", ["./src/index.js"].concat(args)).stdout;
};

test('Execute the app', async () => {
    let output = await run();
    expect(output).not.toBeNull();
    expect(output).toBeDefined();
});

test('Check vorpal instance', () => {
    expect(vorpal instanceof Vorpal).toBe(true);
});

test('Testing PLACE command', () => {
    vorpal.exec('PLACE 0,0,NORTH', {}, (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toBe(true);
    });
});

test('Testing MOVE command', () => {
    vorpal.exec('PLACE 0,0,NORTH', {}, (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toBe(true);
    });
    vorpal.exec('MOVE', {}, (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toBe(true);
    });
});

test('Testing LEFT command', () => {
    vorpal.exec('PLACE 0,0,NORTH', {}, (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toBe(true);
    });
    vorpal.exec('LEFT', {}, (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toBe(true);
    });
});

test('Testing RIGHT command', () => {
    vorpal.exec('PLACE 0,0,NORTH', {}, (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toBe(true);
    });
    vorpal.exec('RIGHT', {}, (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toBe(true);
    });
});

test('Testing REPORT command', () => {
    vorpal.exec('PLACE 0,0,NORTH', {}, (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toBe(true);
    });
    vorpal.exec('REPORT', {}, (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toEqual({
            X: 0,
            Y: 0,
            F: 'NORTH'
        });
    });
});

test('Testing Example a', () => {
    vorpal.exec('PLACE 0,0,NORTH', {}, (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toBe(true);
    });
    vorpal.exec('MOVE', {}, (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toBe(true);
    });
    vorpal.exec('REPORT', {}, (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toEqual({
            X: 0,
            Y: 1,
            F: 'NORTH'
        });
    });
});

test('Testing Example b', () => {
    vorpal.exec('PLACE 0,0,NORTH', {}, (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toBe(true);
    });
    vorpal.exec('LEFT', {}, (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toBe(true);
    });
    vorpal.exec('REPORT', {}, (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toEqual({
            X: 0,
            Y: 0,
            F: 'WEST'
        });
    });
});

test('Testing Example c', () => {
    vorpal.exec('PLACE 1,2,EAST', {}, (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toBe(true);
    });
    vorpal.exec('MOVE', {}, (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toBe(true);
    });
    vorpal.exec('MOVE', {}, (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toBe(true);
    });
    vorpal.exec('LEFT', {}, (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toBe(true);
    });
    vorpal.exec('MOVE', {}, (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toBe(true);
    });
    vorpal.exec('REPORT', {}, (err, data) => {
        expect(err).not.toBeDefined();
        expect(data).toEqual({
            X: 3,
            Y: 3,
            F: 'NORTH'
        });
    });
});
