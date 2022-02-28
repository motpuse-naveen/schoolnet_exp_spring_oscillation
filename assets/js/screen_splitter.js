
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

    return {
        InitSplitter: function () {
            if (window.matchMedia("(orientation: portrait)").matches) {
                this.VerticalSplit();
            }
            else {
                this.HorizontalSplit();
            }
        },
        HorizontalSplit: function () {
            $(".gutter").remove();
            Split(['#split-0', '#split-1'], {
                minSize: 200,
                sizes: [50, 50],
                gutterSize: 1,
                onDrag: function (sizes) {

                },
            })
            $(".gutter").append(horizontalHandle)
        },
        VerticalSplit: function () {
            $(".gutter").remove();
            split_instance = Split(['#split-0', '#split-1'], {
                sizes: [50, 50],
                direction: 'vertical',
                gutterSize: 1,
                onDrag: function (sizes) {

                },
            })
            $(".gutter").append(verticalHandle)
        }
    }
})();