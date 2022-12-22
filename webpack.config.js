const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: () => [
              require('postcss-import'),
              require('tailwindcss')('./tailwind.config.js'),
              require('autoprefixer'),
              purgecss({
                content: ['./**/*.html'],
                // Example to let PurgeCss know how to exclude cdk and mat prefixes if your using Angular CDK and Angular Material
                whitelistPatterns: [/^cdk-|mat-/]
              })
            ]
          },
        }
      }
    ]
  }
};
