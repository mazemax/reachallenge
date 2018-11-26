"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.getFacingOptions=exports.getFacingMoment=exports.getFacingDegree=exports.isValid=void 0;var _FacingOptions=_interopRequireDefault(require("./FacingOptions"));/*
 * Check for valid facing
 */let isValid=facing=>{if(!facing||typeof facing!=="string")return false;else return typeof _FacingOptions.default[facing]!=="undefined";};/*
 * Get degree according to provided facing
 */exports.isValid=isValid;let getFacingDegree=facing=>{if(!isValid(facing))throw new Error("Invalid facing:"+facing);return _FacingOptions.default[facing].degree;};/*
 * Get move according to provided facing
 */exports.getFacingDegree=getFacingDegree;let getFacingMoment=facing=>{if(!isValid(facing))throw new Error("Invalid facing:"+facing);return _FacingOptions.default[facing].movement;};/*
 * Get FacingOptions according to provided degree
 */exports.getFacingMoment=getFacingMoment;let getFacingOptions=degree=>{const rDegree=parseInt((degree+360)%360,10);for(let f in _FacingOptions.default){if(rDegree===_FacingOptions.default[f].degree)return f;}throw new Error("Invalid degree: "+degree);};exports.getFacingOptions=getFacingOptions;
//# sourceMappingURL=FacingUtils.js.map