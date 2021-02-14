FROM ruby:2.6.6-alpine3.13@sha256:1c944ecde7a4f6e1d91c85862efe891ff866cce3354fb880f5ee017c5e5a08e8

RUN \
    apk add --no-cache  \
      bzip2-dev           \
      ca-certificates     \
      coreutils           \
      gcc                 \
      glib-dev            \
      libc-dev            \
      make                \
      openssl-dev         \
      tar                 \
      xz                  \
      yaml-dev            \
      zlib-dev

RUN \
    apk add --no-cache  \
      bison \
      libffi-dev \
      g++

RUN \
  mkdir /opt/build

WORKDIR /opt/build

COPY Gemfile .

RUN \
  bundle install


