squiddy-dashboard
=================

squiddy-dashboard is a meteorite package which provides the main dashboard for Squiddy.

Event
-----

An Event is made of:

* title: String,
* summary: String,
* userId: user id,
* author: user id .profile.name,
* time: Date,
* start: Date,
* end: Time,
* invited: Array of user id's that are invited,
* participants: Array of objects like {user: userId, rsvp: "yes"}

Notes
-----

1. `home.js` contains the entire `core.js` from the framework, i'm slowing incorporate that into meteor code.
2. `client/compatibility/` put here common js functions used in templates.
