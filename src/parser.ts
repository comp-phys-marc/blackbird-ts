import {
    Token,
    notParam,
    typeName,
    notNestedParam
} from './token';

import {
    BadArgumentError,
    BadMeasurementError,
    BadParameterError,
    BadOperatorError,
    BadArrayError,
    BadTypeError,
    BadIntError,
    BadFloatError,
    BadBoolError,
    BadStrError,
    BadComplexError
} from './errors';

import {
    AstNode,
    Measure,
    Register,
    ApplyOperator,
    Name,
    Version,
    Target,
    Device,
    Include,
    Parameter,
    Int,
    Float,
    Bool,
    Arr,
    Comp,
    Variable,
    Pi,
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
    Sqrt,
    Str,
    Expression,
    Equals
} from './ast';

import {
    Complex,
    parseComplex
} from './complex';

/** Class representing a token parser. */
class Parser {
    
    /** The tokens to parse. */
    tokens:Array<[Token, (number | Complex | String)?]>;
    
    /** The allowed operators. */
    operators:Array<string>;
    
    /** The allowed state preparations. */
    prepStates:Array<string>;
    
    /**
     * Creates a parser.
     * @param tokens - Tokens to parse.
     */
    constructor(tokens:Array<[Token, (number | Complex | String)?]>) {
        this.tokens = tokens;
        this.operators = [
            'Xgate',
            'Zgate',
            'Dgate',
            'Sgate',
            'Rgate',
            'Pgate',
            'Vgate',
            'Kgate',
            'Fouriergate',
            'CXgate',
            'CZgate',
            'CKgate',
            'BSgate',
            'S2gate',
            'Interferometer',
            'GaussianTransform',
            'Gaussian'
        ]
        this.prepStates = [
            'Fock',
            'Coherent',
            'Squeezed',
            'Vac',
            'Thermal',
            'DisplacedSqueezed',
            'Catstate'
        ]
    }

    /**
     * Calling this method parses the code represented by the provided tokens.
     * @return The abstract syntax tree.
     */
    parse(): Array<AstNode> {
        let ast:Array<AstNode> = [];
        let i = 0;
        while (i < (this.tokens.length - 1)) {
            let nodes = this.parseNode(this.tokens.slice(i));
            ast = ast.concat(
                    nodes ? nodes : []
                );
            if (this.tokens[i][0] == Token.TypeArray || this.tokens[i + 1][0] ==
                Token.TypeArray) {
                while (!(this.matchNext(this.tokens.slice(i), [Token.Newline,
                    Token.Newline]))) {
                    i++; 
                }
                i++; 
            } else {
                while (!(this.tokens[i] == undefined) &&
                !(this.matchNext(this.tokens.slice(i), [Token.EndOfFile])) &&
                !(this.matchNext(this.tokens.slice(i), [Token.Newline]))) {
                    i++;
                } 
            }
            i++; 
        }
        return ast; 
    }

