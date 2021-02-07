module.exports = {
    preset: "react-native",
    transform: {
        "^.+\\.js$": require.resolve("react-native/jest/preprocessor.js"),
    },
    "transformIgnorePatterns": [
        "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base)"
    ]
};