"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;class TableTop{/*
     * Initializing Tabletop
     */constructor(width=5,height=5){this.width=width;this.height=height;}/*
     * Check if this move is off the table
     */checkOutOfBound(x,y){if(x<0||y<0)return true;else if(x>this.width-1)return true;else if(y>this.height-1)return true;else return false;}}var _default=TableTop;exports.default=_default;
//# sourceMappingURL=TableTop.js.map