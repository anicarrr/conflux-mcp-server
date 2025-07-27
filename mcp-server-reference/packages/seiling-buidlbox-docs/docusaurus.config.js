// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

// Determine deployment environment
const isVercel = process.env.VERCEL === '1';
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

// Set URL and baseUrl based on deployment environment
const getUrl = () => {
  if (isVercel) {
    return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://seiling-buidlbox.vercel.app';
  }
  if (isGitHubPages) {
    return 'https://nicoware-dev.github.io';
  }
  return 'http://localhost:3000'; // Development
};

const getBaseUrl = () => {
  if (isVercel) {
    return '/'; // Vercel serves from root
  }
  if (isGitHubPages) {
    return '/seiling-buidlbox/'; // GitHub Pages serves from project path
  }
  return '/'; // Development
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Seiling Buidlbox',
  tagline: 'No-Code Sei Multi-Agent System Development Toolkit',
  favicon: './img/icon.png',

  // Set the production url of your site here
  url: getUrl(),
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: getBaseUrl(),

  // GitHub pages deployment config.
  organizationName: 'nicoware-dev', // Usually your GitHub org/user name.
  projectName: 'seiling-buidlbox', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/nicoware-dev/seiling-buidlbox/edit/main/packages/seiling-buidlbox-docs/',
        },
        blog: false, // Disable blog functionality
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/banner.png',
      navbar: {
        title: 'Seiling Buidlbox',
        logo: {
          alt: 'Seiling Buidlbox Logo',
          src: './img/icon.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/nicoware-dev/seiling-buidlbox',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Getting Started',
            items: [
              {
                label: 'Quick Start',
                to: '/docs/getting-started/quick-start',
              },
              {
                label: 'Deployment',
                to: '/docs/getting-started/deployment',
              },
              {
                label: 'Environment Setup',
                to: '/docs/config/environment',
              },
            ],
          },
          {
            title: 'Documentation',
            items: [
              {
                label: 'Services',
                to: '/docs/config/services',
              },
              {
                label: 'User Guide',
                to: '/docs/guides/user-guide',
              },
              {
                label: 'Packages',
                to: '/docs/reference/packages',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/nicoware-dev/seiling-buidlbox',
              },
              {
                label: 'Issues',
                href: 'https://github.com/nicoware-dev/seiling-buidlbox/issues',
              },
              {
                label: 'Discussions',
                href: 'https://github.com/nicoware-dev/seiling-buidlbox/discussions',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Templates',
                to: '/docs/guides/resources',
              },
              {
                label: 'Scripts Guide',
                to: '/docs/guides/scripts',
              },
              {
                label: 'Docker Setup',
                to: '/docs/config/docker',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Seiling Buidlbox. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config; 