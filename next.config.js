const path = require('path')

module.exports = {
  async rewrites() {
    return [
      {
        source: `/robots.txt`,
        destination: `/robotstxt`,
      },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.(js|ts)x?$/] },
      use: ['url-loader'],
    })
    return config
  },
  reactStrictMode: true,
  sassOptions: {
    indentWidth: 4,
    includePaths: [path.join(__dirname, 'src', 'packages')],
    additionalData: (content, loaderContext) => {
      const { resourcePath, rootContext } = loaderContext
      const relativePath = path.relative(rootContext, resourcePath)
      if (
        !relativePath.includes('@styles/variables') &&
        !relativePath.includes('@styles/include') &&
        relativePath.endsWith('.module.scss')
      ) {
        content =
          `
        @import 'styles/variables/breakpoints';
        @import 'styles/variables/colors';
        @import 'styles/variables/fonts';
        @import 'styles/include/functions';
        @import 'styles/include/animations';
        @import 'styles/include/mixins';
      ` + content
      }

      return content
    },
  },
  publicRuntimeConfig: {
    APP_LOCALE: process.env.APP_LOCALE || 'ru-RU',
    DEV: process.env.DEV === 'true',
    PUBLIC_URL: process.env.PUBLIC_URL || '',
  },
  images: {
    domains: ['cdn.dribbble.com', 'res.cloudinary.com'],
  },
}
