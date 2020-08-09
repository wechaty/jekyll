module.exports = {
  title: 'Wechaty',
  tagline: 'A Conversational SDK for Chatbot Makers',
  url: 'https://wechaty.js.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'wechaty', // Usually your GitHub org/user name.
  projectName: 'wechaty.js.org', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Wechaty',
      logo: {
        alt: 'Wechaty Logo',
        src: 'img/wechaty.svg',
      },
      items: [
        {
          label: 'Getting Started',
          to: 'docs/',
          position: 'right'
        },
        {
          label: 'Tutorial',
          to: 'tutorials/essentials/part-1-overview-concepts',
          position: 'right'
        },
        { label: 'API', to: 'api/reference', position: 'right' },
        { label: 'FAQ', to: 'faq', position: 'right' },
        {
          label: 'Best Practices',
          to: '/style-guide/style-guide',
          position: 'right'
        },
        {
          label: 'GitHub',
          href: 'https://github.com/wechaty/wechaty',
          position: 'right'
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'introduction/getting-started'
            },
            {
              label: 'Tutorial',
              to: 'tutorials/essentials/part-1-overview-concepts'
            },
            {
              label: 'FAQ',
              to: 'faq'
            },
            {
              label: 'Tutorial',
              to: 'basics/basic-tutorial'
            },
            {
              label: 'API Reference',
              to: 'api/api-reference'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/wechaty',
            },
            {
              label: 'Gitter',
              href: 'https://gitter.im/Chatie/wechaty',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/chatieio',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/wechaty/wechaty#readme',
            },
          ],
        },
      ],
      logo: {
        alt: 'Wechaty Logo',
        src: 'img/wechaty.svg',
        href: 'https://wechaty.js.org/',
      },
      copyright: `Copyright © 2016-${new Date().getFullYear()} Huan and Wechaty community contributors.`,
    },
    // algolia: {
    //   apiKey: 'YOUR_API_KEY',
    //   indexName: 'YOUR_INDEX_NAME',
    //   searchParameters: {}, // Optional (if provided by Algolia)
    // },
    googleAnalytics: {
      trackingID: 'UA-88739146-3'
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'getting-started',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/wechaty/wechaty.js.org/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/wechaty/wechaty.js.org/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
