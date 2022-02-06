enum Token {
    Plus,
    Minus,
    Times,
    Divide,
    Pwr,
    Assign,
    Int,
    Float,
    Complex,
    Str,
    Bool,
    Sequence,
    Pi,
    Newline,
    Tab,
    Space,
    Progname,
    Version,
    Target,
    Include,
    Sqrt,
    Sin,
    Cos,
    Tan,
    ArcSin,
    ArcCos,
    ArcTan,
    Sinh,
    Cosh,
    Tanh,
    ArcSinh,
    ArcCosh,
    ArcTanh,
    Exp,
    Log,
    Period,
    Comma,
    Colon,
    Quote,
    Lbrac,
    Rbrac,
    Lsqbrac,
    Rsqbrac,
    Lbrace,
    Rbrace,
    Apply,
    TypeArray,
    TypeFloat,
    TypeComplex,
    TypeInt,
    TypeStr,
    TypeBool,
    TypeAny,
    RegRef,
    Measure,
    Name,
    Device,
    Comment,
    Identifier,
    String,
    EndOfFile,
    Illegal,
    True,
    False 
}

const typeLookupMap:object = {
    'array': Token.TypeArray,
    'float': Token.TypeFloat,
    'complex': Token.TypeComplex,
    'int': Token.TypeInt,
    'str': Token.TypeStr,
    'bool': Token.TypeBool
}

const nestedParamLookupMap = {
    'sqrt': Token.Sqrt,
    'sin': Token.Sin,
    'cos': Token.Cos,
    'tan': Token.Tan,
    'arcsin': Token.ArcSin,
    'arccos': Token.ArcCos,
    'arctan': Token.ArcTan,
    'sinh': Token.Sinh,
    'cosh': Token.Cosh,
    'tanh': Token.Tanh,
    'arcsinh': Token.ArcSinh,
    'arccosh': Token.ArcCosh,
    'arctanh': Token.ArcTanh,
    'exp': Token.Exp,
    'log': Token.Log
}

const paramLookupMap:object = {
    ...nestedParamLookupMap,
    '+': Token.Plus,
    '-': Token.Minus,
    '*': Token.Times,
    '/': Token.Divide,
    '**': Token.Pwr,
    '=': Token.Assign,
    'pi': Token.Pi,
    '.': Token.Period,
    'True': Token.True,
    'False': Token.False,
}

const lookupMap:object = {
    ...typeLookupMap,
    ...paramLookupMap,
    'name': Token.Name,
    'version': Token.Version,
    'target': Token.Target,
    'include': Token.Include,
    ',': Token.Comma,
    ':': Token.Colon,
    '"': Token.Quote,
    '(': Token.Lbrac,
    ')': Token.Rbrac,
    '[': Token.Lsqbrac,
    ']': Token.Rsqbrac,
    '{': Token.Lbrace,
    '}': Token.Rbrace,
    '|': Token.Apply
}

/**
 * Returns the token that represents a given type string.
 * @param ident - The type string.
 * @return The corresponding token.
 */
function lookupType(ident:string): Token {
    if (ident in typeLookupMap) {
        return typeLookupMap[ident];
    } else {
        return Token.Illegal;
    }
}

/**
 * Returns the token that represents a given string.
 * @param ident - The string.
 * @return The corresponding token.
 */
function lookup(ident:string): Token {
    return ident in lookupMap ? lookupMap[ident]: Token.Identifier;
}

/**
 * Returns the string representation of a parameter token.
 * @param tokens - The token.
 * @return The string representation of the token.
 */
 function inverseParamLookup(token:Token): string {
    return Object.keys(paramLookupMap).find((ident) => paramLookupMap[ident] == token);
}

/**
 * Determines whether a token denotes a parameter.
 * @param tokens - The token.
 * @return Whether the token does NOT denote a parameter.
 */
function notParam(token:Token): boolean {
    return (Object.keys(paramLookupMap).map(key =>
       paramLookupMap[key]).indexOf(token) == -1) && token != Token.Int && token
       != Token.Float && token != Token.Complex && token != Token.Identifier;
}

/**
 * Determines whether a token denotes a nested parameter.
 * @param tokens - The token.
 * @return Whether the token does NOT denote a nested parameter.
 */
function notNestedParam(token:Token): boolean {
    return (Object.keys(nestedParamLookupMap).map(key =>
        nestedParamLookupMap[key]).indexOf(token) == -1);
 }

 /**
  * Returns the string representation of a type.
  * @param tokens - The type’s corresponding token.
  * @return The string representation of the type.
  */
function typeName(type:Token): string {
    let strType:string;
    switch (type) {
        case Token.Int:
            strType = 'Int';
        case Token.Float:
            strType = 'Float';
        case Token.Str:
            strType = 'Str';
        case Token.Bool:
            strType = 'Bool';
        case Token.Complex:
            strType = 'Complex'
    }
    return strType;
}

export {
    Token,
    notParam,
    lookup,
    lookupType,
    inverseParamLookup,
    typeName,
    notNestedParam
};