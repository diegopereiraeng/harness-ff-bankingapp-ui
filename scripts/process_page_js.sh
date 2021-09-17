#!/bin/bash

#if [ -z ${FFKEY+x} ]; then echo "FF KEY is unset"; else echo "FF KEY set to $FFKEY";sed -i -r "s/[a-z0-9]*-[a-z0-9]*-[a-z0-9]*-[a-z0-9]*-[a-z0-9]*/$FFKEY/g" /usr/share/nginx/html/js/ff.js; fi;

if [[ "" == "$LOG_CONFIG_LABELS" ]]; then
  LOG_CONFIG_LABELS={}
fi

if [[ "" == "$METRIC_CONFIG_LABELS" ]]; then
  METRIC_CONFIG_LABELS={}
fi

tmpfile=/tmp/env.js

cat <<EOF > $tmpfile
const STABLE_ENDPOINT = '$STABLE_ENDPOINT';
const CANARY_ENDPOINT = '$CANARY_ENDPOINT';

const LOG_CONFIG_LABELS = $LOG_CONFIG_LABELS;

const METRIC_CONFIG_LABELS = $METRIC_CONFIG_LABELS;
EOF
