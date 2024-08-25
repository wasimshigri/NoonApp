module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
				root: ['./src'],
				extensions: ['.js', '.tsx', '.jsx',
        '.ts', '.json'],
				alias: {
					'@': './src',
				},
			}
    ],
  ]
};