    /**
     * Delegates the parsing of the next set of tokens to the appropriate method.
     * @param tokens - Remaining tokens to parse.
     * @param allowVariables - Whether encountered identifiers should be consider
        variable initializations or references.
    * @return A set of AST nodes.
    */
    parseNode(tokens:Array<[Token, (number | Complex | String)?]>, allowVariables:boolean=false): Array<AstNode> {
        const token = tokens[0];
        switch(token[0]) {
        case Token.True:
            return [new Bool(true)];
        case Token.False:
            return [new Bool(false)];
        case Token.Name:
            return [new Name(token[1].toString())];
        case Token.Version:
            return [new Version(token[1].toString())];
        case Token.Target:
            return [new Target(token[1].toString(),
                this.matchParamList(tokens.slice(1)))];
        case Token.Device:
            return [new Device(token[1].toString())];
        case Token.Measure:
            return [this.measure(tokens)];
        case Token.Identifier:
            if (!allowVariables) {
                if (this.operators.includes(token[1].toString()) ||
                    this.prepStates.includes(token[1].toString())) {
                    return [this.application(tokens)];
                } else {
                    throw BadOperatorError;
                 }
            } else {
                return [new Variable(token[1].toString())];
            }
        case Token.Include:
            this.operators.push(token[1].toString());
            return [new Include(token[1].toString())];
        case Token.Int:
            return [new Int(Number(tokens[0][1]))];
        case Token.Float:
            return [new Float(Number(tokens[0][1]))];
        case Token.Complex:
            return [new Comp(parseComplex(tokens[0][1].toString()))];
        case Token.TypeArray:
            return [this.array(tokens.slice(1))];
        case Token.TypeInt:
            return [this.int(tokens.slice(1))];
        case Token.TypeFloat:
            return [this.float(tokens.slice(1))];
        case Token.TypeBool:
            return [this.bool(tokens.slice(1))];
        case Token.TypeStr:
            return [this.str(tokens.slice(1))];
        case Token.TypeComplex:
            return [this.complex(tokens.slice(1))];
        case Token.Pwr:
            return [new Power()];
        case Token.Divide:
            return [new Divide()];
        case Token.Times:
            return [new Times()];
        case Token.Plus:
            return [new Plus()];
        case Token.Minus:
            return [new Minus()];
        case Token.Pi:
            return [new Pi()];
        case Token.Assign:
            return [new Equals()];
        case Token.String:
            return [new Str(token[1])];
        case Token.Log:
            return [new Log(this.matchParamList(tokens.slice(1)))];
        case Token.Sin:
            return [new Sin(this.matchParamList(tokens.slice(1)))];
        case Token.Cos:
            return [new Cos(this.matchParamList(tokens.slice(1)))];
        case Token.Exp:
            return [new Exp(this.matchParamList(tokens.slice(1)))];
        case Token.Sqrt:
            return [new Sqrt(this.matchParamList(tokens.slice(1)))];
        case Token.Tan:
            return [new Tan(this.matchParamList(tokens.slice(1)))];
        case Token.ArcSin:
            return [new ArcSin(this.matchParamList(tokens.slice(1)))];
        case Token.ArcCos:
            return [new ArcCos(this.matchParamList(tokens.slice(1)))];
        case Token.ArcTan:
            return [new ArcTan(this.matchParamList(tokens.slice(1)))];
        case Token.ArcSinh:
            return [new ArcSinh(this.matchParamList(tokens.slice(1)))];
        case Token.ArcCosh:
            return [new ArcCosh(this.matchParamList(tokens.slice(1)))];
        case Token.ArcTanh:
            return [new ArcTanh(this.matchParamList(tokens.slice(1)))];
        case Token.Sinh:
            return [new Sinh(this.matchParamList(tokens.slice(1)))];
        case Token.Cosh:
            return [new Cosh(this.matchParamList(tokens.slice(1)))];
        case Token.Tanh:
            return [new Tanh(this.matchParamList(tokens.slice(1)))];
        }
    }


    /**
     * Parses a logical and mathematical expression.
     * @param tokens - Expression tokens to parse.
     * @return A parsed expression.
     */
    parseExpression(tokens:Array<[Token, (number | Complex | String)?]>): Expression {
        let elements:Array<Parameter> = [];
        while (tokens.length > 0) {
            if (notNestedParam(tokens[0][0])) {
                let node = this.parseNode(tokens, true);
                if (node != undefined) {
                    for (let i in node) {
                        elements.push(node[i]);
                    } 
                }
                tokens = tokens.slice(1);
            } else {
                let node = this.parseNode(tokens, true);
                if (node != undefined) {
                    for (let i in node) {
                        elements.push(node[i]);
                    }
                }
                while (!this.matchNext(tokens, [Token.Rbrac]) && tokens.length > 0) {
                tokens = tokens.slice(1);
                }
                tokens = tokens.slice(1);
            }
        }
        return new Expression(elements);
    }

