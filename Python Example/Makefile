.DEFAULT_GOAL := help

# Define the name of the virtual environment directory
VENV := venv
# Define the python interpreter
PYTHON := $(VENV)/bin/python3.12
# Define the pip executable
PIP := $(VENV)/bin/pip

.PHONY: help
help: #          Show help message for each of the Makefile recipes.
	@grep -E "^[a-z-]+: #" $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ": # "}; {printf "%s: %s\n", $$1, $$2}'

.PHONY: venv
venv: #           Create a virtual environment.
	@test -d $(VENV) || python3.12 -m venv $(VENV)
	@$(PIP) install --upgrade pip

.PHONY: dev
dev: venv #       Install development dependencies.
	@$(PIP) install --editable .[development]

.PHONY: prod
prod: venv #      Install production dependencies.
	@$(PIP) install .

.PHONY: server-dev
server-dev: venv #    Start the development server on localhost at $PORT (default: 8000).
	@$(PYTHON) manage.py runserver

.PHONY: server-prod
server-prod: export DEBUG := false
server-prod: venv #   Start the production server on 0.0.0.0 at $PORT (default: 8000).
	@$(PYTHON) manage.py runserver

.PHONY: compose-dev
compose-dev: #   Up containers in a development environment.
	@docker-compose \
		--file compose-base.yml \
		--file compose-dev.yml \
		build
	@docker-compose \
		--file compose-base.yml \
		--file compose-dev.yml \
		up --detach

.PHONY: compose-prod
compose-prod: #  Up containers in a production environment.
	@docker-compose \
		--file compose-base.yml \
		--file compose-prod.yml \
		build
	@docker-compose \
		--file compose-base.yml \
		--file compose-prod.yml \
		up --detach

.PHONY: lint
lint: venv #          Lint the source code for style and check for types.
	@$(PIP) install flake8 mypy
	@flake8
	@mypy .

.PHONY: test
test: venv #          Recursively run the tests.
	@$(PYTHON) -m unittest ./src/**/*_tests.py
