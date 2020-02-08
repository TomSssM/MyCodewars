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

In other words, if branch `a` that is on the remote has been set as an upstream branch for the _local_ branch
`b` that is on your computer, then every time when you are on branch `b` and you do `git push`, GIT will push
the commits of the local branch `b` to the remote branch `a`.

List local + remote branches
``` bash
$ git branch --all
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
The `show` command will show the changes in the topmost stash ( or in the stash whose `<stash-hash>` you provide to it,
 see below )
The `$ git stash` command without any arguments would save all the changes ( everything except Untracked Files ( red ): 
New File ( green ), Modified ( green ), Modified ( red ) )

``` bash
$ git stash save <name>
$ git stash list
$ git stash apply <stash-hash>
$ git stash pop
$ git stash drop <stash-hash>
$ git stash show <stash-hash>
$ git stash clear
```

Also, instead of using the stash hash or the stash name, you may use the stash index ( for instance the topmost 
stash is 0, the 1st stash is the one just below the topmost and so on ).

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

Imagine you have 2 GitHub accounts and on the same machine you have 2 repos. You want to contribute to the 1st one 
with the 1st account and to the other with the 2nd account. One solution would be to keep changing username and 
password before contributing to the repo. A better solution would be to generate two SSH keys: one for the 1st account, 
the other for the 2nd account. Then clone the first repo thru the 1st SSH key and the second repo thru the 2nd SSH key. 
Now if you push to, say, the first repo, which is associated with the 1st SSH key, you are going to be making and 
pushing commits on behalf of the 1st account because it _is_ the account associated with the 1st SSH key; likewise 
for the 2nd repo thus eliminating the need for repetitively entering login and password all the time.

It solves the problem that since you cannot be logged to 2 accounts at the same time, when you try to pull / push, 
GitHub will constantly ask you to authenticate.

The solution to this is quite simple. Create two SSH keys: `a` and `b`. Associate `key a` with the 1st account and 
`key b` with the 2nd account. Then clone any repo that is created with the 1st account using `key a`, and then 
clone any repo that is created with the 2nd account using `key b`. Now if you go to any one of the two cloned 
repositories and pull / push, GitHub will no longer ask you to sign in as we didn't use login and password to clone 
the repos, but instead SSH.

On the other hand were we to clone via http we may end up constantly having to enter credentials ( login and password ) 
if we switch to the 1st repo after committing to the 2nd repo and vice versa as the 2 repos are created on 
different accounts. With SSH such a problem ceases to exist any more.

In order to do that we need to create the first key ( we called it `key a` in the previous example ) like this:

```console
$ ssh-keygen -t rsa -C "ilyashome3@gmail.com"
```

This way we are telling to associate the key we are creating with the email named `ilyashome3@gmail.com`.

Then go to GitHub and add this key we just created ( which is associated with `ilyashome3@gmail.com` ), add it to the 
account that uses the email `ilyashome3@gmail.com`. 

Likewise create another SSH key and associate it with a different email:

```console
$ ssh-keygen -t rsa -C "ilyasflat3@gmail.com"
```

Now go to the 2nd account that uses the email `ilyasflat3@gmail.com` and add the SSH key just created.

Just to be safe we can do

```console
$ ssh-add ~/.ssh/home
$ ssh-add ~/.ssh/work
```

`ssh-add` adds private key identities ( from your `~/.ssh` directory ) to the authentication agent ( `ssh-agent` ), 
so that the SSH Agent can take care of the authentication for you, and you don’t have type in passwords 
at the terminal.

But that isn't all yet. We need to tell SSH Agent what key to look at to make sure that we are the owner of the repo. 
In other words when we clone via SSH from `account1`, we need to tell SSH agent to use the key 
associated with `account1`, and likewise if we clone repos created with `account 2`, SSH agent should use the key 
associated with `account2`. This way SSH will use the correct keys when it does the handshake and repos will be 
cloned successfully. I mean we wouldn't want SSH Agent to use one and same key to do the handshake _every_ time.
There are 2 different keys associated with 2 different accounts and in order to skip having to enter the credentials
we need to establish the connection with the first account via one key and with the other account via the other key. 

We can do that pretty easily by properly tweaking the SSH config file. For that go to the good old `~/.ssh` and create 
a file called `config` ( no extension ). There we need to write something like this:

```
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa
```

In order to understand what everything is for in here let's take a look at the url via which SSH clones 
repositories ( in fact it is a url just like `https://github.com/...` it simply uses a different _protocol_ not 
HTTP but SSH ):

