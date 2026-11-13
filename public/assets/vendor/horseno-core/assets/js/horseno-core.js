/*

[Main Script]

Project: Horseno
Version: 1.0
Author : vecurosoft.com

*/
; (function ($) {
    "use strict";

    jQuery(window).on('elementor/frontend/init', function () {
        // console.log( elementorFrontend);
        if (typeof elementor != "undefined" && typeof elementor.settings.page != "undefined") {

            elementor.settings.page.addChangeCallback('horseno_header_style', function (newValue) {
                if (newValue == 'prebuilt') {
                    elementor.saver.update({
                        onSuccess: function () {
                            elementor.reloadPreview();
                            elementor.once('preview:loaded', function () {
                                elementor.getPanelView().setPage('page_settings').activateTab('settings');
                            });
                        }
                    });
                }
            });


            elementor.settings.page.addChangeCallback('horseno_header_builder_option', function (newValue) {
                elementor.saver.update({
                    onSuccess: function () {
                        elementor.reloadPreview();
                        elementor.once('preview:loaded', function () {
                            elementor.getPanelView().setPage('page_settings').activateTab('settings');
                        });
                    }
                });
            });

            elementor.settings.page.addChangeCallback('horseno_footer_style', horsenoFooterStyle);
            function horsenoFooterStyle(newValue) {
                elementor.saver.update({
                    onSuccess: function () {
                        elementor.reloadPreview();
                        elementor.once('preview:loaded', function () {
                            elementor.getPanelView().setPage('page_settings').activateTab('settings');
                        });
                    }
                });
            }
            elementor.settings.page.addChangeCallback('horseno_footer_choice', horsenoFooterChoice);
            function horsenoFooterChoice(newValue) {
                elementor.saver.update({
                    onSuccess: function () {
                        elementor.reloadPreview();
                        elementor.once('preview:loaded', function () {
                            elementor.getPanelView().setPage('page_settings').activateTab('settings');
                        });
                    }
                });
            }

        }
    });

})(jQuery);