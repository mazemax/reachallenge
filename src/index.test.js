import { exec } from 'child_process';

let run = (args) => {
    return exec("node", ["./src/index.js"].concat(args)).stdout;
};

test('Execute the app', async () => {
    let output = await run();
    expect(output).not.toBeNull();
    expect(output).toBeDefined();
});
