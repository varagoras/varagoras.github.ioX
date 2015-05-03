---
title: CSS Pipelining
desc: Thinking, goals and plan of handling CSS pipelining
date: 2015-05-03
tags: css, frontend, myth.io, sass
---

## Thinking
- Maintenability (consise code, well organized)
- Decoupled/Layered solutions
- Slim modules

## State
- Browser feature support (until next-gen browsers with proper updating)
	- Future feature/syntax transpilers [Myth](http://www.myth.io), [cssnext](https://cssnext.github.io) etc.
- Verbose/Lacking CSS syntax
	- CSS pre-processor like [Sass](http://sass-lang.com), [LESS](http://lesscss.org), [Stylus](https://learnboost.github.io/stylus) etc.

## Plan
Priority usage of future features (via traspiler) instead of custom pre-processor code.
Use a pre-processor for all the extra features a transpiler can't provide.
Generate a plain CSS and let the traspiler handle as much as possible like browser prefixes etc.

## Currently
**Sass** → **Myth** → **Uglify**
