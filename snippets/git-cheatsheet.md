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
List only local branches
```bash
$ git branch --list
```

Delete a branch
``` bash
$ git branch -d <name-of-a-branch>
$ git branch -D <name-of-a-branch>      (force deleting)
```

Create and automatically switch to a branch
``` bash
$ git branch -m <name-of-a-branch>
$ git checkout -b <name-of-a-branch>
```

## Removing Red Files
Removing Files from the Working Directory

If the file has already been there but was modified and is now red
``` bash
$ git checkout <file>
$ git checkout .
```

If the file was just created and is now red (called untracked)

```bash
$ git clean -df
$ git clean -df <file>
```
Thus the difference between untracked and modified files that are both in red

Also here is a shortcut to deleting a file from working directory and automatically adding the delete to green files:

```bash
$ git rm <file>
```

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
Working with checkout is explained in the next chapter

``` bash
$ git reflog
```

Or alternatively you could do this to bring back all the changes you deleted:
```bash
$ git reset --hard <hash-of-the-deleted-commit-we-want-to-revive>
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

## Amending Commits
### Revert
A new commit to revert the changes
``` bash
$ git revert <hash>
```
### Amend
``` bash
$ git commit --amend -m <new-message-text>
```

If you don't need to change message do this:
```bash
$ git commit --amend --no-edit
```

### Squash
``` bash
$ git rebase -i HEAD~<number-of-commits-to-display-starting-from-current>
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

If you made some commits on your `master` branch (it can be any branch `master` is an example) and there are some commits on the upstream `master` branch you can rebase your current master branch and then push it:

```bash
$ git pull origin master --rebase
$ git pull origin master -r           ( less verbose )
```
But you should never do that if the commits that are going to be overwritten are already being used and have been pulled by somebody in this case do merge

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

## Aliases
There are two ways of creating git aliases

First you can add them directly to the .gitconfig file itself like so:

```bash
[core]
  editor = code --wait
[user]
  name = TomSssM
  email = ilyashome3@gmail.com
[alias]
  ci = "commit"
  st = status
```
Or you could write them like this:

```bash
$ git config --global alias.co checkout
$ git config --global alias.br "branch -m"
```

And then implement them like this:

```bash
$ git br feature
```

There is also a way to create alisases for BASH (__but not for git!__):

create `.bashrc` file in Users/_User Name_/.bashrc

Add the following contents to it:

```bash
alias com="git add -A && git commit -m"
```

Be very attentive about no space after `=` and then run

```bash
$ source ./.bashrc
```

## SSH Keys

Go to the location where you want to store SSH keys folder and generate:

```bash
$ ssh-keygen
```

You may always hit enter and everything be fine but if you type in a file name
a new SSH key with the same file name as the value you typed in will be created
in your _current directory_

Go to GitHub and create a public SSH key with the following value:

```bash
$ cd ./.ssh
$ cat id_rsa.pub
```
## Syncing a Fork

First do add an upstream remote:
```bash
$ git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
```

Then fetch all the branches and commits on the upstream:
```bash
$ git fetch upstream
```

Then go to your branch that you want to sync and perform a fast-forward commit (it happens when there were no unique commits before the ones that you are merging; otherwise a merge commit is created and even merge conflicts might arise):

But we are fine:
```bash
$ git checkout master
$ git merge upstream/master
```
And then simply push your changes :)

## Completely clearing the working directory

```bash
$ git clean -dfx
```

Destroys even the files that are in `.gitignore` ( like `node_modules` ).

## Managing Multiple Accounts and GitHubs with SSH

Imagine you have 2 github accounts and on the same machine you have 2 repos. You want to contribute to the 1st one 
with the 1st account and to the other with the 2nd account. One solution would be to keep changing username and 
password before contributing to the repo. A better solution would be to generate two SSH keys: one for the 1st account, 
the other for the 2nd account. Then clone the first repo thru the 1st SSH key and the second repo thru the 2nd SSH key. 
Now if you push to, say, the first repo, which is associated with the 1st SSH key, you are going to be making and 
pushing commits on behalf of the 1st account because it _is_ the account associated with the 1st SSH key; likewise 
for the 2nd repo thus eliminating the need for repetitively entering login and password all the time.

Since you cannot be logged to 2 accounts at the same time, when you try to pull push, GitHub will constantly ask 
you to authenticate.

The solution to this is quite simple. Create two SSH keys: `a` and `b`. Associate `key a` with 1st account and `key b` 
with 2nd account. Then clone any repo that is created with 1st account using SSH `key a`, and then clone any repo that 
is created with 2nd account using SSH `key b`. Now if you go to any one of the two cloned repositories GitHub will no 
longer ask you to sign in as we didn't use login and password to clone the repos, but instead SSH. 
On the other hand were we to clone via http we may end up constantly having to enter credentials ( login and password ) 
if we switch to the 1st repo after committing to the 2nd repo and vice versa as the 2 repos are created on 
different accounts. With SSH such a problem ceases to exist any more.