    /**
     * Parses an integer variable declaration/initialization.
     * @param tokens - Tokens to parse.
     * @return The resulting AST node representing the integer.
     */
    int(tokens:Array<[Token, (number | Complex | String)?]>): AstNode {
        let name:string;
        let val:AstNode;
        if (this.matchNext(tokens, [Token.Identifier])) {
            name = tokens[0][1].toString();
            tokens = tokens.slice(1);
            if (this.matchNext(tokens, [Token.Assign])) {
                tokens = tokens.slice(1);
                let i = 0;
                let paramTokens = [];
                while (tokens[i] != undefined && !this.matchNext(tokens.slice(i),
                    [Token.Newline])) {
                    paramTokens.push(tokens[i]);
                    i++;
                }
                return new Int(this.parseExpression(paramTokens), name);
            }
        } else if (this.matchNext(tokens, [Token.TypeArray])) {
            val = this.array(tokens.slice(1), Token.Int);
            return val;
        }
        throw BadIntError;
    }


    /**
     * Parses a float variable declaration/initialization.
     * @param tokens - Tokens to parse.
     * @return The resulting AST node representing the float.
     */
    float(tokens:Array<[Token, (number | Complex | String)?]>): AstNode {
        let name:string;
        let val:AstNode;
        if (this.matchNext(tokens, [Token.Identifier])) {
            name = tokens[0][1].toString();
            tokens = tokens.slice(1);
            if (this.matchNext(tokens, [Token.Assign])) {
                tokens = tokens.slice(1);
                let i = 0;
                let paramTokens = [];
                while (tokens[i] != undefined && !this.matchNext(tokens.slice(i),
                   [Token.Newline])) {
                   paramTokens.push(tokens[i]);
                   i++;
                }
                return new Float(this.parseExpression(paramTokens), name);
            }
        } else if (this.matchNext(tokens, [Token.TypeArray])) {
            val = this.array(tokens.slice(1), Token.Float);
            return val;
        }
        throw BadFloatError;
    }

    /**
     * Parses a boolean variable declaration/initialization.
     * @param tokens - Tokens to parse.
     * @return The resulting AST node representing the boolean.
     */
    bool(tokens:Array<[Token, (number | Complex | String)?]>): AstNode {
        let name:string;
        let val:AstNode;
        if (this.matchNext(tokens, [Token.Identifier])) {
            name = tokens[0][1].toString();
            tokens = tokens.slice(1);
            if (this.matchNext(tokens, [Token.Assign])) {
                tokens = tokens.slice(1);
                let i = 0;
                let paramTokens = [];
                while (tokens[i] != undefined && !this.matchNext(tokens.slice(i),
                   [Token.Newline])) {
                   paramTokens.push(tokens[i]);
                   i++;
                }
                return new Bool(this.parseExpression(paramTokens), name);
            }
        } else if (this.matchNext(tokens, [Token.TypeArray])) {
            val = this.array(tokens.slice(1), Token.Bool);
            return val;
        }
         throw BadBoolError;
    }

    /**
     * Parses a string variable declaration/initialization.
     * @param tokens - Tokens to parse.
     * @return The resulting AST node representing the string.
     */
    str(tokens:Array<[Token, (number | Complex | String)?]>): AstNode {
        let name:string;
        let val:AstNode;
        if (this.matchNext(tokens, [Token.Identifier])) {
            name = tokens[0][1].toString();
            tokens = tokens.slice(1);
            if (this.matchNext(tokens, [Token.Assign])) {
                tokens = tokens.slice(1);
                let i = 0;
                let paramTokens = [];
                while (tokens[i] != undefined && !this.matchNext(tokens.slice(i),
                   [Token.Newline])) {
                   paramTokens.push(tokens[i]);
                   i++;
                }
                return new Str(this.parseExpression(paramTokens), name);
            }
        } else if (this.matchNext(tokens, [Token.TypeArray])) {
            val = this.array(tokens.slice(1), Token.Str);
            return val;
        }
        throw BadStrError;
    }

