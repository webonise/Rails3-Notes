#Google Maps
Rails provides different gems to integrate maps in a Ruby on Rails project.
Geocoder and gmaps4rails is among the most popular gems and work well while providing ample features.

##Geocoder
The Geocoder gem allows us to use Ruby to perform geocoding i.e obtaining the latitude and longitude from the given location/ip address and reverse geocoding i.e obtaining the address(location) from the given co-ordinates.

You can use
###
    gem install geocoder

or you can add the below gem to your gemfile
###
    gem 'geocoder'

and run
###
    bundle install

After having added the gem, we also need to add fields to store the latitude and longitude to the model which will be used while geocoding.
Example - 
If we have a model Address that contains the street_name, city, state, country, zipcode. We may add two more fields here viz. latitude and longitude which are of type float.

###Migrations :
    rails g migration add_latitude_and_longitude_to_address latitude:float longitude:float
    rake db:migrate
    
Now include the following lines in your model. This tells our model what address it is to use for geocoding purpose.
###
    geocoded_by :street_name
    after_validation :geocode
    
after_validation gets us the latitude and longitude after validating the given address.

For reverse geocoding, we supply the latitude and longitude in the below manner which tells the geocoder that it is to use these coordinates to fetch the address of the location.
###   
    reverse_geocoded_by :latitude, :longitude
    after_validation :reverse_geocode
    
after_validation validates the given coordinates and returns the valid address for those coordinates.
	

##Example
###*Geocoding
    search = Geocoding.search("Central Park, New York")
 
will return
    
    search[0].latitude	# =>	40.7736154
    search[0].longitude	# =>	-73.9711057
    search[0].address	# =>	"Central Park, 14 East 60th Street, New York, NY 10022, USA"


*To find all the locations in your model around a certain location
###
    Address.near("Central Park, New York")
will return all the address entries in your Address model that are near the specified location.

We can also give an additional parameter that specifies the radius from the entered location within which we are supposed to search.

###
    search = Geocoding.search("Central Park, New York", 4)
    
* bearing_to method of the Ruby Geocoder gem will give us the directions from the stored location to the given location.

###Example
Suppose we have stored an address location inside a variable 'loc', we can find the directions in the following way

    loc.bearing_to("NYC")

This will return the directions from the address inside loc to the given location(here - NYC)

* To get the distance from the given location to the searched location, we use distance_to.

###Example
    loc.distance_to("NYC")
    
This will return the distance from the address stored within loc and NYC.
