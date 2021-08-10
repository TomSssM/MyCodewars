GIT:

```shell script
ESCAPE="\033"
RESET="${ESCAPE}[0m"
BRIGHT="${ESCAPE}[1m"
RED="${ESCAPE}[0;31m"
PURPLE="${ESCAPE}[0;35m"
CYAN="${ESCAPE}[0;36m"
YELLOW="${ESCAPE}[0;33m"
GREEN="${ESCAPE}[0;32m"
BLUE="${ESCAPE}[34m"
GRAY="${ESCAPE}[0m"

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
    echo "↻" # Need to rebase
  elif [[ ${#commit_local} -gt 0 && -z $commit_remote ]]; then
    echo "⛢" # Untracked branch
  elif [[ ${#commit_remote} -gt 0 && ${#commit_base} -gt 0 && $commit_remote = $commit_base ]]; then
    echo "↑" # Need to push
  elif [[ ${#commit_local} -gt 0 && ${#commit_remote} -gt 0 && ${#commit_base} -gt 0 ]]; then
    echo "⇅" # Crash history (Need to force push or pull)
  fi
}

function git_branch {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ \1/'
}

function node_version {
  echo -e "$GREEN ⬢ $(node -v)"
}
```

PS1 themes

__MAC__

_dessert classic_

```shell script
function git_icon {
  local icon=$(git_state)
  if [[ $icon != "" ]]
  then
    echo " $icon"
  else
    echo $icon
  fi
}

PS1=""
PS1+="╭─ " # start the transition
PS1+="\[${YELLOW}\]\w" # working direcory
PS1+="\[\$(git_color)\]\$(git_branch)\$(git_icon)" # GIT data
PS1+="\[${GREEN}\] ⬢ \$(node -v)" # NodeJS version
PS1+="\[${RESET}\]\n" # wrap to a new line and reset everything
PS1+="╰─" # finish the transition
PS1+="\$ "

export PS1
```

---

_futuristic_

```shell script
export PS1="[\[${BRIGHT}${GREEN}\]\u@\s\[$RESET\]:\[${BLUE}\]\W\[${RESET}\]]\$ "
```

---

_dessert linux mood_

```shell script
export PS1="\[${BRIGHT}${GREEN}\]\u@\s\[$RESET\]:\[${YELLOW}\]\W\[${RESET}\] \$ "
```

__Linux__

_debian10_

```shell script
export PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
```

---

_ubuntu_

```bash
export PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\W\[\033[00m\]\$ '
```
