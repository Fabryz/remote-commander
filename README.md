Remote Commander
======

Connect directly to a client and remotely control it via WebSockets

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

1. Clone the repository with ``git clone git://github.com/Fabryz/remote-commander.git remote-commander``
2. Install dependencies with ``npm install -d``
3. Start the server with ``node server.js`` or ``nodemon server.js`` if you have it
4. Point your browser to ``YOUR_SERVER_IP:8080`` and copy the numeric id
5. Point your (other?) browser to ``YOUR_SERVER_IP:8080/rc/<numeric_id>`` and send whatever you want to the first client
6. Do wizardry

License
-------

Copyright (C) 2011 Fabrizio Codello

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
