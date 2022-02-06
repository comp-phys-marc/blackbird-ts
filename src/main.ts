import Parser from './parser';
import Lexer from './lexer';
import * as fs from 'fs';

/**
 * Returns the abstract syntax tree for a given string of BlackBird code.
 * @param blackbird - The code string.
 * @return The corresponding AST.
 */
function parseString(blackbird:string) {
    const lexer = new Lexer(blackbird, 0);
    const tokens = lexer.lex();
    const parser = new Parser(tokens);
    const ast = parser.parse();
    return ast;
}

/**
 * Returns the abstract syntax tree for a given BlackBird file.
 * @param file - The file location.
 * @return The corresponding AST.
 */
exports.parse = function(file:string) {
    return parseString(fs.readFileSync(file, 'utf8'));
}

exports.parseString = parseString;