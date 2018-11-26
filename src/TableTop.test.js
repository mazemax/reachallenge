import TableTop from "./TableTop";

test('Instantiate TableTop', () => {
    let tableTop = new TableTop(5, 5);
    expect(tableTop.width).toBe(5);
    expect(tableTop.height).toBe(5);
});

test('Check if the table move is in negative', () => {
    let tableTop = new TableTop(5, 5);
    expect(tableTop.checkOutOfBound(-1, -1)).toBe(true);
});

test('Check if the table move goes beyond width', () => {
    let tableTop = new TableTop(5, 5);
    expect(tableTop.checkOutOfBound(6, 1)).toBe(true);
});

test('Check if the table move goes beyond height', () => {
    let tableTop = new TableTop(5, 5);
    expect(tableTop.checkOutOfBound(1, 6)).toBe(true);
});

test('Check if the table move is within the table width and height', () => {
    let tableTop = new TableTop(5, 5);
    expect(tableTop.checkOutOfBound(1, 1)).toBe(false);
});
