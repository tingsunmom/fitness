require('../css/about.less')
document.ready(function () {
  const baseUrl = 'http://139.9.177.51:8099';


  let userNameDom = document.querySelector('.user-name');
  let msgDom = document.querySelector('.msg span');
  let timerDom = document.querySelector('.sports span')
  let calorieDom = document.querySelector('.calorie span')
  let imgInp = document.querySelector('#imgInp');
  let imgDom = document.querySelector('#userImg');
  let userInfoDom = document.querySelector('.user-info');
  let outloginDtn = document.querySelector('.outlogin-btn');
  let sportsDataom = document.querySelector('.sports-data')


  utils.createFooter('about');

  let user = JSON.parse(localStorage.getItem('user'))
  //接口请求==用户个人信息
  $http.get('/users/accountinfo', { userId: user.userId }, function (res) {
    //获取到数据 成功的时候 页面渲染
    if (res.status == 0) {
      let data = res.data
      // console.log(data);
      //渲染页面
      userNameDom.textContent = data.nickname;
      if (data.sign) {
        msgDom.textContent = data.sign;
      }
      // console.log(data.imgurl);
      if (data.imgurl) {
        //替换头像
        // console.log(data.imgurl);
        imgDom.src = data.imgurl;
      }
    }

  })

  // console.log(user);


  //请求===用户的运动 徽章数据
  $http.get('/users/mysportsBadge', { userId: user.userId }, function (res) {
    if (res.status == 0) {
      // console.log(res.data);
      calorieDom.textContent = res.data.sports.calorie;
      timerDom.textContent = res.data.sports.times;
    }

  })

  //监听input框中值的改变，上传用户头像
  imgInp.addEventListener('change', function () {
    console.log(this.files[0]);
    $updateFile('/users/upload', 'imgurl', this.files[0], function (res) {
      console.log(res);
      //获取到后端返回出来的 baseUrl+文件路径   拼接成网络上的地址
      let imgurl = baseUrl + res.data;
      //将页面的img标签的 src 属性赋值为 完整url图片地址
      // document.querySelector('#userImg').src = imgurl;
      imgDom.src = imgurl;
      console.log(imgurl);


      //将完整url 图片地址 上传到 个人用户的信息之中
      $http.post('/users/userEdit', { imgurl: imgurl, userId: user.userId }, function (res) {
        console.log(res);
        console.log('ok');
      })
    })
  })

  //事件监听---图片的点击事件
  imgDom.addEventListener('click', function (e) {
    //触发input 点击事件
    imgInp.click();
    //阻止事件冒泡
    e.stopPropagation();
  })


  //点击顶部--实现跳转到修改页
  userInfoDom.addEventListener('click', function (e) {
    location.href = './edit.html'
    e.stopPropagation();
  })

  //点击退出按钮清空本地存储返回注册页
  outloginDtn.addEventListener("click", function () {
    localStorage.clear()
    location.href = "./login.html"
  })
  // 点击事件进去运动数据页面
  sportsDataom.addEventListener("click", function () {
    location.href = "./sportdata.html"
  })

})