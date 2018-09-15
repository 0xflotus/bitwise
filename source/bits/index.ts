import _and from './and'
import _nand from './nand'
import _nor from './nor'
import _not from './not'
import _or from './or'
import _reduceAnd from './reduce-and'
import _reduceNand from './reduce-nand'
import _reduceNor from './reduce-nor'
import _reduceOr from './reduce-or'
import _reduceXnor from './reduce-xnor'
import _reduceXor from './reduce-xor'
import _toBoolean from './to-boolean'
import _toString from './to-string'
import _xnor from './xnor'
import _xor from './xor'

export const and = _and
export const nand = _nand
export const nor = _nor
export const not = _not
export const or = _or
export const reduceAnd = _reduceAnd
export const reduceNand = _reduceNand
export const reduceNor = _reduceNor
export const reduceOr = _reduceOr
export const reduceXnor = _reduceXnor
export const reduceXor = _reduceXor
export const toBoolean = _toBoolean
export const toString = _toString
export const xnor = _xnor
export const xor = _xor

declare namespace bitwise.bits {
	export const and: typeof _and
	export const nand: typeof _nand
	export const nor: typeof _nor
	export const not: typeof _not
	export const or: typeof _or
	export const reduceAnd: typeof _reduceAnd
	export const reduceNand: typeof _reduceNand
	export const reduceNor: typeof _reduceNor
	export const reduceOr: typeof _reduceOr
	export const reduceXnor: typeof _reduceXnor
	export const reduceXor: typeof _reduceXor
	export const toBoolean: typeof _toBoolean
	export const toString: typeof _toString
	export const xnor: typeof _xnor
	export const xor: typeof _xor
}

export default bitwise.bits
