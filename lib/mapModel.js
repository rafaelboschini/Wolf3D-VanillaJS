var maps = [
	{
		name: "The Hall",
		popup: [{
			title: "Quentin Tarantino Gallery",
			content: "Quentin Tarantino, an iconic filmmaker known for his bold storytelling and unique cinematic style, has carved a niche in the film industry. His movies, characterized by nonlinear narratives, sharp dialogue, and homage to various genres, have left an indelible mark on cinema. From 'Pulp Fiction' to 'Kill Bill' and 'Django Unchained' Tarantino's artistry pushes boundaries, captivating audiences with his signature blend of wit, violence, and storytelling prowess. His distinct directorial voice continues to influence and inspire both filmmakers and movie enthusiasts worldwide.",
			position: [22,8],
		},{
			title: "Welcome to the labyrinth",
			content: "A maze woven by rays. Navigate, seek, discover. Twists, turns, hidden paths await your journey. Embrace the challenge, find your way.",
			position: [20,0]
		},{
			title: "Contact me",
			content: `
				<p>Hey there!</p>
				<p>Feel free to drop me a line at <a href="mailto:rafaelboschini@gmail.com">rafaelboschini@gmail.com</a>. I'm always up for a chat about code, tech, or anything in between!</p>
				<p>Connect with me on <a href="https://www.linkedin.com/in/rafael-boschini-5747311/" target="_blank">LinkedIn</a> too! Let's make the professional world a little more connected and fun.</p>
				<p>Cheers,<br>Rafael Boschini</p>
`,
			position: [0,8]
		}],
		doorgate: [
			{
				name:"get my trophys",
				linkedidx: 1,
				position: [21,1],
				playerpos: {
					x: 4,
					y: 2,
					rotation: -4.71238898038469
				}

			}
		],
		map : [
			[5,3,3,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,8,1,5,5,5,5],
			[3,5,5,5,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,5,5,5],
			[3,5,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,5,5],
			[3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,5],
			[3,3,0,0,0,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14],
			[3,0,0,0,0,5,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
			[5,0,0,0,0,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12],
			[12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
			[11,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,0,13,5,5,5],
			[14,0,0,0,0,5,5,0,0,0,0,0,0,0,5,5,5,15,5,5,5,0,5,5,5,5],
			[5,0,0,0,0,5,10,0,0,0,0,0,0,0,5,6,0,0,0,0,0,0,0,0,7,5],
			[3,0,0,0,0,5,5,0,0,0,0,0,0,0,5,5,0,0,0,0,0,0,0,0,5,5],
			[3,0,0,0,0,0,0,0,0,0,0,0,0,0,5,15,0,0,0,0,0,0,0,0,6,5],
			[3,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,7,5,6,5,7,5,15,5,5],
			[5,3,3,3,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
		]
	},
	{
		name: "The Maze",
		popup: [],
		doorgate: [
			{
				name: "Leave me out of this",
				linkedidx: 0,
				position: [4,1],
				playerpos: {
					x: 21,
					y: 2,
					rotation: -4.8539
				}
			}
		],
		map : [
			[2,2,2,2,1,2,2,5,3,5,5,5,5,5,5,5,5,5,5,11,14,12,14,12,3,5],
			[2,2,2,0,0,0,2,0,0,2,5,11,2,0,2,0,0,2,0,0,0,0,0,0,0,5],
			[4,0,0,0,0,0,2,0,0,2,0,0,0,2,2,0,0,2,0,0,0,0,0,0,0,5],
			[2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,5],
			[4,0,0,0,0,0,2,0,0,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,0,5],
			[2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,5],
			[5,2,2,0,0,0,2,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,5],
			[5,2,2,0,0,0,2,0,0,2,2,2,2,2,2,0,0,2,0,0,2,2,2,2,2,2],
			[4,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,5],
			[5,2,2,0,0,0,2,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,5],
			[5,2,2,0,0,0,2,2,2,2,2,2,0,0,2,0,0,2,2,2,2,2,2,0,0,5],
			[4,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,5],
			[5,5,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,5],
			[5,5,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,2,2,2,2,2,2,0,0,5],
			[5,5,14,5,12,2,2,2,2,2,2,2,2,2,5,5,5,5,5,5,5,5,5,5,5,5]
		]
	}
]