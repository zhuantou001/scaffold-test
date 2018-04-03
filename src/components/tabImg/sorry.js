/**
 * Created by xiaojuan on 2017-12-13.
 */
export default {
  delay: function (obj) {
    setTimeout(function () {
      const start = (cxt, colorA) => {
        // 背景圆
        cxt.fillStyle="#f0f0f0";
        cxt.beginPath();
        cxt.arc(60,60,60,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();
        // 方框
        cxt.fillStyle=colorA;
        cxt.beginPath();
        cxt.fillRect(35,45,50,40);
        cxt.closePath();
        cxt.fill();

        // 左半圆
        cxt.fillStyle=colorA;
        cxt.beginPath();
        cxt.arc(35,65,20,Math.PI*1.5,Math.PI*0.5, true);
        cxt.closePath();
        cxt.fill();

        // 右半圆
        cxt.fillStyle=colorA;
        cxt.beginPath();
        cxt.arc(85,65,20,Math.PI*0.5,Math.PI*1.5, true);
        cxt.closePath();
        cxt.fill();

        // 中间竖线
        cxt.beginPath();
        cxt.strokeStyle=colorA;
        cxt.lineCap="round";
        cxt.lineWidth=6;
        cxt.moveTo(60,42);
        cxt.lineTo(60,120);
        cxt.stroke();
        cxt.closePath();

        cxt.fillStyle="#ffffff";
        cxt.font="14px Arial";
        cxt.fillText("对不起",39,65);

        cxt.font="12px Arial";
        cxt.fillText("Sorry",45,79);

        // 两个小三角
        cxt.fillStyle=colorA;
        cxt.beginPath();
        cxt.lineWidth=1;
        cxt.moveTo(83,36);
        cxt.lineTo(86,24);
        cxt.lineTo(91,26);
        cxt.closePath();
        cxt.fill();
        // cxt.strokeStyle=colorA;
        // cxt.stroke();

        cxt.beginPath();
        cxt.moveTo(82,40);
        cxt.lineTo(90,31);
        cxt.lineTo(93,35);
        cxt.closePath();
        cxt.fill();
        // cxt.strokeStyle=colorA;
        // cxt.stroke();

      };

      const conText1 = obj.myCanvas.getContext('2d');
      start(conText1, obj.colorA);

    }, 100);
  }
};
