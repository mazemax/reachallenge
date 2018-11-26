"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _TableTop=_interopRequireDefault(require("./TableTop"));var _FacingUtils=require("./FacingUtils");class ToyRobot{/*
     * Initializing ToyRobot
     */constructor(){this.tabletop=new _TableTop.default();this.x=null;this.y=null;this.facing=null;}/*
     * Set facing of robot
     */setFacing(facing){if(typeof facing!=="string"){throw new Error("Invalid facing parameter type!");}facing=facing.toUpperCase();if(!(0,_FacingUtils.isValid)(facing)){throw Error("Invalid facing parameter value: "+facing);}this.facing=facing;}/*
     * Put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST
     */place(x,y,f){if(this.tabletop.checkOutOfBound(x,y)){throw new Error(x+","+y+" is out of tabletop boundary!");}else{this.setFacing(f);this.x=x;this.y=y;return true;}}/*
     * Move the toy robot one unit forward in the direction it is currently facing
     */move(){let[nextX,nextY]=(0,_FacingUtils.getFacingMoment)(this.facing);let newX=this.x+nextX;let newY=this.y+nextY;if(this.tabletop.checkOutOfBound(newX,newY)){return false;}else{this.x=newX;this.y=newY;return true;}}/*
     * Rotate the robot 90 degrees anti-clock wise
     */left(){if(!this.facing)return false;let degree=(0,_FacingUtils.getFacingDegree)(this.facing);degree-=90;this.facing=(0,_FacingUtils.getFacingOptions)(degree);return true;}/*
     * Rotate the robot 90 degrees clock wise
     */right(){if(!this.facing)return false;let degree=(0,_FacingUtils.getFacingDegree)(this.facing);degree+=90;this.facing=(0,_FacingUtils.getFacingOptions)(degree);return true;}/*
     * Announce the X,Y and F of the robot
     */report(){return{X:this.x,Y:this.y,F:this.facing};}}var _default=ToyRobot;exports.default=_default;
//# sourceMappingURL=ToyRobot.js.map