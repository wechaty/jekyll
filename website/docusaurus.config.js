module.exports = {
  title: 'Wechaty',
  tagline: 'A Conversational SDK for Chatbot Makers',
  url: 'https://wechaty.js.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'wechaty', // Usually your GitHub org/user name.
  projectName: 'wechaty.js.org', // Usually your repo name.
  stylesheets: [
    '/css/gitter-sidecar.css',
  ],
  scripts: [
    '/js/gitter-sidecar.js',
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
          label: 'Getting Started',
          to: 'docs/getting-started',
          position: 'right'
        },
        {
          label: 'Tutorial',
          to: 'docs/video-tutorial',
          position: 'right'
        },
        { label: 'API', to: 'docs/api', position: 'right' },
        { label: 'FAQ', to: 'docs/faq', position: 'right' },
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
              to: 'docs/getting-started'
            },
            {
              label: 'FAQ',
              to: 'docs/faq'
            },
            {
              label: 'Tutorial',
              to: 'docs/video-tutorial'
            },
            {
              label: 'API Reference',
              to: 'docs/api'
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
          // It is recommended to set document id as docs home page (`` path).
          homePageId: 'readme',
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
