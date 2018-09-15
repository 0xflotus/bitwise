import _bits from './bits'
import _buffer from './buffer'
import _byte from './byte'
import _integer from './integer'
import _nibble from './nibble'
import _string from './string'

export const bits = _bits
export const buffer = _buffer
export const byte = _byte
export const integer = _integer
export const nibble = _nibble
export const string = _string

declare namespace bitwise {
	export const bits: typeof _bits
	export const buffer: typeof _buffer
	export const byte: typeof _byte
	export const integer: typeof _integer
	export const nibble: typeof _nibble
	export const string: typeof _string
}

export default bitwise