    /**
     * Parses a complex variable declaration/initialization.
     * @param tokens - Tokens to parse.
     * @return The resulting AST node representing the complex.
     */
    complex(tokens:Array<[Token, (number | Complex | String)?]>): AstNode {
        let name:string;
        let val:AstNode;
        if (this.matchNext(tokens, [Token.Identifier])) {
            name = tokens[0][1].toString();
            tokens = tokens.slice(1);
            if (this.matchNext(tokens, [Token.Assign])) {
                tokens = tokens.slice(1);
                let i = 0;
                let paramTokens = [];
                while (tokens[i] != undefined && !this.matchNext(tokens.slice(i),
                   [Token.Newline])) {
                   paramTokens.push(tokens[i]);
                   i++;
                }
                return new Comp(this.parseExpression(paramTokens), name);
            }
        } else if (this.matchNext(tokens, [Token.TypeArray])) {
            val = this.array(tokens.slice(1), Token.Complex);
            return val;
        }
        throw BadComplexError;
    }
     
    /**
     * Parses an integer value.
     * @param tokens - Tokens to parse.
     * @return An AST node representing the value.
     */
    matchInt(tokens:Array<[Token, (number | Complex | String)?]>): Int {
        let val:Int;
        if (tokens[0][0] == Token.Int) {
            val = new Int(Number(tokens[0][1]));
        } else {
            throw BadIntError;
        }
        return val; 
    }

    /**
     * Parses a list of integer values.
     * @param tokens - Tokens to parse.
     * @return An array of AST nodes representing the values.
     */
    matchIntList(tokens:Array<[Token, (number | Complex | String)?]>): Array<Int> {
        let args:Array<Int> = [];
        let i:number = 0;
        while(!this.matchNext(tokens.slice(i), [Token.Rsqbrac]) &&
        !this.matchNext(tokens.slice(i), [Token.Newline])) {
            let next = this.matchInt(tokens.slice(i));
            args.push(next);
            i++;
            if (this.matchNext(tokens.slice(i), [Token.Comma])) {
                i++; 
            }
        }
        return args;
    }
    /**
     * Parses an array of parameters (Float, Str, Int, Comp, Bool, etc.).
     * @param tokens - Tokens to parse.
     * @return An array of AST nodes representing the parameters.
     */
    array(tokens:Array<[Token, (number | Complex | String)?]>,
        type:Token=Token.TypeAny): Arr<Parameter> {
        let name:string;
        let vals:Array<Parameter>;
        let size:Array<Int>;
        if (this.matchNext(tokens, [Token.Identifier])) {
            name = tokens[0][1].toString();
            tokens = tokens.slice(1);
            if (this.matchNext(tokens, [Token.Lsqbrac])) {
                tokens = tokens.slice(1);
                size = this.matchIntList(tokens);
                while (!this.matchNext(tokens, [Token.Rsqbrac])) {
                    tokens = tokens.slice(1);
                }
                tokens = tokens.slice(1);
            }
            if (this.matchNext(tokens, [Token.Assign])) {
                tokens = tokens.slice(1);
            } else {
                throw BadArrayError;
            }
            vals = this.matchArrList(tokens, type);
            return new Arr(name, vals, size, typeName(type));
        } else {
            throw BadArrayError;
        } 
    }

    /**
     * Checks if the next tokens match those expected.
     * @param tokens - Remaining tokens to parse.
     * @param expectedTokens - Expected tokens.
     * @return Whether these is a match.
     */
    matchNext(tokens:Array<[Token, (number | Complex | String)?]>,
    expectedTokens:Array<Token>): boolean {
        let matches = true;
        let i = 0;
        if (tokens.length == 0) {
            return false;
        }
        while (i < expectedTokens.length) {
           if (tokens[i][0] != expectedTokens[i]) {
                matches = false;
                break; 
            }
            i++; 
        }
        return matches;
    }

