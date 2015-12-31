package DDG::Spice::Translate;

# ABSTRACT: Translate using Yandex Translate API
use DDG::Spice;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching-api-responses
spice is_cached => 1;
spice proxy_cache_valid => "200 1d"; # defaults to this automatically

spice wrap_jsonp_callback => 0; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint - https://duck.co/duckduckhack/spice_attributes#spice-codetocode
spice from => '([^/]+)/([^/]+)';
spice to => 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20151229T022356Z.84821db488adeeb1.146aec47c8b050d170184c0bb68aee7baf85b1ae&text=$1&lang=$2&callback={{callback}}';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers end => qw(af afrikaans ar arabic az azerbaijani ba bashkir be belarusian bg bulgarian bs bosnian ca catalan cs czech cy welsh da danish de german el greek en english es spanish et estonian eu basque fa persian fi finnish fr french ga irish gl galician he hebrew hr croatian ht haitian hu hungarian hy armenian id indonesian is icelandic it italian ja japanese ka georgian kk kazakh ko korean ky kirghiz la latin lt lithuanian lv latvian mg malagasy mk macedonian mn mongolian ms malay mt maltese nl dutch no norwegian pl polish pt portuguese ro romanian ru russian sk slovak sl slovenian sq albanian sr serbian sv swedish sw swahili tg tajik th thai tl tagalog tr turkish tt tatar uk ukrainian uz uzbek vi vietnamese zh chinese);
triggers any => qw (in);

# Handle statement
handle remainder => sub {
    my @r = $_ =~ /([\S\s]+)\s([\w]+)/g;
    my $text = $r[0];
    my $lang = $r[1];
    return $text, $lang;
};

1;
