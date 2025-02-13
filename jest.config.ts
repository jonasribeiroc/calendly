import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
    moduleDirectories: ['node_modules', 'src'],
    coveragePathIgnorePatterns: [
        "/src/services/"
    ],
    testEnvironmentOptions: {
        timezone: 'UTC',
    },
};

export default config;
