
.PHONY: serve shell docker-build

NAME=arranstewart/gh-jekyll
TAG=0.1

docker-build:
	docker build -f Dockerfile -t $(NAME):$(TAG) .

shell:
	docker -D run --rm -it --net=host  \
		$(MEMORY) $(CPU)  $(MOUNT) \
		-v $$PWD:/opt/work \
		$(NAME):$(TAG) sh

serve:
	docker -D run --rm -it --net=host  \
		$(MEMORY) $(CPU)  $(MOUNT) \
		-v $$PWD:/opt/work \
		$(NAME):$(TAG) builder exec jekyll serve

