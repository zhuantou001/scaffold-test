export var resizeMe = function (img, maxW, maxH, nocheck) {
  var canvas = document.createElement('canvas');
  var width = img.width;
  var height = img.height;
  var max_width = maxW || 640;
  var max_height = maxH || 640;
  var max_size = 300;//k
  if (width > max_width) {
    height *= max_width / width;
    height = Math.round(height);
    width = max_width;
  }
  if (height > max_height) {
    width *= max_height / height;
    width = Math.round(width);
    height = max_height;
  }

  //将图片放入canvas，并重置canvas大小
  var ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);

  var res, quality = 1, resSize, ratio = 1;
  res = canvas.toDataURL("image/jpeg", quality); // 截取canvas对应的jpg图片，并且画质为70%（默认就是70%，可以改变）

  // Android 2.x、Android 4.1.2、4.3 的 toDataURL 不支持jpeg格式；
  if (res.substr(0, "data:image/png".length) == "data:image/png" || res.substr(0, 6) == "data:,") {
    var encoder = new JPEGEncoder();
    res = encoder.encode(canvas.getContext("2d").getImageData(0, 0, width, height), quality * 100, true);
  }
  resSize = Math.ceil(res.length / 1024); //k
  if (resSize > max_size && !nocheck) {
    ratio = Math.ceil(Math.sqrt(max_size / resSize) * 100) / 100;
    if (ratio >= .9) {
      ratio -= .1;
    }
    res = resizeMe(img, max_width * ratio, max_height * ratio, true);
  }
  return res;
}
