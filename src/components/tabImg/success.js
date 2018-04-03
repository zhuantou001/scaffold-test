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

        // 大三角
        cxt.fillStyle=colorA;
        cxt.beginPath();
        cxt.moveTo(44,58);
        cxt.lineTo(29,94);
        cxt.lineTo(65,80);
        cxt.closePath();
        cxt.fill();

        cxt.beginPath();
        cxt.moveTo(56,57);
        cxt.lineTo(57,36);
        cxt.lineTo(62,38);
        cxt.closePath();
        cxt.fill();

        cxt.beginPath();
        cxt.moveTo(58,62);
        cxt.lineTo(79,38);
        cxt.lineTo(83,42);
        cxt.closePath();
        cxt.fill();

        cxt.beginPath();
        cxt.moveTo(66,69);
        cxt.lineTo(87,58);
        cxt.lineTo(88,64);
        cxt.closePath();
        cxt.fill();

        // this.drawStarsdfs(cxt,3,6,4,2,0,1,colorA,colorA);

        drawStar(cxt,4,8,90,32,50,1,colorA,colorA);
        drawStar(cxt,3,6,94,50,0,1,colorA,colorA);
        drawStar(cxt,3,6,70,28,30,1,colorA,colorA);

        drawStar(cxt,2,4,96,64,0,1,colorA,colorA);
        drawStar(cxt,2,4,55,28,0,1,colorA,colorA);

        drawStar(cxt,1,2,85,72,0,1,colorA,colorA);
        drawStar(cxt,1,2,49,45,0,1,colorA,colorA);

        drawStar(cxt,0.5,1,73,73,0,1,colorA,colorA);

      };

      //  五角星
      const drawStar = (cxt , r , R , x , y , rot , borderWidth , borderStyle , fillStyle) => {
        cxt.beginPath();
        for( var i = 0 ; i < 5 ; i ++){
          cxt.lineTo(Math.cos((18+72*i - rot)/180*Math.PI) * R + x ,- Math.sin((18+72*i - rot )/180*Math.PI) * R + y);
          cxt.lineTo(Math.cos((54+72*i - rot)/180*Math.PI) * r + x ,- Math.sin((54+72*i - rot )/180*Math.PI) * r + y);
        }
        cxt.closePath();

        cxt.lineWidth = borderWidth;
        cxt.strokeStyle = borderStyle;
        cxt.fillStyle = fillStyle;

        cxt.fill();
        cxt.stroke();
      };


      const conText1 = obj.myCanvas.getContext('2d');
      start(conText1, obj.colorA);


    }, 100);
  },

};
import Vue from 'vue';
Vue.prototype.drawStar = function ( cxt , r , R , x , y , rot , borderWidth , borderStyle , fillStyle) {
  cxt.beginPath();
  for( var i = 0 ; i < 5 ; i ++){
    cxt.lineTo(Math.cos((18+72*i - rot)/180*Math.PI) * R + x ,- Math.sin((18+72*i - rot )/180*Math.PI) * R + y);
    cxt.lineTo(Math.cos((54+72*i - rot)/180*Math.PI) * r + x ,- Math.sin((54+72*i - rot )/180*Math.PI) * r + y);
  }
  cxt.closePath();

  cxt.lineWidth = borderWidth;
  cxt.strokeStyle = borderStyle;
  cxt.fillStyle = fillStyle;

  cxt.fill();
  cxt.stroke();
};
