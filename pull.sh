#!/bin/bash

aam_git="git@github.com:harp-lab/aam-visualizer.git"

rm -rf viz
git clone ${aam_git} viz
rm -rf viz/{fext,items,links,viewers}
cp -r ./{fext,items,links,viewers} viz/
cp ./{package.json, package-lock.js} viz/
(cd viz; npm install)
