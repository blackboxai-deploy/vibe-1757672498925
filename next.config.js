/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'sb-*.vercel.run']
    }
  },
  images: {
    domains: ['placehold.co'],
  },
  env: {
    FLASK_API: process.env.FLASK_API,
    CLOUD_HOOK: process.env.CLOUD_HOOK,
    OPENAI_KEY: process.env.OPENAI_KEY,
    XAI_KEY: process.env.XAI_KEY,
    CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
    USER_EMAIL: process.env.USER_EMAIL
  }
}

module.exports = nextConfig