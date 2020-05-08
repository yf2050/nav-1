jQuery
const $siteList = $(`.siteList`);
const $lastLi = $siteList.find(`li.last`);
//获得x,把x字符串转成对象
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
//xObject第一次空的，所以存在再返回后面的
const hashMap = xObject || [{
    logo: "G",
    url: "https://github.com/",
  },
  {
    logo: "R",
    url: "http://www.ruanyifeng.com/blog/",
  },
  {
    logo: "M",
    url: "https://developer.mozilla.org/zh-CN/docs/Learn",
  },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};
//简化代码，把渲染哈希整合
const render = () => {
  //遍历前把除了最新的都清空
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    //console.log(index);
    const $li = $(`<li>
              <div class="site">
                  <div class="log">${node.logo}</div>
                  <div class="link">${simplifyUrl(node.url)}</div>
                  <div class='close'>
                  <svg class="icon">
                   <use xlink:href="#icon-yingyong-"></use>
                  </svg>
                 </div>
              </div>        
          </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      //console.log(hashMap);
      hashMap.splice(index, 1); //删除index这个
      render(); //重新渲染页面
    });
  });
};
render();
$(".addButton").on("click", () => {
  let url = window.prompt("请输入你的网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0],
    url: url
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
//实现键盘自动点击跳转首个网址
$(document).on('keypress', (e) => {
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === e.key) {
      window.open(hashMap[i].url)
    }
  }
})