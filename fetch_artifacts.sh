#!/usr/bin/env bash

set -euo pipefail
set -x

tmpdir=$(mktemp --directory --quiet)

git clone --single-branch --branch built git@github.com:cits5501/cits5501-materials.git $tmpdir

cp -a $tmpdir/lectures/*pdf assets/lectures/
cp -a $tmpdir/lectures-markdown/*md assets/lectures/
cp -a $tmpdir/workshops/*.{pdf,md,zip} assets/workshops/

rm -rf $tmpdir