```
git@github.com:TomSssM/lib-docs.git
```

See this value right here between `@` and `:` ( `github.com` )?

This value should be the same as `Host` in the `config`. In other words if we were to change `Host` in the `config`
file to `cool` like this:

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

__Note__: if your company uses an enterprise version of GitHub ( it is located not on _github.com_ but on 
_github.yandex-team.com_ for instance ) then you also need to consider the `HostName` field: 

```
Host github-work
  HostName github.com
  ^---------------------- HERE ---
  ...
```

`HostName` should match exactly the _origin_ that you clone repos from. For instance if you are going to clone via 
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

**Also Note:** since we are using SSH now if you do `git remote get-url origin` the url is going to look something
like this:

```
git@github.com:TomSssM/MyCodewars.git
```

Just as we said, the url is going to be using a different protocol. Keep it in mind if you want to init a git SSH
( and not the usual HTTP ) repository. When you thus add the origin for the first time make sure to add the origin
like this:

```console
$ git add remote origin git@github.com:TomSssM/<some-name>.git
```

Though of course all this information will be on GitHub when you create a repository.

**Still Note:** if you have `~/.ssh/config` like this one:

```
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/home

Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/work
```
And you `git clone` something like this: `git@github.com:IlyaKkk/Git-Training.git` then you might get a feeling that
when you clone a repo or push to a repo ( these are the 2 situations when SSH Agent would go thru the `config` file 
to check whether you have the right private keys ), you might get a feeling that SSH Agent would check both the
`~/.ssh/home` key _and_ the `~/.ssh/work` key. But it isn't so unfortunately: SSH Agent doesn't check each
`IdentityFile` under _every_ matching `Host`, instead SSH Agent would go to the _first_ matching `Host` and, in our case,
always check only the `~/.ssh/home` key and then if `~/.ssh/home` doesn't work, it throws an error.

## Syncing 2 emails

When you make a commit some metadata is automatically attached to it. This metadata also holds the
_email_ from which you made the commit. Where does this info about email come from? Perforce
git looks into the `<path-to-project>/.git/config` file *in the root of your project.* If it doesn't find the
email information there, then git is going to look at the _global_ `.gitconfig` file which lives inside 
the `HOME` directory.

But what if you have 2 repositories ( like in the previous section ) and you need to make commits in the 1st repo
with one email and in the 2nd repo with another email. SSH keys will not solve this problem :)

Instead we need to tweak the git config stuff.

First solution would be to set the `git config` values **without** the `--global` flag like so:

```console
$ git config user.name <name>
$ git config user.email <email>
```

This will efficiently add the username and email you typed to the `<project-path>/.git/config` file ( NOT to
the `~/.gitconfig` file as the same action but with the `--global` flag would ). And since, as we
have discussed, git first checks this ( `.../.git/config` ) file _before_ the global one ( `~/.gitconfig` )
to retrieve information, since it is so, now the commits will have the email value in their metadata set to
whatever value the `email` field inside the `.../.git/config` file has. Thus it has solved our problem. This way
we can configure every project to have its own email and user as the contributor by specifying it in the 
`.../.git/config` file with `git config` commands without the `--global` flag.

Another solution is to write this magic stuff:

```
[includeIf "gitdir:~/work/"]
    path = ~/work/.gitconfig
```

to the `~/.gitconfig` file so that it looks something like this:

```
[user]
    name = TomSssM
    email = ilyashome3@gmail.com

[includeIf "gitdir:~/work/"]
    path = ~/work/.gitconfig
```

The stuff above tells git: _if we are inside the `~/work/` directory, instead of the `~/.gitconfig` use the file
located at `~/work/.gitconfig` for global git configurations_

## git fetch vs git pull

There are local branches and remote branches. So the local branches are the ones you are working on locally, on your
computer, the remote branches are the copies of your local branches that you `git push`ed to GitHub ( remote branches
are the ones stored on GitHub ). It is all very clear.

The way that you can switch to a local branch is like this:

```
$ git checkout <branch-name>
```

But how to switch to a remote branch ( yeap, the one that lives on GitHub, on the `remote` )? Easy, given that the
name of the `remote` ( the remote ( meaning the one that is on the Internet ) GitHub repository, not the local
( meaning on your computer ) `git` repository ); so, given that the name of the `remote` you want to switch to is
called `origin` for example, you need to do:

