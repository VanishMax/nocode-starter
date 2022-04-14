export const gitignore = () => `
# dependencies
node_modules
.pnp
.pnp.js

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# misc
.DS_Store
*.pem

# local env files
.env

# IDEs
.vscode
.idea
`;