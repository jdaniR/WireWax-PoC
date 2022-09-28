//
// Main js
//
'use strict';
(function() {

    // Menu toggle for admin dashboard

    if ($("#nav-toggle").length) {
        $("#nav-toggle").on("click", function(e) {
            e.preventDefault();
            $("#db-wrapper").toggleClass("toggled");
        });

    }

    //  slimscroll for sidebar nav

    if ($(".nav-scroller").length) {
        $(".nav-scroller").slimScroll({
            height: "97%",
        });
    }

    // Notification dropdown scroll List

    if ($('.notification-list-scroll').length) {
        $(".notification-list-scroll").slimScroll({
            height: 300,
        });
    }

    // Scrollspy

    if ($('[data-bs-spy="scroll"]').length) {
        var dataSpyList = [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]'))
        dataSpyList.forEach(function(dataSpyEl) {
            bootstrap.ScrollSpy.getInstance(dataSpyEl)
                .refresh()
        })

    }

    $("#caption").hide();
    $("#hotspot").hide();

    // Dragabale components

    var linkHTML = '<a id="close-button" class="link-comp-edit" href="javascript:void(0);"> Link Me! <i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>';
    var buttonHTML = '<button class="draggable-btn">Click Me! <a class="button-comp-edit" href="javascript:void(0);"> <i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></button>';
    var hotspotHTML = '<div> <button id="hotspot-comp-form-button" class="caption">Hotspot <a class="hotspot-comp-edit" href="javascript:void(0);"> <i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></button>' +
        '<div class="hotspot" style="left: 114px;top: 76px;">' +
        '<a id="page-link-1"></a>' +
        '</div> </div>';

    var diagram = [];
    var canvas = $(".canvas");
    var tools = $(".tools");
    $(".tool").draggable({
        helper: "clone"
    });

    canvas.droppable({
        drop: function(event, ui) {
            var node = {
                _id: (new Date).getTime(),
                position: ui.helper.position(),
                markup: ""
            };
            node.position.left -= canvas.position().left;
            if (ui.helper.hasClass("tool-1")) {
                node.type = "TOOL-1";
                node.markup = linkHTML;
            } else if (ui.helper.hasClass("tool-2")) {
                node.type = "TOOL-2";
                node.markup = buttonHTML;
            } else if (ui.helper.hasClass("tool-3")) {
                node.type = "TOOL-3";
                node.markup = hotspotHTML;
            } else {
                return;
            }
            diagram.push(node);
            renderDiagram(diagram);
        }
    });

    function renderDiagram(diagram) {
        canvas.empty();
        for (var d in diagram) {
            var node = diagram[d];
            var dom = $(node.markup).css({
                "position": "absolute",
                "top": node.position.top,
                "left": node.position.left
            }).draggable({
                stop: function(event, ui) {
                    console.log(ui);
                    var id = ui.helper.attr("id");
                    for (var i in diagram) {
                        if (diagram[i]._id == id) {
                            diagram[i].position.top = ui.position.top;
                            diagram[i].position.left = ui.position.left;
                        }
                    }
                }
            }).attr("id", node._id);
            canvas.append(dom);
        }
    }

    //Start: Generate Forms  //
    $(document).on("click", "a.link-comp-edit", function() {
        console.log('Link comp edit button clicked ...');
        $("#link-comp-form").toggle();
    });

    $(document).on("click", "a.button-comp-edit", function() {
        console.log('Button comp edit button clicked ...');
        $("#button-comp-form").toggle();
    });

    $(document).on("click", "a.hotspot-comp-edit", function() {
        console.log('Hotspot comp edit button clicked ...');
        $("#hotspot-comp-form").toggle();
    });
    //End: Generate Forms  //
    // Quick & dirty toggle to demonstrate modal toggle behavior
    $('.copy-code').on('click', function(e) {
        e.preventDefault();
        console.log($("#videoContainer").html())

        var htmlToText = $("#videoContainer").html().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        $('.msg-modal-content').html(htmlToText);
        $('.msg-modal').toggleClass('is-visible');
    });

    $('.msg-modal-toggle').on('click', function(e) {
        e.preventDefault();
        $('.msg-modal').toggleClass('is-visible');
    });

})();