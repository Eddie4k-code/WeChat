.phony: build

build:
	docker-compose up -d --build

clean:
	docker-compose down