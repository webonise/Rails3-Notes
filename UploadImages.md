# Upload & Preview Images


* If you want to upload images and preview that uploaded images before save, then this document will help you.

* It will also help you for uploading multiple images.


# Table of Contents

* [Developing Rails applications](#developing-rails-applications)
    * [Controllers](#controllers)
    * [Models](#models)
    * [Views](#views)
    * [Javascript](#Javascript)

# Developing Rails applications

## Controllers


    ```Ruby
    class DemosController < ApplicationController
      
      def new
        @demo = Demo.new
        #It will add an empty file input field
        @demo.photos.build
        @count  = params[:count].to_i
        respond_to do |format|
          format.html
          format.js {render :layout => false}
        end
      end

      def ceate
        @demo = Demo.new(params[:demo])
        if @demo.save
          redirect_to demo_path(@demo), :notice => "Demo created successfully"
        else
          @demo.photos.build
          render :action => "new", :alert => "Sorry, Demo could not be saved. Please try again"
        end
      end
    
    end
    ```

## Models
    
    
    * Model for Demo

    ```Ruby

     class class Demo < ActiveRecord::Base
      
      has_many :photos, :dependent => :destroy

      accepts_nested_attributes_for :photos, :reject_if => proc { |attributes| attributes['image'].blank? }

     end
     ```

    * Model for Photo

    ```Ruby
    class Photo < ActiveRecord::Base
      
      belongs_to :demo, :touch => true
      has_attached_file :image,
      :styles => {:small => ["275x"],:thumb => ["x44"], :large => ["x350"], :default_url => '/images/video_img.png' },
      :convert_options => { :small => '-quality 70' }

    end
    ```

## Views

        ```Ruby
        <%= content_for :head do %>
            <%= javascript_include_tag "demos.js" %>
        <% end %>

        <%= form_for @demo, :html => { :multipart => true } do |demo| %>
            
          <%= label_tag(:image, "Upload Photo")%>
          <ul class="uploadPhotoContent">

          <%= demo.fields_for :photos do |photo| %>
               <li>
                   <span id="upload_image" class="fileinput-button">

                      <div id="imgwrap" class="formSprite filePhotoImg fileFieldImg imagewrap">
                        <%= image_tag(photo.object.image.url(:thumb), :width => "60", :height => "44") unless photo.object.new_record?%>
                      </div>
                     <%= photo.file_field :image,:class => "fileType fileTypeImg",:id => "upload-image" %>
                                        
                   </span>
               </li>
          <% end %>
          </ul>
  
         end
        ```

     * new.js.erb (This is for Upload multiple images)

     ```Ruby

        $(".uploadPhotoContent").append("<%= escape_javascript(render :partial => "multiple_image", :locals => {:count => @count }) %>");

     ```

     ```Ruby

        <li>
          <%= fields_for :photos do |photo| %>
               <span class="fileinput-button">
                   <div id="imgwrap" class="fileFieldImg imagewrap">
                   </div>
                      <%= file_field_tag "demo[photos_attributes][#{count}][image]",:class => "fileType fileTypeImg", :id => "upload" %>
                      <span  id="deleteBtn" class= "closeBtn "> </span>
               </span>
          <% end %>
        </li>

     ```

## Javascript

* demos.js

    ```Ruby
    jQuery(function(event){

        /* display preview of images chosen to upload */

        // on choosing images to upload, display small previews of each
        $(".fileType").live("change",function(event){
          var files = this.files;
          var div = $(this).siblings("div");
          showImage(files,div,this);
      
        });

      // display previews of images
       function showImage(files,div,element){
          for(var i=0;i<files.length;i++){
            var file = files[i];
              var imageType = /image.*/;
            if(!file.type.match(imageType)){
              // console.log("Not an Image");
              continue;
            }

          var image = document.createElement("img");
          var displayImage = div;
          image.file = file;
          image.width = "60";
          image.height = "44";
          displayImage.html(image);
          var count =   $(".uploadPhotoContent li").size();
          if($(element).hasClass("fileTypeImg") && $(".fileTypeImg").size() == $('.uploadPhotoContent img').size())
          {
            $.get("/demos/new",{count:count},"","script");
          }
          // read image
          var reader = new FileReader();
          reader.onload = (function(aImg){
            return function(e){
              aImg.src = e.target.result;
            };
          }(image));
          var ret = reader.readAsDataURL(file);
          var canvas = document.createElement("canvas");
          ctx = canvas.getContext("2d");
          image.onload= function(){
             ctx.drawImage(image,50,50);
          }
         }

        }

      });

    ```

    
