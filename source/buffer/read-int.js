import read from './read'
import { not } from '../bits/operations'

// 32-bit powers of two wouldn't be possible with <<
const p2 = []
for (let i = 0; i < 32; i++) p2[i] = Math.pow(2, i)

/**
 *	Converts a section of a buffer to a signed integer.
 *
 *	@example
 *	// buffer 11110110
 *	readUInt(buffer, 3, 5) => -10
 *
 *	@param {Buffer} buffer the buffer to extract information from
 *	@param {Number} length the length of the signed integer (in bits)
 *	@param {Number} offset where to start (in bits)
 *	@return {Number}
 */
export default (buffer, offset = 0, length = 8) => {
	const bits = read(buffer, offset, length)

	if (bits[0] === 0) {
		let result = 0

		for (let i = 0; i < length; i++) if (bits[i]) result += p2[length - i - 1]

		return result
	} else {
		let result = -1
		const inverted = not(bits)

		for (let i = 0; i < length; i++)
			if (inverted[i]) result -= p2[length - i - 1]

		return result
	}
}