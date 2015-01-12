# slack-typeform-inviter

Automatically invites users to slack via a typeform form

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

# Setup

* The code will need to node [0.11.2](http://blog.nodejs.org/2014/09/24/node-v0-11-14-unstable/) to run. 
-  `npm install -g nvm`
-  `nvm install v0.11.14`
-  `npn install slack-typeform-inviter --save`

More installation instructions on installing nvm to manage can be found [here](https://www.npmjs.com/package/nvm).
