#gmaps4rails

##Introduction
Gmaps4Rails is a gem that lets us integrate google maps in our rails application using google's v3 api's. It allows us to map data from our models or from a json object and point them on our map.

###We need to first install the gem.
    gem 'gmaps4rails'
and run 
###    
    bundle install

We then need to run the generator 
###
    rails g gmaps4rails:install
this copies all the required assets(javascript/coffeescript) into your application.

And lastly, we need to include in the footer of our layout.
###    
    <%= yield :scripts %> (in your footer)
This will include all the javascript from the map provider(in this case - google), custom javascript to display the map and the javascript provided by the gem.

In the model, where we will obtain the json data from to display on the map, we will add 'acts_as_gmappable'.
##Example - 
Suppose we have a model Address with fields street_address, city, state, country and zipcode.
    acts_as_gmappable
    
    #to retrieve the entire address from the model as a string instead of calling a db column.
    def full_address
      "#{self.street}, #{self.city}, #{self.country}"
    end
    
##Customizing Maps
If we want to display the map in the view, we add the following code in our view along with the following javascript to show a marker on the map as per the returned json object. The markers will point to the locations returned in the json object.
###
    #page.haml

    = gmaps(map_options: map_options(address))
    
When the map loads, we would want a marker to be placed in some relevant default location. Here we can place the marker at the user's current location obtained by the user's ip address. To get the co-ordinates of some other location, we can also drag the marker to the desired location or click on the desired location. The coffeescript for this is as follows -
###
    #The initialize method will create and position the marker at the current location.
    @initialize = ->
      if window.current_position
      clearInterval(window.interval)
      create_marker(current_position[0],current_position[1])


    @getLocation = (action) ->
      coord = $(".coord").data("coords")
      if(coord=="")
        if navigator.geolocation
          navigator.geolocation.getCurrentPosition setPosition, ((error) ->
          alert "Please enable your GPS position future."
          ),
           enableHighAccuracy: true
        else
          alert "Please enable your GPS position future."
      else
        window.current_position = [coord[0], coord[1]]
    
    setPosition = (position) ->
      window.current_position = [position.coords.latitude, position.coords.longitude]
This will get the location of the user from the co-ordinates(latitude and longitude). It will center the co-ordinates in the maps window.

The following coffeescript enables the user to drag and position the marker or place it at the clicked location. The create marker method will also create a marker along with the set parameters.
###
    @handle_click = ->
      if Gmaps.map != undefined
        clearInterval(window.map_click_interval)
        Gmaps.map.map.addListener "click", (latlng,b) ->
        create_marker(latlng.latLng.lat(), latlng.latLng.lng())

    HandleDrag = (marker) ->
      Gmaps.map.HandleDragend = (pos) ->
        set_address pos
      google.maps.event.addListener marker, "dragend", ->
        Gmaps.map.HandleDragend @getPosition()

    marker = null
    @create_marker = (lat, long) ->
      unless marker
        first_marker = true 
      else
       marker.setMap(null)
    marker = Gmaps.map.createMarker
      Lat: lat
      Lng: long
      rich_marker: null
      marker_picture: ""
      marker_draggable: true
    HandleDrag marker
      set_address(marker.position)
  




    
    
    
    
    
    
    
    
    
    
