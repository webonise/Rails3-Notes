#Spree

Spree is a full featured commerce platform written for the Ruby on Rails framework. It is designed to make programming commerce applications easier by making several assumptions about what most developers needs to get started.

#Installation

          $ gem install spree
          $ spree install 
          
# Table of Contents
    
* [Custom Authentication in Spree](#custom-authentication-in-spree)
* [Role Management in Spree](#role-management-in-spree)
* [Logic Customization in Spree](#logic-customization-in-spree)
    * [Extending Classes](#extending-classes)
    * [Adding a custom method to the Model](#adding-a-custom-method-to-the-model)
    * [Adding a custom method to the Controller](#adding-a-custom-method-to-the-controller)
* [View Customization in Spree](#view-customization-in-spree)
    * [Using Deface for view customization](#using-deface-for-view-customization)
    * [Replacing entire view templates](#replacing-entire-view-templates)
* [Overriding Spree’s core assets](#overriding-spree’s-core-assets)
    * [Overriding individual CSS styles](#overriding-individual-css-styles)
    * [Overriding entire CSS files](#overriding-entire-css-files)
    * [Overriding individual JavaScript functions](#overriding-individual-javaScript-functions)
    * [Overriding entire JavaScript files](#overriding-entire-javaScript-files)
    * [Overriding images](#overriding-images)
    
# Custom Authentication in Spree

In Demo store we used spree E-Commerce Platform. For admin side authentication we used Rails Devise. Spree already provide Devise for user and admin authentication but we customized spree authentication to achieve different admin roles and their authentication. For this we refereed [Spree Custom Authentication](http://guides.spreecommerce.com/authentication.html)

# Role Management in Spree

Spree by default provide only two major roles (user & admin) but in Demo store we created multiple admin roles (super admin & admin) to achive this spree provide Rails cancan. Using this we customized cancan so that we can manage multiple admin roles with different privileges. For this we refereed [Spree Role Management](http://guides.spreecommerce.com/security.html#authorization)

# Logic Customization in Spree

In Demo store we overridden Spree’s business logic (models, controllers, helpers, etc) as per requirement.

## Extending Classes

Standard practice for including such changes in your application or extension is to create a file within the relevant app/models or app/controllers directory with the original class name with _decorator appended.

* To activate your decorators you need to include the following code in your lib/spree_site.rb or lib/extension_name.rb file:

```Ruby
Dir.glob(File.join(File.dirname(__FILE__), "../app/**/*_decorator*.rb")) do |c|
    Rails.configuration.cache_classes ? require(c) : load(c)
end
```

## Adding a custom method to the Model

* app/models/product_decorator.rb

```Ruby
Spree::Product.class_eval do
    def some_method
        ...
    end
end
```
## Adding a custom method to the Controller

* app/controllers/products_controller_decorator.rb

```Ruby
Spree::ProductsController.class_eval do
    def some_action
        ...
    end
end
```

The exact same format can be used to redefine an existing method.

# View Customization in Spree

View customization allows you to extend or replace any view within a Spree. Their are options available:
* Using Deface for view customization
* Replacing entire view templates

## Using Deface for view customization

Deface is a standalone Rails 3 library that enables you to customize Erb templates without needing to directly edit the underlying view file. Deface allows you to use standard CSS3 style selectors to target any element (including Ruby blocks), and perform an action against all the matching elements.

For example, take the Checkout Registration template, which looks like this:
* app/views/spree/checkout/registration.html.erb

```erb
<%= render :partial => 'spree/shared/error_messages', :locals => { :target => @user } %>
<h2><%= t(:registration) %></h2>
<div id="registration" data-hook>
  <div id="account" class="columns alpha eight">
    <!-- TODO: add partial with registration form -->
  </div>
  <% if Spree::Config[:allow_guest_checkout] %>
    <div id="guest_checkout" data-hook class="columns omega eight">
      <%= render :partial => 'spree/shared/error_messages', :locals => { :target => @order } %>
      <h2><%= t(:guest_user_account) %></h2>
      <%= form_for @order, :url => update_checkout_registration_path, :method => :put, :html => { :id => 'checkout_form_registration' } do |f| %>
        <p>
          <%= f.label :email, t(:email) %><br />
          <%= f.email_field :email, :class => 'title' %>
        </p>
        <p><%= f.submit t(:continue), :class => 'button primary' %></p>
      <% end %>
    </div>
  <% end %>
</div>
```

If you wanted to insert some code just before the #registration div on the page you would define an override as follows:

* app/overrides/registration_message.rb

```Ruby
Deface::Override.new(:virtual_path  => "spree/checkout/registration",
                     :insert_before => "div#registration",
                     :text          => "<p>Registration is the future!</p>",
                     :name          => "registration_future")
```

This override **inserts** <p>Registration is the future!</p> **before** the div with the id of “registration”.

Deface currently supports the following actions:
* :remove – Removes all elements that match the supplied selector
* :replace – Replaces all elements that match the supplied selector, with the content supplied
* :insert_after – Inserts content supplied after all elements that match the supplied selector
* :insert_before – Inserts content supplied before all elements that match the supplied selector
* :insert_top – Inserts content supplied inside all elements that match the supplied selector, as the first child
* :insert_bottom – Inserts content supplied inside all elements that match the supplied selector, as the last child
* :set_attributes – Sets (or adds) attributes to all elements that match the supplied selector, expects :attributes option to be passed


## Replacing entire view templates

Sometimes the customization required to a view are so substantial that using a Deface override seems impractical. Spree also supports the duplication of views within an application or extension that will completely replace the file of the same name in Spree.
To override any of Spree’s default views including those for the admin interface, simply create a file with the same filename in your app/views directory.
For example, to override the main layout, create the file
* app/views/spree/layouts/spree_application.html.erb


# Overriding Spree’s core assets

It’s recommended to attempt to replace as little as possible in a given JavaScript or stylesheet file.

## Overriding individual CSS styles

Say for example you want to replace the following CSS:
* app/assets/stylesheets/store/screen.css

```css
div#footer {
    clear: both;
}
```

You can now just create a new stylesheet insideyour_app/app/assets/stylesheets/store/ and include the following CSS:
* app/assets/stylesheets/store/foo.css

```css
div#footer {
    clear: none;
    border: 1px solid red;
}
```

The store/all.css manifest will automatically include foo.css and it will actually include both definitions with the one from foo.css being included last, hence it will be the rule applied.

## Overriding entire CSS files:

To replace an entire stylesheet as provided by Spree you simply need to create a file with the same name and save it to the corresponding path within your application’s or extension’s app/assets/stylesheets directory.
For example, to replace store/all.css you would save the replacement toyour_app/app/assets/stylesheets/store/all.css.

## Overriding individual JavaScript functions:

A similar approach can be used for JavaScript functions. For example, if you wanted to override the show_variant_images method:

* app/assets/javascripts/store/product.js 

```js
var show_variant_images = function(variant_id) {
  $('li.vtmb').hide();
  $('li.vtmb-' + variant_id).show();
  var currentThumb = $('#' + $("#main-image").data('selectedThumbId'));
  // if currently selected thumb does not belong to current variant, nor to common images,
  // hide it and select the first available thumb instead.
  if(!currentThumb.hasClass('vtmb-' + variant_id) && !currentThumb.hasClass('tmb-all')) {
    var thumb = $($('ul.thumbnails li:visible').eq(0));
    var newImg = thumb.find('a').attr('href');
    $('ul.thumbnails li').removeClass('selected');
    thumb.addClass('selected');
    $('#main-image img').attr('src', newImg);
    $("#main-image").data('selectedThumb', newImg);
    $("#main-image").data('selectedThumbId', thumb.attr('id'));
  }
}
``` 

Again, just create a new JavaScript file insideyour_app/app/assets/stylesheets/store and include the new method definition:

* app/assets/javascripts/store/foo.js

```js
var show_variant_images = function(variant_id) {
  alert('hello world');
}
``` 

The resulting store/all.js would include both methods, with the latter being the one executed on request.

## Overriding entire JavaScript files:

To replace an entire JavaScript file as provided by Spree you simply need to create a file with the same name and save it to the corresponding path within your application’s or extension’s app/assets/javascripts directory.
For example, to replace store/all.js you would save the replacement to: your_app/app/assets/javascripts/store/all.js.

## Overriding images:

Finally, images can be replaced by substituting the required file into the same path within your application or extension as the file you would like to replace.
For example, to replace the Spree logo you would simply copy your logo to: your_app/app/assets/images/admin/bg/spree_50.png.
