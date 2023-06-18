
#!/bin/bash

# Store the list of .osm.pbf files in a space-separated string
files=$(ls /data/*.osm.pbf | tr '\n' ' ')

echo "Merging files ... $files"

# Run osmium merge with all arguments passed to the script
osmium merge $files "$@"
