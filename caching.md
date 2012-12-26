#There are mainly Three types of caching in rails
	* Page Caching
	* Fragment Caching
	* Action Caching

	## Page Caching :
		It is Used when we require to cache whole page of an action
		to add page caching for an action. for example
	```Ruby
	class PageController < ApplicationController
  		caches_page :show,:app_pages #Here show and app_pages are actions of page controller.
	end
	```
        
	and we can expire the page cache by
	```Ruby
		expire_page(:controller => "pages", :action => :show)
    ```

	## Fragment Caching :
		Fragment Caching is a caching which required to use when a particular part of view is need to be cached
		for example
		       ```Ruby
			    <% cache('footer') do %>
				#view code which need to be cached
			    <% end%>
			   ```Ruby
		and we can expire the fragment by
		```Ruby
			expire_fragment("footer")
	    ```

	## Action Caching :
		Action caching is a similer to page caching. only difference is that the Hooks such as before_filters are executed before going to that action.

	for example
    ```Ruby
	class PageController < ApplicationController
              caches_action :show,:app_pages #Here show and app_pages are actions of page controller.
        end
     ```
	
	and we can expire the page cache by
	```Ruby
                expire_action(:controller => "pages", :action => :show)
    ```


 And we can use other parameter with caching as well for example
```Ruby
 :layout => false # if we not want whole layout to be cached
 :if => lambda {!request.xhr? } #this is the procedure written which allow to cache action whent teh request is not an ajax request
 ```

Majorly we need to expire caching when something updated on the syStem which belongs to that page
For this we can use Sweeper whose work is to Observe model and expire the action when something is updated on that model.

##Sweeper

Here is an example for how to write sweeper method
```Ruby
	class ProductSweeper < ActionController::Caching::Sweeper
  observe Product # This sweeper is going to keep an eye on the Product model. we can add here multiple model as well.
 
  # If our sweeper detects that a Product was created call this
  def after_create(product)
    expire_cache_for(product)
  end
 
  # If our sweeper detects that a Product was updated call this
  def after_update(product)
    expire_cache_for(product)
  end
 
  # If our sweeper detects that a Product was deleted call this
  def after_destroy(product)
    expire_cache_for(product)
  end
 
  private
  def expire_cache_for(product)
    # Expire the index page now that we added a new product
    expire_page(:controller => 'page', :action => 'show')
 
    # Expire a fragment
    expire_fragment('footer')
  end
end
```
