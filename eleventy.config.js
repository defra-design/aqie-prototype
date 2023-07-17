const govukEleventyPlugin = require('@x-govuk/govuk-eleventy-plugin')

module.exports = function (eleventyConfig) {
  // Register the plugin
  eleventyConfig.addPlugin(govukEleventyPlugin, {
    brandColour: '#00a33b',
    header: {
      organisationLogo: 'royal-arms',
      organisationName: 'DEFRA',
      productName: 'Air quality design history'
    },
    url: process.env.GITHUB_ACTIONS
      ? 'https://defra-design.github.io/aqie-prototype/'
      : '/'
  })

  eleventyConfig.addCollection('post', collection => {
    return collection.getFilteredByGlob('*.md')
  })

  // Pass through
  eleventyConfig.addPassthroughCopy('./docs/images')

  return {
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'docs',
      layouts: '../node_modules/@x-govuk/govuk-eleventy-plugin/layouts'
    },
    pathPrefix: process.env.GITHUB_ACTIONS
      ? '/aqie-prototype/'
      : '/'
  }
}
