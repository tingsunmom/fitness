// require('../css/register.less')
// console.log('我是register。js')


// document.ready(function () {
//   // DOM 获取
//   let tell = document.querySelector('#tell');
//   let codeText = document.querySelector('#codeText');
//   let pwd = document.querySelector('#pwd');
//   let pwd1 = document.querySelector('#pwd1');
//   let registerBtn = document.querySelector('.save-btn');
//   let msg = document.querySelector('.msg');
//   let code = '';
//   //window.CaptchaMini
//   let captcha1 = new CaptchaMini();
//   captcha1.draw(document.querySelector('#captcha1'), function (res) {

//     code = res;
//     console.log(code);

//   });

//    //跳转到登录页
//    document.querySelector('.jump-text').addEventListener('click', function (e) {
//     location.href = './login.html'
//   })



//   //DOM的值
//   //监听注册按钮的事件 click
//   registerBtn.addEventListener('click', function (e) {
//     //清除之前的提醒
//     msg.textContent = '';
//     //判断所有的input 必须有值
//     if (tell.value && codeText.value && pwd.value && pwd1.value) {
//       //正则验证手机号--手机号的条件  
//       let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
//       if (!reg.test(tell.value)) {
//         //提醒用户
//         msg.textContent = '手机号输入错误';
//         return;
//       }
//       if (pwd.value != pwd1.value) {
//         msg.textContent = '两次密码不一致';
//         return;
//       }
//       if (codeText.value.toLowerCase() != code.toLowerCase()) {
//         msg.textContent = '验证码不正确';
//         return;
//       }

//       //条件都通过了
//       // ajax 请求
//       console.log('这里可以发送ajax请求')
//       let data = {
//         account: tell.value,
//         password: pwd.value
//       }
//       $http.post('/users/login', data, function (res) {
//         //如果res.status ===0 注册成功 提醒跳转登录页
//         if (res.status == 0) {
//           msg.textContent = '注册成功,2s后跳转登录页';
//           setTimeout(function () {
//             location.href = './login.html';
//           }, 2000)
//         } else {
//           //res.status ===1  注册失败  res.msg 给用户显示
//           msg.textContent = res.msg;
//         }

//       })
//     }

//   })
// })


require('../css/register.less')
console.log('我是register。js')


document.ready(function () {
  // DOM 获取
  let tell = document.querySelector('#tell');
  let codeText = document.querySelector('#codeText');
  let pwd = document.querySelector('#pwd');
  let pwd1 = document.querySelector('#pwd1');
  let registerBtn = document.querySelector('.save-btn');
  let msg = document.querySelector('.msg');
  let code = '';
  //window.CaptchaMini
  let captcha1 = new CaptchaMini();
  captcha1.draw(document.querySelector('#captcha1'), function (res) {

    code = res;
    console.log(code);

  });


  //跳转到登录页
  document.querySelector('.jump-text').addEventListener('click', function (e) {
    location.href = './login.html'
  })

  //DOM的值
  //监听注册按钮的事件 click
  registerBtn.addEventListener('click', function (e) {
    //清除之前的提醒
    msg.textContent = '';
    //判断所有的input 必须有值
    if (tell.value && codeText.value && pwd.value && pwd1.value) {
      //正则验证手机号--手机号的条件  
      let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
      if (!reg.test(tell.value)) {
        //提醒用户
        utils.createToast(1, '手机号输入错误');
        return;
      }
      if (pwd.value != pwd1.value) {
        utils.createToast(1, '两次密码不一致');
        return;
      }
      if (codeText.value.toLowerCase() != code.toLowerCase()) {
        utils.createToast(1, '验证码不正确');
        return;
      }

      //条件都通过了
      // ajax 请求
      let data = {
        account: tell.value,
        password: pwd.value
      }
      //注册接口
      $http.post('/users/add', data, function (res) {
        //如果res.status ===0 注册成功 提醒跳转登录页
        if (res.status == 0) {
          //请求登录接口
          $http.post('/users/login', data, function (res1) {
            //登录成功
            if (res1.status == 0) {
              //将数据存到本地存储

              localStorage.setItem('user', JSON.stringify(res1.data.user));
              //跳转页面到首页
              utils.createToast(0, '登录成功');

              //1S 跳转
              setTimeout(function () {
                location.href = './home.html'
              }, 1000)


            } else { //登录失败
              //提醒
              utils.createToast(1, res1.msg);
            }

          }) 
          // utils.createToast(0, '注册成功,2s后跳转登录页');
          // setTimeout(function () {
          //   location.href = './login.html';
          // }, 2000)
        } else {
          //res.status ===1  注册失败  res.msg 给用户显示
          // msg.textContent = res.msg;
          utils.createToast(1, res.msg);
        }
      })
    }
  })
})