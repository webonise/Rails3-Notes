#ENABLE SSL CERTIFICATE
	for integrating ssl certificate into our site we have to firstly purchase “ssl Cretifcate” by
	the ssl provider as Trust wave , go daddy , digicert, verisign etc.
	while Request for ssl certificate we have to also provide “csr i.e. [certificate signed request] file to providers.
	The csr file can be generate on linux by using following commands
		1. openssl genrsa -out www.thisissmith.com.key 2048 this will create a 2048 bit rsa key with named www.thisistest.com.key.
		   [dont forget to put 2048 As most provider require more than 2048 bit key].
		2. openssl req -new -newkey rsa:2048 -nodes -keyout www.thisistest.com.key -out www.thisistest.com.csr
     and after typing this command the following question will be asked for generating CSR FIle.
	   * Country name
	   * State or Province Name
	   * Locality Name
	   * Organization Name
	   * Organzanizatonal unit name
	   * Common Name
	   * Email Address

##Organization Name and Organization unit name going to Appear on url [partially green
ssl Header]
##Common name is a name of the domain on which ssl certificate going to integrate


Now you can submit this csr file to SSL Provider. and your ssl cretificate will be get issued after verification

