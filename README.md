# RB - Martian Robots

GUI Deployed at:

https://martianrobots.daniel-cotton.co.uk/

## Context / Problem

The surface of Mars can be modelled by a rectangular grid around which robots are able to
move according to instructions provided from Earth. You are to write a program that
determines each sequence of robot positions and reports the final position of the robot.

A robot position consists of a grid coordinate (a pair of integers: x-coordinate followed by
y-coordinate) and an orientation (N, S, E, W for north, south, east, and west).

A robot instruction is a string of the letters “L”, “R”, and “F” which represent, respectively, the
instructions:

- Left : the robot turns left 90 degrees and remains on the current grid point.
- Right : the robot turns right 90 degrees and remains on the current grid point.
- Forward : the robot moves forward one grid point in the direction of the current orientation and maintains the same orientation.

The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1).

There is also a possibility that additional command types may be required in the future and
provision should be made for this.

Since the grid is rectangular and bounded (...yes Mars is a strange planet), a robot that
moves “off” an edge of the grid is lost forever. However, lost robots leave a robot “scent” that
prohibits future robots from dropping off the world at the same grid point. The scent is left at
the last grid position the robot occupied before disappearing over the edge. An instruction to
move “off” the world from a grid point from which a robot has been previously lost is simply
ignored by the current robot.

### Expected Input

The first line of input is the upper-right coordinates of the rectangular world, the lower-left
coordinates are assumed to be 0, 0.

The remaining input consists of a sequence of robot positions and instructions (two lines per
robot). A position consists of two integers specifying the initial coordinates of the robot and
an orientation (N, S, E, W), all separated by whitespace on one line. A robot instruction is a
string of the letters “L”, “R”, and “F” on one line.

Each robot is processed sequentially, i.e., finishes executing the robot instructions before the
next robot begins execution.

The maximum value for any coordinate is 50.

All instruction strings will be less than 100 characters in length.

### Expected Output

For each robot position/instruction in the input, the output should indicate the final grid
position and orientation of the robot. If a robot falls off the edge of the grid the word “LOST”
should be printed after the position and orientation.

**Sample Input**

```sh
5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL
```

**Sample Output**

```sh
1 1 E
3 3 N LOST
2 3 S
```

## Project Structure

This project implements a solution to the above problem as a JavaScript (TypeScript) library within an NX monorepo.

**Project Contents**

- packages/
   - martian-robots/ (TypeScript library)
   - martian-robots-cli/ (TypeScript library)
   - martian-robots-gui/ (React/Typescript Web UI)

### QuickStart

The solution is surfaced as a CLI for easy interaction. To get started...

##### Installation / Dependencies

As this is an NX monorepo, all dependencies are managed at the root.

1. Install Node.JS v18 (LTS)
2. Install dependencies via npm `npm install`

##### Build

```bash
npm run build
```

Will compile all projects within monorepo.

##### Test

```bash
npm run test
```

Will test all projects within monorepo.

##### Start CLI

```bash
npm run cli
```

Launches interactive CLI for you to provide a valid input as per the spec above.

##### Start GUI

```bash
npm run gui
```

Starts web server on port 4200

http://localhost:4200

```md

### Packages

#### Martian-Robots (Core TypeScript Library)

This is the core TypeScript library implementing the solution to the Martian Robots problem.

##### Installation / Dependencies

As this is an NX monorepo, all dependencies are managed at the root.

1. Install Node.JS v18 (LTS)
2. Install dependencies via npm `npm install`

##### Running NX/Project Commands

Project commands (build, lint, test .etc) are executed via the NX CLI.

**Global Install**

You can either install this globally

`npm install -g @nrwl/cli`

And run a command of the format:

`nx run martian-robots:test`

**NPX/Yarn**

OR use yarn/npx to prefix any commands you run

`npx nx run martian-robots:test`

##### Available Commands (Targets)

The core library supports

- lint (ESLint)
- test (Jest Unit Test Suite)
- build (TSC Build)
```
