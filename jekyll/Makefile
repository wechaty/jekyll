# Makefile for awesome-chatboot
# Author: Huan LI <zixia@zixia.net> github.com/huan

.PHONY: all
all: serve

.PHONY: install
install:
	gem install bundler
	bundle update && bundle install

.PHONY: test
test:
	npm run test

.PHONY: code
code:
	code .

.PHONY: clean
clean:
	rm -fr _site

.PHONY: build
build:
	bundle exec jekyll build --trace

.PHONY: serve
serve:
	bundle exec jekyll serve --incremental

.PHONY: docker
docker-serve:
	docker run \
		--rm \
		-v $(pwd):/srv/jekyll:z \
		-p 4000:4000 \
		jekyll/jekyll \
		jekyll serve --force_polling
