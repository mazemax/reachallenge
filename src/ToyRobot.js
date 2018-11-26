import TableTop from "./TableTop";
import { isValid, getFacingByDegree, getFacingDegree, getFacingMoment } from "./FacingUtils";

class ToyRobot {
    /*
     * Initializing ToyRobot
     */
    constructor () {
        this.tabletop = new TableTop();
        this.x = null;
        this.y = null;
        this.facing = null;
    }

    /*
     * Set facing of robot
     */
    setFacing (facing) {
        if (typeof facing !== "string") {
            throw new Error("Invalid facing parameter type!");
        }
        facing = facing.toUpperCase();
        if (!isValid(facing)) {
            throw new Error("Invalid facing parameter value: " + facing);
        }
        this.facing = facing;
    }

    /*
     * Put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST
     */
    place (x, y, f) {
        if (this.tabletop.checkOutOfBound(x, y)) {
            throw new Error(x + "," + y + " is out of tabletop boundary!");
        } else {
            this.setFacing(f);
            this.x = x;
            this.y = y;
            return true;
        }
    }

    /*
     * Move the toy robot one unit forward in the direction it is currently facing
     */
    move () {
        let [nextX, nextY] = getFacingMoment(this.facing);
        let newX = this.x + nextX;
        let newY = this.y + nextY;

        if (this.tabletop.checkOutOfBound(newX, newY)) {
            throw new Error(newX + "," + newY + " is out of tabletop boundary!");
        } else {
            this.x = newX;
            this.y = newY;
            return true;
        }
    }

    /*
     * Rotate the robot 90 degrees anti-clock wise
     */
    left () {
        if (!this.facing) return false;

        let degree = getFacingDegree(this.facing);
        degree -= 90;
        this.facing = getFacingByDegree(degree);
        return true;
    }

    /*
     * Rotate the robot 90 degrees clock wise
     */
    right () {
        if (!this.facing) return false;

        let degree = getFacingDegree(this.facing);
        degree += 90;
        this.facing = getFacingByDegree(degree);
        return true;
    }

    /*
     * Announce the X,Y and F of the robot
     */
    report () {
        return {
            X: this.x,
            Y: this.y,
            F: this.facing
        };
    }
}

export default ToyRobot;
