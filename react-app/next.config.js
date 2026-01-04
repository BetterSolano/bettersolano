/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['bettersolano.org'],
  },
  // Preserve existing URL structure
  async rewrites() {
    return [
      // Service category pages
      { source: '/services/certificates.html', destination: '/services/certificates' },
      { source: '/services/business.html', destination: '/services/business' },
      { source: '/services/tax-payments.html', destination: '/services/tax-payments' },
      { source: '/services/social-services.html', destination: '/services/social-services' },
      { source: '/services/health.html', destination: '/services/health' },
      { source: '/services/agriculture.html', destination: '/services/agriculture' },
      { source: '/services/infrastructure.html', destination: '/services/infrastructure' },
      { source: '/services/education.html', destination: '/services/education' },
      { source: '/services/public-safety.html', destination: '/services/public-safety' },
      { source: '/services/environment.html', destination: '/services/environment' },
    ];
  },
};

module.exports = nextConfig;
