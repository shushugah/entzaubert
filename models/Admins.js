var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Admins Model
 * ==========
 */
var Admins = new keystone.List('Admins');

Admins.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
Admins.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
Admins.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Admins.defaultColumns = 'name, email, isAdmin';
Admins.register();
