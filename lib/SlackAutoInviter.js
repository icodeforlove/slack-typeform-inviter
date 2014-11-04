var Promise = require('bluebird'),
	PromiseObject = require('promise-object')(Promise),
	request = require('request'),
	_ = require('lodash'),
	Cubby = require('Cubby');

Promise.promisifyAll(request);

var SlackAutoInviter = PromiseObject.create({
	initialize: function ($config) {
		this._typeformUID = $config.typeformUID;
		this._typeformKey = $config.typeformKey;
		this._typeformEmailField = $config.typeformEmailField;
		this._typeformFirstNameField = $config.typeformFirstNameField;
		this._typeformLastNameField = $config.typeformLastNameField;
		this._slackName = $config.slackName;
		this._slackToken = $config.slackToken;
		this._dataFile = $config.dataFile;
		this._cubby = new Cubby({file: this._dataFile});
		this._cubby.set('form-id-since', this._cubby.get('form-id-since') || 1);
	},

	inviteAll: function *($deferred) {
		var typeFormResponse = _.first(yield request.getAsync({url: 'https://api.typeform.com/v0/form/' + this._typeformUID + '?key=' + this._typeformKey + '&completed=true&since=' + this._cubby.get('form-id-since') + '&limit=1000', json: true}));

		yield Promise.map(typeFormResponse.body.responses, this._inviteUser, {concurrency: 5});

		this._cubby.set('form-id-since', Math.floor(Date.now() / 1000));

		$deferred.resolve();
	},

	_inviteUser: function *($deferred, form) {
		var inviteResponse = _.first(yield request.postAsync({
			url: 'https://' + this._slackName + '.slack.com/api/users.admin.invite',
			form: {
				email: form.answers[this._typeformEmailField],
				first_name: form.answers[this._typeformFirstNameField],
				last_name: form.answers[this._typeformLastNameField],
				token: this._slackToken,
				set_active: 'true'
			},
			json: true
		}));

		console.log('[INVITE] ' + form.answers[this._typeformFirstNameField] + ' ' + form.answers[this._typeformLastNameField] + ' <' + form.answers[this._typeformEmailField] + '>');

		$deferred.resolve(inviteResponse.body);
	}
});

module.exports = SlackAutoInviter;