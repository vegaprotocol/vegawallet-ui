module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@nrwl/react/plugins/storybook',
    'storybook-addon-themes',
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
