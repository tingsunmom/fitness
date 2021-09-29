require('../css/login.less')
console.log('我是login。js');
document.ready(function () {
  //获取dom
  // input xxinp  xxDom  xxBtn
  let accountInp = document.querySelector('#account');
  let passwordInp = document.querySelector('#password');
  let saveBtn = document.querySelector('.save-btn');



  //跳转注册页
  document.querySelector('.jump-text').addEventListener('click', function (e) {
    location.href = './register.html';
  })


  //登录业务
  // 事件监听---saveBtn 
  // 输入账号/密码
  // - 账号 密码 格式进行验证【正则】
  // - 获取账号密码 通过后端的  登录接口 将数据传递给后端 进行登录

  saveBtn.addEventListener('click', function (e) {
    if (accountInp.value && passwordInp.value) {
      //接口请求
      let data = { account: accountInp.value, password: passwordInp.value }
      //登录接口
      $http.post('/users/login', data, function (res) {
        //登录成功
        if (res.status == 0) {
          //将数据存到本地存储

          localStorage.setItem('user', JSON.stringify(res.data.user));
          //跳转页面到首页
          console.log(utils)
          utils.createToast(0, '登录成功');
 
          //1S 跳转
          setTimeout(function () {
            location.href = './home.html'
          }, 1000)


        } else { //登录失败
          //提醒
          utils.createToast(1, res.msg);
        }

      })
    }

  })



})

    // // DOM的值
    // // 监听注册按钮事件 click
    // reisterBtn.addEventListener("click", function () {
    //     // 清除之前的提醒
    //     msg.textContent = "";
    //     // 判断必须全部要有值
    //     if (tell.value && pwd.value) {
    //         // 正则验证手机号   手机号条件
    //         let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
    //         if (!reg.test(tell.value)) {
    //             // 提醒用户
    //             msg.textContent = "手机号输入错误";
    //             return;   // 结束代码运行
    //         }

    //         //  // 正则验证密码   密码条件
    //         let pwdReg = /^[a-zA-Z0-9_-]{4,16}$/;
    //         if (!pwdReg.test(pwd.value)) {
    //             // 提醒用户
    //             msg.textContent = "密码输入错误";
    //             return;   // 结束代码运行
    //         }
    //         //条件都通过了
    //         // ajax 请求
    //         let data = {
    //             account: tell.value,
    //             password: pwd.value
    //         }
    //         $http.post("/users/add", data, function (ress) {
    //             // console.log(ress);
    //             //如果res.status ===0 注册成功 提醒跳主页
    //             if (ress.status == 0) {
    //                 msg.textContent = '注册成功,2s后跳转登录页';
    //                 setTimeout(function () {
    //                   location.href = './home.html';
    //                 }, 2000)
    //             } else {
    //                 //res.status ===1  注册失败  res.msg 给用户显示
    //                 msg.textContent = ress.msg;
    //             }
    //         })
    //     }
    // })

