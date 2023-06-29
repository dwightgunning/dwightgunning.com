#!/bin/bash
set -e

# check if the first argument passed in looks like a flag
if [ "${1#-}" != "$1" ]; then
  set -- osmium "$@"
# check if the first argument passed in is composer
elif [ "$1" = 'osmium' ]; then
  # prepend with default argument
  set -- "$@"
fi

exec "$@"
