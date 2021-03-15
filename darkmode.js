window.snake.scheme = function(settings = {}) {
  if(settings.scoreBar === undefined)
    settings.scoreBar = '#4A752C';
  if(settings.border === undefined)
    settings.border = '578A34#';
  if(settings.walls === undefined)
    settings.walls = settings.border;  
  if(settings.shadows === undefined)
    settings.shadows = '#94BD46';
  if(settings.lightSquares === undefined)
    settings.lightSquares = '#A2D149';
  if(settings.darkSquares === undefined)
    settings.darkSquares = '#AAD751';
  
  document.body.bgColor = settings.background || settings.scoreBar;
  document.body.getElementsByClassName('sEOCsb')[0].style.backgroundColor = settings.scoreBar;


  const regexes = [
    new RegExp(`[$a-zA-Z0-9_]{0,6}=function\\(a\\){[^}]*globalCompositeOperation="destination-atop"[^}]*fillStyle="${settings.shadows}";[^}]*}`),
    new RegExp(`[$a-zA-Z0-9_]{0,6}\.prototype\.[$a-zA-Z0-9_]{0,6}=function\\(a\\){if\\(this\\.[$a-zA-Z0-9_]{0,6}&&!this\\.[$a-zA-Z0-9_]{0,6}\\){if\\([$a-zA-Z0-9_]{0,6}\\(this,8\\)[^]*?${settings.lightSquares.replace(/#/g, '')}[^]*?\\(\\),a\\)\\)}}`),
    /[$a-zA-Z0-9_]{0,6}\.prototype\.[$a-zA-Z0-9_]{0,6}=function\(\){var a=this,b=[$a-zA-Z0-9_]{0,6}\(\);[^]*?;return [$a-zA-Z0-9_]{0,6}\.promise}/,
  ];

  const scriptElements = document.getElementsByTagName('script');
  let url;
  if(/.*google.*fbx\?fbx=snake_arcade/.test(window.location.href)) {//If on fbx website
    url = scriptElements[scriptElements.length - 1].src; // Source code belongs to the bottom script tag
  } else if(/.*google.*/.test(window.location.href)) {//If on google search
	url = scriptElements[scriptElements.length - 4].src; // Source code belongs to fourth from bottom script tag
  } else{
	 alert("Wrong Website!");
  }
  
  // xhr to get source code
  const req = new XMLHttpRequest();
  
  req.open("GET", url);
  req.onload = function() {
    processSnakeCode(this.responseText);
  };
  req.send();

  function processSnakeCode(snakeCode) {
    const darkModeCode = snakeCode.replace(/#578A34/, settings.border)        // border - only replace first occurrence
                                  .replace(/#578A34/g, settings.walls)        // walls
                                  .replace(/#94BD46/g, settings.shadows)      // shadows
                                  .replace(/#A2D149/g, settings.lightSquares) // light squares
                                  .replace(/#AAD751/g, settings.darkSquares); // dark squares
                                  
    regexes.forEach(r => (/*console.log(darkModeCode.match(r)),*/darkModeCode.match(r) != null ? eval(darkModeCode.match(r)[0]) : 0));
  }
};

window.snake.dark = function() {
  return window.snake.scheme({
    scoreBar: '#262428',
    border: '#2E2933',
    walls: '#101010',
    shadows: '#302C35',
    lightSquares: '#47404F',
    darkSquares: '#423C49',
  });
};