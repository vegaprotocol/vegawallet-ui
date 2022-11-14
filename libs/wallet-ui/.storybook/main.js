const rootMain = require('../../../.storybook/main')

module.exports = {
  ...rootMain,
  stories: [...rootMain.stories, '../src/**/*.stories.@(js|jsx|ts|tsx)'],
}
