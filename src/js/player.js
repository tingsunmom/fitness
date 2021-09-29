require('../css/player.less')
document.ready(function () {
    let video1Dom = document.querySelector(".video-box")
    let videoDom = document.querySelector(".video-box video")
    let numDom = document.querySelector(".num")
    let lenDom = document.querySelector(".len")
    let titleDom = document.querySelector(".title")
    let backDom = document.querySelector(".back-icon")
    let goDom = document.querySelector(".go-icon")
    let stopDom = document.querySelector(".stop-icon")
    let proDom = document.querySelector(".pro")
    let playDom = document.querySelector(".play-icon")
    let back1Dom = document.querySelector(".back-btn")
    let modelDom = document.querySelector('.model');
    let modelImage = document.querySelector('.image-box img');
    let modelImageText = document.querySelector('.image-text');
    let continueBtn = document.querySelector('.continue');
    let stopBtn = document.querySelector('.stop');
    let tag = true;

    let BASE_URL = 'http://139.9.177.51:8099'

    let arr = JSON.parse(localStorage.getItem("videoList"))
    console.log(arr);
    // 定义一个全局变量的索引
    let videoIndex = 0;

    function play(index) {
        videoDom.src = BASE_URL + arr[index].videoUrl
        titleDom.textContent = arr[index].title
        numDom.textContent = index + 1
        lenDom.textContent = arr.length
    }
    play(videoIndex);
    // 视频播放结束继续播放
    videoDom.addEventListener("ended", function (e) {
        if (videoIndex + 1 < arr.length) {
            videoIndex++;
            play(videoIndex);
        }
    })
    // 点击去下一节
    goDom.addEventListener("click", function () {
        if (videoIndex + 1 < arr.length) {
            videoIndex++;
            console.log(videoIndex);
            play(videoIndex);
        }
    })
    // 点击返回上一节
    backDom.addEventListener("click", function () {
        if (videoIndex - 1 >= 0) {
            videoIndex--;
            console.log(videoIndex);
            play(videoIndex);
        }
    })
    // 点击播放
    stopDom.addEventListener("click", function () {
        if (!tag) {
            playDom.style.display = "block"
            stopDom.style.display = "none"
            videoDom.play();
            tag = true;
        }
    })
    // 点击暂停
    playDom.addEventListener("click", function () {
        if (tag) {
            playDom.style.display = "none"
            stopDom.style.display = "block"
            videoDom.pause();
            tag = false;
        }
    })
    back1Dom.addEventListener("click", function () {
        location.href = "./sports.html"
    })

    // 进度条
    setInterval(function () {
        let len = parseInt((videoDom.currentTime / videoDom.duration) * 100)
        proDom.style.width = len + "%"
    }, 60)

    //- 用户点击暂停按钮  停止播放 
    playDom.addEventListener('click', function () {
        //停止播放
        videoDom.pause();
        //显示蒙层
        modelDom.className = 'model show';

        //更换蒙层中的 图片和文字
        modelImage.src = BASE_URL + arr[videoIndex].imgUrl;
        modelImageText.textContent = arr[videoIndex].title;
    })

    //继续播放
    continueBtn.addEventListener('click', function () {
        videoDom.play();
        // 隐藏 蒙层
        modelDom.className = 'model';
    })

    // 停止播放
    stopBtn.addEventListener('click', function () {
        location.href = './sports.html'
    })

})