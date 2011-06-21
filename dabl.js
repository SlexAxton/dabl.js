/**
 * dabl.js
 * Data Abstraction Library
 *
 * Version: 0.0.1a
 *
 * User License        : MIT, BSD, WTFPL
 * Contributor License : LGPL
 *
 * by Alex Sexton
 * @slexaxton
 */
window.Dabl = (function ( window, document ) {
  // Create the core object
  var Dabl = {
    _version  : '0.0.1a',
    _api      : {},
    _adapters : {}
  };

  // The Adapter Constructor Function
  Dabl.Adapter = function ( options ) {
    // Own properties for the get and save methods
    this.get  = options.get  || this.get;
    this.save = options.save || this.save;
  };

  // Set a base prototype for adapters
  Dabl.Adapter.prototype = {
    // Takes a key and parameters and returns data to the callback
    get  : function ( /* name, params, cb */ ) {
      throw new Error( 'Get not defined for this adapter.' );
    },
    // Takes a key and data to save and returns updated data to the callback
    save : function ( /* name, data, cb */ ) {
      throw new Error( 'Save not defined for this adapter.' );
    }
  };

  // Adapters go into the hash for them.
  Dabl.addAdapter = function ( name, adapter ) {
    Dabl._adapters[ name ] = adapter;
  };

  Dabl.use = function ( adapterName ) {
    // Lock in this adapter to a new Dabl instance
    // and then set the default adapter
    var newDabl = Object.create( Dabl );
    newDabl._adapter = Dabl.adapters[ adapterName ];
    return newDabl;
  };

  Dabl.api;

  // Return the modified object that gets set to window.Dab
  return Dabl;
})( window, document );



// Use it
Dabl.addAdapter( 'inpage', new Dabl.Adapter({
  get : function ( name, params, cb ) {
    cb && cb( params );
  },
  save : function ( name, data, cb ) {
    cb && cb( data );
  }
}));
