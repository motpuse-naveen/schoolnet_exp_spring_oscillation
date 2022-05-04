
function hammerIt(el, p_maxScale) {
	var translateInitX = 0,
	translateInitY = 0,
	centerInitX = 0,
	centerInitY = 0,
	scaleInit = 1,

	tick = false,
	transform = {},
	gesture,
	minScale,
	maxScale = 1;

// Set up hammer.js
gesture = new Hammer.Manager(el);
gesture.add( new Hammer.Pan({ threshold: 0, pointers: 0 }) );
gesture.add( new Hammer.Pinch({ threshold: 0 }) ).recognizeWith( [gesture.get('pan')] );
gesture.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );

// Register hammer.js events
gesture.on( 'panstart panmove', onPan );
gesture.on( 'pinchstart pinchmove', onPinch );

// Set default values
transform.translateX = translateInitX;
transform.translateY = translateInitY;
transform.scale = scaleInit;

// "Throttle" touchmove/pointermove event with requestAnimationFrame
function requestElUpdate() {
	if ( !tick ) {
		requestAnimationFrame( updateEl );
		tick = true;
	}
}

function updateEl() {
	var value;

	value = 'translate3d(' + transform.translateX + 'px, ' + transform.translateY + 'px, 0)';
	value += 'scale(' + transform.scale + ', ' + transform.scale + ')';

	el.style[ Hammer.prefixed( document.body.style, 'transform' ) ] = value;
	tick = false;
}

function onPan( ev ) {
	if ( ev.type === 'panstart' ) {
		translateInitX = transform.translateX;
		translateInitY = transform.translateY;
	}

	transform.translateX = translateInitX + ev.deltaX;
	transform.translateY = translateInitY + ev.deltaY;

	requestElUpdate();
}

function onPinch( ev ) {
	if ( ev.type == 'pinchstart' ) {
		translateInitX = transform.translateX;
		translateInitY = transform.translateY;
		centerInitX = ev.center.x;
		centerInitY = ev.center.y;
		scaleInit = transform.scale;
	}

	var scale, crtX, crtY, finalX, finalY, deltaX, deltaY;

	scale = scaleInit * ev.scale;

	// Find current x and y pos on nested div
	crtX = centerInitX - translateInitX;
	crtY = centerInitY - translateInitY;

	// Find final x and y position on nested div (after scaling)
	finalX = crtX * ( scale / scaleInit );
	finalY = crtY * ( scale / scaleInit );

	// Calculate new translate values
	deltaX = Math.round( crtX - finalX );
	deltaY = Math.round( crtY - finalY );

	// Add deltaXY values for simultaneous panning and pinching
	transform.translateX = translateInitX + ev.deltaX + deltaX;
	transform.translateY = translateInitY + ev.deltaY + deltaY;
    transform.scale = scale;

    requestElUpdate();
}
}
