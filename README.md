Rail3-Notes
===========

New Project setup files like database.yml , .gitgnore and etc files example just copy and paste while creating new rails 3 project.


h1. Rails .gitignore

A *.gitignore* file to accommodate Rails 3 projects.

h2. More Information

Some files in a Rails project should not be checked into a Git version control repository. You can tell git to ignore certain files by creating a file called *.gitignore* in the top level of your working directory.

Rails 3 automatically creates a simple *.gitignore* file when a new application is generated. Here you'll find an example of a *.gitignore* file that designates additional files that may be part of a typical project.

h2. Using the File

Copy the example file *gitignore.txt* to the top level of your working directory and rename it *.gitignore*.

Note that git will not ignore a file that was already tracked before a rule was added to this file to ignore it. In such a case the file must be un-tracked, usually with @git rm --cached filename@.
