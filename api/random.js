export default async function handler(req, res) {
  const owner = 'Titroupast';
  const repo = 'image';
  const path = 'blog';
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const exts = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

  try {
    const response = await fetch(apiUrl);
    const files = await response.json();

    const images = files
      .filter(f => f.type === 'file' && exts.some(ext => f.name.toLowerCase().endsWith(ext)))
      .map(f => f.name);

    if (images.length === 0) {
      res.statusCode = 404;
      res.end('No images found');
      return;
    }

    const idx = Math.floor(Math.random() * images.length);
    const url = `https://cdn.jsdelivr.net/gh/${owner}/${repo}@main/blog/${images[idx]}`;
    res.writeHead(302, { Location: url });
    res.end();
  } catch (e) {
    res.statusCode = 500;
    res.end('Failed to fetch images');
  }
} 