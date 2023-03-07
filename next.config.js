/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: (() => {
    let compilerConfig = {
      styledComponents: true,
    }
    if (process.env.NODE_ENV === 'production') {
      compilerConfig = {
        reactRemoveProperties: { propeties: ['^data-testid$'] },
      }
    }

    return compilerConfig
  })(),
  async rewrites() {
    // ブラウザ側からAPIを叩くとCORSの制限に引っかかるのでrewite機能を使って、json-serverにリクエストを送る
    return [
      {
        /**
         * :matchは変数みたいなもの。その他の値でも構わない。destinationで使いまわせる
         * APIとフロントのオリジンが別である場合にこの機能を使うと有効
         */
        source: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:match*`,
        destination: `${process.env.API_BASE_URL}/:match`
      }
    ]
  }
}

module.exports = nextConfig
