# Blackbird TypeScript

BlackBird, the low-level programming language for continuous variable quantum computing, implemented in TypeScript.

Language documentation is provided by Xanadu [here](https://strawberryfields.readthedocs.io/en/latest/tutorials/blackbird.html).

## New in Version 1.0.0

- Support for the following BlackBird features:

  - Operators: Xgate, Zgate, Dgate, Sgate, Rgate, Pgate, Vgate, Kgate, Fouriergate, CXgate, CZgate, CKgate, BSgate, S2gate, Interferometer, GaussianTransform, Gaussian.

  - State Preparations: Fock, Coherent, Squeezed, Vac, Thermal, DisplacedSqueezed, Catstate.

  - Variables of the following types: array, float, complex, int, str, bool.

  - Expressions involving the following elements: sqrt, sin, cos, tan, arcsin, arccos, arctan, sinh, cosh, tanh, arcsinh, arccosh, arctanh, exp, log, pi, +, -, *, /, **, =.

- Basic Jasmine Unit Tests

## New in Latest Subversion

- Updated readme.

## Usage

Import the parse function or parseString function from the package.

```
import { parse, parseString } from 'blackbird-ts';
```

`parse` can be called with a file path to a `.xbb` file. It will parse the file and return the abstract syntax tree representation.

```
let ast = parse(<file-path>);
```

`parseString`  should be called with a string of BlackBird code. It will parse the code and return the abstract syntax tree representation.

```
let ast = parseString(<xbb-string>);
```

## Example I/O

### Input: coherent_sampling.cbb

```
name CoherentSampling
version 1.0
target gaussian (shots=10)

float alpha = 0.3423

complex array U4[4, 4] =
    -0.374559877614+0.1109693347j,   0.105835208525+0.395338593151j, -0.192128677443-0.326320923534j,  0.663459991938-0.310353146438j
    -0.380767811218+0.17264101141j,  0.420783417348-0.061064767156j, -0.492833372973+0.169005421785j, -0.049425295018+0.608714168654j
    -0.004575175084+0.710803957997j, 0.141905920779+0.230227449191j,  0.508526433013-0.297100053719j, -0.186799328386+0.19958273542j
    -0.390091516639-0.123154657531j, 0.220739102992-0.727908644677j,  0.235216128652-0.427737604015j, -0.002154245945-0.125674446672j

Coherent(alpha, sqrt(pi)) | 0
Interferometer(U4) | [0, 1, 2, 3]
MeasureX | 0
MeasureX | 1
MeasureX | 2
MeasureX | 3
```

### Output: Abstract Syntax Tree

```
Name { val: 'CoherentSampling' }
Version { val: '1.0' }
Target { val: 'gaussian', params: [[ Identifier { val: 'shots'} ],[ Equals {} ],[ Int { val: 10 } ]] }
Float { name: 'alpha', val: Expression { elements: [ { val: 0.3423 } ] } }
Arr {
  name: 'U4',
  vals:
   [
     [ Comp { val: Complex { real: -0.374559877614, imaginary: 0.1109693347 }} ],
     [ Comp { val: Complex { real: 0.105835208525, imaginary: 0.395338593151 }} ],
     [ Comp { val: Complex { real: -0.192128677443, imaginary: -0.326320923534 }} ],
     [ Comp { val: Complex { real: 0.663459991938, imaginary: -0.310353146438 }} ],
     [ Comp { val: Complex { real: -0.380767811218, imaginary: 0.17264101141 }} ],
     [ Comp { val: Complex { real: 0.420783417348, imaginary: -0.061064767156 }} ],
     [ Comp { val: Complex { real: -0.492833372973, imaginary: 0.169005421785 }} ],
     [ Comp { val: Complex { real: -0.049425295018, imaginary: 0.608714168654 }} ],
     [ Comp { val: Complex { real: -0.004575175084, imaginary: 0.710803957997 }} ],
     [ Comp { val: Complex { real: 0.141905920779, imaginary: 0.230227449191 }} ],
     [ Comp { val: Complex { real: 0.508526433013, imaginary: -0.297100053719 }} ],
     [ Comp { val: Complex { real: -0.186799328386, imaginary: 0.19958273542 }} ],
     [ Comp { val: Complex { real: -0.390091516639, imaginary: -0.123154657531 }} ],
     [ Comp { val: Complex { real: 0.220739102992, imaginary: -0.727908644677 }} ],
     [ Comp { val: Complex { real: 0.235216128652, imaginary: -0.427737604015 }} ],
     [ Comp { val: Complex { real: -0.002154245945, imaginary: -0.125674446672 }} ]
    ]
  size:
   [ Int { name: undefined, val: 4 },
     Int { name: undefined, val: 4 } ],
  type: 'Complex' }
ApplyOperator {
  name: 'Coherent',
  registers: [ Int { name: undefined, val: 0 } ],
  params: [ [ Variable { val: 'alpha' } ], [ Sqrt { param:[ [ Pi {} ] ] } ] ] }
ApplyOperator {
  name: 'Interferometer',
  registers:
   [ Int { name: undefined, val: 0 },
     Int { name: undefined, val: 1 },
     Int { name: undefined, val: 2 },
     Int { name: undefined, val: 3 } ],
  params: [ [ Variable { val: 'U4' } ] ] }
Measure {
  name: 'MeasureX',
  registers: [ Int { name: undefined, val: 0 } ],
  params: undefined }
Measure {
  name: 'MeasureX',
  registers: [ Int { name: undefined, val: 1 } ],
  params: undefined }
Measure {
  name: 'MeasureX',
  registers: [ Int { name: undefined, val: 2 } ],
  params: undefined }
Measure {
  name: 'MeasureX',
  registers: [ Int { name: undefined, val: 3 } ],
  params: undefined }
```

## Source code

Feel free to clone, fork, comment or contribute on [GitHub](https://github.com/comp-phys-marc/blackbird-ts)!

## Transpiling

```
tsc src/*.ts --outDir dist
```

## Installing dependencies

```
npm install
```

## Run Unit Tests, Conformance Tests

```
npm test
```

## References

The original BlackBird authors:

- Nathan Killoran, Josh Izaac, Nicolás Quesada, Ville Bergholm, Matthew Amy, and Christian Weedbrook. Strawberry Fields: A Software Platform for Photonic Quantum Computing 2018. [arXiv:1804.03159](http://web.archive.org/web/20210122181034/https://quantum-journal.org/papers/q-2019-03-11-129/)

## License

Copyright 2019 Marcus Edwards

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at:

```
http://www.apache.org/licenses/LICENSE-2.0
```

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
