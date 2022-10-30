# Ejsf

Version 1.0.0

NodeJS library for converting EJS templates to Javascript functions.

```
npm install git+https://github.com/JamesRobertHugginsNgo/ejsf.git
```

Usage:

``` JavaScript
const Ejsf = require('ejsf');
```

## Ejsf.toFunctionBody(ejs, options)

- ejs `string` EJS template string.
- options `object` _Optional_. See "Common Options". Defaults: `{}`.
- Returns: `string`

Takes an EJS template and returns a function body string.

## Ejsf.toFunctionString(ejs, options)

- ejs `string` EJS template string.
- options `object` _Optional_. See "Common Options". Defaults: `{}`.
- Returns: `string`

Takes an EJS template and returns a function string.

## Ejsf.toFunction(ejs, options)

- ejs `string` EJS template string.
- options `object` _Optional_. See "Common Options". Defaults: `{}`.
- Returns: `function`

Takes an EJS template and returns a function.

## Ejsf.fromFileToFunctionBody(filePath, options)

- filePath `string` Path to the EJS template file.
- options `object` _Optional_. See "Common Options". Defaults: `{}`.
- Returns: `string` JavaScript code as string.

Takes an EJS template file and returns a function body string.

## Ejsf.fromFileToFunctionString(filePath, options)

- filePath `string` Path to the EJS template file.
- options `object` _Optional_. See "Common Options". Defaults: `{}`.
- Returns: `string` JavaScript code as string.

Takes an EJS template file and returns a function string.

## Ejsf.fromFileToFunction(filePath, options)

- filePath `string` Path to the EJS template file.
- options `object` _Optional_. See "Common Options". Defaults: `{}`.
- Returns: `function`

Takes an EJS template file and returns a function.

## Common Options

The optional `option` argument passed in all the `Ejsf` functions.

Type `object`

### Properties

- argName `string` _Optional_. Argument name used by the "EJS" function. Change when the default value is in use. Defaults: `'_data'`.
- cwd `string` _Optional_. Current working directory, mainly used when determining `include` paths. Defaults: `process.cwd()`.
- escName `string` _Optional_. Function name used to escape values. Change when the default value is in use. Defaults: `'_esc'`.
- outName `string` _Optional_. Variable name used to generate the resulting string. Change when the default value is in use. Defaults: `'_out'`.


