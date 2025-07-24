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
    
    // 返回HTML页面，每次刷新显示不同图片
    res.setHeader('Content-Type', 'text/html');
    res.end(`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>随机图片</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: url('${url}') no-repeat center center fixed;
            background-size: cover;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
</body>
</html>
    `);
  } catch (e) {
    res.statusCode = 500;
    res.end('Failed to fetch images');
  }
} 