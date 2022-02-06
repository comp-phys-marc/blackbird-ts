import 'jasmine';
import * as fs from 'fs';
import Parser from '../src/parser';
import sampling_tokens from './tokens/coherent_sampling';
import sampling_ast from './asts/coherent_sampling';

const tokens = {
    'coherent_sampling.xbb': sampling_tokens
};

const asts = {
    'coherent_sampling.xbb': sampling_ast
};

describe('parser', () => {
    describe('parse', () => {
        it('should parse sample tokens correctly', () => {
            fs.readdir('spec/tokens', (error, fileNames) => {
                if (!error) {
                    fileNames.forEach((scriptName) => {
                        console.log(`parsing ${scriptName}...`);

                        if (Object.keys(asts).includes(scriptName)) {
                            let lexed = tokens[scriptName];
                            let ast = asts[scriptName];

                            let passingParser = new Parser(lexed);
                            let out = passingParser.parse();

                            expect(out.length).toEqual(ast.length);
                            
                            for (let i = 0; i < out.length; i++) {
                                expect(out[i]).toEqual(ast[i]);
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