import _and from './and'
import _create from './create'
import _modify from './modify'
import _nand from './nand'
import _nor from './nor'
import _not from './not'
import _or from './or'
import _read from './read'
import _readInt from './read-int'
import _readUInt from './read-u-int'
import _xnor from './xnor'
import _xor from './xor'

export const and = _and
export const create = _create
export const modify = _modify
export const nand = _nand
export const nor = _nor
export const not = _not
export const or = _or
export const read = _read
export const readInt = _readInt
export const readUInt = _readUInt
export const xnor = _xnor
export const xor = _xor

declare namespace bitwise.buffer {
	export const and: typeof _and
	export const create: typeof _create
	export const modify: typeof _modify
	export const nand: typeof _nand
	export const nor: typeof _nor
	export const not: typeof _not
	export const or: typeof _or
	export const read: typeof _read
	export const readInt: typeof _readInt
	export const readUInt: typeof _readUInt
	export const xnor: typeof _xnor
	export const xor: typeof _xor
}

export default bitwise.buffer
