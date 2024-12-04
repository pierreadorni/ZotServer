all: Makefile.in

RELEASE_VERSION:=$(shell grep \"version\": manifest.json | head -n 1 | sed -e 's/  \"version\": \"//' -e 's/\",//')

Makefile.in: manifest.json
	@echo "all: zotserver-${RELEASE_VERSION}.xpi" > Makefile.in

-include Makefile.in

zotserver.xpi: FORCE_RUN
	rm -rf $@
	zip -r $@ bootstrap.js dist manifest.json -x \*.DS_Store

zotserver-%.xpi: zotserver.xpi
	mv $< $@
	rm -rf Makefile.in

version: manifest.json
	@echo "${RELEASE_VERSION}"

FORCE_RUN:
	@# this rule will make anything that depends on it run all the time
