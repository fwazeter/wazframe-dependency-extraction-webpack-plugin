const WPDependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const packages = require( '../assets/packages' );

const { defaultRequestToExternal, defaultRequestToHandle, camelCaseDash } = require( './utils' );

const WAZFRAME_NAMESPACE = '@wazframe/'


const wfRequestToExternal = ( request, excludedExternals ) => {
    if ( packages.includes( request ) ) {
        const handle = request.substring( WAZFRAME_NAMESPACE.length );

        if ( ( excludedExternals || [] ).includes( request ) ) {
            return;
        }

        // wazframe[blockEditor]
        return [ 'wazframe', camelCaseDash( handle ) ];

    }
};

const wfRequestToHandle = ( request ) => {
    if ( packages.includes( request ) ) {
        const handle = request.substring( WAZFRAME_NAMESPACE.length );

        // wazframe-block-editor
        return 'wazframe-' + handle;
    }
}

// Extend the WP default dependency extraction class since we can only have a single instance.
class DependencyExtractionWebpackPlugin extends WPDependencyExtractionWebpackPlugin {
    externalizeWpDeps( _context, request, callback ) {
        let externalRequest;

        // Handle via options.requestToExternal first
        if ( typeof this.options.requestToExternal === 'function' ) {
            externalRequest = this.options.requestToExternal( request );
        }

        // Cascade to default if unhandled and enabled
        if (
            typeof externalRequest === 'undefined' &&
            this.options.useDefaults
        ) {
            externalRequest = defaultRequestToExternal( request );
        }

        if ( externalRequest ) {
            this.externalizedDeps.add( request );

            return callback( null, externalRequest );
        }

        // Fall back to the WP method
        return super.externalizeWpDeps( _context, request, callback );
    }

    mapRequestToDependency( request ) {
        // Handle via options.requestToHandle first
        if ( typeof this.options.requestToHandle === 'function' ) {
            const scriptDependency = this.options.requestToHandle( request );
            if ( scriptDependency ) {
                return scriptDependency;
            }
        }

        // Cascade to default if enabled
        if ( this.options.useDefaults ) {
            const scriptDependency = defaultRequestToHandle( request );
            if ( scriptDependency ) {
                return scriptDependency;
            }
        }

        // Fall back to the WP method
        return super.mapRequestToDependency( request );
    }
}

module.exports = DependencyExtractionWebpackPlugin;