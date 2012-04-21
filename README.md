Remote Commander
================

Remotely connect and control a client, using Node.js and Socket.IO

Demo [http://remote-commander.nodejitsu.com](http://remote-commander.nodejitsu.com/)

Requirements
------------

* [Node.js](http://nodejs.org/)
* [Npm](http://npmjs.org/)

Modules:

* [Socket.io](http://socket.io/)
* [Express](http://expressjs.com/)
* [Jade](http://jade-lang.com/)

Installation
----------

1. Clone the repository with ``git clone git://github.com/Fabryz/remote-commander.git``
2. Install dependencies with ``npm install``
3. Start the server with ``node server.js``
4. Point your Remote browser to ``YOUR_SERVER_IP:8080``, use your smartphone on the QRCode or just open the link in a new tab to control the Remote
5. You can see a list of all the connected clients on ``YOUR_SERVER_IP:8080/rc/``
6. Do wizardry

I have used ``html2jade`` module do quickly convert html to jade templates:

1. Install it with ``[sudo] npm install -g html2jade``
2. Use ``html2jade views/*.html`` to convert stuff

License
-------

Copyright (C) 2012 Fabrizio Codello

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.