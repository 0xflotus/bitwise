import _getBit from './get-bit'
import _setBit from './set-bit'
import _toggleBit from './toggle-bit'

export const getBit = _getBit
export const setBit = _setBit
export const toggleBit = _toggleBit

declare namespace bitwise.integer {
	export const getBit: typeof _getBit
	export const setBit: typeof _setBit
	export const toggleBit: typeof _toggleBit
}

export default bitwise.integer
