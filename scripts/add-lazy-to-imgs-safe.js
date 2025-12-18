// Safer non-destructive script to add loading="lazy" and decoding="async" to <img> tags
// Preserves self-closing slashes and existing attributes. Usage: `node scripts/add-lazy-to-imgs-safe.js`
import fs from 'fs';
import path from 'path';

const root = path.resolve(process.cwd(), 'src');
const exts = ['.tsx', '.ts', '.jsx', '.js'];

function walk(dir){
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for(const e of entries){
    const p = path.join(dir, e.name);
    if(e.isDirectory()) walk(p);
    else if(exts.includes(path.extname(e.name))) transformFile(p);
  }
}

function transformFile(file){
  let s = fs.readFileSync(file, 'utf8');
  const orig = s;
  s = s.replace(/<img\b([^>]*?)(\/?)>/gms, (match, attrs, selfClose) => {
    // If already contains loading or decoding, skip
    if(/\bloading=|\bdecoding=/i.test(attrs)) return match;
    // Add a space if attrs doesn't end with whitespace
    const spacer = attrs && !/\s$/.test(attrs) ? ' ' : '';
    const insert = `${attrs}${spacer}loading="lazy" decoding="async"`;
    return `<img${insert}${selfClose ? '/' : ''}>`;
  });
  if(s !== orig){
    fs.writeFileSync(file, s, 'utf8');
    console.log('Updated', file);
  }
}

walk(root);
console.log('Safe lazy-attr script finished. Review changes and run build.');
