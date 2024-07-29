#!/usr/bin/env bash

if (($# != 1)); then
  echo >&2 "expected 1 arg - e.g. 'lab01'"
  exit 1
fi

lab="$1"

set -x

BASE_UNIT_DIR=/mnt/dev/dev/06-teaching/cits5501

meld "${BASE_UNIT_DIR}"/cits5501-labs/workshops/"$lab"*/deploy ./assets/workshops/

