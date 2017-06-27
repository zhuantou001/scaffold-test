/**
 * Created by xiaobobo on 2017-06-14.
 */
export default {
  delay: function (obj) {
    // alert(JSON.stringify(obj));
    setTimeout(function () {
      const start = (conText, colorA, colorB) => {
        conText.clearRect(0, 0, 66, 44);
        // 最外层五边形
        conText.beginPath();
        conText.moveTo(12, 0);// 起始位置
        conText.lineTo(66, 0);
        conText.lineTo(66, 42);
        conText.lineTo(0, 42);
        conText.lineTo(0, 12);
        conText.closePath();
        conText.fillStyle = colorA;
        conText.fill();

        // 内层正方形
        conText.beginPath();
        conText.moveTo(24, 5);// 起始位置
        conText.lineTo(61, 5);
        conText.lineTo(61, 37);
        conText.lineTo(24, 37);
        conText.closePath();
        conText.fillStyle = colorB;
        conText.fill();

        // 竖线1
        conText.beginPath();
        conText.moveTo(40, 5);
        conText.lineTo(40, 16);
        conText.lineWidth = 2;
        conText.strokeStyle = colorA;
        conText.stroke();

        // 竖线2
        conText.beginPath();
        conText.moveTo(40, 30);
        conText.lineTo(40, 37);
        conText.lineWidth = 2;
        conText.strokeStyle = colorA;
        conText.stroke();

        // 左横线1
        conText.beginPath();
        conText.moveTo(24, 16);
        conText.lineTo(40, 16);
        conText.lineWidth = 2;
        conText.strokeStyle = colorA;
        conText.stroke();

        // 左横线2
        conText.beginPath();
        conText.moveTo(24, 30);
        conText.lineTo(40, 30);
        conText.lineWidth = 2;
        conText.strokeStyle = colorA;
        conText.stroke();

        // 右横线1
        conText.beginPath();
        conText.moveTo(40, 12);
        conText.lineTo(61, 12);
        conText.lineWidth = 2;
        conText.strokeStyle = colorA;
        conText.stroke();

        // 右横线2
        conText.beginPath();
        conText.moveTo(47, 23);
        conText.lineTo(61, 23);
        conText.lineWidth = 2;
        conText.strokeStyle = colorA;
        conText.stroke();

        // 半圆
        conText.beginPath();
        conText.arc(40, 23, 7, -0.5 * Math.PI, 0.5 * Math.PI);
        conText.lineWidth = 2;
        conText.strokeStyle = colorA;
        conText.stroke();
      };

      const conText = obj.myCanvas.getContext('2d');
      start(conText, obj.simColLA, obj.simColLB);

      // /* tabs 01 */
      // const myCanvas01 = document.getElementById('myCanvas01');
      // const conText01 = myCanvas01.getContext('2d');
      // start(conText01, obj.simColLA, obj.simColLB);
      //
      // /* tabs 01 */
      // const myCanvas02 = document.getElementById('myCanvas02');
      // const conText02 = myCanvas02.getContext('2d');
      // start(conText02, obj.simColLA, obj.simColLB);
      //
      // /* tabs 01 */
      // const myCanvas03 = document.getElementById('myCanvas03');
      // const conText03 = myCanvas03.getContext('2d');
      // start(conText03, obj.simColLA, obj.simColLB);
    }, 100);
  }
};
