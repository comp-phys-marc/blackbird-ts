/** Class representing a bad argument exception. */
class BadArgumentError extends Error {
    constructor(message?: string) {
       super(message);
       Object.setPrototypeOf(this, new.target.prototype);
       this.name = BadArgumentError.name;
    } 
}

/** Class representing a bad register exception. */
class BadRegisterError extends Error {
    constructor(message?: string) {
       super(message);
       Object.setPrototypeOf(this, new.target.prototype);
       this.name = BadRegisterError.name;
    } 
}

/** Class representing a bad parameter exception. */
class BadParameterError extends Error {
    constructor(message?: string) {
       super(message);
       Object.setPrototypeOf(this, new.target.prototype);
       this.name = BadParameterError.name;
    } 
}

/** Class representing a bad measurement exception. */
class BadMeasurementError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadMeasurementError.name;
    } 
}

/** Class representing a bad operator exception. */
class BadOperatorError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadOperatorError.name;
    } 
}

/** Class representing a bad array exception. */
class BadArrayError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadArrayError.name;
    }
}

/** Class representing a bad shape exception. */
class BadShapeError extends Error {
    constructor(message?: string) {
       super(message);
       Object.setPrototypeOf(this, new.target.prototype);
       this.name = BadShapeError.name;
    } 
}

/** Class representing a bad type exception. */
class BadTypeError extends Error {
    constructor(message?: string) {
       super(message);
       Object.setPrototypeOf(this, new.target.prototype);
       this.name = BadTypeError.name;
    } 
}

/** Class representing a bad integer exception. */
class BadIntError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadIntError.name;
    } 
}

/** Class representing a bad float exception. */
class BadFloatError extends Error {
    constructor(message?: string) {
       super(message);
       Object.setPrototypeOf(this, new.target.prototype);
       this.name = BadFloatError.name;
    } 
}

/** Class representing a bad boolean exception. */
class BadBoolError extends Error {
    constructor(message?: string) {
       super(message);
       Object.setPrototypeOf(this, new.target.prototype);
       this.name = BadBoolError.name;
    } 
}

/** Class representing a bad string exception. */
class BadStrError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = BadStrError.name;
    } 
}

/** Class representing a bad complex exception. */
class BadComplexError extends Error {
    constructor(message?: string) {
       super(message);
       Object.setPrototypeOf(this, new.target.prototype);
       this.name = BadComplexError.name;
    } 
}

export {
    BadArgumentError,
    BadMeasurementError,
    BadParameterError,
    BadRegisterError,
    BadOperatorError,
    BadArrayError,
    BadShapeError,
    BadTypeError,
    BadIntError,
    BadFloatError,
    BadBoolError,
    BadStrError,
    BadComplexError
};