```
$ git checkout origin/<branch-name>
```

Now you have the same history that you would see if you were to go to `https://github.com` then go to your repository
and _there_ switch to `<branch-name>`.

But imagine the situation: your master branch, on the `remote`, has the commits:

```
a -> b -> c
```

then you checkout a new branch from `master` called `awesome-branch` and just work on it. Meanwhile a certain Jack,
working on his own computer, updates `master` ( the one on the `remote`, on GitHub ). Now the history of the
`master` branch ( the `master` branch that lives on GitHub, I mean ) looks like this ( because Jack updated it not
so long ago ):

```
a -> b -> c -> 1 -> 2
```

You go to GitHub and you see that `master` has new commits. OK, that is good. Because you are curious you want to
see the changes brought about by those commits you do:

```
$ git checkout origin/master
```

Now, in your terminal, you have switched to the remote `master` branch, the one that is stored on GitHub, but here
is a problem: `origin/master` that you just switched to doesn't have the new commits! Instead its history looks
like this:

```
a -> b -> c
```

That is expected. You see, GitHub doesn't update your copy of the remote branch ( like `origin/master` ) when someone
pushes new commits to this remote branch ( in other words when someone does `$ git push origin master` like John did
not so long ago, or when someone merges a PR into `master` on GitHub ); instead, you have to do it yourself.
So in order to see John's commits not only when you are on GitHub but also on your own computer, in the `origin/master`
branch, you need to download those commits from GitHub, from the `remote`, to your computer, your local machine.
For that, you need to do:

```
$ git fetch origin master
```

What this would do is:

- it will go to the url of `origin` ( will go to GitHub, to the remote repository there )
- then it will download all the commits of `master` from there into your local `origin/master` branch

After you have done `$ git fetch origin master` you see John's commits on your local machine.

Now that you have the most recent commits from the remote, from `origin`, you can do whatever you want with them,
you can even switch to the branch you have been working in and rebase it from the remote `master` branch ( so that
the branch that you are working in has the following commits history: `a -> b -> c -> ...John's commits -> ...your commits` ).
For that, you need to do:

```
$ git checkout <your-branch>
$ git rebase origin/master
```

Do note though, if you go to the usual `master` branch ( not `origin/master` branch ), it \[ `master` branch \] is not
going to have Jack's commits, it is still going to have the old commit history. This rises the question: how to make
`master` branch the same commit history as `origin/master` branch ( make it so that your local `master` branch has the
most recent commits from `remote` ). In order to do that you need to _merge_ the remote `master` branch into your
local `master` branch like this:

```
$ git checkout master
$ git merge origin/master
```

And now the commit histories of `master` and `origin/master` branches are like this:

```
master: a -> b -> c -> 1 -> 2
origin/master: a -> b -> c -> 1 -> 2
```

OK, it is `git fetch` command but then what is `git pull`?

You see, sometimes you would find yourself doing `git fetch` just to do `git merge`. In other words, sometimes you
would only need to download all the commits from the remote branch `<branch-name>` just to later on merge this remote
branch into your local branch, or, even simpler put, all too often you would need to update your local `<branch-name>`
so that it has the same commit history as the branch `<branch-name>` on GitHub. As a result, you would end up
constantly doing:

```
$ git checkout <branch-name>
$ git fetch origin <branch-name>
$ git merge origin/<branch-name>
```

That is why an alias for the 3 commands above was invented: `git pull`. When you do `git pull origin <some-branch>`,
the following happens:

- git downlands all the new commits of `<some-branch>` from GitHub to your computer
- git merges all the new commits it just downloaded into `<some-branch>`

That is why if you just want to update a branch so that it is the same as on the remote you simply do:

```
$ git pull origin <branch-name>
```

**Note:** the reason that `git` so seamlessly updates any branch when you do `git pull` is because of something
called _fast-forward merge_. Hope you remember what that is? A fast-forward merge is when a merge happens but no
merge commit is created. A fast-forward merge happens when there were no unique commits before the ones that
you are merging. In other words if you are merging `origin/master` into `master` and the commit histories of
your branches look like this:

```
origin/master:    a -> b -> c -> 1 -> 2
   |
   |
   v
master:           a -> b -> c
```

If the situation is like above you have a Fast-Forward Merge. But do note that if your branches have commit
histories like these:

```
origin/master:    a -> b -> c -> 1 -> 2
   |
   |
   v
master:           a -> b -> c -> d
```

