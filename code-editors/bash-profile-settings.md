__.bash_profile__

aliases:

```shell script
# the git ones
alias st='git status'
alias p='git push'
alias c='git checkout'
alias l='git log'
alias lst='git branch --list'
alias cm='git add -A && git commit'
alias a='git add -A'
alias am='a && git commit --amend --no-edit'
alias f='git push -f origin HEAD'
# the general ones
alias la='ls -la'
alias ls='ls -a'
alias static_server='python -m SimpleHTTPServer'
```

GIT:

```bash
ESCAPE="\033"
RESET="${ESCAPE}[0m"
BRIGHT="${ESCAPE}[1m"

RED="${ESCAPE}[0;31m"
BLUE="${ESCAPE}[34m"
PURPLE="${ESCAPE}[0;35m"
CYAN="${ESCAPE}[0;36m"
YELLOW="${ESCAPE}[0;33m"
GREEN="${ESCAPE}[0;32m"
GRAY="${ESCAPE}[0m"

BG_MAGNETTA="${ESCAPE}[45m"
BG_GREEN="${ESCAPE}[42m"
BG_YELLOW="${ESCAPE}[43m"
BG_CYAN="${ESCAPE}[46m"

function ps1_git_state {
  local git_status="$(git status 2> /dev/null)"
  if [[ ! $git_status =~ "working tree clean" ]]; then
    echo 0 # Dirty state
  elif [[ $git_status =~ "nothing to commit" ]]; then
    echo 1 # Clean state
  else
    echo 2 # Not a GIT repo
  fi
}

function ps1_git_icon {
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

function ps1_git_color {
  local state=$(ps1_git_state)
  case "${state}" in
    0)
      echo -e $PURPLE
    ;;
    1)
      echo -e $GREEN
    ;;
    *)
      echo -e $GRAY
    ;;
  esac
}

function ps1_git_branch {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ \1/'
}

function ps1_git_branch_prefix {
  if [[ $(ps1_git_branch) != "" ]]
  then
    echo " on"
  fi
}
```

PS1 themes:

_default_

```bash
PS1="\[${YELLOW}\]\W\[${RESET}\]"
PS1+="\$(ps1_get_git_branch_prefix)\[${GREEN}\]\$(ps1_git_branch)\[${RESET}\]"
PS1+=" \$ "
export PS1
```

---

_dessert classic_

```bash
function ps1_git_local_icon {
  local icon=$(ps1_git_icon)
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
PS1+="\[\$(ps1_git_color)\]\$(ps1_git_branch)\$(ps1_git_local_icon)" # GIT data
PS1+="\[${GREEN}\] ⬢ \$(node -v)" # Node.js version
PS1+="\[${RESET}\]\n" # wrap to a new line and reset everything
PS1+="╰─" # finish the transition
PS1+="\$ "
export PS1
```

---

_futuristic_

```bash
export PS1="[\[${BRIGHT}${GREEN}\]\u@\s\[$RESET\]:\[${BLUE}\]\W\[${RESET}\]]\$ "
```

---

_vm_

```bash
export PS1="\[${BRIGHT}${GREEN}\]\u@\s\[$RESET\]:\[${YELLOW}\]\W\[${RESET}\] \$ "
```
