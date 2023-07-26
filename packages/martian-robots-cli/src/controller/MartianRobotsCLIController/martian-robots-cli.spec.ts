import inquirer from 'inquirer';
import { MartianRobotsCLIController } from "../MartianRobotsCLIController";

const sampleInput = `5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`;

const outputSpy = jest.spyOn(console, "log");

jest.spyOn(inquirer, "prompt")
  .mockImplementation(() => Promise.resolve({
    input: sampleInput
  }));

describe('MartianRobotsCLI tests', () => {
  it('given valid input, should respond with expected robot positions', async () => {

    const expectedOutput = `1 1 E
3 3 N LOST
2 3 S`;

    const cli = new MartianRobotsCLIController();
    await cli.launch();

    expect(outputSpy).toHaveBeenCalledWith(expectedOutput);
  });
});
