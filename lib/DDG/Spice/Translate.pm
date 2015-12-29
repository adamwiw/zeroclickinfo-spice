package DDG::Spice::Translate;

# ABSTRACT: Translate using Yandex Translate API

use DDG::Spice;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching-api-responses
spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 0; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint - https://duck.co/duckduckhack/spice_attributes#spice-codetocode
spice to => 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20151229T022356Z.84821db488adeeb1.146aec47c8b050d170184c0bb68aee7baf85b1ae&text=$1&lang=$2&callback={{callback}}';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers query_lc => qr/([\s\S]+)in([\s\S]+)/;

1;
