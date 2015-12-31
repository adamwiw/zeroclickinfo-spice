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
            name: 'Translate',
            data: api_result.text,
            meta: {
                sourceName: 'Yandex.Translate',
                sourceUrl: 'http://translate.yandex.com/',
		total: api_result.text,
		itemType: getlang.replace('-', ' to '),
		searchTerm: decodeURIComponent(query)
            },
            normalize: function(item) {
                return {
                    // customize as needed for your chosen template
                    title: api_result.title,
                    subtitle: api_result.subtitle,
                    image: api_result.icon
		    url: 'https://translate.yandex.com/?text=' + api_result.text + '&lang=' + getlang,
		    arrowUrl: DDG.get_asset_path('hacker_news','arrow_up.png')
                };
            },
            templates: {
                group: 'info',
                options: {
                    content: Spice.translate.content,
                    moreText: 
		    {
			href: 'https://translate.yandex.com/?text=' + api_result.text + '&lang=' + getlang',
			text: 'Translate.Yandex'
		    }
                }
            }
        });
    };
}(this));
