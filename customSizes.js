window.snake.boardSize = function(settings = {}) {
  if(settings.small === undefined)
    settings.small = 96;
  if(settings.large === undefined)
    settings.large = 512;

  const scriptElements = document.getElementsByTagName('script');
  const url = scriptElements[scriptElements.length - 1].src; // Source code belongs to the bottom script tag

  // xhr to get source code
  const req = new XMLHttpRequest();

  req.open("GET", url);
  req.onload = function() {
    eval(this.responseText.match(/s_[a-zA-Z0-9]{1,8}\.prototype\.[a-zA-Z0-9]{1,8}=function\(\){var a=this,[^]*?};/)[0].replace('512', settings.large).replace('96', settings.small));
  }
  req.send();
}
