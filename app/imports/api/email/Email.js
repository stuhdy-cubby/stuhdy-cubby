import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { check } from 'meteor/check';

Meteor.startup(() => {
  // code to run on server at startup
  // process.env.MAIL_URL = 'smtp://stuhdy.cubby%40gmail.com:3stUHdycubby@smtp.gmail.com:587/';

  const smtp = {
    username: 'stuhdy.cubby@gmail.com',
    password: '3stUHdycubby',
    server: 'smtp.gmail.com',
    port: 587,
  };
  process.env.MAIL_URL = `smtp://${encodeURIComponent(smtp.username)}:${encodeURIComponent(smtp.password)}@${encodeURIComponent(smtp.server)}:${smtp.port}`;

});

Meteor.methods({
  sendEmail(to, from, subject, text) {
    console.log(`in sendemail ${to}`);
    check([to, from, subject, text], [String]);

    this.unblock();
    Email.send({ to, from, subject, html: text });
  },
});
