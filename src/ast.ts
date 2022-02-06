import { Complex } from './complex';

/** Base class representing a basic AST node. */
class AstNode {}

/** Class representing a qumode register. */
class Register extends AstNode {
    index:number;
    id:string;
    constructor(id:string, index?:number) {
        super();
        this.id = id;
        this.index = index;
    }
}

/** Class representing an identifier. */
class Id extends AstNode {
    id:string;
    constructor(id:string) {
       super();
       this.id = id;
    }
}

/** Class representing a name. */
class Name extends AstNode {
    val:string;
    constructor(val:string) {
       super();
       this.val = val;
    }
}

/** Class representing a version. */
class Version extends AstNode {
    val:string;
    constructor(val:string) {
        super();
       this.val = val;
    }
}

/** Class representing a target. */
class Target extends AstNode {
    val:string;
    params:Array<Parameter>;
    constructor(val:string, params?:Array<Parameter>) {
       super();
       this.val = val;
       this.params = params;
    } 
}

/** Class representing a device. */
class Device extends AstNode {
    val:string;
    constructor(val:string) {
       super();
       this.val = val;
    }
}

/** Class representing an include. */
class Include extends AstNode {
    val:string;
    constructor(val:string) {
        super();
        this.val = val;
     }
 }

/** Class representing a measurement. */
class Measure extends AstNode {
    name:string;
    registers:Array<Register | Int>;
    params:Array<Parameter>;
    constructor(name:string, registers:Array<Register | Int>,
        params:Array<Parameter>) {
        super();
        this.name = name;
        this.registers = registers;
        this.params = params;
    } 
}

/** Class representing an operator application. */
class ApplyOperator extends AstNode {
    name:string;
    registers:Array<Register | Int>;
    params:Array<Parameter>;
    constructor(name:string, registers:Array<Register | Int>, params:Array<Parameter>) {
        super();
        this.name = name;
        this.registers = registers;
        this.params = params;
    }
}

/** Class representing an operator. */
class Operator extends AstNode {
    name:string;
    registers:Array<Register>;
    params:Array<string>;
    nodes:Array<AstNode>;
    constructor(name:string, registers:Array<Register>, params:Array<string>, nodes:Array<AstNode>) {
       super();
       this.name = name;
       this.registers = registers;
       this.params = params;
       this.nodes = nodes;
    } 
}

/** Base class representing a basic parameter. */
class Parameter extends AstNode {}

/** Class representing an array. */
class Arr<Parameter> extends Parameter {
    name:string;
    type:string;
    vals:Array<Parameter>;
    size:Array<Int>;
    constructor(name:string, vals:Array<Parameter>, size:Array<Int>, type:string) {
       super();
       this.name = name;
       this.vals = vals;
       this.size = size;
       this.type = type;
    } 
}

/** Class representing a float. */
class Float extends Parameter {
    name:string;
    val:AstNode | number;
    constructor(val:AstNode | number, name?:string) {
       super();
       this.name = name;
       this.val = val;
    } 
}

/** Class representing a string. */
class Str extends Parameter {
    name:string;
    val:AstNode | string;
    constructor(val:AstNode | string, name?:string) {
        super();
        this.name = name;
        this.val = val;
    }
}

/** Class representing an integer. */
class Int extends Parameter {
    name:string;
    val:AstNode | number;
    constructor(val:AstNode | number, name?:string) {
        super();
        this.name = name;
        this.val = val;
    } 
}

/** Class representing a complex number. */
class Comp extends Parameter {
    name:string;
    val:AstNode | Complex;
    constructor(val:AstNode | Complex, name?:string) {
        super();
        this.name = name;
        this.val = val;
    }
}

/** Class representing a boolean. */
class Bool extends Parameter {
    name:string;
    val:AstNode | boolean;
    constructor(val:AstNode | boolean, name?:string) {
       super();
       this.name = name;
       this.val = val;
    } 
}

/** Class representing a variable. */
class Variable extends Parameter {
    val:string;
    constructor(val:string) {
       super();
       this.val = val;
    }
}

/** Base class representing a parameter that takes a parameter itself. */
class NestedParameter extends Parameter {
    param:Parameter;
    constructor(param:Parameter) {
        super();
       this.param = param;
    }
}

/** Class representing tangent. */
class Tan extends NestedParameter {}

/** Class representing cosine. */
class Cos extends NestedParameter {}

/** Class representing sine. */
class Sin extends NestedParameter {}

/** Class representing hyperbolic tangent. */
class Tanh extends NestedParameter {}

/** Class representing hyperbolic cosine. */
class Cosh extends NestedParameter {}

/** Class representing hyperbolic sine. */
class Sinh extends NestedParameter {}

/** Class representing inverse tangent. */
class ArcTan extends NestedParameter {}

/** Class representing inverse cosine. */
class ArcCos extends NestedParameter {}

/** Class representing inverse sine. */
class ArcSin extends NestedParameter {}

/** Class representing inverse hyperbolic tangent. */
class ArcTanh extends NestedParameter {}

/** Class representing inverse hyperbolic cosine. */
class ArcCosh extends NestedParameter {}

/** Class representing inverse hyperbolic sine. */
class ArcSinh extends NestedParameter {}

/** Class representing exponential. */
class Exp extends NestedParameter {}

/** Class representing log. */
class Log extends NestedParameter {}

/** Class representing pi. */
class Pi extends Parameter {}

/** Class representing minus. */
class Minus extends Parameter {}

/** Class representing plus. */
class Plus extends Parameter {}

/** Class representing times. */
class Times extends Parameter {}

/** Class representing equals. */
class Equals extends Parameter {}

/** Class representing divide. */
class Divide extends Parameter {}

/** Class representing power. */
class Power extends Parameter {}

/** Class representing sqrt. */
class Sqrt extends NestedParameter {}

/** Class representing an expression. */
class Expression extends Parameter {
    elements:Array<Parameter>;
    constructor(elements:Array<Parameter>) {
        super();
       this.elements = elements;
    }
}

export {
    AstNode,
    Measure,
    Id,
    Register,
    ApplyOperator,
    Operator,
    Name,
    Version,
    Target,
    Device,
    Arr,
    Float,
    Int,
    Comp,
    Bool,
    Include,
    Parameter,
    Variable,
    Minus,
    Plus,
    Times,
    Divide,
    Power,
    Sin,
    Cos,
    Tan,
    Sinh,
    Cosh,
    Tanh,
    ArcSin,
    ArcCos,
    ArcTan,
    ArcSinh,
    ArcCosh,
    ArcTanh,
    Log,
    Exp,
    Pi,
    Sqrt,
    Str,
    Expression,
    Equals
};
