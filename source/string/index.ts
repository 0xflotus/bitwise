import _toBits from './to-bits'

export const toBits = _toBits

declare namespace bitwise.string {
	export const toBits: typeof _toBits
}

export default bitwise.string
