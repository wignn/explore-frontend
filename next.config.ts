/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [
      'files.edgestore.dev',
      'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      'pub-f7660b0aa83f4a0ea4768b2faf5e9bd8.r2.dev',
      'little-wood-d8cd.tigfiragnafatur1933.workers.dev',
    ],
  },
}

export default nextConfig
