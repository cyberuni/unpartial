import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'node',
		include: ['ts/**/*.spec.ts'],
		coverage: {
			provider: 'v8',
			include: ['ts/**/*.ts'],
			exclude: ['ts/**/*.spec.ts'],
			reporter: ['text', 'lcov'],
			// The level this package already meets. Pinned so a drop fails the build
			// instead of quietly showing up in a coverage report nobody reads.
			thresholds: {
				branches: 100,
				functions: 100,
				lines: 100,
				statements: 100
			}
		}
	}
})
