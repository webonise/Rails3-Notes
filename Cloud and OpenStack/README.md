#Cloud Computing and OpenStack


#Concept of IaaS and Cloud Operating System :

##Cloud Operating System:
Cloud Operating Systems are synonymous to cloud management systems. The cloud OS administers the complexity of a distributed infrastructure in the execution of virtualized service workloads. They manage several servers and hardware devices and their infrastructure services which make up the cloud system.


##IaaS:
The foundation of any cloud computing stack begins with its infrastructure. Infrastructure as a Service (IaaS) cloud computing is the delivery of computing on demand as a shared service, avoiding the cost of investing in, operating and maintaining hardware. IaaS allows developers to entirely control the provisioning, configuration and deployment of virtual machines.

###IaaS delivers:
* resources like servers, storage and network components
* lower total cost of ownership
* full scalability
* eliminate/minimize the need for administration and maintenance of hardware.


![IaaS PaaS SaaS](https://raw.github.com/webonise/Rail3-Notes/master/Cloud%20and%20OpenStack/cloud-structure.jpg)


![Cloud Computing Infrastructure](https://raw.github.com/webonise/Rail3-Notes/master/Cloud%20and%20OpenStack/cloud-virtualization.gif)

*(fig.) Cloud Computing Infrastructure

#OpenStack

##What is OpenStack?
OpenStack is an open source and scalable operating system for building public and private clouds. It provides control over compute, storage and networking resources.


![OpenStack modular Architecture](https://raw.github.com/webonise/Rail3-Notes/master/Cloud%20and%20OpenStack/OpenStack-structure.gif)
(fig.) Cloud Computing Infrastructure

###OpenStack Compute:

* Provide and manage large networks of virtual machines.
* Compute resources are available to developers through API’s and can be used by them to build their cloud applications.
* Compute resources are architectured to scale horizontally.

###Flexible Architecture:

* OpenStack is architectured to provide flexibility while designing our cloud architecture.
* Does not bind us with any proprietary hardware or software. Gives the ability to integrate with third party and legacy systems.
* Designed to manage and automate pools of compute resources.
* Can work with widely available virtualization technologies and bare metal and HPC configurations.
* Can deploy OpenStack compute using XenServer and KVM hypervisor technologies.
* Supports ARM and other architecture.


###OpenStack Storage:

* Object and Block storage for use with servers and applications.
* Object Storage -  This is a distributed storage system. Has no central “brain”.
* Provides redundant and scalable object storage using clusters of standardized servers.
* Ideal for cost-effective and scale-out storage.
* Provides fully distributed, API accessible storage platform - this can be integrated directly into our applications or used for backup, archiving and data-retention.
* Not having a central brain makes room for scalability, redundancy and durability.
* Objects and files are written to multiple disk drives spread across servers in the data center (integrity and data replication taken care by OpenStack software).
* Horizontal scaling by addition of new servers.
* Block Storage - Allows block devices to be exposed and connected to compute instances for expanded storage, better performance and integration with enterprise storage platforms.
* Persistent block level storage devices with openstack compute instances.
* Block storage system manages creation, attaching and detaching of block devices to servers.
* Appropriate for performance sensitive scenarios like db storage, expandable file systems or providing a server with access to raw block level storage.
* Snapshot management is used for data backup on block storage. Snapshots are used to create a new block storage level and can also be restored.

###Networking :

* OpenStack provides pluggable, scalable, API-driven network and IP management.
* OpenStack ensures network will not become a bottleneck or limiting factor in a cloud deployment.
* Provides flexibility networking models(standard models - flat networks and VLAN’s for separation of traffic and servers ).
* Manages IP addresses allowing for dedicated static IP’s or DHCP - floating IP’s provide the benefit of dynamic rerouting to any of our compute resources in case of traffic or failure.
* Allows user to create their own networks, control traffic and connect servers and devices to one or more networks.
* User’s advantage - make use of commodity gear or advanced networking services provided by vendors(because of pluggable backend architecture).
* Admin advantage - use the software-defined networking (SDN) technology like OpenFlow to allow for high levels of multi-tenancy and massive scale.
* Extension framework allowing additional network services such as Intrusion Detection System (IDS), load balancing, firewalls and VPN’s to be deployed and managed.


##Installing OpenStack on Ubuntu 12.04LTS :
To install OpenStack on your Ubuntu 12.04LTS machine visit [OpenStack installation Guide](http://www.stackgeek.com/guides/gettingstarted.html).
