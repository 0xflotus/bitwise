'use strict';

// require
var operators = require('./lib/operators.js');
var not = operators.not;

// fix jslint being 2005
/*jslint bitwise: true */

// generate powers of two
var p2 = [];
for (var i = 0; i < 32; i++) {
	p2[i] = Math.pow(2, i);
}

/**
 *	Returns an Array of length 8 containing the read bits.
 *
 *	@example
 *	readByte(42) => [0,0,1,0,1,0,1,0]
 *
 *	@param data {Number} one byte of data
 *	@return {Array, false}
 */
function readByte (data) {
	var result = [0,0,0,0,0,0,0,0];
	if (typeof data === 'number' && data < 256 && data >= 0 && Math.floor(data) === data) {
		for (var i = 7; i >= 0; i--) {
			if (data >= p2[i]) {
				data -= p2[i];
				result[7-i] = 1;
			} else {
				result[7-i] = 0;
			}
		}
		return result;
	} else {
		return false;
	}
}

/**
 *	Returns a Byte (0-255) which equals the given bits.
 *
 *	@example
 *	writeByte([0,0,1,0,1,0,1,0]) => 42
 *
 *	@param bits {Array} 8 bits to represent an 8 bit number
 *	@return {Number, false}
 */
function writeByte (bits) {
	var data = 0x00;
	if (typeof bits === 'object' && bits.length === 8) {
		data = 0x00;
		for (var i = 0; i < 8; i++) {
			data = data | (bits[i] ? p2[7-i] : 0);
		}
		return data;
	} else {
		return false;
	}
}

/**
 *	Returns an Array containing bitLength bits starting at bitOffset.
 *
 *	@example
 *	readBuffer(buffer, 2, 4) => [0,0,1,0]
 *
 *	@param buffer {Buffer} the buffer to read
 *	@param offset {Number} where to start (in bits)
 *	@param length {Number} how many bits to read
 *	@return {Array}
 */
function readBuffer (buffer, offset, length) {
	var bits = [0,0,0,0,0,0,0,0];
	if (!offset) {
		offset = 0;
	}
	if (!length) {
		length = buffer.length*8-offset;
	}
	var start = Math.floor(offset/8);
	var bytesToRead = Math.floor(length/8) + 2;

	var arr = [];
	arr.length = bytesToRead*8;
	var i = 0;
	while (i <= bytesToRead) {
		bits = readByte(buffer[start+i]);
		arr[i*8] = bits[0];
		arr[i*8+1] = bits[1];
		arr[i*8+2] = bits[2];
		arr[i*8+3] = bits[3];
		arr[i*8+4] = bits[4];
		arr[i*8+5] = bits[5];
		arr[i*8+6] = bits[6];
		arr[i*8+7] = bits[7];
		i++;
	}

	var subOffset = offset % 8;
	return arr.slice(subOffset, subOffset+length);
}

/**
 *	Modifies the buffer's bits to equal newBits starting at bitOffset.
 *
 *	@example
 *	modifyBuffer(buffer, [0,0,1,0], 0) => buffer was modified
 *
 *	@param buffer {Buffer} the buffer to modify
 *	@param bits {Array} the bits to insert
 *	@param offset {Number} where to start (in bits)
 *	@return undefined
 */
function modifyBuffer (buffer, bits, offset) {
	if (!offset) {
		offset = 0;
	}
	var start = Math.floor(offset/8);
	var end = Math.ceil((offset + bits.length) / 8);
	var subBuffer = buffer.slice(start, end);

	var byteData = readBuffer(subBuffer);

	var subOffset = offset % 8;

	for (var i = 0; i < bits.length; i++) {
		byteData[subOffset] = bits[i];
		subOffset++;
	}

	var length = end-start;
	for (i = 0; i < length; i++) {
		subBuffer[i] = writeByte(byteData.slice(i*8, (i+1)*8));
	}
}

/**
 *	Creates a new buffer and writes the given bits.
 *
 *	@example
 *	createBuffer([1,1,1,1, 0,0,0,1, 1,0,1,0]) => buffer with data 1111 0001 1010 0000
 *
 *	@param bits {Array} an array containing the bits to insert
 *	@return {Buffer}
 */
