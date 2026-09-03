import { copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const clientRoot = resolve('dist/client');
const cleanRoutes = ['projects/polymarket'];

await Promise.all(
  cleanRoutes.map(async (route) => {
    const source = resolve(clientRoot, `${route}.html`);
    const destinationDirectory = resolve(clientRoot, route);
    await mkdir(destinationDirectory, { recursive: true });
    await copyFile(source, resolve(destinationDirectory, 'index.html'));
  }),
);

console.log('Prepared clean GitHub Pages routes.');
