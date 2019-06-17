# Aliases

Here is a list of my most commonly used aliases:

__.bashrc:__

git aliases:

```bash
alias cln='git clone'
alias st='git status'
alias com='git add -A && git commit -m'
alias amm='git add -A && git commit --amend'
alias br='git branch -m'
alias ba='git branch -a'
alias pl='git pull'
alias p='git push'
alias c='git checkout'
alias l='git log'
alias ch='git checkout ./'
alias cl='git clean -df'
```

npm aliases:
```
alias bld='npm run build'
alias start="npm start"
alias tst="npm run test"
alias lint="npm run lint"
```

__.gitconfig:__

```bash
[alias]
  st = status
  cm = commit
  a = add -A
  cma = commit --amend
  p = push
  l = log
  c = checkout
  b = branch
  ba = branch -a
  n = branch -m
  ch = checkout ./
```