function createBuffer (bits) {
	var data = [0,0,0,0,0,0,0,0];
	var buffer = new Buffer(Math.ceil(bits.length/8));
	buffer.fill(0x00);

	for (var i = 0; i < buffer.length; i++) {
		for (var j = 0; j < 8; j++) {
			if (bits[i*8+j]) {
				data[j] = bits[i*8+j];
			} else {
				data[j] = 0;
			}
		}
		buffer[i] = writeByte(data);
	}

	return buffer;
}

/**
 *	Converts a string into an array of bits. Ignores all characters except 1 and 0.
 *
 *	@example
 *	toBits('10 10 12$%_.0') => [1,0,1,0,1,0]
 *
 *	@param string {String} the string to convert
 *	@return {Array}
 */
function toBits (string) {
	var arr = [];
	var index = 0;
	for (var i = 0; i < string.length; i++) {
		if (string[i] === '1') {
			arr[index] = 1;
			index++;
		} else if (string[i] === '0') {
			arr[index] = 0;
			index++;
		}
	}

	return arr;
}

/**
 *	Converts a bit array to a string. If defined, inserts spacer every spacing characters, but never inserts it as the last substring.
 *
 *	@example
 *	toString([1,0,1,0,1,0], 2, '_') => '10_10_10'
 *
 *	@param bits {Array} the bits to convert
 *	@param spacing {Number} where to place the spacers
 *	@param spacer {Number} the string used as a spacer
 *	@return {String}
 */
function toString (bits, spacing, spacer) {
	var string;
	if (typeof spacing === 'undefined') {
		spacing = 0;
	}
	if (typeof spacer === 'undefined') {
		spacer = ' ';
	}
	if (spacing) {
		string = '';
		for (var i = 0; i < bits.length; i++) {
			string += bits[i] ? 1 : 0;
			if (i % spacing === spacing-1 && i !== bits.length-1) {
				string += spacer;
			}
		}
		return string;
	} else {
		return bits.join('');
	}
}

/**
 *	Converts a section of a buffer to an unsigned integer.
 *
 *	@example
 *	// buffer 11110110
 *	readUInt(buffer, 3, 5) => 22
 *
 *	@param buffer {Buffer} the buffer to extract information from
 *	@param length {Number} the length of the unsigned integer (in bits)
 *	@param offset {Number} where to start (in bits)
 *	@return {Number}
 */
function readUInt (buffer, offset, length) {
	var arr = [];
	var result = 0;

	if (!length) {
		length = 8;
	}
	if (!offset) {
		offset = 0;
	}
	arr = readBuffer(buffer, offset, length);
	result = 0;

	for (var i = 0; i < length; i++) {
		result += arr[i] * p2[length-i-1];
	}

	return result;
}

/**
 *	Converts a section of a buffer to a signed integer.
 *
 *	@example
 *	// buffer 11110110
 *	readUInt(buffer, 3, 5) => -10
 *
 *	@param buffer {Buffer} the buffer to extract information from
 *	@param length {Number} the length of the signed integer (in bits)
 *	@param offset {Number} where to start (in bits)
 *	@return {Number}
 */
function readInt (buffer, offset, length) {
	var arr = [];
	var result = 0;
	if (!length) {
		length = 8;
	}
	if (!offset) {
		offset = 0;
	}
	arr = readBuffer(buffer, offset, length);

	var i = 0;
	if (arr[0] === 0) {
		result = 0;
		while (++i < length) {
			result += arr[i] * p2[length-i-1];
		}
	} else {
		result = -1;
		arr = not(arr);
		while (++i < length) {
			result -= arr[i] * p2[length-i-1];
		}
	}

	return result;
}

/**
 *	Converts a section of a buffer to a complementary integer.
 *	A complementary integer is like an unsigned integer, but always represents negative numbers.
 *
 *	@example
 *	// buffer 11110110
 *	readUInt(buffer, 3, 5) => -22
 *
 *	@param buffer {Buffer} the buffer to extract information from
 *	@param length {Number} the length of the signed integer (in bits)
 *	@param offset {Number} where to start (in bits)
 *	@return {Number}
 */
