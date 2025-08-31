module.exports = {
	preset: 'ts-jest/presets/default-esm',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { useESM: true, tsconfig: 'tsconfig.json' }]
	},
	extensionsToTreatAsEsm: ['.ts'],
	verbose: true
};