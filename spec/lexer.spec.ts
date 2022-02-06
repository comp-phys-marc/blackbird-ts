import 'jasmine';
import * as fs from 'fs';
import Lexer from '../src/lexer';
import sampling_tokens from './tokens/coherent_sampling';

const tokenSets = {
    'coherent_sampling.xbb': sampling_tokens
};

describe('lexer', () => {
    describe('lex', () => {
        it('should lex example Blackbird code correctly', () => {
            fs.readdir('spec/xbb', (error, fileNames) => {
                if (!error) {
                    fileNames.forEach((scriptName) => {
                        console.log(`lexing ${scriptName}...`);

                        let blackbird = fs.readFileSync(`spec/xbb/${scriptName}`, 'utf8');
                        
                        if (Object.keys(tokenSets).includes(scriptName)) {
                            let tokens = tokenSets[scriptName];

                            let passingLexer = new Lexer(blackbird);
                            let out = passingLexer.lex();

                            expect(out.length).toEqual(tokens.length);
                            
                            for (let i = 0; i < out.length; i++) {
                                for (let j = 0; j < out[i].length; j++) {
                                    expect(out[i][j]).toEqual(tokens[i][j]);
                                }
                            }
                        } else {
                            console.log(`tests incomplete for ${scriptName}!`);
                        }
                    });
                }
            });
        });
    });
});