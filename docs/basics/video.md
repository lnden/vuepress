# H5视频

<video id="video" width="280" height="314" autobuffer controls src="http://image.zhangxinxu.com/video/blog/201806/sing-song.mp4" type="video/mp4"></video>
    <p>选择播放速率：<select id="selRate">
        <option value="0.5">0.5</option>
        <option value="1" selected>1.0</option>
        <option value="1.25">1.25</option>
        <option value="1.5">1.5</option>
        <option value="2">2.0</option>
        <option value="3">3.0</option>
        <option value="4">4.0</option>
        <option value="5">5.0</option>
    </select></p>
    <p><button id="btnPlay">视频播放</button></p>

    <script>
        var eleSelect = document.getElementById('selRate');
        var eleButton = document.getElementById('btnPlay');
        // 视频元素
        var video = document.getElementById('video');
        // 改变播放速率
        eleSelect.addEventListener('change', function () {
            video.playbackRate = this.value;
        });
        // 点击播放按钮
        eleButton.addEventListener('click', function () {
            video.play();
        });
    </script>