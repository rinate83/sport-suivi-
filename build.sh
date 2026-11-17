#!/bin/sh
# Assemble src/ en un seul index.html
cd "$(dirname "$0")" && python3 - <<'PY'
s=open('src/head.html').read()
s=s.replace('/*CSS*/',open('src/style.css').read()).replace('/*DATA*/',open('src/data.js').read()).replace('/*APP*/',open('src/app.js').read())
open('index.html','w').write(s)
PY
node --check src/data.js && node --check src/app.js && echo "BUILD OK"
