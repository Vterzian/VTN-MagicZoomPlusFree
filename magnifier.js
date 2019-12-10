class ImageMagnifier
{
	constructor() {
		this.zoom = null;
		this.glass = null;
		this.glassSize = null;
	}

	init(img, glassSize, zoom) {
		console.log('init called !');
  		
  		let images = document.querySelectorAll('.' + img);

		this.zoom = zoom;
		this.glassSize = glassSize;
  		
  		console.log(images);

  		for (let i=0;i<images.length;i++) {
  			let img = images[i];
  			console.log(img);
			img.addEventListener('load', () => {
				this.build(img);
			});	
  		}

		
	}

	build(img) {
		console.log('build called !');
		let glass = document.createElement('div');

		glass.style.position = 'absolute';
		glass.style.borderRadius = '100%';
		glass.style.cursor = 'none';
		glass.style.width = this.glassSize + 'px';
		glass.style.height = this.glassSize + 'px';
		glass.style.transform = 'scale(0, 0)';
		glass.style.transformOrigin = 'center';
		glass.style.transition = 'transform 0.15s cubic-bezier(0.175, 0.885, 0.42, 1.5) 0.05s';
		glass.style.boxShadow = '-1px 2px 10px 10px rgba(0, 0, 0, 0.7) inset';

		img.parentElement.insertBefore(glass, img);
		img.parentElement.style.position = 'relative';

		glass.style.backgroundImage = "url('" + img.src + "')";
  		glass.style.backgroundRepeat = "no-repeat";
  		glass.style.backgroundSize = ((img.width + 0) * this.zoom) + "px " + ((img.height + 0) * this.zoom) + "px";

		this.createEvent(img, glass);
	}

	createEvent(img, glass) {
		console.log('createEvent called !');
  		img.addEventListener("mouseover", (e) => { glass.style.transitionTimingFunction = 'cubic-bezier(0.175, 0.885, 0.42, 1.5)'; glass.style.transform = 'scale(1, 1)';} );
  		img.addEventListener("mouseout", (e) => { glass.style.transitionTimingFunction = 'linear'; glass.style.transform = 'scale(0, 0)';} );
  		glass.addEventListener("mouseover", (e) => { glass.style.transitionTimingFunction = 'cubic-bezier(0.175, 0.885, 0.42, 1.5)'; glass.style.transform = 'scale(1, 1)'; } );
  		glass.addEventListener("mouseout", (e) => { glass.style.transitionTimingFunction = 'linear'; glass.style.transform = 'scale(0, 0)';} );

		glass.addEventListener("mousemove", (e) => { return this.moveGlass(e, img, glass)} );
  		img.addEventListener("mousemove", (e) => { return this.moveGlass(e, img, glass)} );
	}

	moveGlass(e, img, glass) {
		console.log('moveGlass');
		console.log(img);
		let pos;
		let x;
		let y;
		let bw = 3;
  		console.log(e);
  		let w = glass.offsetWidth / 2;
  		let h = glass.offsetHeight / 2;

		e.preventDefault();
		pos = this.getCursorPos(e, img);
		x = pos.x;
		y = pos.y;

		if (x > img.width - (w / this.zoom)) {x = img.width - (w / this.zoom);}
	    if (x < w / this.zoom) {x = w / this.zoom;}
	    if (y > img.height - (h / this.zoom)) {y = img.height - (h / this.zoom);}
	    if (y < h / this.zoom) {y = h / this.zoom;}

	    glass.style.left = (x - w) + "px";
    	glass.style.top = (y - h) + "px";

    	glass.style.left = (x - w) + "px";
    	glass.style.top = (y - h) + "px";

    	glass.style.backgroundPosition = "-" + ((x * this.zoom) - w + bw) + "px -" + ((y * this.zoom) - h + bw) + "px";
	}

	getCursorPos(e, img) {
    	let a;
    	let x = 0;
    	let y = 0;

	    e = e || window.event;

	    /*get the x and y positions of the image:*/
	    a = img.getBoundingClientRect();
	    
	    /*calculate the cursor's x and y coordinates, relative to the image:*/
	    x = e.pageX - a.left;
	    y = e.pageY - a.top;
	    
	    /*consider any page scrolling:*/
	    x = x - window.pageXOffset;
	    y = y - window.pageYOffset;
	    
	    return {x : x, y : y};
  	}

}