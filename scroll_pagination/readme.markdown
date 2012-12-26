Scroll-pagination
=================

---

> Adding up scroll-pagination functionality take just few steps as follows:

* Calculate total number of items (probably this will be done at server side) and add it somewhere in page's html (good way is to add it as a `data` or `rel` attribute on a tag).
Here for demonstration, we'll grab total number of items from `rel` attribute on a tag which has a `class` attribute value as `itemList`.

* Decide (calculate) at which height from bottom of page you want to fire an AJAX request to load next items. Later, we'll set this in a variable named `nextItemsLoadSpot`.

* Decide how many items you want to display on per page (request) basis. Later, we'll set this in a variable named `perPageItems`.

* Create a page (probably on server-side) from where the (next) items (here, wrapped inside li tags) will be fetched via an AJAX request while scrolling. Here, for demonstration, we're using `items` page on our own domain. Here on this page you will get `next_page` as a GET parameter when an AJAX request is fired -- from this `next_page` you can retreive next set of items from database and return those as response (or can render a custom partial template).

* Add JavaScript function named onScroll as below when DOM gets ready. At this stage, all above steps are covered:

  ```javascript
    $(document).ready(function() {

      $(document).bind('scroll', onScroll);

      function onScroll(event) {
        var totalItems = parseInt($(".itemList").attr("rel"));
        var itemsOnPage = $(".itemList > li").length;
        var nextItemsLoadSpot = 500;
        var perPageItems = 20;
        var isCloseToBottom = ($(window).scrollTop() + $(window).height() > $(document).height() - nextItemsLoadSpot);

        if(isCloseToBottom && itemsOnPage < totalItems) {

          nextPageNumber = Math.floor(itemsOnPage/perPageItems) + 1;

          $.ajax({
            url: "/items",
            type: 'GET',
            data: { next_page: nextPageNumber },
            dataType: "html",
            beforeSend: function(data){
                         $(document).unbind('scroll');
                        },
            error: function(data){
                    $(document).bind('scroll', onScroll);
                  },
            success: function(data){
                      $(".itemList").append(data);
                     $(document).bind('scroll', onScroll);
            }
          }); // ENDS AJAX request
        } // ENDS if condition
      } // ENDS function onScroll
    }); // ENDS DOM ready
  ```