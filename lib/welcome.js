/* eslint no-undef: "off", max-len: "off" */

const Welcome = (play, message) => {
  const image = new Image();
  image.src = "./assets/images/temp_background.jpg";
  // Add the rest of elements after adding the image
  image.onload = function() {
    const bitmap = new createjs.Bitmap(image);
    bitmap.x = 0;
    bitmap.y = 0;
    bitmap.name = 'background';
    stage.addChild(bitmap);
    stage.update();
  };
};

export default Welcome;
