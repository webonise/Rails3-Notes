Creating Secure API For Mobile

Here are the few steps we are taken to make more secure api’s in checkinforgood.

    Firstly we created a signed_key from all the parameters we are sending from mobile by appending each parameters in alphabetical order

    These signed_key also need to sent with parameters which is encrypted with secret key for ex - “Abc123$”

    Now when a website get a request from the mobile. the website will also generate a signed_key by using all the parameters and that secret key .
    we used Hmac-sha1 algorithm for encryption for better we can use more bit key as well.

    Now when a signed_key created by mobile and signed_key created by web match then only we give response to him or else we will give a empty json response with 406 Status code header.

Here is an example to write generic before_filter for checking encryption of api using parameter

class ApiAuthentication
  #This methods create a digest using the values in params and create a encrypted string using secret key that we used for authentication of API
  # Each Time this Signed key will be different according to the parameters

  def self.is_response_authenticated?(params)
    Rails.logger.info("============BEFORE================================#{params.inspect}")
    parameter_data = params.reject{|key,value| ["action","signed_key","controller","format","photos"].include?(key)}
    Rails.logger.info("============Param DATA================================#{parameter_data.inspect}")
    hdata =  parameter_data.sort.collect{|i| i.last}.join("")
    Rails.logger.info("============Hdata DATA================================#{hdata.inspect}")

    Rails.logger.info("============AFTER===#{parameter_data.sort.collect{|i| i.first}.inspect}=============================#{parameter_data.inspect}")
    digest_sig = OpenSSL::HMAC.hexdigest("sha1",SECRET_KEY, hdata)
    Rails.logger.info("=======GENERATED=====KEY===============#{digest_sig}")
    unless params[:signed_key].to_s == digest_sig
      Rails.logger.error "Invalid Secret key : #{params[:signed_key].to_s}"
      return false
    else
      return true
    end
  end
end

and here in befor filter we can write this to check authenticity of response

 def check_response
   unless ApiAuthentication.is_response_authenticated?(params)
      head :status => 302
    end
 end

