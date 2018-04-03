/**
 * Created by xiaojuan on 2018-02-01.
 */
export default {
  delay: function (obj) {
    // console.log(JSON.stringify(obj));
    setTimeout(function () {
      const start = (cxt, colorA, fontA, fontColorA) => {
        cxt.fillStyle=colorA;
        cxt.lineWidth=1;
        cxt.beginPath();
        cxt.moveTo(28,0);
        cxt.lineTo(72,0);
        cxt.lineTo(100,28);
        cxt.lineTo(0,28);
        cxt.closePath();
        // cxt.stroke();
        cxt.fill();

        // cxt.fillStyle = fontColorA;
        // cxt.font="12px Arial";
        // cxt.fillText(fontA,39,65);


        // cxt.fillStyle="#ffffff";
        // cxt.font="14px Arial";
        // cxt.fillText("已选", 35, 20);


      };

      const conText = obj.myCanvas.getContext('2d');
      start(conText, obj.colorA, obj.fontA, obj.fontColorA);

    }, 100);
  }
};
