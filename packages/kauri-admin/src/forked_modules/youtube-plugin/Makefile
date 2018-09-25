setup:
	@npm install

run:
	@npm run start

unit:
	@rm -rf coverage
	@npm run -s test

lint:
	@npm run --silent lint

test: lint unit

watch_unit:
	@npm run --silent test:watch

build:
	@npm run --silent build

build_dist:
	@npm run --silent build:dist
