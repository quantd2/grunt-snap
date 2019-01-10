#!/bin/bash
watchdir=/snapshot/script
while : ; do
  inotifywait $watchdir -e create|while read path action file; do
    ts=$(date +"%C%y%m%d%H%M%S")
    echo "$ts :: file: $file :: $action :: $path"
		if [[ "$file" =~ snapshot.sh ]]; then
			chmod u+x $path$file
			eval $path$file
		fi
  done
done
exit 0
