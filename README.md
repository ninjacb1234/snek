hi there hello it's me fishes, the guy who accidentally got himself into making dark mode (man i just made a layout how did we get here)

anyway first huge shoutout to llama, yk the guy who made the 38 second classic tas,
who did basically everything smart in this project
man invented dark mode

i just did some compacting which may or may not decrease efficiency 
and made some customization
oh well and i made my hud, which i like

so yeah
llama

anyway here's how to use it

window.snake.dark(); // this makes it dark mode, no arguments

window.snake.scheme({
  scoreBar:     '#rrggbb', // hex code for score bar, defaults to the default color if omitted
  background:   '#rrggbb', // hex code for background, defaults to score bar color if omitted
  walls:        '#rrggbb', // hex code for border and wall mode walls, defaults to default color
  shadows:      '#rrggbb', // hex code for snake and fruit shadows, defaults to default
  lightSquares: '#rrggbb', // hex code for the light board squares, defaults to default
  darkSquares:  '#rrggbb', // hex code for the dark board squares, defaults to default
}); // if not given any arguments, it will be the default scheme (with the page background the same color as the score bar)

window.snake.fishesHUD({
  background:             '#rrggbb', // hex code for background of input display (recommended to use the same color as scheme background)
  showInputDisplay:       boolean,   // true/false, whether to show the input display
  arrows:                 boolean,   // true/false, true to show arrows in the input display, false for wasd
  darkModeGang:           boolean,   // true/false, whether to show the dark mode emblem
  burgerGang:             boolean,   // true/false, whether to show the burger mode emblem
  showLilSebastianImages: boolean,   // true/false, whether to show the images of lil sebastian (idk why this exists lol)
}); // if not given any arguments, it will be my favorite layout (for dark mode)
