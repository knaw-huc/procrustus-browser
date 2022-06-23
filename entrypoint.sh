#!/bin/sh

for file in /usr/share/nginx/html/js/app.*.js; do
  if [ ! -f $file.tmpl.js ]; then
    cp $file $file.tmpl.js
  fi

  envsubst '$REACT_APP_SERVICE_SERVER,$REACT_APP_HOME' <$file.tmpl.js >$file
done

nginx -g 'daemon off;'