ZeroFrame
=========

Library for development of ZeroNet sites

## Description

This package provides ZeroFrame for development of ZeroFrame sites. It is based on [ZeroFrame source](https://github.com/HelloZeroNet/ZeroHello/blob/master/template-new/js/ZeroFrame.js) from ZeroHello repository, which is automatically downloaded and released using GitHub Actions.

## Installation

You can install ZeroFrame using Yarn of npm.

```bash
yarn add zeroframe # Using Yarn
npm install --save zeroframe # Using npm
```

## Usage

### Importing Package

You can import ZeroFrame with CJS or ESM.

```js
const ZeroFrame = require('zeroframe') // Using CJS
import ZeroFrame from 'zeroframe' // Using ESM
```

### Bundling Package

This package uses browser APIs and relies on standard ZeroNet wrapper, so it can't be used from Node.js. For WebSocket version of ZeroFrame client, compatible with Node.js, check [ZeroFrameJS](https://github.com/filips123/ZeroFrameJS).

To use this package with your ZeroNet site, you will probably need some kind of JavaScript bundler (like Browserify, Webpack, Parcel...). The package is using Pika Pack to build and publish both CJS and ESM version, so it should work with most types of bundlers and in most web browsers.

### General Usage

Once ZeroFrame is imported, it provides the exact same API as ZeroFrame found in default ZeroHello site template. All commands listed in [official documentation](https://zeronet.io/docs/site_development/zeroframe_api_reference/) should be supported normally.

## Support & Contributions

Only repository-specific questions and issues should be asked here. For ZeroFrame-specific questions and issues, use appropriate HelloZeroNet's repositories.

This repository is not a source of ZeroFrame library, so don't contribute any ZeroFrame-related changes to it. If you want to contribute changes to ZeroFrame library, use [ZeroHello repository](https://github.com/HelloZeroNet/ZeroHello). Your changes will be automatically downloaded and released here.

If you want to contribute repository-specific changes (build and release scripts, tests, description, readme...), feel free to make PR here.

## License

The package, along with ZeroFrame library from ZeroHello, is licensed under the MIT license. See the [LICENSE](https://github.com/rllola/zeroframe/blob/master/LICENSE) file for details.
