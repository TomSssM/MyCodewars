# Git Cheatsheet

## Config setup

Set email + user name

``` bash
$ git config --global user.name <name>
$ git config --global user.email <email>

$ git config --list
```

## Help

``` bash
$ git help <verb (i.e. config)>
$ git <verb> --help
```

## Green Files

Make green files (add to staging area) or remove all or a specific file

``` bash
$ git add -A        (all changes when run from any directory)
$ git add .      (same as -A so long as we are in the root directory)
$ git add ./subdir/      (all changes in the subdir)
$ git add --no-all . || ./subdir/     (all but deleted files)
$ git add -u      (all but untracked)

$ git reset <file>
$ git reset
```

## Branching
Set upstream for a branch (for every branch that you did -u for there is then in the future going to be the possibility to write just `$ git push` instead of the more verbose variant; and yeap there is more than one upstream branch and you have to do -u for every branch only once and then for every branch tha you did -u for you can push via `$ git push` and not `$ git push origin master etc.`)
``` bash
$ git push <remote> <branch> -u
```
List local + remote branches
``` bash
$ git branch -a
```

Delete a branch
``` bash
$ git branch -d <name-of-a-branch>
```

Create and automatically switch to a branch
``` bash
$ git branch -m <name-of-a-branch>
```

## Removing Red Files
Removing Files from the Working Directory

If the file has already been there but was modified and is now red
``` bash
$ git checkout <file>
$ git checkout
```

If the file was just created and is now red (called untracked)

```bash
$ git clean -df
$ git clean -df <file>
```

Thus the difference between untracked and modified files that are both in red

## Moving commits from one branch to another
Cherry Picking
``` bash
$ git cherry-pick <hash of the commit on another branch>
```

## Removing Commits from a branch
As a continuation of the cherry-picking proccess

`<hash>` is the hash of the commit up to which but not including which to delete all the changes

Remember:
- --soft means keep the green files (staging area)
- --mixed means keep the red files (working directory)
- --hard means keep only untracked files (almost all gone)
``` bash
$ git reset <hash-of-the-commit-up-to-but-not-incl-which>
$ git reset --soft <hash>
$ git reset --mixed <hash>
$ git reset --hard <hash>
```

## Reviving Files after reset --hard
Checkout (go into a detached HEAD state) for the hash of the necessary commit. Grab the hash from the kind of history returned by the following command:
Working wiht checkout is explained in the next chapter

``` bash
$ git reflog
```

## Checking out Hashes
First checkout:
``` bash
$ git checkout <hash>
```

then create a branch in the detached HEAD state to save this state into a new branch
``` bash
$ git checkout <hash>
... do some work
... ok, I wanna keep this changes
$ git branch <name-of-a-branch>
... suppose I chose to call my branch Tom
$ git checkout Tom
```

## Ammeding Commits
### Revert
A new commit to revert the changes
``` bash
$ git revert <hash>
```
### Ammend
``` bash
$ git commit --amend -m <new-message-text>
```

### Squash
``` bash
$ git rebase -i HEAD~<number-of-commits-to-worj-with>
```

### Rebase
__You should never rebase the branch that many people are working on__

Rebase is done __only for the branch that you ALONE are working on__

``` bash
$ git checkout <YOUR-BRANCH>
$ git rebase <other-branch-like-master>
$ git rebase -i <other-branch-like-master>
```
If master has commits: A->B->C->D->E->F->G->H
If you checkouted from master at commit C and your branch has commits
1->2->3->4 then the history for your branch is A->B->C->1->2->3->4.

When you __pull master first__ and rebase __your__ branch you make it so that your first commit 1 begins after the most recent commit on master (H) instead of some outdated commit like C. Thus your commit history becomes:
A->B->C->D->E->F->G->H->1->2->3->4. So this way you have the most recent updates from master and a pretty clean commit history.

## Stash

It only saves the green files (in the Staging Area)

The `save` command saves green files as a stash (the name of the stash is the second parameter)
The `apply` command unstashed the selected (or uppermost) stash without dropping it
The `pop` command applies the uppermost stash and drops it
The `drop` command deletes the selected stash fromt the list
The `clear` command drops all the stashes
``` bash
$ git stash save <name>
$ git stash list
$ git stash apply <stash-hash>
$ git stash pop
$ git stash drop <stash-hash>
$ git stash clear
```