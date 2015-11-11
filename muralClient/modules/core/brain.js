function Brain() {
	
	var self = this;
	var fiboManager;


	self.init = function() {
		self.createFiboManager();
	}

	self.createFiboManager = function() {
		fiboManager = new FiboManager(self);
	}

	self.init();
}





function FiboManager(brain) {

	var self = this;
	var fiboTilingA;
	var fiboTilingB;
	var fiboTilings = [];
	var NUM_FIBO_TILINGS = 10;
	var aperturePosition;
	var apertureDimensions;
	var timelineLite;

	self.init = function() {
		self.createFiboTilings();
		self.createTimeline();

		//self.createFiboTilingssss();

		self.initTimeSlider();
	}

	self.createFiboTilings = function() {
		// Create the first tiling
		// It will be of window height
		var firstFiboTiling = new FiboTiling(brain);
		fiboTilings.push(firstFiboTiling);

		// Figure out the location and size
		// of the empty spot in the first tiling
		aperturePosition = firstFiboTiling.getAperturePosition();
		apertureDimensions = firstFiboTiling.getApertureDimensions();

		// Now create the rest of the tilings
		// and shrink them down to the first tiling aperture
		for (var i=1; i<NUM_FIBO_TILINGS; i++) {
			var fiboTiling = new FiboTiling(brain);
			fiboTilings.push(fiboTiling);
			var newScale = apertureDimensions["width"] / fiboTiling.getRenderedWidth();
			var display = "none";
			// Only show the second tiling for now
			if (i==1) {
				display = "block";
			}
			TweenLite.to(fiboTiling.getDiv(), 0, {
				scaleX:newScale, 
				scaleY:newScale,
				x:aperturePosition["x"],
				y:aperturePosition["y"],
				display: display
			});
		}
	}

	self.createTimeline = function() {
		timelineLite = new TimelineLite();

		for (var i=1; i<fiboTilings.length; i++) {
			var bigFiboTiling = fiboTilings[i-1];
			var smallFiboTiling = fiboTilings[i];
			
			// Make sure the small tiling is visible
			timelineLite.to(smallFiboTiling.getDiv(), 0, {display:"block"});

			var transitionDuration = 5;

			// Scale up and move the big tiling
			var bigFiboTilingNewX = -aperturePosition["x"];
			var bigFiboTilingNewY = -aperturePosition["y"];
			var bigFiboTilingNewScale = 1 / smallFiboTiling.getScale();
			var transformOriginString = aperturePosition["x"].toString() + "px " + aperturePosition["y"].toString() + "px ";
			timelineLite.to(bigFiboTiling.getDiv(), transitionDuration, {
				x:bigFiboTilingNewX,
				y:bigFiboTilingNewY,
				scaleX:bigFiboTilingNewScale,
				scaleY:bigFiboTilingNewScale,
				transformOrigin:transformOriginString,
				ease:Power0.easeNone
			});

			// Scale up and move the small tiling
			var smallFiboTilingNewX = 0;
			var smallFiboTilingNewY = 0;
			var smallFiboTilingNewScale = 1;
			
			//timelineLite.to(smallFiboTiling.getDiv(), 0, {display:"block"});
			timelineLite.to(smallFiboTiling.getDiv(), transitionDuration, {
				x:smallFiboTilingNewX,
				y:smallFiboTilingNewY,
				scaleX:smallFiboTilingNewScale,
				scaleY:smallFiboTilingNewScale,
				ease:Power0.easeNone
			}, "-=" + transitionDuration.toString());

			// Hide the big tiling since it's offscreen
			timelineLite.to(bigFiboTiling.getDiv(), 0, {display:"none"});
		}


		timelineLite.pause();

	}





	self.createFiboTilingssss = function() {
		fiboTilingA = new FiboTiling(brain);
		fiboTilingB = new FiboTiling(brain);
		fiboTilingC = new FiboTiling(brain);

		var apertureAPosition = fiboTilingA.getAperturePosition();
		var apertureADimensions = fiboTilingA.getApertureDimensions();
		var newScale = apertureADimensions["width"] / fiboTilingB.getRenderedWidth();
		TweenLite.to(fiboTilingB.getDiv(), 0, {
			scaleX:newScale, 
			scaleY:newScale,
			x:apertureAPosition["x"],
			y:apertureAPosition["y"]
		});

		var apertureAPosition = fiboTilingA.getAperturePosition();
		var apertureADimensions = fiboTilingA.getApertureDimensions();
		var newScale = apertureADimensions["width"] / fiboTilingC.getRenderedWidth();
		TweenLite.to(fiboTilingC.getDiv(), 0, {
			scaleX:newScale, 
			scaleY:newScale,
			x:apertureAPosition["x"],
			y:apertureAPosition["y"],
			//display:"none"
		});

		setTimeout(self.foo, 3000);
	}

	self.foo = function() {
		var apertureAPosition = fiboTilingA.getAperturePosition();
		var apertureADimensions = fiboTilingA.getApertureDimensions();
		var newScale = apertureADimensions["width"] / fiboTilingB.getRenderedWidth();


		var xDelta = -fiboTilingB.getX();
		var yDelta = -fiboTilingB.getY();
		var scaleDelta = 1 - fiboTilingB.getScale();

		//x * fiboTilingB.getScale() = 1;
		

		timelineLite = new TimelineLite();

		// a
		var xNewA = fiboTilingA.getX() + xDelta;
		var yNewA = fiboTilingA.getY() + yDelta;
		var scaleNewA = 1 / fiboTilingB.getScale();
		var transformOriginString = apertureAPosition["x"].toString() + "px " + apertureAPosition["y"].toString() + "px ";
		timelineLite.to(fiboTilingA.getDiv(), 5, {
			x:xNewA,
			y:yNewA,
			scaleX:scaleNewA,
			scaleY:scaleNewA,
			ease:Power0.easeNone,
			//ease:Quint.easeOut,
			transformOrigin:transformOriginString
		});

		// b
		var xNewB = 0;
		var yNewB = 0;
		var scaleNewB = 1;
		timelineLite.to(fiboTilingB.getDiv(), 5, {
			x:xNewB,
			y:yNewB,
			scaleX:scaleNewB,
			scaleY:scaleNewB,
			ease:Power0.easeNone
			//ease:Quint.easeOut,
		}, "-=5");



		timelineLite.to(fiboTilingA.getDiv(), 0, {"display":"none"});



		timelineLite.to(fiboTilingC.getDiv(), 0, {"display":"block"});



		// b
		var xNewA = fiboTilingA.getX() + xDelta;
		var yNewA = fiboTilingA.getY() + yDelta;
		var scaleNewA = 1 / fiboTilingB.getScale();
		var transformOriginString = apertureAPosition["x"].toString() + "px " + apertureAPosition["y"].toString() + "px ";
		timelineLite.to(fiboTilingB.getDiv(), 5, {
			x:xNewA,
			y:yNewA,
			scaleX:scaleNewA,
			scaleY:scaleNewA,
			ease:Power0.easeNone,
			//ease:Quint.easeOut,
			transformOrigin:transformOriginString
		});

		// c
		var xNewB = 0;
		var yNewB = 0;
		var scaleNewB = 1;
		timelineLite.to(fiboTilingC.getDiv(), 5, {
			x:xNewB,
			y:yNewB,
			scaleX:scaleNewB,
			scaleY:scaleNewB,
			ease:Power0.easeNone
			//ease:Quint.easeOut,
		}, "-=5");

		timelineLite.to(fiboTilingB.getDiv(), 0, {"display":"none"});

		timelineLite.pause();
	}

	self.initTimeSlider = function() {
		timeSlider = document.querySelector("#timeSlider");
		timeSlider.width = window.innerWidth;
		timeSlider.addEventListener("input", self.onTimeSliderInput);
	}



	self.onTimeSliderInput = function(event) {
		var timeSliderValue = timeSlider.value;
		var timeSliderMin = timeSlider.getAttribute("min");
		var timeSliderMax = timeSlider.getAttribute("max");
		var timeSliderNormalizedValue = (timeSliderValue - timeSliderMin) / (timeSliderMax - timeSliderMin);
		timelineLite.progress(timeSliderNormalizedValue).pause();
	}





	self.init();
}







