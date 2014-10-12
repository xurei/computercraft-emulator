#!/bin/bash

if [[ ( "$#" < 1 ) ]]; then
	echo "Usage : $0 <name>";
else
	DIRNAME=`dirname "$0"`
	DIRNAME=$(readlink -f "$DIRNAME")
	
	mkdir "$DIRNAME/$1"
	cp -u "$DIRNAME/template/template.js" "$DIRNAME/$1/$1.js"
	cp -u "$DIRNAME/template/template.scss" "$DIRNAME/$1/$1.scss"
	cp -u "$DIRNAME/template/template.tmpl" "$DIRNAME/$1/$1.tmpl"
	
	sed -i.bak s/\$\{template}/$1/g "$DIRNAME/$1/$1.js"
	rm -f "$DIRNAME/$1/$1.js.bak"
	sed -i.bak s/\$\{template}/$1/g "$DIRNAME/$1/$1.scss"
	rm -f "$DIRNAME/$1/$1.scss.bak"
	sed -i.bak s/\$\{template}/$1/g "$DIRNAME/$1/$1.tmpl"
	rm -f "$DIRNAME/$1/$1.tmpl.bak"
	
	echo "Peripheral created"
fi