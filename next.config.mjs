import { promises as fs } from 'fs'
import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads')
      fs.mkdir(uploadDir, { recursive: true })
        .catch(console.error)
    }
    return config
  },
}

export default nextConfig

