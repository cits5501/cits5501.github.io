#!/usr/bin/env bash

set -euo pipefail
set -x

tmpdir=$(mktemp --directory --quiet)

git clone --single-branch --branch built git@github.com:cits5501/cits5501-materials.git $tmpdir

mkdir -p assets/lectures assets/workshops assets/assignments

cp -a $tmpdir/lectures/*pdf assets/lectures/
cp -a $tmpdir/lectures-markdown/*md assets/lectures/
cp -a $tmpdir/workshops/*.{pdf,md,zip} assets/workshops/
cp -a $tmpdir/assignments/*.{pdf,md} assets/assignments/

rm -rf $tmpdir

