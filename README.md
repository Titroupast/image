### 免费图床搭建指南：GitHub + PicGo，让你的博客图片随心所欲！



最近是不是也想搭建一个自己的博客，分享生活、记录学习？在搭建博客的过程中，你可能会遇到一个问题：图片存储在哪里？很多图床服务虽然方便，但往往会涉及到费用，或者对免费用户有限制。如果你也想让博客页面拥有随机背景图等酷炫功能，又不想为此付费，那么 **GitHub + PicGo** 的组合将是你的不二之选！

------



### 为什么选择 GitHub 搭建图床？



你可能会问，GitHub 不是代码托管平台吗，怎么还能做图床？这正是它的巧妙之处！

优势如下：

- **完全免费：** GitHub 为你提供了免费的存储空间，用来存放你的图片再合适不过。对于个人博客而言，这个空间完全够用，大大节省了你的运营成本。
- **稳定可靠：** GitHub 作为全球最大的代码托管平台，其稳定性毋庸置疑。这意味着你的图片链接将长期有效，不必担心图片丢失或无法访问的问题。
- **版本控制：** GitHub 强大的版本控制功能，也能让你更好地管理图片。即使不小心删除了图片，也有机会找回。
- **CDN 加速（可选）：** 结合一些免费的 CDN 服务（如 jsDelivr），甚至可以进一步提升图片的加载速度，让你的博客访问体验更流畅。
- **自定义域名（可选）：** 如果你对个性化有追求，还可以通过 GitHub Pages 绑定自定义域名，让你的图片链接更加专业。

------



### 搭建步骤



------



### Step 1：创建 GitHub 仓库



首先，你需要一个在 GitHub 上存储图片的地方。

1. **登录 GitHub：** 访问 GitHub 官网并登录你的账号。
2. **创建新仓库：** 点击页面右上角的 “**+**” 号，选择 “**New repository**”（新建仓库）。
3. **填写仓库信息：**
   - **Repository name (仓库名称):** 随意填写一个你喜欢的名称，例如 `image-hosting`、`blog-images` 等。
   - **Description (描述):** (可选) 简单描述一下这个仓库的用途。
   - **Public/Private (公开/私有):** **务必选择 “Public (公开)”**。你的图片需要公开才能在博客中显示。
   - **Add a README file (添加 README 文件):** (可选) 建议勾选。
   - **Add .gitignore (添加 .gitignore):** (可选) 选择 `None`。
   - **Choose a license (选择许可证):** (可选) 选择 `None`。
4. 点击绿色的 “**Create repository**”（创建仓库）按钮。

------



### Step 2：配置 PicGo



PicGo 是一款开源的图片上传工具，它支持多种图床，其中就包括 GitHub。通过 PicGo，你可以轻松将图片上传到 GitHub 仓库，并自动生成图片链接。

1. **下载并安装 PicGo：**
   - 访问 PicGo 的 GitHub Release 页面。
   - 根据你的操作系统（Windows, macOS, Linux）下载最新版本的 PicGo。
   - 安装过程与其他软件类似，双击安装包，按照提示完成即可。
2. **配置 GitHub 图床：**
   - 打开 PicGo 软件，在左侧菜单栏选择 “**图床设置**” → “**GitHub 图床**”。
   - 你需要填写以下信息：
     - **设定仓库名：** 格式为 `你的GitHub用户名/你的仓库名`。
     - **设定分支名：** 通常填写 `main` 或 `master`（取决于你 GitHub 仓库的默认分支）。
     - **设定 Token：** 这是非常重要的一步，你需要创建一个 GitHub Personal Access Token (PAT) 来授权 PicGo 访问你的仓库。
       - 登录 GitHub，点击右上角你的头像，选择 **Settings**（设置）。
       - 在左侧菜单栏选择 **Developer settings**（开发者设置）。
       - 选择 **Personal access tokens** → **Tokens (classic)**（个人访问令牌 → 传统令牌）。
       - 点击 **Generate new token (classic)**（生成新令牌（传统））。
       - **Note (备注):** 随意填写，例如 "PicGo Token"。
       - **Expiration (有效期):** 建议选择 **No expiration (永不过期)**。
       - **Select scopes (选择权限):** **务必勾选 `repo` (所有仓库相关权限)**。
       - 点击 **Generate token**（生成令牌）。
       - **生成的 Token 只会显示一次，请务必复制并妥善保存！** 将其粘贴到 PicGo 的 "设定 Token" 字段中。
     - **指定存储路径：** (选填) 如果你希望图片上传到仓库的某个文件夹下，例如 `img/`，则填写 `img/`。否则留空即可。
     - **设定自定义域名：** 这是用来拼接图片链接的，格式通常为 `https://cdn.jsdelivr.net/gh/你的GitHub用户名/你的仓库名@你的分支名`。
       - 例如：`https://cdn.jsdelivr.net/gh/your-username/your-repo-name@main`
       - 这个域名使用了 jsDelivr CDN，可以有效加速图片访问。
   - 配置完成后，点击 PicGo 右下角的 “**设置为默认图床**”。

------



### Step 3：利用 Vercel 实现随机图片输出



在开始导入项目之前，请确保你已经用自己的 GitHub 账号登录 Vercel，并授权 Vercel 访问你的仓库。这样才能顺利选择并导入你的图床仓库进行部署。



#### Vercel 部署流程



