module.exports = {
  'parser': 'babel-eslint',
  // 'plugins': ['react','standard'],
  'parserOptions': {
    'ecmaVersion': 7,
    'sourceType': 'module',
    'allowImportExportEverywhere': false,
    'codeFrame': false,
    'ecmaFeatures': {
      'jsx': true,
      'classes': true,
      'impliedStrict': true,
      'experimentalObjectRestSpread': true
    },
    'env': {
      'browser': true,
      'node': true,
      'es6': true
      // 'mocha': true
    },
    'rules': {
      // 'quotes': ['warn', 'single'],
      // 'react/jsx-uses-react': 'error',
      // 'react/jsx-uses-vars': 'error',
      // 'react/react-in-jsx-scope': 'error',
      // 'react/jsx-no-bind': [
      //   'warn', {
      //     'ignoreRefs': false,
      //     'allowArrowFunctions': true,
      //     'allowBind': false
      //   }
      // ]
    }
  }
}
