define([
	'fontoxml-configuration/configurationManager',
	'fontoxml-modular-schema-experience/sxManager',
	'fontoxml-schema-experience-resolver/SchemaLocationToSchemaExperienceResolver',

	'dita-example-sx-shells-basemap/SCHEMA_LOCATIONS',
	'dita-example-sx-shells-basetopic/SCHEMA_LOCATIONS',
	'dita-example-sx-shells-concept/SCHEMA_LOCATIONS',
	'dita-example-sx-shells-general-task/SCHEMA_LOCATIONS',
	'dita-example-sx-shells-glossgroup/SCHEMA_LOCATIONS',
	'dita-example-sx-shells-learning-assessment/SCHEMA_LOCATIONS',
	'dita-example-sx-shells-learning-content/SCHEMA_LOCATIONS',
	'dita-example-sx-shells-learning-overview/SCHEMA_LOCATIONS',
	'dita-example-sx-shells-learning-plan/SCHEMA_LOCATIONS',
	'dita-example-sx-shells-learning-summary/SCHEMA_LOCATIONS',
	'dita-example-sx-shells-map/SCHEMA_LOCATIONS',
	'dita-example-sx-shells-reference/SCHEMA_LOCATIONS',
	'dita-example-sx-shells-task/SCHEMA_LOCATIONS',
	'dita-example-sx-shells-topic/SCHEMA_LOCATIONS'
], function (
	configurationManager,
	sxManager,
	SchemaLocationToSchemaExperienceResolver,

	SCHEMA_LOCATIONS_BASEMAP,
	SCHEMA_LOCATIONS_BASETOPIC,
	SCHEMA_LOCATIONS_CONCEPT,
	SCHEMA_LOCATIONS_GENERAL_TASK,
	SCHEMA_LOCATIONS_GLOSSGROUP,
	SCHEMA_LOCATIONS_LEARNING_ASSESSMENT,
	SCHEMA_LOCATIONS_LEARNING_CONTENT,
	SCHEMA_LOCATIONS_LEARNING_OVERVIEW,
	SCHEMA_LOCATIONS_LEARNING_PLAN,
	SCHEMA_LOCATIONS_LEARNING_SUMMARY,
	SCHEMA_LOCATIONS_MAP,
	SCHEMA_LOCATIONS_REFERENCE,
	SCHEMA_LOCATIONS_TASK,
	SCHEMA_LOCATIONS_TOPIC
	) {
	'use strict';

	var SHELLS = [
		{
			package: 'dita-example-sx-shells-basemap',
			locations: SCHEMA_LOCATIONS_BASEMAP
		},
		{
			package: 'dita-example-sx-shells-basetopic',
			locations: SCHEMA_LOCATIONS_BASETOPIC
		},
		{
			package: 'dita-example-sx-shells-concept',
			locations: SCHEMA_LOCATIONS_CONCEPT
		},
		{
			package: 'dita-example-sx-shells-general-task',
			locations: SCHEMA_LOCATIONS_GENERAL_TASK
		},
		{
			package: 'dita-example-sx-shells-glossgroup',
			locations: SCHEMA_LOCATIONS_GLOSSGROUP
		},
		{
			package: 'dita-example-sx-shells-learning-assessment',
			locations: SCHEMA_LOCATIONS_LEARNING_ASSESSMENT
		},
		{
			package: 'dita-example-sx-shells-learning-content',
			locations: SCHEMA_LOCATIONS_LEARNING_CONTENT
		},
		{
			package: 'dita-example-sx-shells-learning-overview',
			locations: SCHEMA_LOCATIONS_LEARNING_OVERVIEW
		},
		{
			package: 'dita-example-sx-shells-learning-plan',
			locations: SCHEMA_LOCATIONS_LEARNING_PLAN
		},
		{
			package: 'dita-example-sx-shells-learning-summary',
			locations: SCHEMA_LOCATIONS_LEARNING_SUMMARY
		},
		{
			package: 'dita-example-sx-shells-map',
			locations: SCHEMA_LOCATIONS_MAP
		},
		{
			package: 'dita-example-sx-shells-reference',
			locations: SCHEMA_LOCATIONS_REFERENCE
		},
		{
			package: 'dita-example-sx-shells-task',
			locations: SCHEMA_LOCATIONS_TASK
		},
		{
			package: 'dita-example-sx-shells-topic',
			locations: SCHEMA_LOCATIONS_TOPIC
		}
	];

	var schemaLocationToSchemaExperienceResolver = new SchemaLocationToSchemaExperienceResolver();

	SHELLS.forEach(function (shell) {
		schemaLocationToSchemaExperienceResolver.register(
			sxManager.defineSchemaExperience(
				'assets/schemas/' + shell.package + '.json',
				[shell.package]
			),
			shell.locations);
	});

	configurationManager.set('schema-experience-resolver', schemaLocationToSchemaExperienceResolver);
});
