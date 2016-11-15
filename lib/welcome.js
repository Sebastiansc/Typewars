/* eslint no-undef: "off", max-len: "off" */

const Welcome = (play) => {
  const image = new Image();
  image.src = "./assets/images/temp_background.jpg";
  // Add the rest of elements after adding the image
  image.onload = function() {
    const bitmap = new createjs.Bitmap(image);
    bitmap.x = 0;
    bitmap.y = 0;
    bitmap.name = 'background';
    stage.addChild(bitmap);
    addWelcome();
    stage.update();
  };

  const addWelcome = () => {
    const text = new createjs.Text("Welcome to Typewars", "bold 36px Arial", "#fff");
    text.x = width / 2 - 180;
    text.y = 150;

    const background = new createjs.Shape();
    background.name = "background";
    background.graphics.beginFill("#2c9cc9").drawRoundRect(0, 0, 150, 60, 10);

    const label = new createjs.Text("play", "bold 24px Arial", "#fff");
    label.name = "label";
    label.textAlign = "center";
    label.textBaseline = "middle";
    label.x = 150/2;
    label.y = 60/2;

    const button = new createjs.Container();
    button.x = width / 2 - 90;
    button.y = 250;
    button.name = 'button';
    button.addChild(background, label);
    button.on('click', () => play());

    stage.addChild(button, text);
  };
};

export default Welcome;