    /**
     * Parses a measurement.
     * @param tokens - Remaining tokens to parse.
     * @return An AST node representing the measurement.
     */
    measure(tokens:Array<[Token, (number | Complex | String)?]>): Measure {
        let name:string;
        let registers:Array<Register | Int>;
        let params:Array<Array<Parameter>>;
        if (this.matchNext(tokens, [Token.Measure, Token.Apply])) {
           name = tokens[0][1].toString();
        } else if (this.matchNext(tokens, [Token.Measure, Token.Lbrac])) {
           name = tokens[0][1].toString();
           tokens = tokens.slice(2);
           params = this.matchParamList(tokens);
        } else {
           throw BadMeasurementError;
        }
        while (!this.matchNext(tokens, [Token.Apply])) {
           tokens = tokens.slice(1);
        }
        tokens = tokens.slice(1);
        if (this.matchNext(tokens, [Token.Lbrac])) {
           tokens = tokens.slice(1);
           registers = this.matchIndexList(tokens);
        } else if (this.matchNext(tokens, [Token.Lsqbrac])) {
           tokens = tokens.slice(1);
           registers = this.matchIntList(tokens);
        } else {
           registers = [this.matchInt(tokens)];
        }
        return new Measure(name, registers, params)
    }

    /**
     * Parses an application of one of hte allowed operators.
     * @param tokens - Remaining tokens to parse.
     * @return An AST node representing the operator application.
     */
     application(tokens:Array<[Token, (number | Complex | String)?]>):
     ApplyOperator {
        let name:string;
        let registers:Array<Register | Int>;
        let params:Array<Array<Parameter>>;
        if (this.matchNext(tokens, [Token.Identifier, Token.Apply])) {
            name = tokens[0][1].toString();
        } else if (this.matchNext(tokens, [Token.Identifier, Token.Lbrac])) {
            name = tokens[0][1].toString();
            tokens = tokens.slice(2);
            params = this.matchParamList(tokens);
        } else {
            throw BadOperatorError;
        }
        while (!this.matchNext(tokens, [Token.Apply])) {
            tokens = tokens.slice(1);
        }
        tokens = tokens.slice(1);
        if (this.matchNext(tokens, [Token.Lbrac])) {
            tokens = tokens.slice(1);
            registers = this.matchIndexList(tokens);
        } else if (this.matchNext(tokens, [Token.Lsqbrac])) {
            tokens = tokens.slice(1);
            registers = this.matchIntList(tokens);
        } else {
            registers = [this.matchInt(tokens)];
        }
        return new ApplyOperator(name, registers, params)
    }
    
    /**
     * Parses a parameter value.
     * @param tokens - Tokens to parse.
     * @return An AST node representing the parameter value.
     */
    matchParam(tokens:Array<[Token, (number | Complex | String)?]>): Parameter {
        let param:Parameter;
        let paramTokens:Array<[Token, (number | Complex | String)?]> = [];
        if (!(notParam(tokens[0][0]))) {
            let i = 0;
            while (tokens[i] != undefined && !this.matchNext(tokens.slice(i),
                [Token.Newline]) && !this.matchNext(tokens.slice(i), [Token.Rbrac])
                && !this.matchNext(tokens.slice(i), [Token.Comma])) {
                    paramTokens.push(tokens[i]);
                    i++;
            }
            param = this.parseNode(paramTokens, true);
        } else {
            throw BadParameterError;
        }
        return param;
    }


