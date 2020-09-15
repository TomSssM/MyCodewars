__.bash_profile__

aliases:

```shell script
# the git ones:
alias st='git status'
alias com='git add -A && git commit -m'
alias p='git push'
alias c='git checkout'
alias l='git log'
alias lst='git branch --list'
alias amend='git add -A && git commit --amend --no-edit'

# the general ones
alias la='ls -la'
alias ls='ls -a'
```

GIT:

```shell script
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

function ps1_git_fg_color {
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

function ps1_git_bg_color {
  local state=$(ps1_git_state)
  case "${state}" in
    0)
      echo -e $BG_CYAN
    ;;
    1)
      echo -e $BG_GREEN
    ;;
    *)
      echo -e $BG_YELLOW
    ;;
  esac
}

function ps1_git_branch {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ \1/'
}
```

PS1 themes

_dessert classic_

```shell script
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
PS1+="\\[${YELLOW}\\]\w" # working direcory
PS1+="\\[\$(ps1_git_fg_color)\\]\$(ps1_git_branch)\$(ps1_git_local_icon)" # GIT data
PS1+="\\[${GREEN}\\] ⬢ \$(node -v)" # NodeJS version
PS1+="\\[${RESET}\\]\n" # wrap to a new line and reset everything
PS1+="╰─" # finish the transition
PS1+="\$ "

export PS1
```

---

_futuristic_

```shell script
export PS1="[\\[${BRIGHT}${GREEN}\\]\u@\s\\[$RESET\\]:\\[${BLUE}\\]\W\\[${RESET}\\]]\$ "
```

---

_dessert linux mood_

```shell script
export PS1="\\[${BRIGHT}${GREEN}\\]\u@\s\\[$RESET\\]:\\[${YELLOW}\\]\W\\[${RESET}\\] \$ "
```

---

_aqua_

```shell script
function ps1_get_mid_char_color {
  if [[ $(ps1_git_branch) == "" ]]
  then
    echo -e $BG_YELLOW
  else
    echo -e $(ps1_git_bg_color)
  fi
}

function ps1_get_mid_char {
  local mid_char_icon=$(ps1_git_icon)
  if [[ $mid_char_icon == "" ]]
  then
    mid_char_icon="T"
  fi
  echo -e $mid_char_icon
}

function ps1_get_git_branch_prefix {
  if [[ $(ps1_git_branch) != "" ]]
  then
    echo " on"
  fi
}

PS1=""
PS1+="\\[${BG_GREEN}\\][\$(node -v)]\\[${RESET}\\]"
PS1+=" \\[\$(ps1_get_mid_char_color)\\][\$(ps1_get_mid_char)]\\[${RESET}\\]"
PS1+=" \\[${YELLOW}\\]\W\\[${RESET}\\]"
PS1+="\$(ps1_get_git_branch_prefix)\\[${GREEN}\\]\$(ps1_git_branch)\\[${RESET}\\]"
PS1+=" \$ "
export PS1
```
