
require('../css/home.less')
document.ready(function () {
  // if (!localStorage.getItem("user")) {
  //   location.href = "./login.html"
  // }
  //DOM节点
  let rankValDom = document.querySelector('#rankVal');
  let punchValDom = document.querySelector('#punchVal');
  let numberVal = document.querySelector("#numberVal");
  let cardBtn = document.querySelector("#cardBtn");

  utils.createFooter('home');

  //swiper 初始化
  var mySwiper = new Swiper('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    autoplay: true,
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
  })



  //请求 首页默认数据
  //获取本地存储的数据
  let user = JSON.parse(localStorage.getItem('user'));
  // console.log(user);
  function getData() {
    $http.get('/headPageInfo', { userId: user.userId }, function (res) {
      // console.log(res);
      //成功
      if (res.status == 0) {
        rankValDom.textContent = res.data.rank;
        punchValDom.textContent = res.data.punchIn;
        numberVal.textContent = res.data.insigniaNum;

        // 如果打卡显示
        // 如果已经打卡隐藏
        if (res.data.isPunch == "true") {
          cardBtn.textContent = "今日已打卡"
        } else {
          cardBtn.textContent = "今日打卡";
        }
      }
    })
  }

  getData();

  // 打卡功能实现
  cardBtn.addEventListener("click", function () {
    // 调用打卡接口
    $http.get("/clockIn", { userId: user.userId }, function (res) {
      // console.log(res);
      if (res.status == 0) {
        // 成功打卡===重新获取首页数据
        getData();
      }
    })
  })


})