
.PHONY: docker-build docker-shell print-build-args \
        default build \
        print-docker-hub-image kill \
				clean

SHELL=bash

# docker

IMAGE_NAME=cits5501-website

IMAGE_VERSION=0.1.1

print-image-name:
	@echo $(IMAGE_NAME)

print-image-version:
	@echo $(IMAGE_VERSION)

# eleventy

IMG=$(IMAGE_NAME):$(IMAGE_VERSION)
PACKAGE_DIR=/opt/site
ELEVENTY_JS_FILE=/src/.eleventy.js
IN_DIR = $$PWD/src
ASSETS_DIR = $$PWD/assets
OUT_DIR = $$PWD/out
# uncomment this to debug eleventy:
#DEBUG_FLAGS=DEBUG='*'
# change this to 'development' to use that environment
# for the build
ENVIRO_FLAGS=ELEVENTY_ENV=production
#ENVIRO_FLAGS=ELEVENTY_ENV=development
CTR_NAME=eleventy


DOCKER = docker -D

docker_args = \
	    -v $(IN_DIR):/src \
	    -v $(ASSETS_DIR):/assets \
	    -v $(OUT_DIR):/out \
	    $(MOUNT_PACKAGE) \
	    --name $(CTR_NAME) \
	    --workdir $(PACKAGE_DIR) \
	    --entrypoint sh

docker-build:
	docker build --progress=plain -f Dockerfile \
	  --cache-from cits5501-website:latest \
	  --cache-from $(IMAGE_NAME):latest \
	  --cache-from $(IMG) \
	  -t $(IMG) -t $(IMAGE_NAME):latest .

# real kill target
kill_:
	-$(DOCKER) stop -t 1 $(CTR_NAME) 2>/dev/null
	-$(DOCKER) rm $(CTR_NAME) 2>/dev/null

# silent wrapper of kill_
kill:
	make kill_ 2>/dev/null>/dev/null

pullfirst = -$(DOCKER) pull $(IMG)

# quick-and-dirty serve, for local use
# We use the dev environment
serve: kill
	$(DOCKER) run --rm -it \
	    $(docker_args) \
	    -p 8080:8080 \
	    $(IMG) \
	    -c "$(DEBUG_FLAGS) ELEVENTY_ENV=development eleventy.sh $(PACKAGE_DIR) $(ELEVENTY_JS_FILE) --serve"


# build static site
build: kill
	$(pullfirst)
	echo make build && $(DOCKER) run  --rm \
	    $(docker_args) \
	    $(IMG) \
	    -c "$(DEBUG_FLAGS) $(ENVIRO_FLAGS) eleventy.sh $(PACKAGE_DIR) $(ELEVENTY_JS_FILE)"

docker-shell: kill
	$(pullfirst)
	echo make Docker shell && set -x && $(DOCKER) run --pull --rm -it \
	    $(docker_args) \
	    -p 8080:8080 \
	    $(IMG)

clean:
	sudo rm -rf out/_site

