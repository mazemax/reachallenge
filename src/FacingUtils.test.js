import { isValid, getFacingByDegree, getFacingDegree, getFacingMoment } from "./FacingUtils";

test('Check for valid facing', () => {
    expect(isValid('NORTH')).toBe(true);
});

test('Check for invalid facing - 1', () => {
    expect(isValid('INVALID')).toBe(false);
});

test('Check for invalid facing - 2', () => {
    expect(isValid(0)).toBe(false);
});

test('Get degree according to provided correct facing', () => {
    expect(getFacingDegree('NORTH')).toBe(0);
});

test('Get degree according to provided incorrect facing', () => {
    expect(() => getFacingDegree('INVALID')).toThrow();
});

test('Get move according to provided correct facing', () => {
    expect(getFacingMoment('NORTH')).toEqual([0, 1]);
});

test('Get move according to provided incorrect facing', () => {
    expect(() => getFacingMoment('INVALID')).toThrow();
});

test('Get FacingOptions according to provided degree - 1', () => {
    expect(getFacingByDegree(0)).toBe('NORTH');
});

test('Get FacingOptions according to provided degree - 2', () => {
    expect(() => getFacingByDegree(10)).toThrow();
});
