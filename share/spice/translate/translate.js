(function (env) {
    "use strict";

    env.ddg_spice_translate = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || api_result.text.length === 0) {
            return Spice.failed('translate');
        }

        // Render the response
        Spice.add({
            // Customize these properties
	    id:   'translate',
            name: 'Translate',
            data: {
	        text: api_result.text
	    },
            meta: {
                sourceName: 'Yandex.Translate',
                sourceUrl: 'http://translate.yandex.com/',
		sourceIconUrl: 'https://translate.yandex.net/main/v2.64.1451491320/i/favicon.ico'
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.translate.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
