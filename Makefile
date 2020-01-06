PWD := ${CURDIR}
DOCKER_IMAGE_NAME := wwwtamada
BASE_URL := https://tamada.github.io/
HUGO_THEME := hugo-cards
DOCKER_IMAGE := jojomi/hugo:latest

# from https://github.com/kubernetes-sigs/kind/blob/master/site/Makefile
define _docker_run
	docker run --rm --name $1 $2 --interactive --volume ${PWD}:/src --volume ${PWD}/public:/output --publish 1313:1313 --workdir /src --entrypoint hugo $(DOCKER_IMAGE) $3
endef

build:
	@$(call _docker_run,${DOCKER_IMAGE_NAME}_build,--tty,--buildFuture)

start:
	@$(call _docker_run,${DOCKER_IMAGE_NAME},-d,server --bind="0.0.0.0" --buildFuture)

stop:
	docker stop ${DOCKER_IMAGE_NAME}

pull:
	cd public ; git pull origin master ; cd -

commit:
	cd public ; git commit -a -m "update" ; cd -

push:
	cd public ; git push origin master ; cd -

deploy: pull build commit push
