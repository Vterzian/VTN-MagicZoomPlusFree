class ImageMagnifier
{
	constructor() {
		this.img = null;
		this.zoom = null;
		this.glass = null;
		this.glassSize = null;
	}

	init(img, glassSize, zoom) {
		console.log('init called !');
		this.img = document.getElementById(img);
		this.zoom = zoom;
		this.glassSize = glassSize;
		this.img.addEventListener('load', () => {
			this.build();
		});
	}

	build() {
		console.log('build called !');
		this.glass = document.createElement('div');

		this.glass.style.position = 'absolute';
		this.glass.style.borderRadius = '100%';
		this.glass.style.cursor = 'none';
		this.glass.style.width = this.glassSize + 'px';
		this.glass.style.height = this.glassSize + 'px';
		this.glass.style.transform = 'scale(0, 0)';
		this.glass.style.transformOrigin = 'center';
		this.glass.style.transition = 'transform 0.15s cubic-bezier(0.175, 0.885, 0.42, 1.5) 0.05s';
		this.glass.style.boxShadow = '-1px 2px 10px 10px rgba(0, 0, 0, 0.7) inset';

		this.img.parentElement.insertBefore(this.glass, this.img);
		this.img.parentElement.style.position = 'relative';

		this.glass.style.backgroundImage = "url('" + this.img.src + "')";
  		this.glass.style.backgroundRepeat = "no-repeat";
  		console.log(this.img.width);
  		this.glass.style.backgroundSize = ((this.img.width + 0) * this.zoom) + "px " + ((this.img.height + 0) * this.zoom) + "px";

  		console.log(this.glass.style.backgroundSize);

		this.createEvent();
	}

	createEvent() {
		console.log('createEvent called !');
  		this.img.addEventListener("mouseover", (e) => { this.glass.style.transitionTimingFunction = 'cubic-bezier(0.175, 0.885, 0.42, 1.5)'; this.glass.style.transform = 'scale(1, 1)';} );
  		this.img.addEventListener("mouseout", (e) => { this.glass.style.transitionTimingFunction = 'linear'; this.glass.style.transform = 'scale(0, 0)';} );
  		this.glass.addEventListener("mouseover", (e) => { this.glass.style.transitionTimingFunction = 'cubic-bezier(0.175, 0.885, 0.42, 1.5)'; this.glass.style.transform = 'scale(1, 1)'; } );
  		this.glass.addEventListener("mouseout", (e) => { this.glass.style.transitionTimingFunction = 'linear'; this.glass.style.transform = 'scale(0, 0)';} );

		this.glass.addEventListener("mousemove", (e) => {this.moveGlass(e)} );
  		this.img.addEventListener("mousemove", (e) => {this.moveGlass(e)} );
	}

	moveGlass(e) {
		console.log('moveGlass');
		let pos;
		let x;
		let y;
		let bw = 3;
  		console.log(e);
  		let w = this.glass.offsetWidth / 2;
  		let h = this.glass.offsetHeight / 2;

		e.preventDefault();
		pos = this.getCursorPos(e);
		x = pos.x;
		y = pos.y;

		if (x > this.img.width - (w / this.zoom)) {x = this.img.width - (w / this.zoom);}
	    if (x < w / this.zoom) {x = w / this.zoom;}
	    if (y > this.img.height - (h / this.zoom)) {y = this.img.height - (h / this.zoom);}
	    if (y < h / this.zoom) {y = h / this.zoom;}

	    this.glass.style.left = (x - w) + "px";
    	this.glass.style.top = (y - h) + "px";

    	this.glass.style.left = (x - w) + "px";
    	this.glass.style.top = (y - h) + "px";

    	this.glass.style.backgroundPosition = "-" + ((x * this.zoom) - w + bw) + "px -" + ((y * this.zoom) - h + bw) + "px";
	}

	getCursorPos(e) {
    	let a;
    	let x = 0;
    	let y = 0;

	    e = e || window.event;

	    /*get the x and y positions of the image:*/
	    a = this.img.getBoundingClientRect();
	    
	    /*calculate the cursor's x and y coordinates, relative to the image:*/
	    x = e.pageX - a.left;
	    y = e.pageY - a.top;
	    
	    /*consider any page scrolling:*/
	    x = x - window.pageXOffset;
	    y = y - window.pageYOffset;
	    
	    return {x : x, y : y};
  	}

}