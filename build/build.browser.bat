::tsc --outFile dist\joi.js --module AMD --moduleResolution Classic
COPY NUL dist\joi.browser.js
TYPE "build\wrap.start" >> "dist\joi.browser.js"
TYPE "dist\joi.browser.amd.js" >> "dist\joi.browser.js"
TYPE "build\wrap.end" >> "dist\joi.browser.js"
EXIT