import Vorpal from "vorpal";
import chalk from "chalk";

const vorpal = new Vorpal();
vorpal.localStorage('toyRobot' + new Date());

const checkForLastCommand = (args) => {
    // Checking last command
    let commands = vorpal.localStorage.getItem('commands');
    if (commands !== null) {
        return true;
    } else {
        process.stdout.write(chalk.red("Error: The first valid command to the robot is a PLACE command! \n"));
        return false;
    }
};

vorpal.command("PLACE <X,Y,F>")
  .description("PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.")
    .action((args, callback) => {
      try {
          // Storing the PLACE command
          let commands = vorpal.localStorage.getItem('commands');
          if (commands !== null) {
              Object.assign(JSON.parse(commands), { command: "PLACE" + args["X,Y,F"] });
              vorpal.localStorage.setItem('commands', JSON.stringify(commands));
          } else {
              vorpal.localStorage.setItem('commands', JSON.stringify({ command: "PLACE" + args["X,Y,F"] }));
          }

          let parts = args["X,Y,F"].split(",");
          if (parts.length !== 3) {
              process.stdout.write(chalk.red("Error: Require parameter in X,Y,F format!\n"));
          } else {
              let [x, y, f] = parts;
              let finalX = (isNaN(parseInt(x, 10))) ? 0 : parseInt(x, 10);
              let finalY = (isNaN(parseInt(y, 10))) ? 0 : parseInt(y, 10);
              let finalF = f.toUpperCase();

              process.stdout.write(chalk.green("Putting the toy robot on the table in position " + finalX + "," + finalY + "," + finalF + " \n"));
          }
      } catch (e) {
          process.stdout.write(chalk.red("Error: " + e.message + "\n"));
      }
      callback();
    });

vorpal.command("MOVE")
    .description("MOVE will move the toy robot one unit forward in the direction it is currently facing.")
    .validate(checkForLastCommand)
    .action((args, callback) => {
        try {
            // Storing the MOVE command
            let commands = JSON.parse(vorpal.localStorage.getItem('commands'));
            Object.assign(commands, { command: "MOVE" });
            vorpal.localStorage.setItem('commands', JSON.stringify(commands));

            process.stdout.write(chalk.green("Moving 1 unit forward. \n"));
        } catch (e) {
            process.stdout.write(chalk.red("Error: " + e.message + "\n"));
        }
        callback();
    });

vorpal.command("LEFT")
    .description("LEFT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.")
    .validate(checkForLastCommand)
    .action((args, callback) => {
        try {
            // Storing the LEFT command
            let commands = JSON.parse(vorpal.localStorage.getItem('commands'));
            Object.assign(commands, { command: "LEFT" });
            vorpal.localStorage.setItem('commands', JSON.stringify(commands));

            process.stdout.write(chalk.green("Turning left. \n"));
        } catch (e) {
            process.stdout.write(chalk.red("Error: " + e.message + "\n"));
        }
        callback();
    });

vorpal.command("RIGHT")
    .description("RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.")
    .validate(checkForLastCommand)
    .action((args, callback) => {
        try {
            // Storing the RIGHT command
            let commands = JSON.parse(vorpal.localStorage.getItem('commands'));
            Object.assign(commands, { command: "RIGHT" });
            vorpal.localStorage.setItem('commands', JSON.stringify(commands));

            process.stdout.write(chalk.green("Turning Right. \n"));
        } catch (e) {
            process.stdout.write(chalk.red("Error: " + e.message + "\n"));
        }
        callback();
    });

vorpal.command("REPORT")
    .description("REPORT will announce the X,Y and F of the robot.")
    .validate(checkForLastCommand)
    .action((args, callback) => {
        try {
            // Storing the REPORT command
            let commands = JSON.parse(vorpal.localStorage.getItem('commands'));
            Object.assign(commands, { command: "REPORT" });
            vorpal.localStorage.setItem('commands', JSON.stringify(commands));

            process.stdout.write(chalk.green("Announcing X,Y and F. \n"));
        } catch (e) {
            process.stdout.write(chalk.red("Error: " + e.message + "\n"));
        }
        callback();
    });

vorpal.delimiter("toyRobot$").show();

process.on("uncaughtException", (err) => {
    process.stdout.write(chalk.red("Error: " + err.message + "\n"));
    vorpal.ui.cancel();
});
