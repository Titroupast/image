export default {
  async fetch(request, env, ctx) {
    const owner = 'Titroupast';
    const repo = 'Blog'; // 或者 'image' 如果图片在当前仓库的 'blog' 目录
    const path = '';     // 保持不变，或者根据实际情况修改
    const exts = ['.jpg', '.png', '.gif', '.webp'];

    // 从环境变量中获取 GitHub Token
    // 注意：env.GITHUB_TOKEN 中的 GITHUB_TOKEN 必须与您在 Pages 设置中添加的环境变量名完全一致
    const githubToken = env.GITHUB_TOKEN; 

    // 构建请求头，包含认证信息
    const headers = {
      'User-Agent': 'Cloudflare-Worker-Image-API', // GitHub 要求提供 User-Agent
    };
    if (githubToken) {
      headers['Authorization'] = `token ${githubToken}`;
    }

    try {
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
      const githubResponse = await fetch(apiUrl, { headers: headers }); // 将 headers 添加到 fetch 请求中

      if (!githubResponse.ok) {
        // 返回更详细的错误信息
        const errorText = await githubResponse.text(); // 尝试获取错误响应的文本
        console.error(`GitHub API returned status: ${githubResponse.status} - ${githubResponse.statusText}. Response: ${errorText}`);
        return new Response(`Failed to fetch images from GitHub API: ${githubResponse.status} - ${githubResponse.statusText}. Details: ${errorText}`, { status: githubResponse.status });
      }

      const files = await githubResponse.json();

      if (!Array.isArray(files) || files.length === 0) {
          return new Response("No files found in repository or API response is empty.", { status: 404 });
      }

      const images = files
        .filter(f => f.type === 'file' && exts.some(ext => f.name.toLowerCase().endsWith(ext)))
        .map(f => f.download_url);

      if (images.length === 0) {
        return new Response("No images found with specified extensions in the directory!", { status: 404 });
      }

      const randomIndex = Math.floor(Math.random() * images.length);
      const imageUrl = images[randomIndex];

      return Response.redirect(imageUrl, 302);

    } catch (e) {
      console.error("Error in Worker:", e);
      return new Response(`Internal Server Error: ${e.message || e}`, { status: 500 });
    }
  },
};
