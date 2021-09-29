/**
 * 工具函数
 * 封装的函数
 */




const utils = {}


/**
 * @createToast 封装组件
 * @msg  String 提醒文本
 * @status  Number  状态（1：失败，0：成功）
 * @return 直接向页面写入了DOM节点 不需要接收返回数据
 */

utils.createToast = function (status, msg) {
  //创建div 
  let toast = document.createElement('div');
  //给创建的div 添加类名
  toast.className = 'toast';
  //iconfont 图标
  html = `
    <p>
      <i class="iconfont ${status === 0 ? 'icon-true' : 'icon-flase'}">
    </p>
   `
  let html = `
        <p>
          <span class="icon">${status === 0 ? '√' : '×'}</span>
        </p>
        <p>${msg}</p>
      `;
  //将toast 的内容添加到 toast 
  toast.innerHTML = html;
  //获取body
  let bodyDom = document.querySelector('body');

  //给bodyDom 添加 html代码
  bodyDom.appendChild(toast);
  //1s之后 清除

  setTimeout(function () {
    toast.remove();
  }, 1000)
}

/**
  * @createFooter   底部公共组件的封装
  * @page  String  当前调用的页面
  * @return 直接向页面写入了DOM节点 不需要接收返回数据
  */
utils.createFooter = function (page) {
  let footer = document.createElement('footer');
  footer.className = 'dpflex jscon'
  // 如果被选中的页面  footer-item active  
  //没有被选中的页面   footer-item
  let html = `
        <a href="./home.html">
        <div class="${page === 'home' ? 'footer-item active' : 'footer-item'}">
          <p>
            <i class="iconfont iconhome"></i>
          </p>
          <span>首页</span>
        </div>
      </a>
      <a href="./sports.html">
        <div class="${page === 'sports' ? 'footer-item active' : 'footer-item'} ">
          <p>
            <i class="iconfont iconsports"></i>
          </p>
          <span>运动</span>
        </div>
      </a>
      <a href="./about.html">
        <div class="${page === 'about' ? 'footer-item active' : 'footer-item'}">
          <p>
            <i class="iconfont iconmine"></i>
          </p>
          <span>我的</span>
        </div>
      </a>
    `;

  footer.innerHTML = html;
  document.querySelector('body').appendChild(footer);
},

    // 注册点击事件
    utils.clickAll= function() {
      let home = document.querySelector(".footer .home")
      let sport = document.querySelector(".footer .sport")
      let Personal = document.querySelector(".footer .Personal")
      home.addEventListener("click", function(e) {
          location.href = "./home.html"
      })
      sport.addEventListener("click", function(e) {
          location.href = "./sports.html"
      })
      Personal.addEventListener("click", function(e) {
          location.href = "./about.html"
      })

  },

  /* 
  *@strGetObj 
  *@str  string   传入的字符串
  * return obj
  */
  utils.strGetObj = function (str) {
    // 设置空对象
    let obj = {};
    // 截取第一个问号
    let getStr = str.substring(1);
    // 以&分割成数组
    let arr = getStr.split("&")
    // 遍历循环
    arr.forEach(function (item, index) {
      let newStr = item.split("=")
      console.log(newStr);
      // 拼接每一个对象
      obj[newStr[0]] = newStr[1];
    })
    return obj
  }

//挂载
window.utils = utils