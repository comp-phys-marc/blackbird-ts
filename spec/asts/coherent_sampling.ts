import {
    Name,
    Version,
    Target,
    Equals,
    Int,
    Id,
    Expression,
    Float,
    Arr,
    Comp,
    Variable,
    Sqrt,
    Pi,
    ApplyOperator,
    Measure
} from '../../src/ast';

import { Complex } from '../../src/complex';

export default [
    new Name('CoherentSampling'),
    new Version('1.0'),
    new Target('gaussian', [[ new Id('shots') ], [ new Equals() ],[ new Int(10) ]]),
    new Float(new Expression([(0.3423)]), 'alpha'),
    new Arr(
        'U4',
        [
            [ new Comp(new Complex(-0.374559877614, 0.1109693347))],
            [ new Comp(new Complex(0.105835208525, 0.395338593151))],
            [ new Comp(new Complex(-0.192128677443, -0.326320923534))],
            [ new Comp(new Complex(0.663459991938, -0.310353146438))],
            [ new Comp(new Complex(-0.380767811218, 0.17264101141))],
            [ new Comp(new Complex(0.420783417348, -0.061064767156))],
            [ new Comp(new Complex(-0.492833372973, 0.169005421785))],
            [ new Comp(new Complex(-0.049425295018, 0.608714168654))],
            [ new Comp(new Complex(-0.004575175084, 0.710803957997))],
            [ new Comp(new Complex(0.141905920779, 0.230227449191))],
            [ new Comp(new Complex(0.508526433013, -0.297100053719))],
            [ new Comp(new Complex(-0.186799328386, 0.19958273542))],
            [ new Comp(new Complex(-0.390091516639, -0.123154657531))],
            [ new Comp(new Complex(0.220739102992, -0.727908644677))],
            [ new Comp(new Complex(0.235216128652, -0.427737604015))],
            [ new Comp(new Complex(-0.002154245945, -0.125674446672))]
        ],
        [ 
            new Int(4),
            new Int(4) 
        ],
        'Complex'
    ),
    new ApplyOperator(
        'Coherent',
        [ new Int(0) ],
        [ [ new Variable('alpha') ], [ new Sqrt([[ new Pi() ]]) ] ]
    ),
    new ApplyOperator(
        'Interferometer',
        [   
            new Int(0),
            new Int(1),
            new Int(2),
            new Int(3) 
        ],
        [ [ new Variable('U4') ] ]
    ),
    new Measure(
        'MeasureX',
        [ new Int(0) ],
        undefined
    ),
    new Measure(
        'MeasureX',
        [ new Int(1) ],
        undefined
    ),
    new Measure(
        'MeasureX',
        [ new Int(2) ],
        undefined
    ),
    new Measure(
        'MeasureX',
        [ new Int(3) ],
        undefined
    )
];