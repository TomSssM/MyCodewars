__.bash_profile:__

```shell
# aliases

alias cln='git clone'
alias st='git status'
alias com='git add -A && git commit -m'
alias amm='git add -A && git commit --amend'
alias pl='git pull'
alias p='git push'
alias c='git checkout'
alias l='git log'
alias cl='git clean -df'
alias dfx='git clean -dfx ./'
alias lst='git branch --list'
alias amend='git add . && git commit --amend --no-edit'
alias la='ls -la'
alias ls='ls -a'

# git intergration ( if on MAC )

RED="\033[0;31m"
PURPLE="\033[0;35m"
CYAN="\033[0;36m"
YELLOW="\033[0;33m"
GREEN="\033[0;32m"
GRAY="\e[0m"

function git_color {
  local git_status="$(git status 2> /dev/null)"

  if [[ ! $git_status =~ "working tree clean" ]]; then
    echo -e $PURPLE # Dirty state
  elif [[ $git_status =~ "nothing to commit" ]]; then
    echo -e $GREEN # Clean state
  else
    echo -e $GRAY
  fi
}

function git_state {
  local commit_local=$(git rev-parse @ 2> /dev/null)
  local commit_remote=$(git rev-parse @{u} 2> /dev/null)
  local commit_base=$(git merge-base @ @{u} 2> /dev/null)

  if [[ ${#commit_local} -gt 0 && ${#commit_remote} -gt 0 && $commit_local = $commit_remote ]]; then
    echo ""
  elif [[ ${#commit_local} -gt 0 && ${#commit_base} -gt 0 && $commit_local = $commit_base ]]; then
    echo " ↻" # Need to rebase
  elif [[ ${#commit_local} -gt 0 && -z $commit_remote ]]; then
    echo " ⛢" # Untracked branch
  elif [[ ${#commit_remote} -gt 0 && ${#commit_base} -gt 0 && $commit_remote = $commit_base ]]; then
    echo " ↑" # Need to push
  elif [[ ${#commit_local} -gt 0 && ${#commit_remote} -gt 0 && ${#commit_base} -gt 0 ]]; then
    echo " ⇅" # Crash history (Need to force push or pull)
  fi
}

function git_branch {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ \1/'
}

PS1=""
# If on the server
if [[ $(git config core.editor) = vim ]]; then
  PS1+="\[$CYAN\]\h "
fi
PS1+="\[$YELLOW\]\w"
PS1+="\[\$(git_color)\]\$(git_branch)\$(git_state)"
PS1+="\[$GRAY\] \n› "
```

Also here are the same aliases for __.gitconfig:__

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