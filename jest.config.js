module.exports = {
    "testMatch": ["**/__tests__/**/*.[jt]s?(x)"],
    "moduleFileExtensions": [
        "js",
        "json",
        "vue"
    ],
    "moduleNameMapper": {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less)$": "identity-obj-proxy"
    },
    "transform": {
        //用`vue-jest` 处理`*.vue` 文件
        ".*\\.(vue)$": "vue-jest",
        //用`babel-jest` 处理`*.js` 文件
        ".*\\.(js)$": "babel-jest",
    }
}