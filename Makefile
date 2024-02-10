.phony: build

build:
	docker-compose up -d --build

restart:
	@docker-compose down
	@docker-compose up -d --build
	echo "Restarted"
clean:
	docker-compose down