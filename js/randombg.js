//随机背景图片数组,图片可以换成图床链接，注意最后一条后面不要有逗号
var backimg =[
  "url(https://cdn.jsdelivr.net/gh/tge8/blog-img@main/202205022357001.png)",
  "url(https://cdn.jsdelivr.net/gh/tge8/blog-img@main/a/bjtp (5).jpg)",
  "url(https://cdn.jsdelivr.net/gh/tge8/blog-img@main/a/bjtp (4).jpg)",
  "url(https://cdn.jsdelivr.net/gh/tge8/blog-img@main/a/bjj (4).jpg)",
  "url(https://cdn.jsdelivr.net/gh/tge8/blog-img@main/a/bjtp (1).jpg)",
  "url(https://www.z4a.net/images/2023/10/31/bgtp.png)",
  "url(https://www.z4a.net/images/2023/11/02/a-7.jpg)",
  "url(https://www.z4a.net/images/2023/11/02/a-6.jpg)",
  "url(https://www.z4a.net/images/2023/11/02/a-1.jpg)",
  "url(https://www.z4a.net/images/2023/11/02/a-3.jpg)",
  "url(https://www.z4a.net/images/2023/11/02/a-2.jpg)",
  "url(https://www.z4a.net/images/2023/11/02/a-5.jpg)",
  "url(https://www.z4a.net/images/2023/11/02/a-4.jpg)",
  "url(https://cdn.jsdelivr.net/gh/tge8/blog-img@main/a/bjj (3).jpg)"
];
//获取背景图片总数，生成随机数
var bgindex =Math.floor(Math.random() * (backimg.length));
//重设背景图片
document.getElementById("web_bg").style.backgroundImage = backimg[bgindex];
//随机banner数组,图片可以换成图床链接，注意最后一条后面不要有逗号
var bannerimg =[
    "url(https://cdn.jsdelivr.net/gh/tge8/blog-img@main/202205022357001.png)",
    "url(https://cdn.jsdelivr.net/gh/tge8/blog-img@main/a/bjtp (5).jpg)",
    "url(https://cdn.jsdelivr.net/gh/tge8/blog-img@main/a/bjtp (4).jpg)",
    "url(https://cdn.jsdelivr.net/gh/tge8/blog-img@main/a/bjj (4).jpg)",
    "url(https://cdn.jsdelivr.net/gh/tge8/blog-img@main/a/bjtp (1).jpg)",
    "url(https://www.z4a.net/images/2023/10/31/bgtp.png)",
    "url(https://www.z4a.net/images/2023/11/02/a-7.jpg)",
    "url(https://www.z4a.net/images/2023/11/02/a-6.jpg)",
    "url(https://www.z4a.net/images/2023/11/02/a-1.jpg)",
    "url(https://www.z4a.net/images/2023/11/02/a-3.jpg)",
    "url(https://www.z4a.net/images/2023/11/02/a-2.jpg)",
    "url(https://www.z4a.net/images/2023/11/02/a-5.jpg)",
    "url(https://www.z4a.net/images/2023/11/02/a-4.jpg)",
    "url(https://cdn.jsdelivr.net/gh/tge8/blog-img@main/a/bjj (3).jpg)"
];
//获取banner图片总数，生成随机数
var bannerindex =Math.ceil(Math.random() * (bannerimg.length-1));
//重设banner图片
document.getElementById("page-header").style.backgroundImage = bannerimg[bannerindex];