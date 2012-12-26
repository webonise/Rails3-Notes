# Browser CMS

## Introduction :
BrowserCMS is a general purpose, open source Web Content Management System (CMS), written in Ruby on Rails. It is designed to support three distinct groups of people:

* Non-technical web editors who want a humane system to manage their site, without needing to understand what HTML or even Rails is.
* Designers who want to create large and elegantly designed websites with no artificial
constraints by the CMS.
* Developers who want create CMS driven websites for their clients, or add a CMS to their
Rails applications.

## Features :

Here's a quick overview of some of the more notable features:
* **It's just Rails:**
        Each CMS project is a rails project that depends on the BrowserCMS gem. Developers can add new controllers, views, etc., just like any rails project.
* **Runs on Rails 3.2:**
	Developers can use the latest APIs and features from Rails 3.2 on their BrowserCMS projects.
* **Direct in context editing:**
	Users can browse their site to locate content and change it right on the page itself.
* **Design friendly Templates:**
	Pages aren't just a template and giant single chunk of HTML. Templates can be built to have multiple editable areas, allowing for rich
designs that are still easy to manage by non-technical users. Developers can configure permission models and templates to ensure design integrity.
* **Sitemap:**
	An explorer/finder style view of sections and pages in a site allows users to add and organize pages.
* **Content Library:**
	Provides a standardized 'CRUD' interface to allow users to manage both core and custom content types.
* **Content API:**
	A set of behaviors added to ActiveRecord that allows for versioning,auditing, tagging, and other content services provided by the CMS.
* **Section Based Security:**
	Admins can control which users can access specific sections(public users), as well as who can edit which pages (cms users).
* **Workflow:**
	Supports highly configurable permission models that controls which users can edit, publish, or otherwise contribute. Content can be assigned to users for further editing or review.
* **Page Caching:**
	Full page caching allows the web server (Apache) to serve HTML statically for any pages that have not changed, reducing server load.


## Basic Concept :
There are several concepts which underly how BrowserCMS works. To be productive, users of BrowserCMS should ideally understand these ideas:
* **Pages**
	Visitors experience your site primarily via pages. Pages are really compound documents, consisting of more than one editable area of content. The allows for intricate design, without needing to be edited via single giant HTML area.
* **Content Blocks**
	Blocks are the most granular bits of content in a system. Pages usually have one or more blocks of content associated with them. Content blocks can be anything from a simple fragment of HTML, to a News Article (which might have multiple data fields like name, body and summary), to portlets, which dynamically display other types of content.
* **Portlets**
	Sometimes you don’t want to manually place all the content on your site. You want to set up some rules, so that when new content is entered, it appears in multiple places. Portlets are generally how that gets done. Portlets are really just a slightlyspecial version of blocks, which generally query for other blocks, and then format them for display.
* **Sections** 
        Each page lives in a section. Sections the primary way pages are organized.Menus are usually dynamically constructed based off the hierarchy of sections and pages. Sections also handle security, where individual groups are allowed to see pageswithin a given section. Sections and pages can be reordered by using the Site Map tab.
* **Templates** 
	Each page has a template, which handles governs the styles and layout for that page. A template will determine what areas of the page are editable, how many columns it has and how the navigation will work. A website will usually have multiple templates (i.e. Home Page and Subpage) which provide different layout choices for users when they create new pages.
* **Users and Groups**
	 Security is handled via users and groups. A user might represent a ‘public’ user, who can access some sections of your website (like a ‘Members only section’). Or they might be a ‘CMS’ user who has the ability to make changes to the content via the CMS editing tools. Each user can be part of multiple groups, which define what they can do, including editing pages, viewing content or publishing new pages.

      To create website with BrowserCMS we need to follow just few steps :
* $ gem install browsercms
* $ bcms demo project_name
* $ cd project_name
* $ rake db:install
* $ rails server



## Modules :
Modules are the easiest way to create and share new features between BrowserCMS projects. By creating new modules to extend the functionality of the core BrowserCMS project, the community can help make developing web sites faster and easier
through reusable code.
	There are inbuilt modules available we need to include those module in our
project as per requirements.

To include module in project, these are the steps :
* $ gem install module_name
* $ rails g cms:install module_name
* $ rake db:migrate
* $ rails s

## Some useful links :
[how to use BrowserCMS to build and manage websites](https://github.com/browsermedia/browsercms/wiki/User%27s-manual)

[Add BrowserCMS to an existing project](https://github.com/browsermedia/browsercms/wiki/Adding-BrowserCMS-to-an-existing-Rails-project)











	






	



       

