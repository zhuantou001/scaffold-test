/**
 * Created by xiaojuan on 2017-12-13.
 */
export default {
  delay: function (obj) {
    // console.log(JSON.stringify(obj));
    setTimeout(function () {
      const start = (cxt, colorA) => {
        // 背景圆
        cxt.fillStyle="#f0f0f0";
        cxt.beginPath();
        cxt.arc(60,60,60,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();

        // 蜗牛壳
        cxt.fillStyle=colorA;
        cxt.beginPath();
        cxt.arc(70,60,20,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();

        cxt.fillStyle="#f0f0f0";
        cxt.beginPath();
        cxt.arc(70,52,9,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();

        cxt.fillStyle=colorA;
        cxt.beginPath();
        cxt.arc(70,52,5,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();

        // 蜗牛身子
        cxt.fillStyle=colorA;
        cxt.beginPath();
        cxt.arc(60,58,34,1.1*Math.PI,0.2*Math.PI, true);
        cxt.arc(70,59,24,0.2*Math.PI,1.1*Math.PI, false);
        // cxt.arc(37.5,50,9.5,0.1*Math.PI,1*Math.PI,true);
        cxt.quadraticCurveTo(50,40,40,40);
        cxt.quadraticCurveTo(34,38,27.5,48);
        cxt.closePath();
        // cxt.arc(37.5,50,9.5,0.4*Math.PI,1*Math.PI,true);
        //按照指定的路径绘制弧线
        cxt.fill();
        // cxt.stroke();

        // 蜗牛第一个角
        cxt.fillStyle=colorA;
        cxt.beginPath();
        cxt.arc(40,34.5,3,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();

        cxt.beginPath();
        cxt.strokeStyle=colorA;
        cxt.lineWidth=2;
        cxt.moveTo(40,35);
        cxt.lineTo(40,42);
        cxt.stroke();

        // 蜗牛第二个角
        cxt.fillStyle=colorA;
        cxt.beginPath();
        cxt.arc(51,39,3,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();

        cxt.beginPath();
        cxt.strokeStyle=colorA;
        cxt.lineWidth=2;
        cxt.moveTo(50,40);
        cxt.lineTo(44,46);
        cxt.stroke();

      };

      const conText1 = obj.myCanvas.getContext('2d');
      start(conText1, obj.colorA);

    }, 100);
  }
};
