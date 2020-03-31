import configurationManager from 'fontoxml-configuration/src/configurationManager.js';
import sxManager from 'fontoxml-modular-schema-experience/src/sxManager.js';
import SchemaLocationToSchemaExperienceResolver from 'fontoxml-schema-experience-resolver/src/SchemaLocationToSchemaExperienceResolver.js';
import SCHEMA_LOCATIONS_BASEMAP from 'dita-example-sx-shells-basemap/src/SCHEMA_LOCATIONS.js';
import SCHEMA_LOCATIONS_BASETOPIC from 'dita-example-sx-shells-basetopic/src/SCHEMA_LOCATIONS.js';
import SCHEMA_LOCATIONS_BOOKMAP from 'dita-example-sx-shells-bookmap/src/SCHEMA_LOCATIONS.js';
import SCHEMA_LOCATIONS_CONCEPT from 'dita-example-sx-shells-concept/src/SCHEMA_LOCATIONS.js';
import SCHEMA_LOCATIONS_GENERAL_TASK from 'dita-example-sx-shells-general-task/src/SCHEMA_LOCATIONS.js';
import SCHEMA_LOCATIONS_GLOSSGROUP from 'dita-example-sx-shells-glossgroup/src/SCHEMA_LOCATIONS.js';
import SCHEMA_LOCATIONS_LEARNING_ASSESSMENT from 'dita-example-sx-shells-learning-assessment/src/SCHEMA_LOCATIONS.js';
import SCHEMA_LOCATIONS_LEARNING_CONTENT from 'dita-example-sx-shells-learning-content/src/SCHEMA_LOCATIONS.js';
import SCHEMA_LOCATIONS_LEARNING_OVERVIEW from 'dita-example-sx-shells-learning-overview/src/SCHEMA_LOCATIONS.js';
import SCHEMA_LOCATIONS_LEARNING_PLAN from 'dita-example-sx-shells-learning-plan/src/SCHEMA_LOCATIONS.js';
import SCHEMA_LOCATIONS_LEARNING_SUMMARY from 'dita-example-sx-shells-learning-summary/src/SCHEMA_LOCATIONS.js';
import SCHEMA_LOCATIONS_MAP from 'dita-example-sx-shells-map/src/SCHEMA_LOCATIONS.js';
import SCHEMA_LOCATIONS_REFERENCE from 'dita-example-sx-shells-reference/src/SCHEMA_LOCATIONS.js';
import SCHEMA_LOCATIONS_TASK from 'dita-example-sx-shells-task/src/SCHEMA_LOCATIONS.js';
import SCHEMA_LOCATIONS_TOPIC from 'dita-example-sx-shells-topic/src/SCHEMA_LOCATIONS.js';

const SHELLS = [
	{
		package: 'dita-example-sx-shells-basemap',
		locations: SCHEMA_LOCATIONS_BASEMAP
	},
	{
		package: 'dita-example-sx-shells-basetopic',
		locations: SCHEMA_LOCATIONS_BASETOPIC
	},
	{
		package: 'dita-example-sx-shells-bookmap',
		locations: SCHEMA_LOCATIONS_BOOKMAP
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

const schemaLocationToSchemaExperienceResolver = new SchemaLocationToSchemaExperienceResolver();

SHELLS.forEach(function(shell) {
	schemaLocationToSchemaExperienceResolver.register(
		sxManager.defineSchemaExperience('assets/schemas/' + shell.package + '.json', [
			shell.package
		]),
		shell.locations
	);
});

configurationManager.set('schema-experience-resolver', schemaLocationToSchemaExperienceResolver);
