{
  "name": "vuex",
  "version": "2.0.0",
  "description": "state management for Vue.js",
  "main": "dist/vuex.js",
  "typings": "types/index.d.ts",
  "files": [
    "dist",
    "src",
    "types/index.d.ts",
    "types/helpers.d.ts",
    "types/vue.d.ts"
  ],
  "scripts": {
    "dev": "node examples/server.js",
    "dev:dist": "rollup -wm -c build/rollup.config.js",
    "build": "npm run build:main && npm run build:logger",
    "build:main": "rollup -c build/rollup.config.js && uglifyjs dist/vuex.js -cm --comments -o dist/vuex.min.js",
    "build:logger": "rollup -c build/rollup.logger.config.js",
    "test": "eslint src && npm run test:types && npm run test:unit && npm run test:e2e",
    "test:unit": "rollup -c build/rollup.config.js && jasmine JASMINE_CONFIG_PATH=test/unit/jasmine.json",
    "test:e2e": "node test/e2e/runner.js",
    "test:types": "tsc -p types/test",
    "release": "bash build/release.sh",
    "docs": "cd docs && gitbook serve",
    "docs:deploy": "cd docs && ./deploy.sh"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/vuejs/vuex.git"
  },
  "author": "Evan You",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/vuejs/vuex/issues"
  },
  "homepage": "https://github.com/vuejs/vuex#readme",
  "devDependencies": {
    "babel-core": "^6.2.1",
    "babel-loader": "^6.2.0",
    "babel-plugin-transform-runtime": "^6.1.18",
    "babel-polyfill": "^6.2.0",
    "babel-preset-es2015": "^6.1.18",
    "babel-preset-es2015-rollup": "^1.1.1",
    "babel-preset-stage-2": "^6.1.18",
    "babel-runtime": "^6.0.0",
    "cross-spawn": "^4.0.0",
    "css-loader": "^0.25.0",
    "eslint": "^3.5.0",
    "eslint-config-vue": "^1.0.0",
    "eslint-plugin-html": "^1.5.2",
    "express": "^4.14.0",
    "jasmine": "2.4.1",
    "jasmine-core": "2.4.1",
    "nightwatch": "^0.9.5",
    "nightwatch-helpers": "^1.1.0",
    "phantomjs-prebuilt": "^2.1.7",
    "rollup": "^0.34.13",
    "rollup-plugin-buble": "^0.14.0",
    "rollup-watch": "^2.5.0",
    "selenium-server": "^2.53.1",
    "todomvc-app-css": "^2.0.3",
    "typescript": "^2.0.3",
    "uglify-js": "^2.6.2",
    "vue": "^2.0.0-rc.7",
    "vue-loader": "^9.0.3",   //load vue格式的文件
    "webpack": "^1.13.2",
    "webpack-dev-middleware": "^1.6.1",
    "webpack-hot-middleware": "^2.12.2"
  }
}