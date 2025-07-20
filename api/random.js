import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const blogDir = path.join(process.cwd(), 'image', 'blog');
  const exts = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  let images = [];
  try {
    images = fs.readdirSync(blogDir).filter(file =>
      exts.includes(path.extname(file).toLowerCase())
    );
  } catch (e) {
    res.statusCode = 500;
    res.end('Failed to read images');
    return;
  }
  if (images.length === 0) {
    res.statusCode = 404;
    res.end('No images found');
    return;
  }
  const idx = Math.floor(Math.random() * images.length);
  const url = `https://cdn.jsdelivr.net/gh/Titroupast/image@main/blog/${images[idx]}`;
  res.writeHead(302, { Location: url });
  res.end();
} 