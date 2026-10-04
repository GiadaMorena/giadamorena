const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
fs.mkdirSync(output, {recursive:true});
const pages = ['index.html','progetti.html','fotografia.html','siti-web.html','contatti.html','grazie.html'];
const assets = new Set(['assets/site.css','assets/refinements.css','assets/enhancements.js','images/social-cover.png']);
for (const page of pages) {
  const html = fs.readFileSync(path.join(root,page),'utf8');
  fs.copyFileSync(path.join(root,page),path.join(output,page));
  for (const match of html.matchAll(/(?:src|href|poster)="((?:assets|images)\/[^"#]+)"/g)) assets.add(decodeURIComponent(match[1]));
}
for (const asset of assets) {
  const target = path.join(output,asset);
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.copyFileSync(path.join(root,asset),target);
}
for (const file of ['robots.txt','sitemap.xml']) fs.copyFileSync(path.join(root,file),path.join(output,file));
console.log(`Built ${pages.length} pages and ${assets.size} local assets in dist/`);
