import FacingOptions from './FacingOptions';

/*
 * Check for valid facing
 */
export let isValid = (facing) => {
    if (!facing || typeof facing !== "string") return false;
    else return (typeof FacingOptions[facing] !== "undefined");
};

/*
 * Get degree according to provided facing
 */
export let getFacingDegree = (facing) => {
    if (!isValid(facing)) throw new Error("Invalid facing:" + facing);
    return FacingOptions[facing].degree;
};

/*
 * Get move according to provided facing
 */
export let getFacingMoment = (facing) => {
    if (!isValid(facing)) throw new Error("Invalid facing:" + facing);
    return FacingOptions[facing].movement;
};

/*
 * Get FacingOptions according to provided degree
 */
export let getFacingOptions = (degree) => {
    const rDegree = parseInt((degree + 360) % 360, 10);
    for (let f in FacingOptions) {
        if (rDegree === FacingOptions[f].degree) return f;
    }
    throw new Error("Invalid degree: " + degree);
};