    /**
     * Parses a list of parameter values.
     * @param tokens - Tokens to parse.
     * @return An array of AST nodes representing the parameter values.
     */
    matchParamList(tokens:Array<[Token, (number | Complex | String)?]>): Array<Array<Parameter>> {
        let args:Array<Array<Parameter>> = [];
        let i:number = 0;
        let j:number = 0;
        let openBrackets:number = 0;
        args[0] = [];
        while(tokens[j] != undefined && (openBrackets == 0 &&
            !this.matchNext(tokens.slice(j), [Token.Rbrac])) &&
            !this.matchNext(tokens.slice(j), [Token.Newline])) {
            while(!this.matchNext(tokens.slice(j), [Token.Comma]) && tokens[j] !=
                undefined && !this.matchNext(tokens.slice(j), [Token.Rbrac])) {
                if (this.matchNext(tokens.slice(j), [Token.Lbrac])) {
                    openBrackets += 1;
                    j++; 
                }
                if (notParam(tokens[j][0])) {
                    throw BadParameterError;
                }
                let next = this.matchParam(tokens.slice(j));
                if (next != undefined) {
                    for (let k in next) {
                        args[i].push(next[k]);
                    } 
                }
                if (!notNestedParam(tokens[j][0])) {
                    while (!(this.matchNext(tokens.slice(j), [Token.Rbrac]))) {
                        j++; 
                    }
                }
                j++; 
            }
            if (this.matchNext(tokens.slice(j), [Token.Rbrac])) {
                if (openBrackets != 0) {
                    openBrackets -= 1;
                } else {
                    break; 
                }
            }
            i++;
            j++;
            args[i] = [];
        }
        return args.filter((elem) => (elem.length > 0));
    }


    /**
     * Parses an array’s value list.
     * @param tokens - Tokens to parse.
     * @return A nested array of AST nodes representing the array elements’ values.
     */
    matchArrList(tokens:Array<[Token, (number | Complex | String)?]>, type:Token=Token.TypeAny): Array<Array<Parameter>> {
        let elements:Array<Array<Parameter>> = [];
        let i:number = 0;
        let j:number = 0;
        elements[0] = [];
        while(!this.matchNext(tokens.slice(j), [Token.Newline, Token.Newline])) {
            while(!this.matchNext(tokens.slice(j), [Token.Comma]) &&
                !this.matchNext(tokens.slice(j), [Token.Newline])) {
                if (this.matchNext(tokens.slice(j), [Token.Newline])) {
                    j++; 
                }
                if (notParam(tokens[j][0])) {
                    throw BadParameterError;
                }
                if (type != Token.TypeAny) {
                    if (!this.matchNext(tokens.slice(j), [type])) {
                        throw BadTypeError;
                    } 
                }
                let next = this.matchParam(tokens.slice(j));

                if (next != undefined) {
                    for (let k in next) {
                        elements[i].push(next[k]);
                    }
                }
                j++; 
            }
            if (this.matchNext(tokens.slice(j), [Token.Newline, Token.Newline])) {
                break;
            }
            i++;
            j++;
            elements[i] = [];
        }
        return elements.filter((elem) => (elem.length > 0));
    }
      

    /**
     * Parses a register index.
     * @param tokens - Tokens to parse.
     * @return The index’s value.
     */
    matchIndex(tokens:Array<[Token, (number | Complex | String)?]>): number {
        let index:number;
        if (this.matchNext(tokens, [Token.Lsqbrac])) {
            tokens = tokens.slice(1);
            if (this.matchNext(tokens, [Token.Int])) {
                index = Number(tokens[0][1]);
                tokens = tokens.slice(1);
            } else {
                throw BadArgumentError;
            }
            if (this.matchNext(tokens, [Token.Rsqbrac])) {
                return index;
            } else {
                throw BadArgumentError;
            }
        }
    }


    /**
     * Parses a list of registers.
     * @param tokens - Tokens to parse.
     * @return An array of AST nodes representing the registers.
     */
    matchIndexList(tokens:Array<[Token, (number | Complex | String)?]>): Array<Register> {
        let args:Array<Register> = [];
        let next:Register;
        let id:string;
        let j:number = 0;
        while(j < tokens.length && !this.matchNext(tokens.slice(j),
            [Token.Newline]) && !this.matchNext(tokens.slice(j), [Token.Rbrac])) {
            id = tokens[j][1].toString();
            let index = this.matchIndex(tokens.slice(j + 1));
            next = new Register(id, index);
            args.push(next);
            if (index != undefined) {
                j += 4; 
            } else {
                j++; 
            }
            if (this.matchNext(tokens.slice(j), [Token.Comma])) {
                j++;
            } 
        }
        return args;
    }
}

export default Parser;