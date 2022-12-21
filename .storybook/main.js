module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
        transcludeMarkdown: true,
      },
    },
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-controls',
    '@storybook/addon-backgrounds',
    '@storybook/addon-toolbars',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
    'storybook-addon-themes',
    '@nrwl/react/plugins/storybook',
    {
      name: 'storybook-addon-swc',
      options: {
        enable: true,
        enableSwcLoader: true,
        enableSwcMinify: true,
      },
    },
  ],
}
