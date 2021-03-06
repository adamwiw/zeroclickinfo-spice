#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Translate)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'hello how are you in fr' => test_spice(
        '/js/spice//query',
        call_type => 'include',
        caller => 'DDG::Spice::Translate'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'hotels in paris' => undef,
);

done_testing;