function FiboTiling(brain) {

	var self = this;
	var tiles = [];
	var div;

	self.init = function() {
		tilesContainer = document.querySelector("#tilesContainer");
		self.createTiling();
	}

	self.createTiling = function() {
		var sideLengths = [987, 610, 377, 233, 144, 89, 55, 34];
		var tileLocation = "top";
		var x;
		var y;
		var previousTile = null;
		div = document.createElement("div");
		div.style.position = "absolute";

		for (var i=0; i<sideLengths.length; i++) {

			var sideLength = sideLengths[i];

			if (i==0) {
				x = 0;
				y = 0;
			}
			else {
				previousTile = tiles[i-1];
			}
		
			switch (tileLocation) {
				case "top":
					//console.log("top");
					if (previousTile != null) {
						x = previousTile.getX();
						y = previousTile.getY() - sideLength;
					}
					tileLocation = "right";
					break;
				case "right":
					//console.log("right");
					x = previousTile.getX() + previousTile.getSideLength();
					y = previousTile.getY();
					tileLocation = "bottom";
					break;
				case "bottom":
					//console.log("bottom");
					x = previousTile.getX() + previousTile.getSideLength() - sideLength;
					y = previousTile.getY() + previousTile.getSideLength();
					tileLocation = "left";
					break;
				case "left":
					//console.log("left");
					x = previousTile.getX() - sideLength;
					y = previousTile.getY() + previousTile.getSideLength() - sideLength;
					tileLocation = "top";
					break;
			}

			var tile = new Tile(brain, self, sideLength, x, y);
			//console.log(i, tileLocation, x, y, previousTile);
			tiles.push(tile);
			div.appendChild(tile.getDiv());

		}

		tilesContainer.appendChild(div);

		TweenLite.to(div, 0, {x:0, y:0});
	}


	self.getDiv = function() { return div; }
	self.getRenderedWidth = function() {
		var tile0Width = tiles[0].getRenderedWidth();
		var tile1Width = tiles[1].getRenderedWidth();
		var renderedWidth = tile0Width + tile1Width;
		return renderedWidth;
	}
	self.getRenderedHeight = function() {
		var tile0Height = tiles[0].getRenderedHeight();
		var renderedHeight = tile0Height;
		return renderedHeight;
	}
	self.getX = function() {
		return self.getDiv()._gsTransform.x;
	}
	self.getY = function() {
		return self.getDiv()._gsTransform.y;
	}
	self.getScale = function() {
		return self.getDiv()._gsTransform.scaleX;
	}
	self.getAperturePosition = function() {
		var sixthTile = tiles[5];
		var x = sixthTile.getX();
		var y = sixthTile.getY() + sixthTile.getRenderedHeight();
		var position = {"x":x, "y":y};
		return position;
	}
	self.getApertureDimensions = function() {
		var fifthTile = tiles[4];
		var sixthTile = tiles[5];
		var seventhTile = tiles[6];
		var eigthTile = tiles[7];
		var width = seventhTile.getX() - fifthTile.getX() - fifthTile.getRenderedWidth();
		var height = eigthTile.getY() - sixthTile.getY() - sixthTile.getRenderedHeight();
		var dimensions = {"width":width, "height":height};
		return dimensions;
	}


	self.init();
}