function readCInt (buffer, offset, length) {
	return 0 - readUInt(buffer, offset, length);
}

function bufferNOT (buffer) {
	return applyBufferOperation(buffer, buffer, 'not', false);
}

function bufferOR (buffer, otherBuffer, loop) {
	return applyBufferOperation(buffer, otherBuffer, 'or', loop);
}

function bufferNOR (buffer, otherBuffer, loop) {
	return applyBufferOperation(buffer, otherBuffer, 'nor', loop);
}

function bufferXOR (buffer, otherBuffer, loop) {
	return applyBufferOperation(buffer, otherBuffer, 'xor', loop);
}

function bufferXNOR (buffer, otherBuffer, loop) {
	return applyBufferOperation(buffer, otherBuffer, 'xnor', loop);
}

function bufferAND (buffer, otherBuffer, loop) {
	return applyBufferOperation(buffer, otherBuffer, 'and', loop);
}

function bufferNAND (buffer, otherBuffer, loop) {
	return applyBufferOperation(buffer, otherBuffer, 'nand', loop);
}

function applyBufferOperation (buffer, otherBuffer, type, loop) {
	if (!loop && buffer.length != otherBuffer.length) {
		return false;
	} else {
		var length = loop ? otherBuffer.length : buffer.length;
	}

	var resultBuffer = new Buffer(length);
	resultBuffer.fill(0x00);

	for (var i = 0; i < length; i++) {
		switch (type) {
			case 'not':
				resultBuffer[i] = ~buffer[i];
			break;
			case 'or':
				if(loop) {
					resultBuffer[i] = buffer[i%buffer.length] | otherBuffer[i];
				} else {
					resultBuffer[i] = buffer[i] | otherBuffer[i];
				}
			break;
			case 'nor':
				if(loop) {
					resultBuffer[i] = ~(buffer[i%buffer.length] | otherBuffer[i]);
				} else {
					resultBuffer[i] = ~(buffer[i] | otherBuffer[i]);
				}
			break;
			case 'xor':
				if(loop) {
					resultBuffer[i] = buffer[i%buffer.length] ^ otherBuffer[i];
				} else {
					resultBuffer[i] = buffer[i] ^ otherBuffer[i];
				}
			break;
			case 'xnor':
				if(loop) {
					resultBuffer[i] = ~(buffer[i%buffer.length] ^ otherBuffer[i]);
				} else {
					resultBuffer[i] = ~(buffer[i] ^ otherBuffer[i]);
				}
			break;
			case 'and':
				if(loop) {
					resultBuffer[i] = buffer[i%buffer.length] & otherBuffer[i];
				} else {
					resultBuffer[i] = buffer[i] & otherBuffer[i];
				}
			break;
			case 'nand':
				if(loop) {
					resultBuffer[i] = ~(buffer[i%buffer.length] & otherBuffer[i]);
				} else {
					resultBuffer[i] = ~(buffer[i] & otherBuffer[i]);
				}
			break;
		}
	}

	return resultBuffer;
}

module.exports = {
	// bytes
	readByte: readByte,
	writeByte: writeByte,

	// buffers
	readBuffer: readBuffer,
	modifyBuffer: modifyBuffer,
	createBuffer: createBuffer,

	// convert
	toBits: toBits,
	toString: toString,

	// types
	readUInt: readUInt,
	readInt: readInt,
	readCInt: readCInt,

	// operators
	not: operators.not,
	or: operators.or,
	nor: operators.nor,
	xor: operators.xor,
	xnor: operators.xnor,
	and: operators.and,
	nand: operators.nand,
	operators: operators,

	// buffer operations
	bufferNOT: bufferNOT,
	bufferOR: bufferOR,
	bufferNOR: bufferNOR,
	bufferXOR: bufferXOR,
	bufferXNOR: bufferXNOR,
	bufferAND: bufferAND,
	bufferNAND: bufferNAND
};
