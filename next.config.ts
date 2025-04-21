import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	output: 'export',
	images: {
		unoptimized: true,
	},
	experimental: {
		reactCompiler: true,
	},
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
