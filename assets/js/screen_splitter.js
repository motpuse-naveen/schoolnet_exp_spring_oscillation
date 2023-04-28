
var split_instance;
var ScreenSplitter = (function () {
    const horizontalHandle = `<div class="h-handle gutter_handle">
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
    <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
            <circle class="cls-100" cx="18" cy="18" r="18"/>
            <polyline class="cls-101" points="13.99 23.37 8.62 18 13.99 12.63"/>
            <polyline class="cls-101" points="22.01 12.63 27.38 18 22.01 23.37"/>
        </g>
    </g>
</svg>
    </div>`;
    const verticalHandle = `<div class="v-handle gutter_handle">
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
    <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
            <circle class="cls-100" cx="18" cy="18" r="18"/>
            <polyline class="cls-101" points="12.63 13.99 18 8.62 23.37 13.99"/>
            <polyline class="cls-101" points="23.37 22.01 18 27.38 12.63 22.01"/>
        </g>
    </g>
</svg>
    </div>`;
    var g_SplitContentSize = [];
    return {
        InitSplitter: function (whenresize) {
            $("#split-main").removeClass("v-split-main").removeClass("h-split-main");
            $("#split-main").removeAttr("style")
            if(whenresize!=undefined && whenresize!=null && whenresize==true){
                if(window.screen.availWidth<730){
                    $("#split-main").addClass("v-split-main");
                    this.VerticalSplit();
                }
                else{
                    $("#split-main").addClass("h-split-main");
                    this.HorizontalSplit();
                }
            }
            else{
                if (window.matchMedia("(orientation: portrait)").matches) {
                    $("#split-main").addClass("v-split-main");
                    this.VerticalSplit();
                }
                else {
                    $("#split-main").addClass("h-split-main");
                    this.HorizontalSplit();
                }
            }
            //NM: Specific to SpringOscillation.
            var sprcontht = $(".spingContainer").height();
            //$(".spingContainer").css({"height":sprcontht + "px"})
            $(".springCanvas").css({"height":sprcontht + "px"})
        },
        HorizontalSplit: function () {
            var minsizes = this.GetMinSizeLimits_Horz();
            $(".gutter").remove();
            $("#split-0").removeAttr("style");
            $("#split-1").removeAttr("style");
            split_instance = Split(['#split-0', '#split-1'], {
                minSize: minsizes,
                sizes: [40, 60],
                gutterSize: 1,
                onDrag: function (sizes) {
                    /* Scale Spring to fit */
                    //ScreenSplitter.ScaleToFit($("#split-0"))
                    /* Scale Graph to fit */
                    ScreenSplitter.ScaleToFit($("#split-1"))
                },
            })
            $(".gutter").append(horizontalHandle)
        },
        VerticalSplit: function () {
            var minsizes = this.GetMinSizeLimits();
            $(".gutter").remove();
            $("#split-0").removeAttr("style");
            $("#split-1").removeAttr("style");
            split_instance = Split(['#split-0', '#split-1'], {
                sizes: [50, 50],
                minSize: minsizes,
                direction: 'vertical',
                gutterSize: 1,
                onDrag: function (sizes) {
                    /* Scale Spring to fit */
                    ScreenSplitter.ScaleToFit($("#split-0"))
                    /* Scale Graph to fit */
                    ScreenSplitter.ScaleToFit($("#split-1"))
                },
            })
            $(".gutter").append(verticalHandle)
        },
        GetMinSizeLimits: function(){
            var minsizes = [200, 200]
            //debugger
            g_SplitContentSize = [
                $("#split-0").height(),
                $("#split-1").height()
            ]
            if (g_SplitContentSize.length == 2) {
                
                var totalHt = $("#split-main").height();
                //var partOfTotal0 = Math.trunc(totalHt / g_SplitContentSize[0]);
                var partOfTotal0 = totalHt / g_SplitContentSize[0];
                if (partOfTotal0 >= 4) {
                    partOfTotal0 = 3.5
                }
                else if(partOfTotal0 >= 3 ){
                    partOfTotal0 = 3;
                }
                else if(partOfTotal0>=2){
                    partOfTotal0 = 3;
                }
                else{
                    partOfTotal0 = 2.5;
                }
                //var partOfTotal1 = Math.trunc(totalHt / g_SplitContentSize[1]);
                var partOfTotal1 = totalHt / g_SplitContentSize[1];
                if (partOfTotal1 >= 4) {
                    partOfTotal1 = 3.5
                }
                else if(partOfTotal1 >= 3){
                    partOfTotal1 = 3.2;
                }
                else if(partOfTotal1>=2){
                    partOfTotal1 = 3.2;
                }
                else{
                    partOfTotal1 = 2.5;
                }
                minsizes = [
                    g_SplitContentSize[0] / 4 * partOfTotal0,
                    g_SplitContentSize[1] / 4 * partOfTotal1,
                ]
            }

            return minsizes;
        },
        GetMinSizeLimits_Horz: function(){
            var minsizes = [200, 300]
            //debugger
            g_SplitContentSize = [
                $("#split-0").width(),
                $("#split-1").width()
            ]
            if (g_SplitContentSize.length == 2) {
                
                var totalWdt = $("#split-main").width();
                //var partOfTotal0 = Math.trunc(totalHt / g_SplitContentSize[0]);
                var partOfTotal0 = totalWdt / g_SplitContentSize[0];
                if (partOfTotal0 >= 4) {
                    partOfTotal0 = 3
                }
                else if(partOfTotal0 >= 3 ){
                    partOfTotal0 = 3;
                }
                else if(partOfTotal0>=2){
                    partOfTotal0 = 3;
                }
                else{
                    partOfTotal0 = 2.5;
                }
                //var partOfTotal1 = Math.trunc(totalHt / g_SplitContentSize[1]);
                var partOfTotal1 = totalWdt / g_SplitContentSize[1];
                if (partOfTotal1 >= 4) {
                    partOfTotal1 = 3.5
                }
                else if(partOfTotal1 >= 3){
                    partOfTotal1 = 3.2;
                }
                else if(partOfTotal1>=2){
                    partOfTotal1 = 3;
                }
                else{
                    partOfTotal1 = 2.5;
                }
                minsizes = [
                    g_SplitContentSize[0] / 4 * partOfTotal0,
                    g_SplitContentSize[1] / 4 * partOfTotal1,
                ]
            }

            return minsizes;
        },
        
        ScaleToFit: function ($wrapper,$element, deltaWidth, deltaHeight) {
            if($element==null || $element == undefined){
                $element = $wrapper.find(".content-container")
            }
            if(deltaWidth==null || deltaWidth == undefined){
                deltaWidth = 0;
            }
            if(deltaHeight==null || deltaHeight == undefined){
                deltaHeight = 0;
            }
            /*
            var elmSize = {
                width: $element.get(0).scrollWidth + deltaWidth,
                height: $element.get(0).scrollHeight + deltaHeight
            }*/
            var elmSize = {
                width: $element.outerWidth() + deltaWidth,
                height: $element.outerHeight() + deltaHeight
            }
            var scale;
            var wrapperSize = {
                width: $wrapper.width(),
                height: $wrapper.height()
            }
            scale = Math.min(
                wrapperSize.width/elmSize.width,
                wrapperSize.height/elmSize.height
            );
            $element.css({
                transform: "scale(" + scale + ")"
            });
            /*if (scale < 1) {
                $element.css({
                    transform: "scale(" + scale + ")"
                });
            }
            else{
                scale = 1;
                $element.css({
                    "transform": "scale(" + scale + ")"
                });
            }*/
            $element.addClass("split-scaled").attr("scale",scale);
        },
        ResetSplit: function(){
            $(".split-scaled").removeAttr("scale").removeAttr("style").removeClass("split-scaled");
            this.InitSplitter();
            ScreenSplitter.ScaleToFit($("#split-1"))
        }
    }
})();