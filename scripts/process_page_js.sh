#!/bin/bash

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

echo -e "$(cat $tmpfile)\n\n$(cat $1)" > $1
