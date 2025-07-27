# How to Publish Your Custom n8n Node to npmjs

Follow these steps to publish your custom n8n node (e.g., n8n-nodes-sei) to npmjs so it can be installed in any n8n instance.

---

## 1. Prepare Your Package

- **Check your `package.json`:**
  - Ensure the `name` is unique (e.g., `n8n-nodes-sei` or `@your-scope/n8n-nodes-sei`).
  - Set the `version` (e.g., `1.0.0`).
  - Add `description`, `author`, `license`, and `repository` fields.
  - The `main` field should point to your built entry file (e.g., `dist/index.js`).
- **Build your package:**
  ```bash
  npm run build
  # or
  yarn build
  ```

---

## 2. Create an npm Account (if you don’t have one)
- Go to https://www.npmjs.com/signup and create an account.

---

## 3. Login to npm in Your Terminal
```bash
npm login
```
- Enter your npm username, password, and email.

---

## 4. Publish Your Package
- If your package name is **not scoped** (e.g., `n8n-nodes-sei`):
  ```bash
  npm publish
  ```
- If your package name is **scoped** (e.g., `@your-scope/n8n-nodes-sei`), publish it as public:
  ```bash
  npm publish --access public
  ```

---

## 5. Install Your Node in Any n8n Instance
After publishing, install your node in any n8n instance:
```bash
npm install n8n-nodes-sei
# or, if scoped:
npm install @your-scope/n8n-nodes-sei
```

---

## 6. (Optional) Update Your Package
- Bump the version in `package.json` (e.g., `1.0.1`).
- Rebuild: `npm run build`
- Publish again: `npm publish` (or with `--access public` if scoped).

---

## References
- [n8n Docs: Install private nodes](https://docs.n8n.io/integrations/creating-nodes/deploy/install-private-nodes/)
- [npm Docs: Publishing packages](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages)

---

**Tip:** Add keywords like `n8n` and `n8n-nodes` in your `package.json` for discoverability.
