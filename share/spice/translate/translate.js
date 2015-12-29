(function (env) {
    "use strict";
    env.ddg_spice_ = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || api_result.text.length === 0) {
            return Spice.failed('Yandex Translate API failed');
        }

        // Render the response
        Spice.add({
            id: "translate",

            // Customize these properties
            name: "Translate",
            data: api_result.text,
            meta: {
                sourceName: "Yandex.Translate",
                sourceUrl: 'https://translate.yandex.com/?text=' + api_result.text + '&lang=' + api_result.lang,
		total: api_result.text,
		itemType: api_result.lang.replace('-', ' to '),
		searchTerm: decodeURIComponent(query)
            },
            normalize: function(item) {
                return {
                    // customize as needed for your chosen template
                    title: api_result.title,
                    subtitle: api_result.subtitle,
                    image: api_result.icon
		    url: 'https://translate.yandex.com/?text=' + api_result.text + '&lang=' + api_result.lang,
		    arrowUrl: DDG.get_asset_path('hacker_news','arrow_up.png')
                };
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.translate.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
