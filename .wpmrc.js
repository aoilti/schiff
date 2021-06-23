module.exports = {
  allowBranch: ['main', 'v0.*'],
  bumpFiles: [
    'package.json',
    'package-lock.json',
    {
      filename: './VERSION.txt',
      type: 'plain-text',
    },
  ],
  skip: {
    changelog: true,
  },
  commitAll: true,
  hooks: {
    prepublish: 'yarn workspaces run build',
    postpublish: 'lerna publish from-git',
    postreleaseBranch: 'lerna version {{version}} && git add .',
  },
};