1. 在 Vercel 控制台点击右上角 “**Add New**” → “**Project**”（新增 → 项目）。![d5938c1207541ebf6aeeadf371b05d3](C:\Users\cjl\Documents\WeChat Files\wxid_4n9mgtdvkb9422\FileStorage\Temp\d5938c1207541ebf6aeeadf371b05d3.png)
2. 在 “**Import Git Repository**”（导入 Git 仓库）页面，选择你的 GitHub 仓库（如 `image`），点击 “**Import**”（导入）。![100a18bb359c69c095eca80be20cba3](C:\Users\cjl\Documents\WeChat Files\wxid_4n9mgtdvkb9422\FileStorage\Temp\100a18bb359c69c095eca80be20cba3.png)
3. 在 “**New Project**”（新项目）页面，确认项目名称、团队、根目录（一般为 `./`），`Framework Preset` 选择 “**Other**”（其他），然后点击 “**Deploy**”（部署）完成部署。![0a852e1c17c8c3278be6b3c635304e8](C:\Users\cjl\Documents\WeChat Files\wxid_4n9mgtdvkb9422\FileStorage\Temp\0a852e1c17c8c3278be6b3c635304e8.png)
4. 部署完成后，直接访问你自己的 Vercel 项目域名下的 `/api/random` 路径即可获取一张随机图片。例如： `https://你的-vercel-项目名.vercel.app/api/random` 请将 `你的-vercel-项目名` 替换为你在 Vercel 部署时生成的实际项目名称。 每次访问该链接，都会自动跳转到你的图床中的一张随机图片，非常适合用作博客的随机背景图或其他需要随机图片的场景。![image-20250721000352880](C:\Users\cjl\AppData\Roaming\Typora\typora-user-images\image-20250721000352880.png)



#### 环境变量（可选）



如果你的云函数需要访问私有仓库或有 API 速率限制，请在 Vercel 项目设置中添加环境变量 `GITHUB_TOKEN`，值为你在 GitHub 生成的 Personal Access Token。



#### API 代码示例



本项目已包含用于随机图片输出的 API 代码，部署后无需额外添加代码即可使用。如需自定义功能，可参考下方代码：

JavaScript

```
export default async function handler(req, res) {
  const owner = 'Titroupast'; // <-- 这里填写你的 GitHub 用户名
  const repo = 'image';     // <-- 这里填写你的 GitHub 图床仓库名称
  const path = 'blog';      // <-- 这里填写你的图片在仓库中的子文件夹路径，如果图片在根目录则留空 ''
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const exts = ['.jpg', '.jpeg', '.png', '.gif', '.webp']; // 可根据需要添加或删除图片扩展名

  try {
    const response = await fetch(apiUrl);

    // 检查GitHub API响应是否成功
    if (!response.ok) {
        // 如果响应不成功，可能是因为仓库或路径不存在，或者GitHub API限流
        const errorText = await response.text();
        console.error(`GitHub API Error: ${response.status} - ${errorText}`);
        res.statusCode = response.status;
        res.end(`Failed to fetch images from GitHub API: ${errorText}`);
        return;
    }

    const files = await response.json();

    // 过滤出符合扩展名的图片文件
    const images = files
      .filter(f => f.type === 'file' && exts.some(ext => f.name.toLowerCase().endsWith(ext)))
      .map(f => f.name); // 提取文件名

    if (images.length === 0) {
      res.statusCode = 404;
      res.end('No images found');
      return;
    }

    // 随机选择一张图片
    const idx = Math.floor(Math.random() * images.length);
    // 构建图片在 jsDelivr CDN 上的完整 URL
    // 注意：这里的 'main' 是你的 GitHub 仓库分支名，如果你的仓库默认分支不是 main，请更改
    const url = `https://cdn.jsdelivr.net/gh/${owner}/${repo}@main/${path ? path + '/' : ''}${images[idx]}`;

    // 设置HTTP状态码为302（临时重定向），并设置Location头为随机图片的URL
    res.writeHead(302, { Location: url });
    res.end(); // 结束响应，浏览器将重定向到图片URL
  } catch (e) {
    console.error('Error fetching or processing images:', e);
    res.statusCode = 500;
    res.end('Failed to fetch images');
  }
}
```

------



### 如何使用？



现在，你可以开始享受免费图床带来的便利了！

- **拖拽上传：** 将图片文件直接拖拽到 PicGo 软件的悬浮窗口中，或者拖拽到 PicGo 主界面的上传区域。
- **剪贴板上传：** 截图后，直接在 PicGo 中点击“上传区”或使用快捷键（PicGo 设置中可自定义），PicGo 会自动将剪贴板中的图片上传。
- **自动生成链接：** 图片上传成功后，PicGo 会自动将图片链接复制到你的剪贴板，你可以直接粘贴到你的博客文章中。

------



### 结语



利用 GitHub 和 PicGo 搭建图床，不仅免费、稳定，而且操作简单。这套方案非常适合个人开发者和博客爱好者。通过配置 Personal Access Token，PicGo 得以通过 GitHub 的 API 与你的仓库进行交互，实现自动上传和链接生成。而借助 Vercel 的 Serverless Functions，我们更进一步，实现了博客背景图的动态随机输出，让你的博客更具吸引力！

现在，快去尝试一下，让你的博客拥有更多精美的图片和炫酷的随机背景吧！如果你在实践过程中遇到任何问题，或者有新的想法，欢迎随时交流。