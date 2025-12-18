// Non-destructive script to add loading="lazy" and decoding="async" to plain <img> tags
// Usage: node scripts/add-lazy-to-imgs.js
import fs from 'fs';
import path from 'path';

const root = path.resolve(process.cwd(), 'src');
const exts = ['.tsx', '.ts', '.jsx', '.js'];

function walk(dir){
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for(const e of entries){
    const p = path.join(dir, e.name);
    if(e.isDirectory()) walk(p);
    else if(exts.includes(path.extname(e.name))){
      transformFile(p);
    }
  }
}

function transformFile(file){
  let s = fs.readFileSync(file, 'utf8');
  const orig = s;
  // Regex: find <img ...> tags that do NOT already contain loading= or decoding= or srcSet (we'll keep srcset alone)
  s = s.replace(/<img([^>]*?)>/g, (match, attrs) => {
    // skip if already has loading or decoding
    if(/\bloading=|\bdecoding=/i.test(attrs)) return `<img${attrs}>`;
    // keep self-closing or not
    // insert attributes before closing
    const newAttrs = `${attrs} loading=\"lazy\" decoding=\"async\"`;
    return `<img${newAttrs}>`;
  });

  if(s !== orig){
    fs.writeFileSync(file, s, 'utf8');
    console.log('Updated', file);
  }
}

walk(root);
console.log('Done adding lazy attributes. Review changes then commit.');
