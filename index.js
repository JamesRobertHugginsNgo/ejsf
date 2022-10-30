const Esprima = require('esprima');
const Estraverse = require('estraverse');
const Fs = require('fs');
const Path = require('path');

const DEFAULT_ARG_NAME = '_data';

// -----
// COMPLETE CODE
// -----

function completeCode(code, options = {}) {
	const { argName = DEFAULT_ARG_NAME } = options;

	const nodes = [];
	const outOfScope = [];

	let addEsc = false;
	const includes = [];

	function addVariableToScope(type, name, startIndex = nodes.length - 1) {
		for (let index = startIndex; index >= 0; index--) {
			const nodeEntry = nodes[index];
			const nodeType = nodeEntry.node.type;
			if (
				nodeType === 'ArrowFunctionExpression' ||
				nodeType === 'FunctionDeclaration' ||
				nodeType === 'Program' ||
				(type !== 'var' && nodeType === 'BlockStatement')
			) {
				if (!nodeEntry.scope) {
					nodeEntry.scope = [];
				}
				nodeEntry.scope.push(name);
				return;
			}
		}
	}

	function isVariableInScope(name) {
		for (let index = nodes.length - 1; index >= 0; index--) {
			const scope = nodes[index].scope;
			if (scope && scope.indexOf(name) !== -1) {
				return true;
			}
		}
		return false;
	}

	Estraverse.traverse(Esprima.parseScript(code), {

		// -----
		// ENTER
		// -----

		enter: (node) => {
			const index = nodes.length;

			// console.group(node.type);

			if (node.type === 'Identifier') {
				const previousNode = nodes[index - 1].node;

				// console.log(node);
				// console.log(previousNode);

				switch (previousNode.type) {
					case 'ArrowFunctionExpression':
					case 'FunctionDeclaration':
						if (previousNode.id === node) {
							addVariableToScope('var', node.name, index - 2);
						} else {
							addVariableToScope('var', node.name);
						}
						break;

					case 'AssignmentExpression':
					case 'BinaryExpression':
					case 'DoWhileStatement':
					case 'ForInStatement':
					case 'ForOfStatement':
					case 'IfStatement':
					case 'Property':
					case 'UpdateExpression':
					case 'WhileStatement':
						if (outOfScope.indexOf(node.name) === -1 && !isVariableInScope(node.name)) {
							outOfScope.push(node.name);
						}
						break;

					case 'CallExpression':
						if (previousNode.callee === node) {
							if (node.name === '_esc') {
								addEsc = true;
								break;
							}
							if (node.name === 'include') {
								includes.push(previousNode.arguments[0].value);
								break;
							}
						} else if (outOfScope.indexOf(node.name) === -1 && !isVariableInScope(node.name)) {
							outOfScope.push(node.name);
						}
						break;

					case 'MemberExpression':
						if (previousNode.object === node && outOfScope.indexOf(node.name) === -1 && !isVariableInScope(node.name)) {
							outOfScope.push(node.name);
						}
						break;

					case 'VariableDeclarator':
						if (previousNode.id === node) {
							addVariableToScope(nodes[index - 2].node.kind, node.name);
						} else if (outOfScope.indexOf(node.name) === -1 && !isVariableInScope(node.name)) {
							outOfScope.push(node.name);
						}
						break;

					// default:
					// 	console.log(node);
					// 	console.log(previousNode);
				}
			}

			// console.groupEnd();

			nodes.push({ node });
		},

		// -----
		// LEAVE
		// -----

		leave: () => {
			nodes.pop();
		}
	});

	let prefix = '';

	// Add esc
	if (addEsc) {
		prefix += 'const _esc = (value) => value.replace(/&/g, \'&amp;\').replace(/</g, \'&lt;\').replace(/>/g, \'&gt;\').replace(/"/g, \'&quot;\').replace(/\'/g, "&#x27;").replace(/\\//g, \'&#x2F;\'); ';
	}

	// Add includes
	if (includes.length > 0) {
		prefix += 'const _includes = { ';
		prefix += includes.map((filePath) => {
			return `'${filePath}': ${fromFileToFunctionString(filePath, options)}`;
		}).join(', ');
		prefix += ' }; ';
		prefix += 'const include = (path, data) => _includes[path](data); ';
	}

	for (let index = 0, length = outOfScope.length; index < length; index++) {
		const value = outOfScope[index];
		if (value !== argName && value !== 'console' && value !== 'document' && value !== 'window') {
			prefix += `const ${value} = ${argName}.${value}; `;
		}
	}

	return prefix + code;
}

