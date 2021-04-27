
.PHONY: serve shell docker-build

NAME=arranstewart/gh-jekyll
TAG=0.1

docker-build:
	docker build -f Dockerfile -t $(NAME):$(TAG) .

shell:
	docker -D run --rm -it --net=host  \
		-v $$PWD:/opt/work \
		--workdir /opt/work \
		$(NAME):$(TAG) sh

serve:
	sudo rm -rf Gemfile.lock
	docker -D run --rm -it --net=host  \
		-v $$PWD:/opt/work \
		--workdir /opt/work \
		$(NAME):$(TAG) bundle exec jekyll serve --config ./docs/_config.yml -s ./docs/

