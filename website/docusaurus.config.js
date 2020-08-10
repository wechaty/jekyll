module.exports = {
  title: 'Wechaty',
  tagline: 'A Conversational SDK for Chatbot Makers',
  url: 'https://wechaty.js.org',
  baseUrl: '/docs/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'wechaty', // Usually your GitHub org/user name.
  projectName: 'wechaty.js.org', // Usually your repo name.
  stylesheets: [
    'css/gitter-sidecar.css',
  ],
  scripts: [
    'js/gitter-sidecar.js',
    {
      src:
        'https://sidecar.gitter.im/dist/sidecar.v1.js',
      async: true,
    },
  ],
  themeConfig: {
    navbar: {
      title: '',
      logo: {
        alt: 'Wechaty Logo',
        src: 'img/wechaty-logo.svg',
      },
      items: [
        {
          label: 'Docs',
          to: 'README',
          position: 'right'
        },
        {
          label: 'Getting Started',
          to: 'getting-started',
          position: 'right'
        },
        {
          label: 'Tutorial',
          to: 'video-tutorial',
          position: 'right'
        },
        { label: 'API', to: 'api/README', position: 'right' },
        { label: 'FAQ', to: 'faq/README', position: 'right' },
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
              to: 'getting-started'
            },
            {
              label: 'FAQ',
              to: 'faq/README'
            },
            {
              label: 'Tutorial',
              to: 'video-tutorial'
            },
            {
              label: 'API Reference',
              to: 'api/README'
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
        src: 'img/wechaty-logo.svg',
        href: 'https://wechaty.js.org/',
      },
      copyright: `Copyright © 2016-${new Date().getFullYear()} <a href="https://github.com/huan" target="_blank">@huan</a> and Wechaty community contributors`,
    },
    // algolia: {
    //   apiKey: 'YOUR_API_KEY',
    //   indexName: 'YOUR_INDEX_NAME',
    //   searchParameters: {}, // Optional (if provided by Algolia)
    // },
    googleAnalytics: {
      trackingID: 'UA-88739146-3'
    },
    prism: {
      additionalLanguages: [
        'csharp',
        'kotlin',
        'scala',
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: './docs',
          routeBasePath: '/',
          // It is recommended to set document id as docs home page (`` path).
          // homePageId: 'README',
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
