import Vorpal from "vorpal";
import chalk from "chalk";
import ToyRobot from "./ToyRobot";

const vorpal = new Vorpal().delimiter("toyRobot$");

/*
 * Checking if toy robot has been placed on tabletop
 */
const isRobotPlaced = (args) => {
    if (vorpal.activeCommand.parent.robotPlaced) {
        return true;
    } else {
        process.stdout.write(chalk.red("Error: The first valid command to the robot is a PLACE command! \n"));
        return false;
    }
};

vorpal.command("init",
    "Command to initialize Robot",
    {})
    .action((args, callback) => {
        let data, err;
        try {
            vorpal.activeCommand.parent.toyRobot = new ToyRobot();
            vorpal.activeCommand.parent.robotPlaced = false;
            data = {
                toyRobot: vorpal.activeCommand.parent.toyRobot,
                robotPlaced: vorpal.activeCommand.parent.robotPlaced
            };
        } catch (e) {
            err = e;
            process.stdout.write(chalk.red("Error: " + e.message + "\n"));
        }
        callback(err, data);
    })
    .hidden();

vorpal.command("PLACE <X,Y,F>",
                "PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.",
                {})
    .action((args, callback) => {
        let data, err;
        try {
          let parts = args["X,Y,F"].split(",");
          if (parts.length !== 3) {
              process.stdout.write(chalk.red("Error: Require parameter in X,Y,F format!\n"));
          } else {
              let [x, y, f] = parts;
              let finalX = (isNaN(parseInt(x, 10))) ? 0 : parseInt(x, 10);
              let finalY = (isNaN(parseInt(y, 10))) ? 0 : parseInt(y, 10);
              let finalF = f.toUpperCase();

              // process.stdout.write(chalk.green("Putting the toy robot on the table in position " + finalX + "," + finalY + "," + finalF + " \n"));
              data = vorpal.activeCommand.parent.toyRobot.place(finalX, finalY, finalF);
              vorpal.activeCommand.parent.robotPlaced = true;
          }
        } catch (e) {
          err = e;
          process.stdout.write(chalk.red("Error: " + e.message + "\n"));
        }
        callback(err, data);
    });

vorpal.command("MOVE",
                "MOVE will move the toy robot one unit forward in the direction it is currently facing.",
                {})
    .validate(isRobotPlaced)
    .action((args, callback) => {
        let data, err;
        try {
            // process.stdout.write(chalk.green("Moving 1 unit forward. \n"));
            data = vorpal.activeCommand.parent.toyRobot.move();
        } catch (e) {
            err = e;
            process.stdout.write(chalk.red("Error: " + e.message + "\n"));
        }
        callback(err, data);
    });

vorpal.command("LEFT",
                "LEFT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.",
                {})
    .validate(isRobotPlaced)
    .action((args, callback) => {
        let data, err;
        try {
            // process.stdout.write(chalk.green("Turning left. \n"));
            data = vorpal.activeCommand.parent.toyRobot.left();
        } catch (e) {
            err = e;
            process.stdout.write(chalk.red("Error: " + e.message + "\n"));
        }
        callback(err, data);
    });

vorpal.command("RIGHT",
                "RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.",
                {})
    .validate(isRobotPlaced)
    .action((args, callback) => {
        let data, err;
        try {
            // process.stdout.write(chalk.green("Turning Right. \n"));
            data = vorpal.activeCommand.parent.toyRobot.right();
        } catch (e) {
            err = e;
            process.stdout.write(chalk.red("Error: " + e.message + "\n"));
        }
        callback(err, data);
    });

vorpal.command("REPORT",
                "REPORT will announce the X,Y and F of the robot.",
                {})
    .validate(isRobotPlaced)
    .action((args, callback) => {
        let data, err;
        try {
            data = vorpal.activeCommand.parent.toyRobot.report();
            // process.stdout.write(chalk.blue("Announcing X,Y and F. \n"));
            process.stdout.write(chalk.blue(data.X + "," + data.Y + "," + data.F + " \n"));
        } catch (e) {
            err = e;
            process.stdout.write(chalk.red("Error: " + e.message + "\n"));
        }
        callback(err, data);
    });

vorpal.exec('init', {}, (data) => {
    // Left blank intentionally
});

// Attach the TTY's CLI prompt to that given instance of Vorpal
vorpal.show();

process.on("uncaughtException", (err) => {
    process.stdout.write(chalk.red("Error: " + err.message + "\n"));
    vorpal.ui.cancel();
});

export { vorpal };
