/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/resourse",
        destination: "/resourse/news-and-event",
        permanent: false,
      },
      {
        source: "/resourses",
        destination: "/resourse/news-and-event",
        permanent: false,
      },
      {
        source: "/individual",
        destination: "/individual/book-a-test",
        permanent: false,
      },
      {
        source: "/individuals",
        destination: "/individual/book-a-test",
        permanent: false,
      },
      {
        source: "/blog",
        destination: "/resources/blog",
        permanent: false,
      },
      {
        source: "/glossary",
        destination: "/resources/glossary",
        permanent: false,
      },
      {
        source: "/faqs",
        destination: "/resources/faqs",
        permanent: false,
      },
      {
        source: "/download",
        destination: "/contact-us",
        permanent: false,
      },
      {
        source: "/careers",
        destination: "/about/careers",
        permanent: false,
      },
      {
        source: "/faqs",
        destination: "/resources/faqs",
        permanent: false,
      },
      {
        source: "/lab-tests",
        destination: "/individual/book-a-test",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
