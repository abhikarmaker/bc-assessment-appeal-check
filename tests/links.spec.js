const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function walkHtmlFiles(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(walkHtmlFiles(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function resolveRoute(urlPath) {
  // Mirrors this project's directory-based routing: /foo -> /foo/index.html,
  // / -> /index.html, a path with a static-file extension is used as-is, and
  // a path that already ends in .html is used as-is.
  if (urlPath === '/' || urlPath === '') return path.join(ROOT, 'index.html');
  const asFile = path.join(ROOT, urlPath.slice(1));
  if (/\.[a-z0-9]+$/i.test(urlPath) && fs.existsSync(asFile)) return asFile;
  if (urlPath.endsWith('.html')) return asFile;
  return path.join(ROOT, urlPath.slice(1), 'index.html');
}

test('every internal href/src resolves to a real file', () => {
  const files = walkHtmlFiles(ROOT);
  const missing = [];

  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    const refs = [...html.matchAll(/(?:href|src)="(\/[a-zA-Z0-9_\-./]*)"/g)].map((m) => m[1]);

    for (const ref of refs) {
      const [routePart, anchor] = ref.split('#');
      if (routePart === '' && anchor) continue; // pure same-page anchor like "/#check" handled below
      const target = resolveRoute(routePart);
      if (!fs.existsSync(target)) {
        missing.push(`${path.relative(ROOT, file)} -> ${ref}`);
        continue;
      }
      if (anchor) {
        const targetHtml = fs.readFileSync(target, 'utf8');
        if (!new RegExp(`id="${anchor}"`).test(targetHtml)) {
          missing.push(`${path.relative(ROOT, file)} -> ${ref} (anchor #${anchor} not found in target)`);
        }
      }
    }
  }

  expect(missing).toEqual([]);
});

test('every page has exactly one canonical link and it is absolute', () => {
  const files = walkHtmlFiles(ROOT).filter((f) => !f.endsWith('404.html'));
  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)">/g)];
    expect(canonicals.length, path.relative(ROOT, file)).toBe(1);
    expect(canonicals[0][1], path.relative(ROOT, file)).toMatch(/^https:\/\//);
  }
});
