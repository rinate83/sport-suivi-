#!/bin/sh
# Assemble src/ en un seul index.html + génère sw.js (liste des images, version = empreinte du contenu)
cd "$(dirname "$0")" && python3 - <<'PY'
import os, json, hashlib
s=open('src/head.html').read()
s=s.replace('/*CSS*/',open('src/style.css').read()).replace('/*DATA*/',open('src/data.js').read()).replace('/*APP*/',open('src/app.js').read())
open('index.html','w').write(s)
imgs=sorted('img/'+f for f in os.listdir('img') if not f.startswith('.'))
h=hashlib.sha1((s+''.join(imgs)).encode()).hexdigest()[:10]
open('sw.js','w').write(open('src/sw.js').read().replace('/*HASH*/',h).replace('/*IMGS*/',json.dumps(imgs)))
PY
node --check src/data.js && node --check src/app.js && node --check sw.js && echo "BUILD OK"
