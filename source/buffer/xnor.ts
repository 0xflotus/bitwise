/**
 * Applies a bitwise XNOR to the contents of two buffers. Returns a new buffer.
 *
 * @example
 * bitwise.buffer.xnor(a, b, false) => Buffer(a XNOR b)
 *
 * @param {Buffer} a first buffer
 * @param {Buffer} b second buffer
 * @param {Boolean} isLooping loop through first buffer
 * @return {Buffer} a XNOR b
 */
export default (a: Buffer, b: Buffer, isLooping: boolean = false): Buffer => {
	const length: number = isLooping ? b.length : a.length

	const result: Buffer = Buffer.alloc(length)

	for (let i: number = 0; i < length; i++) {
		const j: number = isLooping ? i % a.length : i
		result[i] = ~(a[j] ^ b[i])
	}

	return result
}
