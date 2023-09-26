import configureAsRemoved from 'fontoxml-families/src/configureAsRemoved';
import type { SxModule } from 'fontoxml-modular-schema-experience/src/sxManager';
import xq from 'fontoxml-selectors/src/xq';

export default function configureSxModule(sxModule: SxModule): void {
	// Mark this configureSxModule.ts file as an addon entry file, so that we don't have to explicitly depend on
	// this package from an *-sx-shell. The best practice is to always depend on the specific *-sx-module packages
	// from your own shell.
	sxModule.markAsAddon();

	// Configuring any element (with a very low priority selector) as "removed" makes sure Fonto will never crash
	// if it encounters an unconfigured element - it will simply be hidden.
	//
	// Make sure you've tested your application without this configuration, in order to more easily detect elements
	// that are lacking configuration.
	configureAsRemoved(sxModule, xq`self::*`, undefined, {
		priority: -2,
	});
}
