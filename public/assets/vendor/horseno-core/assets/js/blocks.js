jQuery(function ($) {
    'use strict';

    /**
     *
     * About Widget About Us upload
     *
     */
    $(function () {
        $(".about_me_img_show").css({ "margin": "0 auto", "display": "block", "max-width": "80%" });
        $(document).on('widget-updated', function (horseno, widget) {
            var widget_id = $(widget).attr('id');
            if (widget_id.indexOf('horseno_aboutus_widget') != -1) {
                $imgval = $(".about_me_img_val").val();
                $(".about_me_img_show").attr("src", $imgval);
                $(".about_me_img_show").css({ "margin": "0 auto", "display": "block", "max-width": "80%" });
            }
        });
        $("body").off("click", ".about-me-up-button");
        $("body").on("click", ".about-me-up-button", function (e) {

            let frame = wp.media({
                title: 'Select or Upload Media About Us',
                button: {
                    text: 'Use this About Us'
                },
                multiple: false
            });

            frame.on("select", function () {
                // Get media attachment details from the frame state
                let $img = frame.state().get('selection').first().toJSON();

                $(".about_me_img_show").attr("src", $img.url);
                $(".about_me_img_val").val($img.url);

                $(".about_me_img_val").trigger('change');

                $(".about-me-up-button").text("Change Image");
            });

            // Open Media Modal
            frame.open();
            e.preventDefault();
        });
    });
});