then a merge commit **will** be created ( and even merge conflicts might arise ) because there is a unique commit
`d` after `c` and the commits that you are merging also start after the `c` commit.

So remember one rule of thumb: if you want to `git pull` a branch painlessly, make sure that it has no unique commits
compared to the remote branch that you are pulling.

**Also Note:** Sometimes you see `git fetch --all`. You see, when you do `git fetch origin master` for instance,
you are only downloading commits ( tags ) of the `master` branch from the remote called `origin`. But what if you
have many remotes and many branches?

So what the `--all` flag does is it will make `git fetch` command download new commits of _all_
the remote branches. If you have many remotes then, git will download _all_ of the remotes as well. In other words
it will update `origin/master`, `upstream/master`, ... and everything else will be brought to the same state as
on the remote GitHub repositories.

And thus is the difference between `git fetch` and `git pull`.

**Note:** when you do `git pull`, as was said, git downloads new commits from the specified branch and then tries to
merge them. I haven't, however, been super clear about where it would try to merge those newly downloaded commits.
So, yeah, be careful because if you do `git pull origin <branch-name>` git will try to merge the new commits of
the branch `<branch-name>` **into the branch you are currently on.**

## GIT Refs - GIT Internals

### HEAD

You can think of the HEAD as the _current branch_. When you switch branches with `git checkout`, the HEAD revision
changes to point to the tip of the new branch.

You can see what HEAD points to by doing:

```shell script
$ cat .git/HEAD
```

In my case, the output is:

```
ref: refs/heads/master
```

For instance if you have 2 branches:

```
master: a -> b -> c -> d
feature1: a -> b -> 1 -> 2 -> 3
```

Let's imagine that `a` - `b` and `1` - `3` are commits. Thus `feature1` is a branch whose tip is commit `1`,
while the tip of `master` branch is commit `d`. If we take a look at the file `refs/heads/master` which represents the
`master` branch we will see that it simply contains the hash of the commit `d`, which is the tip of the `master` branch.

As you know when you do `git checkout` you don't necessarily have to specify a branch name, you can also checkout to the
hash of some commit. In this case you go to the _detached HEAD_ state. Thus it also is possible for HEAD to refer
to a specific revision that is not associated with a branch name. This situation is called a _detached HEAD_.

If you go to the detached HEAD state by doing `$ git cehckout <hash-of-any-prev-commit>` and then do `$ cat /git/HEAD`
you will see that `.git/HEAD` is now _not_ this: `ref: heads/<branch-name>` but instead now the `.git/HEAD` file contains
the hash of the commit you are currently on. That is how GIT knows that we are in the detached HEAD state ( that is, by
checking that the `.git/HEAD` file is simply a commit hash and not a path to the branch in `.git/refs/heads` directory ).

In fact writing the name of a branch as in `$ git branch -D master` is just a shorter way
of writing `$ git branch -D refs/heads/master`.

Thus all local branches are just files in the `.git/refs/heads` directory, like the local branch `master` is in fact
this file: `.git/refs/heads/master`, which contains the commit hash of `master`'s top-most commit, the commit hash of
`master`'s tip. But what about _remote_ branches? Well, they are also just files except they don't live in the
`.git/refs/heads` directory. There can be many remotes. All remotes live in `.git/refs/remotes` and all the branches
of a certain remote live in their remote's corresponding directory. For instance, all the  branches of the remote called
`origin` are going to live in the `.git/refs/remotes/origin` directory. If you take a look at the directory of any remote,
`.git/refs/remotes/origin` for instance, you will see that every remote also has its HEAD and all the branches in there
( provided that you fetched them beforehand ):

```shell script
$ ls .git/refs/remotes/origin/
 HEAD  gh-pages  master
```

As you can see on the remote there live 2 branches: `master` and `gh-pages`

In the output above `HEAD` is going to be:

```
ref: refs/remotes/origin/master
```

while `.git/refs/remotes/origin/master` and `.git/refs/remotes/origin/gh-pages` and whatever else branches there may be
are simply going to be commit hashes ( the hashes of the commits that are the tips of those branches ).

So now you know what happens under the hood when you do `$ git fetch origin`: GIT is simply going to download all the
refs of the `origin` into `.git/refs/remotes/origin` so that you can use the branches and commits of
the `origin` remote.

