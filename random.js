export default {
  async fetch(request, env, ctx) {
    // 将您原有的逻辑从这里开始粘贴
    const owner = 'Titroupast';
    const repo = 'Blog';
    const path = ''; // 保持不变，或者根据需要修改
    const exts = ['.jpg', '.png', '.gif', '.webp'];

    try {
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
      const response = await fetch(apiUrl);
      const files = await response.json();

      const images = files
        .filter(f => f.type === 'file' && exts.some(ext => f.name.toLowerCase().endsWith(ext)))
        .map(f => f.download_url); // 使用 download_url 获取直接链接

      if (images.length === 0) {
        // 对于 Worker，返回 Response 对象
        return new Response("No images found!", { status: 404 });
      }

      const randomIndex = Math.floor(Math.random() * images.length);
      const imageUrl = images[randomIndex];

      // 返回重定向 Response
      return Response.redirect(imageUrl, 302);

    } catch (e) {
      console.error("Error fetching images:", e); // 在Worker日志中查看错误
      return new Response("Failed to fetch images!", { status: 500 });
    }
    // ... 您的原有代码到这里结束
  },
};
