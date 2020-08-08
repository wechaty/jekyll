module.exports = {
  title: 'Wechaty Documentation',
  tagline: 'Wechaty Documentation Site',
  url: 'https://wechaty.github.io/wechaty.js.org',
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
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://wechaty.github.io/news/',
          label: 'News',
          position: 'left',
        },
        {
          href: 'https://wechaty.github.io/developers/',
          label: 'Developers',
          position: 'left',
        },
        {
          href: 'https://wechaty.github.io/talks/',
          label: 'News',
          position: 'left',
        },
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/wechaty/wechaty-getting-started/',
          label: 'Get Started',
          position: 'left',
        },
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/wechaty/wechaty',
          label: 'GitHub',
          position: 'right',
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
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
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
      copyright: `Copyright © ${new Date().getFullYear()} Wechaty Contributors. Built with Docusaurus.`,
    },
    // algolia: {
    //   apiKey: 'YOUR_API_KEY',
    //   indexName: 'YOUR_INDEX_NAME',
    //   searchParameters: {}, // Optional (if provided by Algolia)
    // },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'doc1',
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
