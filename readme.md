# 🎮 Wolf3D Engine JS

Welcome to the Wolf3D Engine JS, a example of JavaScript-based Raycasting Algorithm! 🕹️

## Project Overview

I got hooked on this project because I was totally into games like Wolfenstein and Doom when I was a kid.
Those 3D worlds they had always fascinated me. So, during a break from work, I found this book called [GAME ENGINE BLACK BOOK: WOLFENSTEIN 3D](https://fabiensanglard.net/gebbwolf3d) And once I started reading, I couldn't stop. I ended up spending hours figuring out how to make similar stuff using JavaScript.

This whole thing became my ticket to understanding a tiny part of the huge revolution that guys like [John Carmack](https://pt.wikipedia.org/wiki/John_Carmack) and [John Romero](https://pt.wikipedia.org/wiki/John_Romero) kicked off back in the early '90s.

## Features

- Simulates a 3D environment in a 2D canvas
- Player movement and collision detection
- Map rendering using raycasting
- Multiple maps with doors and gates for level progression
- Engaging visual representation of a classic game style

## How to Run

1. Clone this repository.
2. Open the `index.html` file in your favorite web browser.
3. Enjoy

## Maps and Map Creation

The project's maps are structured using a vector-based representation of a 3D space, employing a 2D array layout to construct the game world. These maps are composed of various elements, including walls, empty spaces for movement, and doors/gates for inter-map traversal.

### Doors and Gates

Doors and gates serve as pivotal elements for navigating between different maps within the game. They are implemented through specific configurations within the map data structure:

Each `doorgate` object encapsulates the properties of a door or gate:

- **Name**: A descriptive identifier for the door/gate, providing context or purpose.
- **linkedidx**: Index reference pointing to the map this door/gate connects to within the `maps` array.
- **position**: Represents the coordinates within the map grid where the door/gate is located.
- **playerpos**: Specifies the player's new position upon entering through the door/gate (includes x, y, and rotation).

These elements are strategically placed within the map array, enabling players to transition seamlessly between different areas of the game world.

### Map Creation Process

The map creation process involves structuring the game environment using a 2D array.
Here's a snippet outlining this process:

```javascript
var maps = [
	{
		name: "The Hall",
		doorgate: [
			{
				name: "get my trophies",
				linkedidx: 1,
				position: [21, 22],
				playerpos: {
					x: 5.16,
					y: 2.17,
					rotation: -4.71238898038469
				}
			}
			// ...other door/gate configurations
		],
		map: [
			[5, 5, 5, 5, 5, ...], // Wall representation
			// ...other rows defining walls and open spaces
		]
	},
	// ...other maps
];
```

These configurations define the layout of the game world. The map array contains values representing different elements:

- 0 signifies an open space allowing movement.
- Numbers 1-13 represent various wall types and structures.
- Other numerical values might denote specific features or elements within the game world.

This approach facilitates the creation of intricate environments with distinct regions connected via doors and gates, enhancing the player's exploration and interaction within the game. 🚪🗝️

### Controls

- Use the arrow keys to move forward, backward, and turn left or right.
- Interact with doors/gates by moving towards them.

### Contributing

Contributions are welcome! If you'd like to contribute, feel free to open a pull request.

### Credits

Built by Rafael Boschini ([@rafaelboschini](https://www.linkedin.com/in/rafael-boschini-5747311/))

Inspiration and techniques from [GAME ENGINE BLACK BOOK: WOLFENSTEIN 3D](https://fabiensanglard.net/gebbwolf3d) and the [article 3D Games with canvas and raycasting](https://dev.opera.com/articles/3d-games-with-canvas-and-raycasting-part-1/)

Feel free to explore the code, experiment with the maps, and contribute to make this project even more amazing! 🚀
