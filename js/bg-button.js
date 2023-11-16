// 存数据
// name：命名 data：数据
function saveData(name, data) {
    localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData(name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
        let t = Date.now() - d.time
        if (t < (time * 60 * 1000) && t > -1) return d.data;
    }
    return 0;
}

// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用

// 读取背景
try {
    let data = loadData('blogbg', 1440)
    if (data) changeBg(data, 1)
    else localStorage.removeItem('blogbg');
} catch (error) { localStorage.removeItem('blogbg'); }

// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
function changeBg(s, flag) {
    let bg = document.getElementById('web_bg')
    if (s.charAt(0) == '#') {
        bg.style.backgroundColor = s
        bg.style.backgroundImage = 'none'
    } else bg.style.backgroundImage = s
    if (!flag) { saveData('blogbg', s) }
}

// 以下为2.0新增内容

// 创建窗口
var winbox = ''

function createWinbox() {
    let div = document.createElement('div')
    document.body.appendChild(div)
    winbox = WinBox({
        id: 'changeBgBox',
        index: 999,
        title: "切换背景",
        x: "center",
        y: "center",
        minwidth: '300px',
        height: "60%",
        background: '#49b1f5',
        onmaximize: () => { div.innerHTML = `<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}</style>` },
        onrestore: () => { div.innerHTML = '' }
    });
    winResize();
    window.addEventListener('resize', winResize)

    // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
    winbox.body.innerHTML = `
    <div id="article-container" style="padding:10px;">
    
    <p><button onclick="localStorage.removeItem('blogbg');location.reload();" style="background:#5fcdff;display:block;width:100%;padding: 15px 0;border-radius:6px;color:white;"><i class="fa-solid fa-arrows-rotate"></i> 点我恢复默认背景</button></p>
    <h2 id="图片（手机）"><a href="#图片（手机）" class="headerlink" title="图片（手机）"></a>图片（手机）</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic.imgdb.cn/item/654462fbc458853aef0e85cb.jpg)" class="pimgbox" onclick="changeBg('url(https\://pic.imgdb.cn/item/654462fbc458853aef0e85cb.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic.imgdb.cn/item/65444987c458853aefd6d539.png)" class="pimgbox" onclick="changeBg('url(https\://pic.imgdb.cn/item/65444987c458853aefd6d539.png)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic.imgdb.cn/item/654445c4c458853aefcdfec7.jpg)" class="pimgbox" onclick="changeBg('url(https\://pic.imgdb.cn/item/654445c4c458853aefcdfec7.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic.imgdb.cn/item/654445a3c458853aefcdb530.jpg)" class="pimgbox" onclick="changeBg('url(https\://pic.imgdb.cn/item/654445a3c458853aefcdb530.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic.imgdb.cn/item/654445a0c458853aefcdac85.jpg)" class="pimgbox" onclick="changeBg('url(https\://pic.imgdb.cn/item/654445a0c458853aefcdac85.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic.imgdb.cn/item/6544459cc458853aefcda41e.jpg)" class="pimgbox" onclick="changeBg('url(https\://pic.imgdb.cn/item/6544459cc458853aefcda41e.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic.imgdb.cn/item/6544458bc458853aefcd750c.png)" class="pimgbox" onclick="changeBg('url(https\://pic.imgdb.cn/item/6544458bc458853aefcd750c.png)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic.imgdb.cn/item/65444584c458853aefcd649b.jpg)" class="pimgbox" onclick="changeBg('url(https\://pic.imgdb.cn/item/65444584c458853aefcd649b.jpg)')"></a>
    </div>
    
    <h2 id="图片（电脑）"><a href="#图片（电脑）" class="headerlink" title="图片（电脑）"></a>图片（电脑）</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic.imgdb.cn/item/6544459ac458853aefcd9d7f.jpg)" class="imgbox" onclick="changeBg('url(https\://pic.imgdb.cn/item/6544459ac458853aefcd9d7f.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic.imgdb.cn/item/654b9c11c458853aefa8cc96.jpg)" class="imgbox" onclick="changeBg('url(https\://pic.imgdb.cn/item/654b9c11c458853aefa8cc96.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic.imgdb.cn/item/65446c84c458853aef23cf10.jpg)" class="imgbox" onclick="changeBg('url(https\://pic.imgdb.cn/item/65446c84c458853aef23cf10.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic.imgdb.cn/item/65446970c458853aef1d32eb.png)" class="imgbox" onclick="changeBg('url(https\://pic.imgdb.cn/item/65446970c458853aef1d32eb.png)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic.imgdb.cn/item/6544568bc458853aeff1fee2.png)" class="imgbox" onclick="changeBg('url(https\://pic.imgdb.cn/item/6544568bc458853aeff1fee2.png)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic.imgdb.cn/item/65444d50c458853aefde3c61.jpg)" class="imgbox" onclick="changeBg('url(https\://pic.imgdb.cn/item/65444d50c458853aefde3c61.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic.imgdb.cn/item/654445f5c458853aefce6bb1.jpg)" class="imgbox" onclick="changeBg('url(https\://pic.imgdb.cn/item/654445f5c458853aefce6bb1.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic.imgdb.cn/item/654445f1c458853aefce626a.jpg)" class="imgbox" onclick="changeBg('url(https\://pic.imgdb.cn/item/654445f1c458853aefce626a.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic.imgdb.cn/item/654445e8c458853aefce4d5b.jpg)" class="imgbox" onclick="changeBg('url(https\://pic.imgdb.cn/item/654445e8c458853aefce4d5b.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic.imgdb.cn/item/654445d0c458853aefce17cc.jpg)" class="imgbox" onclick="changeBg('url(https\://pic.imgdb.cn/item/654445d0c458853aefce17cc.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic.imgdb.cn/item/654445a6c458853aefcdbe12.jpg)" class="imgbox" onclick="changeBg('url(https\://pic.imgdb.cn/item/654445a6c458853aefcdbe12.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic.imgdb.cn/item/65444550c458853aefcceeaa.png)" class="imgbox" onclick="changeBg('url(https\://pic.imgdb.cn/item/65444550c458853aefcceeaa.png)')"></a>
    </div>
    
    
    
    <h2 id="渐变色"><a href="#渐变色" class="headerlink" title="渐变色"></a>渐变色</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #eecda3, #ef629f)" onclick="changeBg('linear-gradient(to right, #eecda3, #ef629f)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #d9a7c7, #fffcdc)" onclick="changeBg('linear-gradient(to right, #d9a7c7, #fffcdc)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #dd3e54, #6be585)" onclick="changeBg('linear-gradient(to right, #dd3e54, #6be585)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #C6FFDD, #FBD786, #f7797d)" onclick="changeBg('linear-gradient(to right, #C6FFDD, #FBD786, #f7797d)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #4AC29A, #BDFFF3)" onclick="changeBg('linear-gradient(to right, #4AC29A, #BDFFF3)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #A770EF, #CF8BF3, #FDB99B)" onclick="changeBg('linear-gradient(to right, #A770EF, #CF8BF3, #FDB99B)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #FEAC5E, #C779D0, #FDB99B)" onclick="changeBg('linear-gradient(to right, #FEAC5E, #C779D0, #FDB99B)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #ffc7ec, #baffb3)" onclick="changeBg('linear-gradient(to right, #ffc7ec, #baffb3)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #ffdfc7, #bde3ff)" onclick="changeBg('linear-gradient(to right, #ffdfc7, #bde3ff)')"></a>
    </div>
    
    <h2 id="纯色"><a href="#纯色" class="headerlink" title="纯色"></a>纯色</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ffdfc7" onclick="changeBg('#ffdfc7')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #bde3ff" onclick="changeBg('#bde3ff')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ffa3c2" onclick="changeBg('#ffa3c2')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #f8ffc2" onclick="changeBg('#f8ffc2')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #e4ffb8" onclick="changeBg('#e4ffb8')"></a> 
    </div>
`;
}

// 适应窗口大小
function winResize() {
    let box = document.querySelector('#changeBgBox')
    if (!box || box.classList.contains('min') || box.classList.contains('max')) return // 2023-02-10更新
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
        winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
    } else {
        winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
    }
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
    if (document.querySelector('#changeBgBox')) winbox.toggleClass('hide');
    else createWinbox();
}