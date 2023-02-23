#!/usr/bin/env bash

curr_year=$(date +"%Y")

sed -i 's/–[0-9][0-9][0-9][0-9]\./–'"${curr_year}./" COPYRIGHT

sed -i -E '/^\s+const year\s+/ s/\<[0-9][0-9][0-9][0-9]\>/'"${curr_year}/" src/_data/siteinfo.js
