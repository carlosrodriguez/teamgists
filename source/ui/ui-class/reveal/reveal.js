

// ## reveal.Js
// File name:   reveal.js
// Description: ui-reveal task
// Version:     1.0


var ADT = ADT || {};

ADT.reveal = (function (my, $) {

    var el, 
    window,
    initPos;

    // ### ADT.reveal.init()
    // Initializes the module setting the el variable to the passed element
    // and fires populateMenus() & bindHover()
    my.init = function (element) {
        el = element;

        renderElements();
    };

    renderElements = function () {
        var i = 1,
            element,
            elementContent;

        $.each(el, function() {
            if ($(this).hasClass('youtube')) {
                var parameters = getParameterByName($(this).attr('href'));

                var iFrameUrl = "http://www.youtube.com/embed/";
                iFrameUrl = iFrameUrl + parameters.v;

                try {
                    if(parameters.list){
                        iFrameUrl = iFrameUrl + "?list=" + parameters.list;
                    }
                }catch(e){}

                elementContent = $('<iframe allowfullscreen />')
                                    .attr('src', iFrameUrl)
                                    .attr('frameborder', 0)
                                    .attr('height', 316)
                                    .attr('width', 560);

                wrapVideo = $('<div />').addClass('flex-video');

                wrapVideo.prepend(elementContent);
            }

            var elementID = 'modal-' + i;
            i++;

            element = $('<div />').addClass('reveal-modal')
                            .attr('id', elementID)
                            .addClass('large')
                            .append(wrapVideo)
                            .append('<a class="close-reveal-modal">&#215;</a>');

            $('body').prepend(element);
            $(this).attr('data-reveal-id', elementID);

            $('#'+elementID).on('open.fndtn.reveal', '.reveal-modal', function() {
                console.log('open');
            });
        });
    };

    getParameterByName = function (url) {
        var vars = {};
        var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    };


    return my;

}(ADT.reveal || {}, jQuery));

jQuery(document).ready(function ($) {
    var el = $('.ui-reveal');
    if (el.length > 0) {
        ADT.reveal.init(el);
    }
});
