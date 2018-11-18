import Vorpal from "vorpal";
import chalk from "chalk";

const vorpal = new Vorpal();

vorpal.command("PLACE <X,Y,F>")
  .description("PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.")
  .action((args, callback) => {
      try {
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
    .action((args, callback) => {
        try {
            process.stdout.write(chalk.green("Moving 1 unit forward. \n"));
        } catch (e) {
            process.stdout.write(chalk.red("Error: " + e.message + "\n"));
        }
        callback();
    });

vorpal.command("LEFT")
    .description("LEFT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.")
    .action((args, callback) => {
        try {
            process.stdout.write(chalk.green("Turning left. \n"));
        } catch (e) {
            process.stdout.write(chalk.red("Error: " + e.message + "\n"));
        }
        callback();
    });

vorpal.command("RIGHT")
    .description("RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.")
    .action((args, callback) => {
        try {
            process.stdout.write(chalk.green("Turning Right. \n"));
        } catch (e) {
            process.stdout.write(chalk.red("Error: " + e.message + "\n"));
        }
        callback();
    });

vorpal.command("REPORT")
    .description("REPORT will announce the X,Y and F of the robot.")
    .action((args, callback) => {
        try {
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
