#!/bin/bash

for i in $(find dist -type f -name '*.js');
do
  mv "$i" "${i%.js}.cjs"
done
