
var PinchZoom = (function () {
    var dist1 = 0;
    var CurrentInstance = null;
    return {
        Init: function () {
            $('.pinchzoom').attr("pz-scale", "1");
            $('.pinchzoom').on("touchmove", function (event) {
                if (event.targetTouches.length == 2 && event.changedTouches.length == 2) {
                    // Check if the two target touches are the same ones that started
                    var dist2 = Math.hypot(//get rough estimate of new distance between fingers
                        event.touches[0].pageX - event.touches[1].pageX,
                        event.touches[0].pageY - event.touches[1].pageY);
                    //alert(dist);
                    if (dist1 > dist2) {
                        //if fingers are closer now than when they first touched screen, they are pinching
                        //alert('zoom out' + dist1 + ":" + dist2);
                        //alert(Math.abs(dist1 - dist2));
                        var currscale = CurrentInstance.attr("pz-scale");
                        var scaleVal = Number(currscale) - 0.1
                        if (scaleVal < 1) {
                            scaleVal = 1;
                            CurrentInstance.parent().removeClass("pz-parent")
                        }
                        
                        CurrentInstance.css({
                            "transform": "scale(" + scaleVal + ")",
                            "transform-origin": "top left"
                        });
                        CurrentInstance.attr("pz-scale", scaleVal)
                    }
                    if (dist1 < dist2) {
                        //if fingers are further apart than when they first touched the screen, they are making the zoomin gesture
                        //alert('zoom in');
                        var currscale = CurrentInstance.attr("pz-scale");
                        var scaleVal = Number(currscale) + 0.1
                        if (scaleVal > 2.6) {
                            scaleVal = 2.6
                        }
                        CurrentInstance.parent().addClass("pz-parent")
                        CurrentInstance.css({
                            "transform": "scale(" + scaleVal + ")",
                            "transform-origin": "top left"
                        });
                        CurrentInstance.attr("pz-scale", scaleVal)
                    }
                }
            }).on("touchstart", function (event) {
                if (event.targetTouches.length == 2) {
                    //check if two fingers touched screen
                    dist1 = Math.hypot(
                        event.touches[0].pageX - event.touches[1].pageX,
                        event.touches[0].pageY - event.touches[1].pageY);
                    CurrentInstance = $(this).closest(".pinchzoom");
                    //CurrentInstance.parent().removeClass("pz-parent")
                }
            }).on("touchend", function (event) {
                //now you can decide the scale that the user chose
                //take the track points that are the closest and determine the difference between them and the points that are the farthest away from each other
                //CurrentInstance = null;
                /*
                var scaleVal = CurrentInstance.attr("pz-scale")
                if(Number(scaleVal)<=1){
                    CurrentInstance.parent().removeClass("pz-parent")
                }
                else{
                    CurrentInstance.parent().addClass("pz-parent")
                }*/
            });
        },
        Get_distance: function (e) {
            var diffX = e.touches[0].clientX - e.touches[1].clientX;
            var diffY = e.touches[0].clientY - e.touches[1].clientY;
            return Math.sqrt(diffX * diffX + diffY * diffY); // Pythagorean theorem
        }
    }
})();

PinchZoom.Init();
