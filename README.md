# Dark Mode for Google Snake

This project has JavaScript code that when pasted directly to "console" in the browser, adds functions to Google Snake Game.           
Must use this link for the game: https://www.google.com/fbx?fbx=snake_arcade      
Support on Chrome and Opera. Other browser may or may not work, please use the supported browsers.      

## Add Dark Mode
```
window.snake.dark();
```

## Give custom colors to board - may be used for light mode
```
window.snake.scheme({
  scoreBar:     '#rrggbb', // hex code for score bar, defaults to the default color if omitted
  background:   '#rrggbb', // hex code for background, defaults to score bar color if omitted
  walls:        '#rrggbb', // hex code for border and wall mode walls, defaults to default color
  shadows:      '#rrggbb', // hex code for snake and fruit shadows, defaults to default
  lightSquares: '#rrggbb', // hex code for the light board squares, defaults to default
  darkSquares:  '#rrggbb', // hex code for the dark board squares, defaults to default
}); // if not given any arguments, it will be the default scheme (with the page background the same color as the score bar)
```

## Enable FishesHUD
```
window.snake.fishesHUD({
  background:             '#rrggbb', // hex code for background of input display (recommended to use the same color as scheme background)
  showInputDisplay:       boolean,   // true/false, whether to show the input display
  arrows:                 boolean,   // true/false, true to show arrows in the input display, false for wasd
  darkModeGang:           boolean,   // true/false, whether to show the dark mode emblem
  burgerGang:             boolean,   // true/false, whether to show the burger mode emblem
  showLilSebastianImages: boolean,   // true/false, whether to show the images of lil sebastian (idk why this exists lol)
}); // if not given any arguments, it will be my favorite layout (for dark mode)
```

### Collaborators
* Llama
* Fishes
* Yarmiplay (Only this readme though and a bit of organizing <3)
