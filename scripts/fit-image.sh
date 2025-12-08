#!/usr/bin/env bash
set -e

MAX_WIDTH=1600

function resize () {
  FILE=$1
  echo "resizing $FILE ..."
  mogrify \
    -verbose \
    -quality 80 \
    -resize "${MAX_WIDTH}>" \
    ${FILE}
}

DST=${1:-.}

if [ -f "$DST" ]; then
  echo "fit-image: $DST is file"
  resize "$DST"
  exit 0
fi

echo "fit-image: $DST is directory"
pushd ${DST}

# FILES=$(git ls-files --exclude-standard --others *.jpg)
FILE_LIST=($(find . -type f -name '*.jpg' -o -name '*.jpeg' -o -name '*.png' -o -name '*.gif' -o -name '*.webp'))

for FILE in "${FILE_LIST[@]}"; do
  echo "checking $FILE ..."
  WIDTH=$(identify -ping -format '%w' "$FILE")
  if [ "$WIDTH" -gt "$MAX_WIDTH" ]; then
    resize "$FILE"
  else
    echo "skipping $FILE (width $WIDTH <= $MAX_WIDTH)"
  fi

  # Convert to webp if not already
  if [[ "$FILE" != *.webp ]]; then
    echo "converting $FILE to webp ..."
    WEBP_FILE="${FILE%.*}.webp"
    convert "$FILE" "$WEBP_FILE"
    rm "$FILE"
  fi
done

popd

