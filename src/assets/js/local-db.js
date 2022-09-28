//
// Main js
//


'use strict';
(function() {

    $(initData);

    function initData() {

        var initButton = $("#previewVideo");

        initButton.on("click", function(e) {
            e.preventDefault();
            initializeHotspotData();
        });

        function initializeHotspotData() {

            var arrHotspots = [
                { "startTime": 1, "endTime": 4, "top": 300, "left": 100, "text": "BBC UK", "link": "https://www.bbc.co.uk" },
                { "startTime": 7, "endTime": 8, "top": 500, "left": 230, "text": "Bloomberg", "link": "https://www.bloomberg.com" },
                { "startTime": 10, "endTime": 15, "top": 200, "left": 500, "text": "The Guardian", "link": "https://www.theguardian.com" },
                { "startTime": 18, "endTime": 20, "top": 100, "left": 550, "text": "Sky News", "link": "https://news.sky.com" },
                { "startTime": 28, "endTime": 30, "top": 100, "left": 600, "text": "Daily Mail News", "link": "https://www.dailymail.com" },
                { "startTime": 57, "endTime": 60, "top": 150, "left": 380, "text": "Metro News", "link": "https://www.metro.co.uk" }
            ];

            localStorage.setItem("hotspots", JSON.stringify(arrHotspots));

        }
    }

})();