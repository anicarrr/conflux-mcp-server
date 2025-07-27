/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    { type: 'doc', id: 'intro', label: 'Introduction' },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/quick-start',
        'getting-started/deployment',
      ],
    },
    {
      type: 'category',
      label: 'Configuration',
      items: [
        'config/environment',
        'config/services',
        'config/docker',
      ],
    },
    {
      type: 'category',
      label: 'User Guide',
      items: [
        'guides/user-guide',
        'guides/scripts',
        'guides/resources',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/packages',
        'reference/env-example',
      ],
    },
  ],
};

module.exports = sidebars; 