# Maze Generator & Solver
## About
This is my 3rd project of the school year.

I've made a maze generator & solver using canvas in HTML5.

The maze is Sonic themed, where you can play & solve the maze as a Sonic the Hedgehog.

## Playable game
The maze is playable by clicking on a button "play" the game will start.

Objective of the game is to move the character to the ending position which is a flag.

Once you reach the end a message will appear, congratulating the player that he has won the game.

It offers a smooth movement, where you can hold down the WASD or arrow keys and run through the maze.

The character contains 14 pictures of all the directions he faces.

This way it truly looks like the character is running around the maze.


## Maze Generator
The maze is always randomly generated using the Depth First Search Algorithm.

By clicking on a button "generate" a brand new maze will be generated.

You can also set the grid size by choosing one of the four options in the menu "Grid Size".

The default size is 15 columns times 15 rows. (15x15)

This way you can control the difficulty of the maze, because the more cells it has, harder it is to find the correct path.

The starting and ending positions will be randomly placed at the corners of the maze.

The picture below shows the randomly generated maze:

![image](https://github.com/user-attachments/assets/5174f469-f8d1-4dd0-bcae-48f48ca7559b)


## Maze Solver
If the maze is too hard to solve, no need to panic we got you covered!

By clicking on a "solve" button the maze will be solved.

The solution path will be drawn pixel by pixel from starting to ending position.

The maze features a character that moves along with the solution path.

When the maze is solved the path can be wiped by clicking on a "clear" button,

and the character will be set to the starting position.

If the animation takes too long, its speed can be controlled by clicking on a button "speed".

It features 4 different speed types from "slow" to "instant".

Option "slow" will draw 1 pixel per frame meanwhile "instant" will draw the whole path skipping the drawing animation.

For an example, the picture below shows the solution path being drawn along the character's moving animation:

![image](https://github.com/user-attachments/assets/cc57b619-f439-434b-bc5f-92b9a1719c6c)

