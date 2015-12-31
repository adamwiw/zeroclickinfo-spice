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
triggers any => qw (in);

# Handle statement
handle remainder => sub {
    my @lang = qw(af Afrikaans ar Arabic az Azerbaijani ba Bashkir be Belarusian bg Bulgarian bs Bosnian ca Catalan cs Czech cy Welsh da Danish de German el Greek en English es Spanish et Estonian eu Basque fa Persian fi Finnish fr French ga Irish gl Galician he Hebrew hr Croatian ht Haitian hu Hungarian hy Armenian id Indonesian is Icelandic it Italian ja Japanese ka Georgian kk Kazakh ko Korean ky Kirghiz la Latin lt Lithuanian lv Latvian mg Malagasy mk Macedonian mn Mongolian ms Malay mt Maltese nl Dutch no Norwegian pl Polish pt Portuguese ro Romanian ru Russian sk Slovak sl Slovenian sq Albanian sr Serbian sv Swedish sw Swahili tg Tajik th Thai tl Tagalog tr Turkish tt Tatar uk Ukrainian uz Uzbek vi Vietnamese zh Chinese);

    my @r = $_ =~ /(\w+\s\S+\d\D+)\s\D(\w+)/ig;
    my $size = @r;
    return if grep {$_ eq @r[$size]} @lang;
};

1;
