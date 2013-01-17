# Getting started with Ruby and RabbitMQ using bunny

The following guides helps you to get started with AMQP using Bunny. It should take about 30 minutes to read and study the provided code.

# Points that are covered:-
    * Installing [RabbitMQ] (http://www.rabbitmq.com/), a mature popular messaging broker server.
    * Installing [Bunny] (https://rubygems.org/gems/bunny) via Rubygems and Bundler.
    * Running a "Hello, world" messaging example that is a simple demonstration of 1:1 communication.

# Installing RabbitMQ:-
* For proper installation follow the steps provided in [RabbitMQ site](http://www.rabbitmq.com/).
* Once installation is done run the following command on the terminal:-
 ```bash
 rabbitmq-server
 ```

# Installing Bunny

* The guide assumes that ruby installed is of `1.9.2 or higher version`.
* Run the following command in the terminal:-
 ```bash
  gem install bunny
 ```

* The above command will install bunny gem of 0.8.0 version.


# "Hello World" example

  Let us begin with the classic "Hello, world" example. First, here is the code:

  ```ruby

  require "bunny"

  bunny_obj = Bunny.new

  # start a communication session with the amqp server
  bunny_obj.start

  # declare a queue
  queue = bunny_obj.queue("test1")

  # declare default direct exchange which is bound to all queues
  exchange = bunny_obj.exchange("")

  # publish a message to the exchange which then gets routed to the queue
  e.publish("Hello, everybody1!", :key => 'test1')

  # get message from the queue
  msg = q.pop[:payload]

  puts "This is the message: " + msg + "\n\n"

  # close the connection
  b.stop
  ```


