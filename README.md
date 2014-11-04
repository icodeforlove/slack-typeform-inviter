# slack-typeform-inviter

automatically invites users to slack via a typeform form

```javascript
var SlackAutoInviter = require('slack-typeform-inviter');

var inviter = new SlackAutoInviter({
	typeformUID: '',
	typeformKey: '',
	typeformEmailField: '',
	typeformFirstNameField: '',
	typeformLastNameField: '',

	slackName: '',
	slackToken: '',

	dataFile: __dirname + '/data.json'
});

// run this at an interval
inviter.inviteAll().then(function () {
	console.log('done');
});
```