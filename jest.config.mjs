export default {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.cjs',
        '\\.(git|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.cjs',
    },
};