function Tile(brain, parentTiling, sideLength, x, y) {

	var self = this;
	var div;

	self.init = function() {
		self.createDiv();
	}

	self.createDiv = function() {
		div = document.createElement("div");
		//div.innerText = sideLength.toString();
		div.style.width = sideLength.toString() + "px";
		div.style.height = sideLength.toString() + "px";
		div.style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		div.style.position = "absolute";
		TweenLite.to(div, 0, {x:x, y:y});

		return;

		var img = document.createElement("img");
		img.style.width = "100%";
		img.style.height = "100%";
		var randInt = parseInt(Math.random()*9);
		var imageUrl = "images/busCat.jpg";
		img.setAttribute("src", imageUrl);
		TweenLite.to(img, 0, {rotation:parseInt(Math.random()*10)*90});
		div.appendChild(img);
		
	}




	self.getSideLength = function() { return sideLength; }
	self.getX = function() { return self.getDiv()._gsTransform.x; }
	self.getY = function() { return self.getDiv()._gsTransform.y; }
	self.getDiv = function() {return div; }
	self.getRenderedWidth = function() {
		var parentTilingScale = parentTiling.getDiv()._gsTransform.scaleX;
		var renderedWidth = self.getSideLength() * parentTilingScale;
		return renderedWidth;
	}
	self.getRenderedHeight = function() {
		var parentTilingScale = parentTiling.getDiv()._gsTransform.scaleX;
		var renderedHeight = self.getSideLength() * parentTilingScale;
		return renderedHeight;
	}




	self.init();
}

























