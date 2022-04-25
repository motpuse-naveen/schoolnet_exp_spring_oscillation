var image_x = 0, image_y = 0;
var zoom = 1;
var finger_dist = 0;

function get_distance(e) {
    var diffX = e.touches[0].clientX - e.touches[1].clientX;
    var diffY = e.touches[0].clientY - e.touches[1].clientY;
    return Math.sqrt(diffX * diffX + diffY * diffY); // Pythagorean theorem
}

document.addEventListener('touchstart', function (e) {
    if (e.touches.length > 1) { // if multiple touches (pinch zooming)
        finger_dist = get_distance(e); // Save current finger distance
    } // Else just moving around
    mouse_x = e.touches[0].clientX; // Save finger position
    mouse_y = e.touches[0].clientY; //
}, false);

document.addEventListener('touchmove', function (e) {
    e.preventDefault(); // Stop the window from moving
    if (e.touches.length > 1) { // If pinch-zooming
        var new_finger_dist = get_distance(e); // Get current distance between fingers
        zoom = zoom * Math.abs(finger_dist / new_finger_dist); // Zoom is proportional to change
        finger_dist = new_finger_dist; // Save current distance for next time
    } else { // Else just moving around
        image_x = image_x + (zoom * (mouse_x - e.touches[0].clientX)); // Move the image
        image_y = image_y + (zoom * (mouse_y - e.touches[0].clientY)); //
        mouse_x = e.touches[0].clientX; // Save finger position for next time
        mouse_y = e.touches[0].clientY; //
    }
    //update_canvas(); // draw the new position
}, false);

document.addEventListener('touchend', function (e) {
    mouse_x = e.touches[0].clientX; mouse_y = e.touches[0].clientY; // could be down to 1 finger, back to moving image
}, false);