In order to do that we need to create the first key ( we called it `key a` in the previous example ) like this:

```console
$ ssh-keygen -t rsa -C "ilyashome3@gmail.com"
```

This way we are telling to associate the key we are creating with the email named `ilyashome3@gmail.com`.

Then go to GitHub and add this key which is associated with `ilyashome3@gmail.com` to the account that uses the 
email `ilyashome3@gmail.com`. 

Likewise create another SSH key and associate it with a different email:

```console
$ ssh-keygen -t rsa -C "ilyasflat3@gmail.com"
```

Now go to the 2nd account that uses the email `ilyasflat3@gmail.com` and add the ssh key just created.

But that isn't all yet. We need to tell SSH agent what key to look at to make sure that we are the owner of the repo. 
In other words when we clone via SSH from `account1`, we need to tell SSH agent to use the key 
associated with `account1`, and likewise if we clone repos created with `account 2`, SSH agent should use the key 
associated with `account2`. This way SSH will use the correct keys when it does the handshake and repos will be 
cloned successfully. 

We can do that pretty easily by properly tweaking the SSH config file. For that go to the good old `~/.ssh` and create 
a file called `config` ( no extension ). There we need to write something like this:

```
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa
```

In order to understand what everything is for in here let's take a look at the url via which SSH clones repositories:

```
git@github.com:TomSssM/lib-docs.git
```

See this value right here between `@` and `:` ( `github.com` )?

This value should be the same as `Host`. In other words if we were to change `Host` in the config file 
to `cool` like this:

```
Host cool
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa
```

then we would use an url like this:

```
git@cool:TomSssM/lib-docs.git
```

To clone repositories like that:

```console
$ git clone git@cool:TomSssM/lib-docs.git
```

Thus the url is of the form ( `User` and `Host` correspond to the same entries in the SSH `config` file ):

```
<User>:<Host>:<github-user>/<github-repo>
```

In `~/.ssh/config` the last line:

```
  IdentityFile ~/.ssh/id_rsa
```

says the following: if `Host` matches the one that is used in the url ( that one between `@` and `:` remember? ) 
then use the key that is located at this path: `~/.ssh/id_rsa`

So in order to manage multiple accounts we could for instance create a config like this:

```
Host github-work
  HostName github.com
  User git
  IdentityFile ~/.ssh/work

Host github-home
  HostName github.com
  User git
  IdentityFile ~/.ssh/home
```

And then clone repositories created with the work account like so:

```console
$ git clone git@github-work:TomSssM/lib-docs.git
```

And for the other account ( home account ) we would clone like so:

```console
$ git clone git@github-home:TomSssM/lib-docs.git
```

Now for every url that starts `git@github-home:...` SSH agent will use the `~/.ssh/home` key and for every url that
starts with `git@github-work:...` SSH agent will use the `~/.ssh/work` key. As you remember the `~/.ssh/home` key 
will hold the credentials for the home account that has the email `ilyashome3@gmail.com` ( because when we generated 
it we added `... -t rsa -C "ilyashome3@gmail.com"` ) and likewise the `~/.ssh/work` key will be associated with the
`ilyasflat3@gmail.com` email for the same reason. This will eliminate the need to enter the credentials for every
commit we make. 

Now upon cloning a repo from github SSH will ask you to confirm that you want to add github.com to the `known_hosts` 
file in the `.ssh` directory so that our SSH agent knows that it can safely allow github.com to use the ssh protocol 
to communicate with our machine.

__Note__: if your company uses an enterprise version of GitHub ( it is located not on github.com but on 
github.yandex-team.com for instance ) then you also need to consider the `HostName` field: 

```
Host github-work
  HostName github.com
  ^---------------------- HERE ---
  ...
```

`HostName` should match exactly the host name that you clone repos from. For instance if you are going to clone via 
SSH from _github.yandex-team.com_ then you need to change `HostName` to:

```
Host github-work
  HostName github.yandex-team.com
  User git
  IdentityFile ~/.ssh/work
```

For instance here is my `config` file:

```
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/home

Host github.yandex-team.ru
  HostName github.yandex-team.ru
  User git
  IdentityFile ~/.ssh/work
```

## Syncing 2 emails

## TODO

- Add an example of my current config
- validate that GitHub indeed asks you to sign in all the time
- do what is written in the explanation
- try:
```
[user]
    name = Pavan Kataria
    email = defaultemail@gmail.com

[includeIf "gitdir:~/work/"]
    path = ~/work/.gitconfig
```
- fix the account issue on turbo
- try the 2 accounts SSH hack in practice with IlyaKkk & TomSssM