/*
function FiboManager(brain) {

	var self = this;
	var tiles = [];
	var initialTileSideLength = 1;
	var tileLocation = "bottom";

	self.init = function() {
		self.initTilesContainer();
		self.createTiling();

		//TweenLite.to("#tilesContainer", .6, {scaleX:2, scaleY:2, ease:Quint.easeOut});
	}

	self.initTilesContainer = function() {
		var windowWidth = window.innerWidth;
		var windowHeight = window.innerHeight;

		TweenLite.set("#tilesContainer", {css: {
				width:windowWidth,
				height:windowHeight,
				//transformPerspective:10, 
				perspective:500, 
				//transformStyle:"preserve-3d"
			}
		});

		Draggable.create("#tilesContainer", {type:"x,y", edgeResistance:0.65});
	}

	self.createTiling = function() {
		var numTiles = 20;
		var xOffset = window.innerWidth/2;
		var yOffset = window.innerHeight/2;

		for (var i=0; i<numTiles; i++) {
			
			console.log(i);
			
			var sideLength;
			var x;
			var y;
			
			if (i==0) {
				sideLength = initialTileSideLength;
				x = xOffset
				y = yOffset;
			}
			else if (i==1) {
				sideLength = initialTileSideLength;
				x = initialTileSideLength + tiles[0].getX();
				y = tiles[0].getY();
			}
			else {	
				var previousTile = tiles[i-1];
				var secondPreviousTile = tiles[i-2];
				sideLength = secondPreviousTile.getSideLength() + previousTile.getSideLength();

				switch (tileLocation) {
					case "right":
						x = previousTile.getX() + previousTile.getSideLength();
						y = secondPreviousTile.getY();
						break;
					case "top":
						x = secondPreviousTile.getX();
						y = previousTile.getY() - sideLength;
						break;
					case "left":
						x = previousTile.getX() - sideLength;
						y = previousTile.getY();
						break;
					case "bottom":
						x = previousTile.getX();
						y = previousTile.getY() + previousTile.getSideLength();
						break;
				}
			}


			console.log(tileLocation, sideLength, x, y);

			var tile = new Tile(self, sideLength, x, y);
			
			tiles.push(tile);

			switch (tileLocation) {
				case "right":
				tileLocation = "top";
			    break;
			  	case "top":
			  	tileLocation = "left";
			    break;
			    case "left":
			    tileLocation = "bottom";
			    break;
			    case "bottom":
			    tileLocation = "right";
			    break;
			}

		}


	}



	self.init();
}
*/



