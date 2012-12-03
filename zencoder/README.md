Reference link
http://www.nickdesteffen.com/blog/video-encoding-with-uploadify-carrierwave-and-zencoder
https://app.zencoder.com/docs/api


1. Add zencoder gem in Gemfile do bundle install
gem "zencoder"

#I'm going to assume you have a Zencoder account.

#Login and click API. Take note of the key.
#Create a Rails initalizer for zencoder.

#/config/initalizers/zencoder.rb

Zencoder.api_key = '4b1c8c52a558ed914f9675afdcc099e9'


Create CarrierWave uploader

One of the things I really like about CarrierWave is that it pushes all the attachment processing code off into it's own reusable class called an uploader. Next up is creating an uploader to handle videos.

  $ bundle exec rails g uploader video

#Update the generated uploader, make sure you remove the storage :file line, we configured this in the CarrierWave initalizer
#Update the extension whitelist to include video formats you accept
#Uploaders have callbacks, similar to ActiveRecord models. This is where we'll tell Zencoder the file has been uploaded.
#Creating a Zencoder job:
#Input should be the location of the video that was uploaded
#Outputs should be an array. You can tell Zencoder to encode multiple formats, just label each hash of options appropriately (web, mobile, etc.)
#After a job is submitted Zencoder will respond with an array of jobs that it has created. We need to loop over the array of jobs from Zencoder and grab the output id and update the model.
#The notifications option is where we'll tell Zencoder to we want to receive the callback. This is the controller we created earlier.



#/app/uploaders/video_uploader.rb

class VideoUploader < CarrierWave::Uploader::Base
  include Rails.application.routes.url_helpers

  Rails.application.routes.default_url_options = ActionMailer::Base.default_url_options

  after :store, :zencode

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_white_list
    %w(mov avi mp4 mkv wmv mpg)
  end

  def filename
    "video.mp4" if original_filename
  end

  private

  def zencode(args)
    input = "cf://rackspace_username:rackspace_api_key@blog.uploads/uploads/video/attachment/#{@model.id}/video.mp4"
    base_url = "cf://rackspace_username:rackspace_api_key@blog.uploads/uploads/video/attachment/#{@model.id}"

    zencoder_response = Zencoder::Job.create({
      :input => input,
      :output => [{
        :base_url => base_url,
        :filename => "video.mp4",
        :label => "web",
        :notifications => [zencoder_callback_url(:protocol => 'http')],
        :video_codec => "h264",
        :audio_codec => "aac",
        :quality => 3,
        :width => 854,
        :height => 480,
        :format => "mp4",
        :aspect_mode => "preserve",
        :public => 1
      }]
    })

    zencoder_response.body["outputs"].each do |output|
      if output["label"] == "web"
        @model.zencoder_id = output["id"]
        @model.processed = false
        @model.encoder_state = output["state"]
        @model.job_id = zencoder_response.body["id"]
        @model.save(:validate => false)
      end
    end
  end

end




#checking process state
# Zencoder::Output needs to output id which we have received in response from zencoder to get process update
# when you request details it send the response with all details about the current status of the process
# You can call following method on specific interval to get status of the job and terminate the call once you get the process
# state as finished

resp = Zencoder::Output.details(@video.zencoder_id)


