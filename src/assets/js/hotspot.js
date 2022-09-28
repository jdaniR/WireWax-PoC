'use strict';

// Currently shown hotspot.
var idxHotspot = -1;

// Set up our hotspots.
var arrHotspots = JSON.parse(localStorage.getItem('hotspots'));

console.log('inside hotspot js ...');
var storedNames = JSON.parse(localStorage.getItem("hotspots"));
console.log(storedNames);

function init() {

    var video = $('#video')[0];
    var $hotspot = $('.hotspot');
    var $caption = $('.caption');
    var $link = $('#link');

    // Add the mouse events for the hotspot
    $hotspot.on('mouseover', function(e) {
        video.pause();
    });

    // Add the mouse events for the hotspot
    $hotspot.on('mouseup', function(e) {
        var hotspotDiv = $(e.target);
        var hotspotLink = hotspotDiv.children('#page-link').attr("href");
        window.open(hotspotLink);
    });

    $hotspot.on('mouseout', function(e) {
        video.play();
    });

    // Determine when to show a hotspot.
    video.addEventListener('timeupdate', function() {

        // Grab the current video pointer time mark.
        var vidCurrentTime = video.currentTime;

        // Set flag if we need to show a new hotspot.
        var idxNewHotspot = -1;

        // Find if need to show a hostpot. Assumes only one hotspot at a time.
        for (var i = 0; i < arrHotspots.length; i++) {
            if (vidCurrentTime >= arrHotspots[i].startTime && vidCurrentTime < arrHotspots[i].endTime) {
                idxNewHotspot = i;
            }
        }

        // Set up hotspot or remove a currently displayed one.
        if (idxNewHotspot > -1) {
            if (idxNewHotspot != idxHotspot) {

                // Position and size hotspot.
                $hotspot.css({
                    left: (arrHotspots[idxNewHotspot].left + 476) + 'px',
                    top: (arrHotspots[idxNewHotspot].top + 103) + 'px'
                }).show();

                $hotspot.html('<a id="page-link" href="' + arrHotspots[idxNewHotspot].link + '"></a>');

                // Position and size Caption.
                $caption.html(arrHotspots[idxNewHotspot].text);
                $caption.css({
                    left: (arrHotspots[idxNewHotspot].left + 200) + "px",
                    top: (arrHotspots[idxNewHotspot].top - 75) + "px"
                }).show();

                // Set the current hotspot shown.
                idxHotspot = idxNewHotspot;
            }
        } else {
            // Hide the current hotspot
            $hotspot.hide();
            $caption.hide();
        }
    }, false);
}