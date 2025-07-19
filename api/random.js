export default function handler(req, res) {
  const images = [
    "0D244CF41658185F0A400AC4FA2F1A7B.jpg",
    "1EB3F502979449D70CD4CB07284E7EBD.png",
    "416388701139e7020b2b7e524d957d5.jpg",
    "6ad1488f9fe61cba26b5af8120b28a3.jpg",
    "9ADD6A60BDE10E72B8FC4D80C3DB5CB6.png",
    "9D4BFB73E916C900D59BF1D439CD0692.png",
    "aa52f2fdde7101f05aa803a0d052120.jpg",
    "AC0F64684F79E201EB539E6A93966FC9.jpg",
    "B68EAF7FB8CDB7E89BD57F57F483BD0E.jpg",
    "bf6dc9e0d9b092580ef9f28c8ead72f.jpg",
    "C43A692A8059EF575C9DAA60326E334C.jpg",
    "f9b4b3e434b0965a4b62c8c852eae74.jpg",
    "R-C.jpg"
  ];
  const idx = Math.floor(Math.random() * images.length);
  const url = `https://cdn.jsdelivr.net/gh/Titroupast/image@main/blog/${images[idx]}`;
  // 301/302 重定向到图片
  res.writeHead(302, { Location: url });
  res.end();
} 