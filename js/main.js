 /**********anchor*********/
    //平滑滾動至指定id
    function anchorTo(ID) {
        var dest = document.getElementById(ID);
        window.scrollTo({top: dest.offsetTop, behavior: 'smooth'})
    }
    /**********greet*********/
    var greet = document.querySelector('.greet')
    var scrollUp = greet.querySelector('.scroll-up')
    scrollUp.addEventListener('click', function () {
        greet.style.animationPlayState = 'paused';
        scrollUp.style.animationPlayState = 'paused'
        //動畫完畢調用自動播放
        move(greet, 30, 0, 'height', autoChange)
    })

    /**********carousel*********/
    var slider = document.querySelector('.slider');//總容器
    var imgArr = slider.querySelectorAll('img')//輪播圖片
    var imgList = slider.querySelector('.imgList');//輪播圖片容器
    var slideNav = slider.querySelector('navigator');//輪播導航條
    var allA = slider.querySelectorAll('a');//輪播導航連結
    //預設變量
    var index = 0;//當前播放圖片下標   
    var timer;//定時器


    var imgWidth = document.documentElement.clientWidth * (document.documentElement.clientWidth < 768 ? 1 : 0.9 ) 
    //將圖片大小設置成螢幕大小90%
    for (var i = 0; i < imgArr.length; i++) {
        imgArr[i].style.width = imgWidth + 'px'
        imgArr[i].style.height = 'auto'
    }
    //將總容器高度設置成與圖片等比例  
    slider.style.height = imgWidth * 500 / 960 + 'px'
    //將輪播圖片容器寬度設置成所有圖片寬度和    
    imgList.style.width = imgWidth * imgArr.length + 'px'

    //自動播放
    function autoChange() {
        timer = setInterval(function () {
            index++;
            index %= imgArr.length;

            move(imgList, 50, index * -imgWidth, 'left', function () {
                //圖片輪播重置
                rewindImg();
            })
        }, 2000)
    }

    //圖片輪播重置
    function rewindImg() {
        //當圖片放到最後一張時重置回第一張
        if (index == imgArr.length - 1) {
            index = 0;
            imgList.style.left = 0 + 'px';
        }
        //並且重設當前導航點為第一張
        for (var i = 0; i < allA.length; i++) {
            allA[i].style.backgroundColor = '';
            allA[index].style.backgroundColor = 'black';
        }
    }
    //監聽導航條
    function listenAllA() {
        //預設首張圖片
        allA[index].style.backgroundColor = 'black'
        for (var i = 0; i < allA.length; i++) {
            allA[i].num = i;
            allA[i].onclick = function () {
                //暫停輪播
                clearInterval(timer);
                index = this.num;
                move(imgList, 50, index * -imgWidth, 'left', function () {
                    //自動播放
                    autoChange();
                });
                rewindImg();
            }
        }
    }
    //監聽導航條
    listenAllA()
    /************menu***********/
    //stickytop 
    var navbar = document.querySelector('.menu');
    var sticky = navbar.offsetTop;
    window.addEventListener('scroll', function () {
        if (window.scrollY >= sticky) {
            navbar.classList.add("sticky")
        } else {
            navbar.classList.remove("sticky");
        }
     });
        
    /***********skill************/
    var inView = false;

    function isScrolledIntoView(elem) {
        var ViewBottom = window.scrollY + window.screen.height;
        var elemBottom = elem.offsetTop + parseInt(getStyle(elem, 'height'));
        // 如果視口底部 已經滾過 物件頂部 且 視口頂部 沒有滾到 物件底部 => 表示物件正在視窗 返回true
        return ((elem.offsetTop <= ViewBottom) && (elemBottom >=  window.scrollY));
    }

    window.addEventListener('scroll', function () {
        if (isScrolledIntoView(ctx)) {
            if (inView) { return; }
            inView = true;
            startAnimateChart()
        } else {
            inView = false;
        }
    });

    function startAnimateChart() {
        example = new Chart(ctx, {
            type: "bar", // 圖表類型
            data: {
                labels: ['HTML/CSS', 'JavaScript', 'Bootstrap', 'jQuery', 'SCSS', 'GIT', 'Vue'], // 標題
                datasets: [{
                    data: [85, 70, 70, 75, 50, 55, 10, 0, 100], // 資料
                    backgroundColor: [ // 背景色
                        "#fea892",
                        "#fea892",
                        "#fea892",
                        "#fea892",
                        "#fea892",
                        "#fea892",
                        "#fea892",
                        "#fea892",
                    ],
                    fillColor: [
                        "rgba(151,187,205,1)", "rgba(151,187,205,1)", "rgba(151,187,205,1)"
                    ],
                    borderWidth: 2, // 外框寬度
                }],
            },
        });
    }
    Chart.defaults.global.animation.duration = 4000;
    Chart.defaults.global.legend.display = false;
    var ctx = document.querySelector('.chart')