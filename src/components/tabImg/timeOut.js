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

        // sim卡
        cxt.fillStyle=colorA;
        cxt.beginPath();
        cxt.lineWidth=1;

        // cxt.moveTo(70,30);
        // cxt.lineTo(44,30);
        // cxt.arcTo(44,30,34,40,6);
        // cxt.lineTo(40,86);
        // cxt.arcTo(40,86,44,90,6);
        // cxt.lineTo(78,90);
        // cxt.lineTo(78,37);

        cxt.moveTo(40,30);
        cxt.lineTo(70,30);
        cxt.lineTo(78,37);
        cxt.lineTo(78,90);
        cxt.lineTo(40,90);
        cxt.closePath();
        cxt.fill();

        cxt.fillStyle="#f0f0f0";
        cxt.beginPath();
        cxt.moveTo(46,55);
        cxt.lineTo(46,86);
        cxt.lineTo(74,86);
        cxt.lineTo(74,55);
        cxt.closePath();
        cxt.fill();

        // 眼睛
        cxt.beginPath();
        cxt.rect(50,39,2,3);
        cxt.closePath();
        cxt.fill();

        cxt.beginPath();
        cxt.rect(66,39,2,3);
        cxt.closePath();
        cxt.fill();

        // 嘴
        cxt.beginPath();
        cxt.arc(49,49,1.8,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();

        cxt.beginPath();
        cxt.arc(69,49,1.8,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();

        cxt.strokeStyle="#f0f0f0";
        cxt.lineWidth=1.5;
        cxt.beginPath();
        cxt.moveTo(49,49);
        cxt.quadraticCurveTo(59,40,69,49);
        cxt.stroke();

        // sim卡里面的线
        cxt.strokeStyle=colorA;
        cxt.lineCap='butt';
        cxt.lineWidth=2;
        cxt.beginPath();
        cxt.moveTo(66,55);
        cxt.lineTo(66,69);
        cxt.arc(59,69,7,0,Math.PI*1,false);
        cxt.lineTo(52,55);
        cxt.stroke();
        cxt.closePath();

        cxt.beginPath();
        cxt.moveTo(45,65);
        cxt.lineTo(51,65);
        cxt.stroke();
        cxt.closePath();


        // 圆
        cxt.beginPath();
        cxt.arc(78,75,21.5,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();

        cxt.fillStyle=colorA;
        cxt.beginPath();
        cxt.arc(78,75,20,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();

        cxt.fillStyle="#f0f0f0";
        cxt.beginPath();
        cxt.arc(78,75,15,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();

        // 表两指针
        cxt.lineCap='round';
        cxt.strokeStyle=colorA;
        cxt.lineWidth=5;
        cxt.beginPath();
        cxt.moveTo(78,65);
        cxt.lineTo(78,75);
        cxt.stroke();
        cxt.closePath();

        cxt.beginPath();
        cxt.moveTo(78.2,75.2);
        cxt.lineTo(83,81);
        cxt.stroke();
        cxt.closePath();

      };

      const conText1 = obj.myCanvas.getContext('2d');
      start(conText1, obj.colorA);

    }, 100);
  }
};
