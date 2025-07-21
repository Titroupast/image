export default async function onRequest(context) { // 注意这里改成了 onRequest
  const { request, env, params } = context; // 获取请求、环境变量等

  const owner = 'Titroupast';
  const repo = 'image'; // 您的图片所在的仓库名是 'image'
  const path = 'blog'; // 您的图片所在目录名是 'blog' (小写)
  const exts = ['.jpg', '.png', '.gif', '.webp'];

  const githubToken = env.GITHUB_TOKEN; // 从 Pages 环境变量获取 GITHUB_TOKEN

  const headers = {
    'User-Agent': 'Cloudflare-Worker-Image-API',
  };
  if (githubToken) {
    headers['Authorization'] = `token ${githubToken}`;
  }

  try {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const githubResponse = await fetch(apiUrl, { headers: headers });

    if (!githubResponse.ok) {
      const errorText = await githubResponse.text();
      console.error(`GitHub API returned status: ${githubResponse.status} - ${githubResponse.statusText}. Response: ${errorText}`);
      return new Response(`Failed to fetch images from GitHub API: ${githubResponse.status} - ${githubResponse.statusText}. Details: ${errorText}`, { status: githubResponse.status });
    }

    const files = await githubResponse.json();

    if (!Array.isArray(files) || files.length === 0) {
        return new Response("No files found in specified repository path or API response is empty.", { status: 404 });
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
}
