import { execSync } from 'child_process';
import { join } from 'path';

describe('MartianRobotsCLI tests', () => {
  it('given valid input, should respond with expected robot positions', () => {
    const sampleInput = `5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`;

    const expectedOutput = `1 1 E
3 3 N LOST
2 3 S`;

    const cliPath = join(process.cwd(), 'dist/packages/martian-robots-cli');

    const output = execSync(`echo "${sampleInput.split("\n").join("\\\n")}" | node ${cliPath}`).toString();

    expect(output).toMatch(expectedOutput);
  });
});
