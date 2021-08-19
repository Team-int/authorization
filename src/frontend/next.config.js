module.exports = {
  reactStrictMode: true,
  env: {
    OAUTH_URL: process.env.OAUTH_URL,
    RECAPTCHA_KEY: process.env.RECAPTCHA_KEY
  }
}

/*module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['openweathermap.org', 'tile.openweathermap.org']
  },
  env: {
    API_KEY: process.env.API_KEY
  }
}
*/