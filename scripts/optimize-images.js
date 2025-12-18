// Safe image optimization helper.
// Usage: install sharp first (optional): `npm i -D sharp` then `node scripts/optimize-images.js`
// This script will generate .webp and .avif alongside the originals for the top image files.
import fs from 'fs';
import path from 'path';

const assetsDir = path.resolve(process.cwd(), 'src', 'assets');

async function run() {
  try {
    const sharp = await import('sharp').catch(() => null);
    if (!sharp) {
      console.log('sharp not installed. Run `npm i -D sharp` to enable image conversion.');
      process.exit(0);
    }

    const files = fs.readdirSync(assetsDir).filter(f => /\.(png|jpg|jpeg)$/i.test(f));
    const heavy = files
      .map(f => ({ f, size: fs.statSync(path.join(assetsDir, f)).size }))
      .sort((a,b) => b.size - a.size)
      .slice(0, 10)
      .map(x => x.f);

    console.log('Optimizing (responsive):', heavy.join(', '));

    // Responsive widths to generate (common breakpoints)
    const widths = [480, 768, 1024, 1600];

    await Promise.all(heavy.map(async (file) => {
      const input = path.join(assetsDir, file);
      const name = path.parse(file).name;

      // Generate base webp/avif (fallback single files)
      const webpOut = path.join(assetsDir, `${name}.webp`);
      const avifOut = path.join(assetsDir, `${name}.avif`);
      await sharp.default(input).webp({ quality: 80 }).toFile(webpOut);
      await sharp.default(input).avif({ quality: 60 }).toFile(avifOut);

      // Generate multiple widths for responsive srcset
      await Promise.all(widths.map(async (w) => {
        const webpW = path.join(assetsDir, `${name}-${w}.webp`);
        const avifW = path.join(assetsDir, `${name}-${w}.avif`);
        await sharp.default(input).resize({ width: w }).webp({ quality: 75 }).toFile(webpW);
        await sharp.default(input).resize({ width: w }).avif({ quality: 55 }).toFile(avifW);
      }));

      console.log('Created base + responsive variants for', name);
    }));

    console.log('Done. Review generated files in src/assets and commit alongside originals.');
  } catch (err) {
    console.error('Error optimizing images:', err);
  }
}

run();
