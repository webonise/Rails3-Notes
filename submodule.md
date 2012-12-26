#GIT SUBMODULES

in short git submodules is a concept for using third party or different repository under
your repository. and here is the steps to do the same and very simple Let see by an exmaple.

Suppose you have a project name demo and you need to add submodule_demo repository into it

so to initialize the Submodule Repository goto demo project and type command
	git submodule add git://github.com/my/submodule_demo.git ./submodule_folder

Now in this submodule folder your another repostiroy will create.
and one more file name .gitmodules file is created where configuration of submodule present.

Now the command to update the repository code into a submodule project is 
	git submodule update --init
Now You can update the code of Submodules and push to another repository using this command
git commit ./submodule_folder -m "Added submodule as ./submdule_folder"
git push origin branch-name

##For Furthut update changes here are the steps to it do the changes in submodule_demo folder
	* cd to submodule_demo folder
	* git checkout master (initially no branch is there)
	* git add .
	* git commit -m “commit message”
	* git push origin master

cd .. to your main project folder
	* git add .
	* git commit -m “commit message”
	* git push origin master

for update submodule code in another branches [as submodule are headless]
	* git submodule update
	and if submodule folder is not present then
		* git submodule init
		* git submodule update


