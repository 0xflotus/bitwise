import _read from './read'
import _write from './write'

export const read = _read
export const write = _write

declare namespace bitwise.nibble {
	export const read: typeof _read
	export const write: typeof _write
}

export default bitwise.nibble
