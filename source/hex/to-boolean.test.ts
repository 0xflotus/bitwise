import { HexArray } from '../types'
import toBoolean from './to-boolean'

test('toBoolean', () => {
	const hex: HexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
	expect(toBoolean(hex)).toEqual(
		[
			[0, 0, 0, 0],
			[0, 0, 0, 1],
			[0, 0, 1, 0],
			[0, 0, 1, 1],
			[0, 1, 0, 0],
			[0, 1, 0, 1],
			[0, 1, 1, 0],
			[0, 1, 1, 1],
			[1, 0, 0, 0],
			[1, 0, 0, 1],
			[1, 0, 1, 0],
			[1, 0, 1, 1],
			[1, 1, 0, 0],
			[1, 1, 0, 1],
			[1, 1, 1, 0],
			[1, 1, 1, 1],
		]
			.reduce((a, b) => [...a, ...b], [])
			.map(Boolean)
	)
})
