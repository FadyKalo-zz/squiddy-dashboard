/*globals Events, Meteor, moment*/
if (Meteor.isServer) {
// Fixture data
  if (Events.find().count() === 0) {
    var now = new Date().getTime();
    var mom = moment().format('MMMM Do YYYY, h:mm:ss a');

    var adminId = Accounts.createUser({
      username: 'admin',
      password: 'adminadmin',
//      emails: [
//        { address: "itsnotfady@gmail.com", verified: true }
//      ],
      email: "itsnotfady@gmail.com",
      profile: {
        name: 'Admin Admin',
        picture: 'https://avatars3.githubusercontent.com/u/4085789?s=460'
      }
    });

    var admin = Meteor.users.findOne(adminId);
    // create two users
    var giuseppeId = Accounts.createUser({
      username: 'giuse88',
      password: 'giuse88',
//      emails: [
//        { address: "giuse88@gmail.com", verified: true }
//      ],
      email: "giuse88@gmail.com",
      profile: {
        name: 'Giuseppe Pes',
        picture: 'https://avatars1.githubusercontent.com/u/1751200?s=400'
      }
    });
    var giuseppe = Meteor.users.findOne(giuseppeId);

    var fadyId = Accounts.createUser({
          username: 'fady',
          password: 'fadyfady',
//          emails: [
//            { address: "fadykalo@gmail.com", verified: true }
//          ],
          email: "fadykalo@gmail.com",
          profile: {
            name: 'Fady Kalo',
            picture: 'https://avatars3.githubusercontent.com/u/3518488?s=460'
          }
        }
      )
      ;
    var fady = Meteor.users.findOne(fadyId);

    var event2 = Events.insert({
      title: 'Easy Session',
      summary: "let's figure out the solution.",
      userId: giuseppe,
      author: giuseppe.profile.name,
      time: now - 13 * 3600 * 1000,
      start: now - 10 * 3600 * 1000,
      end: now - 9.5 * 3600 * 1000,
      rsvps: [
        {user: fady, rsvp: "yes"}
      ],
      invited: [fady]
//      invited: [
//        {id: fady}
//      ]
    });

    var event1 = Events.insert({
      title: 'Relaxed Chat',
      summary: "just hanging out.",
      userId: fady,
      author: fady.profile.name,
      time: now - 9 * 3600 * 1000,
      start: now - 7 * 3600 * 1000,
      end: now - 6 * 3600 * 1000,
      rsvps: [
        {user: giuseppe, rsvp: "yes"}
      ],
      invited: [giuseppe]
//      invited: [
//        {id: fady},
//        {id: giuseppe}
//      ]
    });

    var event3 = Events.insert({
      title: 'Interview Call',
      summary: "do some exercises.",
      userId: giuseppe,
      author: giuseppe.profile.name,
      time: now - 20 * 3600 * 1000,
      start: now - 12 * 3600 * 1000,
      end: now - 10 * 3600 * 1000,
      rsvps: [
        {user: fady, rsvp: "maybe"}
      ],
      invited: [fady]
//      invited: [
//        {id: giuseppe}
//      ]
    });
    var event4 = Events.insert({
      title: 'Late Call',
      summary: "I have to debug.",
      userId: fady,
      author: fady.profile.name,
      time: now - 29 * 3600 * 1000,
      start: now - 24 * 3600 * 1000,
      end: now - 23.5 * 3600 * 1000,
      rsvps: [
        {user: giuseppe, rsvp: "yes"}
      ],
      invited: [giuseppe]
//      invited: [
//        {id: fady},
//        {id: giuseppe}
//      ]
    });
    var event5 = Events.insert({
      title: 'Video Chat',
      summary: "Video Chat to arrange the work.",
      userId: giuseppe,
      author: giuseppe.profile.name,
      time: now - 100 * 3600 * 1000,
      start: now - 72 * 3600 * 1000,
      end: now - 70.5 * 3600 * 1000,
      rsvps: [
        {user: fady, rsvp: "yes"}
      ],
      invited: [fady]
//      invited: [
//        {id: giuseppe},
//        {id: fady}
//      ]
    });
  }

  if (Events.find({author: 'admin'}).count() === 0 && Meteor.users.find({username: "admin"}).count() === 1) {
    var fady = Meteor.users.findOne({username: "fady"});
//    var admin = Meteor.users.findOne({username: "admin"});
//    var profile = admin.profile = {name: "admin"}
    var event6 = Events.insert({
      title: 'ADMIN EVENT',
      summary: "some admin stuff.",
      userId: admin,
      author: admin.profile.name,
      time: now - 100 * 3600 * 1000,
      start: now - 72 * 3600 * 1000,
      end: now - 70.5 * 3600 * 1000,
      rsvps: [
        {user: fady, rsvp: "yes"},
        {user: giuseppe, rsvp: "no"}
      ],
      invited: [fady, giuseppe]
//      invited: [
//        {id: admin},
//        {id: fady}
//      ]
    });
  }
}