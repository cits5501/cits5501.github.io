#!/usr/bin/env python3

"""
Expected to have following env vars:

IMAGE_NAME
IMAGE_VERSION
GH_IMAGE_ID
REPO_OWNER

And a bunch of org.opencontainers.image metadata
assignments in a file "oc_labels".

"""

import os
import subprocess
import sys

repo_owner = os.environ["REPO_OWNER"]

image_name = os.environ["IMAGE_NAME"]

version = os.environ["IMAGE_VERSION"]
gh_image_id = os.environ["GH_IMAGE_ID"]

# org.opencontainers.image metadata
oc_labels = {}

with open("oc_labels") as infile:
  for line in infile.readlines():
    k, v = line.strip().split(sep="=", maxsplit=1)
    oc_labels[k] = v

# override version
oc_labels["org.opencontainers.image.version"] = version

# org.label-schema metadata
ls_labels = { "org.label-schema.schema-version":  "1.0",
              "org.label-schema.build-date":      oc_labels["org.opencontainers.image.created"],
              "org.label-schema.name":            f"{repo_owner}/{image_name}",
              "org.label-schema.description":     oc_labels["org.opencontainers.image.description"],
              "org.label-schema.vcs-url":         oc_labels["org.opencontainers.image.url"],
              "org.label-schema.vcs-ref":         oc_labels["org.opencontainers.image.revision"],
              "org.label-schema.version":         version }

def verbose_run(cmd, **kwargs):
  print("running: ", cmd, file=sys.stderr)
  sys.stderr.flush()
  sys.stdout.flush()
  subprocess.run(cmd, **kwargs)

# pull existing images if there
cmd = ["docker", "pull", f"{gh_image_id}:{version}"]
verbose_run(cmd, check=False)

# pull existing images if there
cmd = ["docker", "pull", f"{gh_image_id}:latest"]
verbose_run(cmd, check=False)

# main image
cmd = f"""docker build --pull -f Dockerfile
  --cache-from {gh_image_id}:{version}-builder
  --cache-from {gh_image_id}:{version}
  --cache-from {gh_image_id}:latest
  -t {gh_image_id}:{version}""".split()

# build up --label args
for k in oc_labels:
  val = oc_labels[k]
  cmd += ["--label", f"{k}={val}"]

for k in ls_labels:
  val = ls_labels[k]
  cmd += ["--label", f"{k}={val}"]

cmd += ["."]

verbose_run(cmd, check=True)
