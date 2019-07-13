PWD := ${CURDIR}
DOCKER_IMAGE_NAME := "wwwtamada"
CONTAINER_REMOVE_FLAG := "--rm"
BASE_URL := "https://tamada.github.io/"
HUGO_THEME := "hugo-resume"

build:
	docker run ${CONTAINER_REMOVE_FLAG} -d --name ${DOCKER_IMAGE_NAME}_build -p 1313:1313 -v "${PWD}":/src -v ${PWD}/public:/output -e HUGO_THEME=${HUGO_THEME} -e HUGO_BASEURL=${BASE_URL} jojomi/hugo:latest

start:
	docker run ${CONTAINER_REMOVE_FLAG} -d --name ${DOCKER_IMAGE_NAME} -p 1313:1313 -v "${PWD}":/src -v "${PWD}"/public:/output -e HUGO_THEME=${HUGO_THEME} -e HUGO_WATCH="true" -e HUGO_BASEURL=${BASE_URL} jojomi/hugo:latest

stop:
	docker stop ${DOCKER_IMAGE_NAME}

