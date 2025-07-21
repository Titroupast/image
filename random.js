export default {
  async fetch(request, env, ctx) {
    const owner = 'Titroupast';
    const repo = 'image'; // **修改这里，指向部署Worker的仓库**
    const path = 'blog'; // **修改这里，指向image仓库下的blog目录**
    const exts = ['.jpg', '.png', '.gif', '.webp'];

    try {
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
      const githubResponse = await fetch(apiUrl);

      if (!githubResponse.ok) {
        console.error(`GitHub API returned status: ${githubResponse.status} - ${githubResponse.statusText}`);
        return new Response(`Failed to fetch images from GitHub API: ${githubResponse.status} - ${githubResponse.statusText}`, { status: githubResponse.status });
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
  },
};