// -----
// TO FUNCTION BODY
// -----

function toFunctionBody(ejs, options = {}) {
	const { argName = DEFAULT_ARG_NAME } = options;

	let output = '';
	let seg = '';
	let segType = 'HTML';

	// Append output and set segType
	// Completes seg value
	const appendOutputAndSetSegType = (nextSegType = 'HTML') => {
		switch (segType) {
			case 'HTML':
				output += `_out += \`${seg}\`; `;
				break;

			case 'SCRIPTLET':
				output += `${seg} `;
				break;

			case 'SCRIPTLET_WHITESPACE_SLURPING':
				output += `${seg.trimStart()} `;
				break;

			case 'OUTPUT':
				output += `_out += _esc(${seg}); `;
				break;

			case 'OUTPUT_UNESCAPED':
				output += `_out += (${seg}); `;
				break;

			case 'COMMENT':
				// Do nothing
				break;
		}

		seg = '';
		segType = nextSegType;
	};

	// Loop through ejs characters and append to output
	for (let index = 0, length = ejs.length; index < length; index++) {
		const char0 = ejs.charAt(index);
		const char1 = ejs.charAt(index + 1);
		const char2 = ejs.charAt(index + 2);

		if (segType === 'HTML') {
			if (char0 === '<') {
				if (char1 === '%') {
					if (char2 === '_') {
						appendOutputAndSetSegType('SCRIPTLET_WHITESPACE_SLURPING');
						index += 2;
						continue;
					}

					if (char2 === '=') {
						appendOutputAndSetSegType('OUTPUT');
						index += 2;
						continue;
					}

					if (char2 === '-') {
						appendOutputAndSetSegType('OUTPUT_UNESCAPED');
						index += 2;
						continue;
					}

					if (char2 === '#') {
						appendOutputAndSetSegType('COMMENT');
						index += 2;
						continue;
					}

					if (char2 === '%') {
						seg += '<%';
						index += 2;
						continue;
					}

					appendOutputAndSetSegType('SCRIPTLET');
					index += 1;
					continue;
				}
			}
		} else {
			if (char1 === '>' && char0 === '%') {
				appendOutputAndSetSegType();
				index += 1;
				continue;
			}

			if (char2 === '>') {
				if (char1 === '%') {
					if (char0 === '-') {
						// TODO: Figure out what to do for this
						appendOutputAndSetSegType();
						index += 2;
						continue;
					}

					if (char0 === '_') {
						seg = seg.trimEnd();
						appendOutputAndSetSegType();
						index += 2;
						continue;
					}
				}
			}
		}

		seg += char0;
	}

	// Complete output
	appendOutputAndSetSegType();
	output = 'let _out = \'\'; ' + output;
	output = completeCode(output, argName);
	output += 'return _out;';

	return output;
}

// -----
// TO FUNCTION STRING
// -----

function toFunctionString(ejs, options = {}) {
	const { argName = DEFAULT_ARG_NAME } = options;
	return `(${argName}) => { ${toFunctionBody(ejs, options)} }`;
}

// -----
// TO FUNCTION
// -----

function toFunction(ejs, options = {}) {
	const { argName = DEFAULT_ARG_NAME } = options;
	return new Function(argName, toFunctionBody(ejs, options));
}

// -----
// FROM FILE TO FUNCTION BODY
// -----

function fromFileToFunctionBody(filePath, options = {}) {
	const { cwd = process.cwd() } = options;
	const fullFilePath = Path.join(cwd, Path.extname(filePath) !== '.ejs' ? `${filePath}.ejs`: filePath);
	options.cwd = Path.dirname(fullFilePath);
	return toFunctionBody(Fs.readFileSync(fullFilePath, { encoding: 'utf8'}), options);
}

// -----
// FROM FILE TO FUNCTION STRING
// -----

function fromFileToFunctionString(filePath, options = {}) {
	const { argName = DEFAULT_ARG_NAME } = options;
	return `(${argName}) => { ${fromFileToFunctionBody(filePath, options)} }`;
}

// -----
// FROM FILE TO FUNCTION
// -----

function fromFileToFunction(filePath, options = {}) {
	const { argName = DEFAULT_ARG_NAME } = options;
	return new Function(argName, fromFileToFunctionBody(filePath, options));
}

// -----
// EXPORTS
// -----

module.exports = {
	toFunctionBody,
	toFunctionString,
	toFunction,
	fromFileToFunctionBody,
	fromFileToFunctionString,
	fromFileToFunction
};
