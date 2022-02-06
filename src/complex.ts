 /** Class representing a complex number. */
 class Complex {

    /** The real component. */
    real:number;

    /** The imaginary component. */
    imaginary:number;
    
    /**
     * Creates a complex number.
     * @param real - The real component.
     * @param imaginary - The imaginary component.
     */
    constructor (real?:number, imaginary?:number) {
       this.real = real;
       this.imaginary = imaginary;
    }

    /**
     * Returns the complex number's string representation.
     * @return The complex number's string representation.
     */
    toString(): string {
        if(this.real != undefined && this.imaginary != undefined) {
            if (this.imaginary < 0) {
            return this.real.toString() + this.imaginary.toString() + 'j';
            } else {
                return this.real.toString() + '+' + this.imaginary.toString() + 'j';
            }
        } else if (this.real != undefined) {
            return this.real.toString();
        } else if (this.imaginary != undefined) {
            return this.imaginary.toString() + 'j';
        }
    }
}

/**
 * Parses a complex number's string representation.
 * @param val - The number's string representation.
 * @return A corresponding Complex object.
 */
 function parseComplex(val:string): Complex {
    let components:Array<string>;
    let order:number;
    if (val.indexOf('+') != -1) {
        components = val.split('+');
        components[1] = '+' + components[1];
    } else if (val.indexOf('-') != -1) {
        if (val.indexOf('-') == 0 && val.slice(1).indexOf('-') != -1) {
           components = val.slice(1).split('-');
           components[0] = '-' + components[0];
        } else {
           components = val.split('-');
        }
       components[1] = '-' + components[1];
    } else if (val.indexOf('j') == -1) {
       let real = parseFloat(val);
       return new Complex(real=real);
    } else {
       let imaginary = parseFloat(val);
       return new Complex(imaginary=imaginary);
    }
    order = Number(components[0].indexOf('j') != -1);
    let real = parseFloat(components[order]);
    let imaginary = parseFloat(components[Number(!order)].slice(0, components[Number(!order)].length - 1))
    return new Complex(real, imaginary);
}

export {
    Complex,
    parseComplex
};