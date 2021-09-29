require('../css/advertising.less')
document.ready(function () {
    // 获取
    let timerNum = document.querySelector(".timer span");
    console.log(timerNum);
    let jumpStn = document.querySelector(".jump")
    console.log(jumpStn);

    // 倒计时功能
    setInterval(function () {
        let num = Number(timerNum.textContent) - 1;
        if (num === 0) {
            location.href = "./login.html";
            // 停止倒计时
            clearInterval();
        } else {
            timerNum.textContent = num   //  倒计时未结束渲染时间到页面
        }
    }, 1000)

    // 用户点击跳转
    jumpStn.addEventListener("click", function () {
        location.href = "./login.html";
    })
})
