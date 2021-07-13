serve-morph:
	uvicorn server:app --port 8090 --host 0.0.0.0 --reload

build:
	cd web/; make build
