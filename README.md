fastdeploy
==========

Old Fastdeploy 0.3 beta PHP code

This is an embarassing yet still evolutionary example of how my coding
style has evolved - I hope with a modicum of intelligence.

Though probably uninteresting to most of you here's some historical 
context for the code:

Fastdeploy, in a nutshell, was intended to be a Web UI front-end and
concomitant abstraction layer between a typical sysadmin's desire to 
automate operating system installation and all of the heavy lifting to 
get them there (i.e., TFTP, DHCP, manual Kickstart, etc. type files).  
I had originally envisioned it as a completely Internet-based service 
and in fact wrote an extremely simplistic UI that was linked to 
osCommerce and even a very large CRM package called VTiger.

The idea was that you'd order the automation services you wanted; e.g.,
automation of say 10 server installs and it would flow through an 
ordering system and customer information would automatically be
added to VTiger.

As it happened the idea was overly ambitious for the time and wildly
under-developed.  Those who were interested wanted it to be in their
data center anyway.

I ultimately scrapped that code and developed what you see here - 
roughly in the 2008-2009 timeframe.  The idea was it would be open source 
and I'd (hopefully) make money with freemium and professional services.  
Being a dedicated server provider myself at the time my ultimate goal was
to have a business where I was selling the pickaxes and the pans not 
mining for gold (i.e., a provider to providers rather than be one myself).

In the meantime life happened and I lost my day job, the dedicated server
business ultimately closed down, we moved to another area (North Bay 
Area), and I changed jobs twice in less than a year after being laid off
for nearly a year.  

With that for some history these days I've returned to the incipient idea
of Fastdeploy as an Internet-based service.  iPXE has been the impetus 
that has encouraged me to revisit that idea and it's truly a fantastic
Swiss Army knife for network bootstrapping.

So... for posterity I'm posting the original code for those who were 
interested in hosting something in-house.  It's strikingly obvious 
evidence that I've never been much of a programmer - in fact, it's a
fairly hideous, cobbled- and kludged-together mess - but for those 
that want some inspiration (probably for how NOT to code) it's here
for you.  

I won't pretend you should download it and try to get it to work, as that
was/is quite a chore in itself.  Several PHP PEAR libraries were required 
as was Smarty.  My more modern move to MVC frameworks to develop more
compartmentalized and organized code  - CodeIgniter, specifically - is not 
at all in evidence here.  Instead it's mostly brute force kludgery and
very, very little elegance.

Jim Antoniou