Thus when you switch to a remote branch like so `$ git checkout origin/master` you simply switch to
`.git/refs/remotes/origin/master` but do note though that if you switch to a remote branch, you will be
in a detached HEAD state:

```shell script
$ git checkout origin/HEAD # or git checkout origin/master
$ git status
 HEAD detached at origin/master
 nothing to commit, working tree clean
```

Thus now you also understand all this verbose syntax. For instance let's try doing this:

```shell script
$ git branch --all
* master
  piskel-clone
  remotes/origin/HEAD -> origin/master
  remotes/origin/animation-player
  remotes/origin/cv
  remotes/origin/gh-pages
  remotes/origin/hexal
  remotes/origin/master
  remotes/origin/neutronMail
  remotes/origin/palette
  remotes/origin/piskel-clone
  remotes/origin/youtube-client
```

As you can see, we are currently on the `master` branch. Also, we have fetched some of the remote branches
from the remote called `origin` ( `remotes/origin` ), these are the branches like:

- `remotes/origin/animation-player`
- `remotes/origin/cv`
- `remotes/origin/gh-pages`
- `remotes/origin/hexal`
- `remotes/origin/master`
- `remotes/origin/neutronMail`
- `remotes/origin/palette`
- `remotes/origin/piskel-clone`
- `remotes/origin/youtube-client`

We also see that on the remote the `HEAD` is at the `master` branch ( `remotes/origin/HEAD -> origin/master` ).
The `HEAD` on the remote is not the same as our local `HEAD` of course. If the `HEAD` on the remote points to
the `master` branch for instance then it means that for the remote, `master` is like the default branch. There is not
probably much else information we can gain from it :)  Also, we see that locally we have only 2 branches:
`master` and `piskel-clone`.

Here is another example, let's log the last 2 commits of the `master` branch:

```shell script
$ git log -2 master 
commit 0a606a52f404f891a2ca464c928ff581a2b9af8b (HEAD -> master, origin/master, origin/HEAD)
Author: TomSssM <ilyashome3@gmail.com>
Date:   Sun Jul 21 19:34:21 2019 +0300

    feat: add a link to Piskel Clone

commit 47e9d4e84ec78838461c5b7630095206fe68c591
Author: TomSssM <43145822+TomSssM@users.noreply.github.com>
Date:   Sun Jun 9 21:48:11 2019 +0300

    feat: add palette-v3 to README.md
```

We are interested in these 2 lines:

```
commit 0a606a52f404f891a2ca464c928ff581a2b9af8b (HEAD -> master, origin/master, origin/HEAD)
...
commit 47e9d4e84ec78838461c5b7630095206fe68c591
```

because as you can see the 1st commit is the tip of 3 branches:

- `master` - local `master` branch
- `origin/master` - the `master` branch on the remote
- it is also the tip of the remote's `HEAD`: `origin/HEAD` ( thou we did know that since the remote's `HEAD`
 actually points to `origin/master` )
 
It also says that currently our _local_ `HEAD` points to the `master` branch ( which we can verify by doing
`cat .git/HEAD` ).

### Packed Refs

For large repositories, GIT will periodically perform a garbage collection to remove unnecessary objects and
compress refs into a single file for more efficient performance. You can force this compression with the garbage
collection command:

```shell script
$ git gc
```

This moves all of the individual branch and tag files in the `refs` folder into a single file called `packed-refs`
located in the top of the `.git` directory. If you open up this file, you’ll find a mapping of commit hashes to refs:

```
00f54250cf4e549fdfcafe2cf9a2c90bc3800285 refs/heads/feature
0e25143693cfe9d5c2e83944bbaf6d3c4505eb17 refs/heads/master
bb883e4c91c870b5fed88fd36696e752fb6cf8e6 refs/tags/v0.9
```

On the outside, normal GIT functionality won’t be affected in any way. But, if you’re wondering why your `.git/refs`
folder is empty, this is where the refs went.

## The `git push branch:branch` Syntax

Let's take a look at what this does:

```shell script
$ git push origin master:cool-master
```

Now the remote's `cool-master` branch is the same as our local `master` branch.

It tells GIT: push the local `master` branch to remote BUT don't try to merge it with the remote's `master` branch,
instead merge it into the remote's `cool-master` branch ( or, if `cool-master` doesn't exist on remote, create it ).

As a side note, you can also delete the remote branch by doing this:

```shell script
$ git push --delete origin cool-master
```

This tells GIT: go to the remote called `origin` and delete the `cool-master` branch there.
