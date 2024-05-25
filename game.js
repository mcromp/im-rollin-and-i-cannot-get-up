
var Module;

if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

  var PACKAGE_PATH;
  if (typeof window === 'object') {
    PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
  } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'game.data';
    var REMOTE_PACKAGE_BASE = 'game.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
    Module['locateFile'](REMOTE_PACKAGE_BASE) :
    ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);

    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;

    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onerror = function(event) {
        throw new Error("NetworkError for: " + packageName);
      }
      xhr.onload = function(event) {
        if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
          var packageData = xhr.response;
          callback(packageData);
        } else {
          throw new Error(xhr.statusText + " : " + xhr.responseURL);
        }
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
      Module['FS_createPath']('/', '.git', true, true);
      Module['FS_createPath']('/.git', 'hooks', true, true);
      Module['FS_createPath']('/.git', 'info', true, true);
      Module['FS_createPath']('/.git', 'logs', true, true);
      Module['FS_createPath']('/.git/logs', 'refs', true, true);
      Module['FS_createPath']('/.git/logs/refs', 'heads', true, true);
      Module['FS_createPath']('/.git/logs/refs', 'remotes', true, true);
      Module['FS_createPath']('/.git/logs/refs/remotes', 'origin', true, true);
      Module['FS_createPath']('/.git', 'objects', true, true);
      Module['FS_createPath']('/.git/objects', '00', true, true);
      Module['FS_createPath']('/.git/objects', '01', true, true);
      Module['FS_createPath']('/.git/objects', '02', true, true);
      Module['FS_createPath']('/.git/objects', '04', true, true);
      Module['FS_createPath']('/.git/objects', '05', true, true);
      Module['FS_createPath']('/.git/objects', '06', true, true);
      Module['FS_createPath']('/.git/objects', '07', true, true);
      Module['FS_createPath']('/.git/objects', '08', true, true);
      Module['FS_createPath']('/.git/objects', '09', true, true);
      Module['FS_createPath']('/.git/objects', '0a', true, true);
      Module['FS_createPath']('/.git/objects', '0b', true, true);
      Module['FS_createPath']('/.git/objects', '0c', true, true);
      Module['FS_createPath']('/.git/objects', '0d', true, true);
      Module['FS_createPath']('/.git/objects', '0e', true, true);
      Module['FS_createPath']('/.git/objects', '0f', true, true);
      Module['FS_createPath']('/.git/objects', '10', true, true);
      Module['FS_createPath']('/.git/objects', '11', true, true);
      Module['FS_createPath']('/.git/objects', '12', true, true);
      Module['FS_createPath']('/.git/objects', '13', true, true);
      Module['FS_createPath']('/.git/objects', '14', true, true);
      Module['FS_createPath']('/.git/objects', '15', true, true);
      Module['FS_createPath']('/.git/objects', '17', true, true);
      Module['FS_createPath']('/.git/objects', '18', true, true);
      Module['FS_createPath']('/.git/objects', '19', true, true);
      Module['FS_createPath']('/.git/objects', '1b', true, true);
      Module['FS_createPath']('/.git/objects', '1c', true, true);
      Module['FS_createPath']('/.git/objects', '1d', true, true);
      Module['FS_createPath']('/.git/objects', '1e', true, true);
      Module['FS_createPath']('/.git/objects', '1f', true, true);
      Module['FS_createPath']('/.git/objects', '20', true, true);
      Module['FS_createPath']('/.git/objects', '21', true, true);
      Module['FS_createPath']('/.git/objects', '22', true, true);
      Module['FS_createPath']('/.git/objects', '23', true, true);
      Module['FS_createPath']('/.git/objects', '24', true, true);
      Module['FS_createPath']('/.git/objects', '25', true, true);
      Module['FS_createPath']('/.git/objects', '29', true, true);
      Module['FS_createPath']('/.git/objects', '2a', true, true);
      Module['FS_createPath']('/.git/objects', '2b', true, true);
      Module['FS_createPath']('/.git/objects', '2c', true, true);
      Module['FS_createPath']('/.git/objects', '2d', true, true);
      Module['FS_createPath']('/.git/objects', '2f', true, true);
      Module['FS_createPath']('/.git/objects', '30', true, true);
      Module['FS_createPath']('/.git/objects', '31', true, true);
      Module['FS_createPath']('/.git/objects', '32', true, true);
      Module['FS_createPath']('/.git/objects', '33', true, true);
      Module['FS_createPath']('/.git/objects', '34', true, true);
      Module['FS_createPath']('/.git/objects', '35', true, true);
      Module['FS_createPath']('/.git/objects', '36', true, true);
      Module['FS_createPath']('/.git/objects', '37', true, true);
      Module['FS_createPath']('/.git/objects', '38', true, true);
      Module['FS_createPath']('/.git/objects', '3a', true, true);
      Module['FS_createPath']('/.git/objects', '3b', true, true);
      Module['FS_createPath']('/.git/objects', '3c', true, true);
      Module['FS_createPath']('/.git/objects', '3d', true, true);
      Module['FS_createPath']('/.git/objects', '3e', true, true);
      Module['FS_createPath']('/.git/objects', '3f', true, true);
      Module['FS_createPath']('/.git/objects', '40', true, true);
      Module['FS_createPath']('/.git/objects', '41', true, true);
      Module['FS_createPath']('/.git/objects', '43', true, true);
      Module['FS_createPath']('/.git/objects', '44', true, true);
      Module['FS_createPath']('/.git/objects', '45', true, true);
      Module['FS_createPath']('/.git/objects', '46', true, true);
      Module['FS_createPath']('/.git/objects', '47', true, true);
      Module['FS_createPath']('/.git/objects', '4a', true, true);
      Module['FS_createPath']('/.git/objects', '4b', true, true);
      Module['FS_createPath']('/.git/objects', '4c', true, true);
      Module['FS_createPath']('/.git/objects', '4d', true, true);
      Module['FS_createPath']('/.git/objects', '4e', true, true);
      Module['FS_createPath']('/.git/objects', '4f', true, true);
      Module['FS_createPath']('/.git/objects', '50', true, true);
      Module['FS_createPath']('/.git/objects', '52', true, true);
      Module['FS_createPath']('/.git/objects', '53', true, true);
      Module['FS_createPath']('/.git/objects', '54', true, true);
      Module['FS_createPath']('/.git/objects', '56', true, true);
      Module['FS_createPath']('/.git/objects', '58', true, true);
      Module['FS_createPath']('/.git/objects', '59', true, true);
      Module['FS_createPath']('/.git/objects', '5a', true, true);
      Module['FS_createPath']('/.git/objects', '5b', true, true);
      Module['FS_createPath']('/.git/objects', '5d', true, true);
      Module['FS_createPath']('/.git/objects', '5e', true, true);
      Module['FS_createPath']('/.git/objects', '5f', true, true);
      Module['FS_createPath']('/.git/objects', '60', true, true);
      Module['FS_createPath']('/.git/objects', '61', true, true);
      Module['FS_createPath']('/.git/objects', '62', true, true);
      Module['FS_createPath']('/.git/objects', '64', true, true);
      Module['FS_createPath']('/.git/objects', '65', true, true);
      Module['FS_createPath']('/.git/objects', '66', true, true);
      Module['FS_createPath']('/.git/objects', '67', true, true);
      Module['FS_createPath']('/.git/objects', '68', true, true);
      Module['FS_createPath']('/.git/objects', '69', true, true);
      Module['FS_createPath']('/.git/objects', '6a', true, true);
      Module['FS_createPath']('/.git/objects', '6c', true, true);
      Module['FS_createPath']('/.git/objects', '6d', true, true);
      Module['FS_createPath']('/.git/objects', '6e', true, true);
      Module['FS_createPath']('/.git/objects', '6f', true, true);
      Module['FS_createPath']('/.git/objects', '70', true, true);
      Module['FS_createPath']('/.git/objects', '71', true, true);
      Module['FS_createPath']('/.git/objects', '72', true, true);
      Module['FS_createPath']('/.git/objects', '73', true, true);
      Module['FS_createPath']('/.git/objects', '74', true, true);
      Module['FS_createPath']('/.git/objects', '75', true, true);
      Module['FS_createPath']('/.git/objects', '76', true, true);
      Module['FS_createPath']('/.git/objects', '77', true, true);
      Module['FS_createPath']('/.git/objects', '78', true, true);
      Module['FS_createPath']('/.git/objects', '79', true, true);
      Module['FS_createPath']('/.git/objects', '7a', true, true);
      Module['FS_createPath']('/.git/objects', '7b', true, true);
      Module['FS_createPath']('/.git/objects', '7c', true, true);
      Module['FS_createPath']('/.git/objects', '7d', true, true);
      Module['FS_createPath']('/.git/objects', '7e', true, true);
      Module['FS_createPath']('/.git/objects', '7f', true, true);
      Module['FS_createPath']('/.git/objects', '81', true, true);
      Module['FS_createPath']('/.git/objects', '82', true, true);
      Module['FS_createPath']('/.git/objects', '83', true, true);
      Module['FS_createPath']('/.git/objects', '84', true, true);
      Module['FS_createPath']('/.git/objects', '85', true, true);
      Module['FS_createPath']('/.git/objects', '86', true, true);
      Module['FS_createPath']('/.git/objects', '87', true, true);
      Module['FS_createPath']('/.git/objects', '88', true, true);
      Module['FS_createPath']('/.git/objects', '89', true, true);
      Module['FS_createPath']('/.git/objects', '8a', true, true);
      Module['FS_createPath']('/.git/objects', '8b', true, true);
      Module['FS_createPath']('/.git/objects', '8c', true, true);
      Module['FS_createPath']('/.git/objects', '8d', true, true);
      Module['FS_createPath']('/.git/objects', '8e', true, true);
      Module['FS_createPath']('/.git/objects', '8f', true, true);
      Module['FS_createPath']('/.git/objects', '90', true, true);
      Module['FS_createPath']('/.git/objects', '91', true, true);
      Module['FS_createPath']('/.git/objects', '92', true, true);
      Module['FS_createPath']('/.git/objects', '93', true, true);
      Module['FS_createPath']('/.git/objects', '95', true, true);
      Module['FS_createPath']('/.git/objects', '96', true, true);
      Module['FS_createPath']('/.git/objects', '98', true, true);
      Module['FS_createPath']('/.git/objects', '99', true, true);
      Module['FS_createPath']('/.git/objects', '9a', true, true);
      Module['FS_createPath']('/.git/objects', '9b', true, true);
      Module['FS_createPath']('/.git/objects', '9c', true, true);
      Module['FS_createPath']('/.git/objects', '9d', true, true);
      Module['FS_createPath']('/.git/objects', '9e', true, true);
      Module['FS_createPath']('/.git/objects', '9f', true, true);
      Module['FS_createPath']('/.git/objects', 'a0', true, true);
      Module['FS_createPath']('/.git/objects', 'a1', true, true);
      Module['FS_createPath']('/.git/objects', 'a2', true, true);
      Module['FS_createPath']('/.git/objects', 'a3', true, true);
      Module['FS_createPath']('/.git/objects', 'a4', true, true);
      Module['FS_createPath']('/.git/objects', 'a5', true, true);
      Module['FS_createPath']('/.git/objects', 'a6', true, true);
      Module['FS_createPath']('/.git/objects', 'a8', true, true);
      Module['FS_createPath']('/.git/objects', 'a9', true, true);
      Module['FS_createPath']('/.git/objects', 'aa', true, true);
      Module['FS_createPath']('/.git/objects', 'ab', true, true);
      Module['FS_createPath']('/.git/objects', 'ac', true, true);
      Module['FS_createPath']('/.git/objects', 'ad', true, true);
      Module['FS_createPath']('/.git/objects', 'ae', true, true);
      Module['FS_createPath']('/.git/objects', 'af', true, true);
      Module['FS_createPath']('/.git/objects', 'b0', true, true);
      Module['FS_createPath']('/.git/objects', 'b1', true, true);
      Module['FS_createPath']('/.git/objects', 'b2', true, true);
      Module['FS_createPath']('/.git/objects', 'b3', true, true);
      Module['FS_createPath']('/.git/objects', 'b4', true, true);
      Module['FS_createPath']('/.git/objects', 'b5', true, true);
      Module['FS_createPath']('/.git/objects', 'b6', true, true);
      Module['FS_createPath']('/.git/objects', 'b8', true, true);
      Module['FS_createPath']('/.git/objects', 'b9', true, true);
      Module['FS_createPath']('/.git/objects', 'ba', true, true);
      Module['FS_createPath']('/.git/objects', 'bb', true, true);
      Module['FS_createPath']('/.git/objects', 'bc', true, true);
      Module['FS_createPath']('/.git/objects', 'bd', true, true);
      Module['FS_createPath']('/.git/objects', 'be', true, true);
      Module['FS_createPath']('/.git/objects', 'bf', true, true);
      Module['FS_createPath']('/.git/objects', 'c0', true, true);
      Module['FS_createPath']('/.git/objects', 'c1', true, true);
      Module['FS_createPath']('/.git/objects', 'c2', true, true);
      Module['FS_createPath']('/.git/objects', 'c3', true, true);
      Module['FS_createPath']('/.git/objects', 'c4', true, true);
      Module['FS_createPath']('/.git/objects', 'c5', true, true);
      Module['FS_createPath']('/.git/objects', 'c6', true, true);
      Module['FS_createPath']('/.git/objects', 'c7', true, true);
      Module['FS_createPath']('/.git/objects', 'c9', true, true);
      Module['FS_createPath']('/.git/objects', 'cb', true, true);
      Module['FS_createPath']('/.git/objects', 'cc', true, true);
      Module['FS_createPath']('/.git/objects', 'ce', true, true);
      Module['FS_createPath']('/.git/objects', 'cf', true, true);
      Module['FS_createPath']('/.git/objects', 'd0', true, true);
      Module['FS_createPath']('/.git/objects', 'd1', true, true);
      Module['FS_createPath']('/.git/objects', 'd2', true, true);
      Module['FS_createPath']('/.git/objects', 'd3', true, true);
      Module['FS_createPath']('/.git/objects', 'd4', true, true);
      Module['FS_createPath']('/.git/objects', 'd6', true, true);
      Module['FS_createPath']('/.git/objects', 'd7', true, true);
      Module['FS_createPath']('/.git/objects', 'd8', true, true);
      Module['FS_createPath']('/.git/objects', 'da', true, true);
      Module['FS_createPath']('/.git/objects', 'db', true, true);
      Module['FS_createPath']('/.git/objects', 'dc', true, true);
      Module['FS_createPath']('/.git/objects', 'dd', true, true);
      Module['FS_createPath']('/.git/objects', 'de', true, true);
      Module['FS_createPath']('/.git/objects', 'df', true, true);
      Module['FS_createPath']('/.git/objects', 'e0', true, true);
      Module['FS_createPath']('/.git/objects', 'e1', true, true);
      Module['FS_createPath']('/.git/objects', 'e2', true, true);
      Module['FS_createPath']('/.git/objects', 'e3', true, true);
      Module['FS_createPath']('/.git/objects', 'e5', true, true);
      Module['FS_createPath']('/.git/objects', 'e6', true, true);
      Module['FS_createPath']('/.git/objects', 'e7', true, true);
      Module['FS_createPath']('/.git/objects', 'e8', true, true);
      Module['FS_createPath']('/.git/objects', 'e9', true, true);
      Module['FS_createPath']('/.git/objects', 'ea', true, true);
      Module['FS_createPath']('/.git/objects', 'eb', true, true);
      Module['FS_createPath']('/.git/objects', 'ec', true, true);
      Module['FS_createPath']('/.git/objects', 'ef', true, true);
      Module['FS_createPath']('/.git/objects', 'f0', true, true);
      Module['FS_createPath']('/.git/objects', 'f2', true, true);
      Module['FS_createPath']('/.git/objects', 'f3', true, true);
      Module['FS_createPath']('/.git/objects', 'f4', true, true);
      Module['FS_createPath']('/.git/objects', 'f5', true, true);
      Module['FS_createPath']('/.git/objects', 'f7', true, true);
      Module['FS_createPath']('/.git/objects', 'f9', true, true);
      Module['FS_createPath']('/.git/objects', 'fa', true, true);
      Module['FS_createPath']('/.git/objects', 'fb', true, true);
      Module['FS_createPath']('/.git/objects', 'fc', true, true);
      Module['FS_createPath']('/.git/objects', 'fd', true, true);
      Module['FS_createPath']('/.git/objects', 'fe', true, true);
      Module['FS_createPath']('/.git/objects', 'ff', true, true);
      Module['FS_createPath']('/.git/objects', 'info', true, true);
      Module['FS_createPath']('/.git/objects', 'pack', true, true);
      Module['FS_createPath']('/.git', 'refs', true, true);
      Module['FS_createPath']('/.git/refs', 'heads', true, true);
      Module['FS_createPath']('/.git/refs', 'remotes', true, true);
      Module['FS_createPath']('/.git/refs/remotes', 'origin', true, true);
      Module['FS_createPath']('/.git/refs', 'tags', true, true);
      Module['FS_createPath']('/', '.vscode', true, true);
      Module['FS_createPath']('/', 'assets', true, true);
      Module['FS_createPath']('/assets', 'img', true, true);
      Module['FS_createPath']('/assets/img', 'buildings', true, true);
      Module['FS_createPath']('/assets', 'sfx', true, true);
      Module['FS_createPath']('/', 'entities', true, true);
      Module['FS_createPath']('/', 'lib', true, true);
      Module['FS_createPath']('/lib', 'hump', true, true);
      Module['FS_createPath']('/lib', 'sti', true, true);
      Module['FS_createPath']('/lib/sti', 'plugins', true, true);
      Module['FS_createPath']('/', 'map', true, true);
      Module['FS_createPath']('/', 'scenes', true, true);
      Module['FS_createPath']('/', 'services', true, true);
      Module['FS_createPath']('/', 'ui', true, true);

      function DataRequest(start, end, crunched, audio) {
        this.start = start;
        this.end = end;
        this.crunched = crunched;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency']('fp ' + this.name);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

        },
        finish: function(byteArray) {
          var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      }
    };

    var files = metadata.files;
    for (i = 0; i < files.length; ++i) {
      new DataRequest(files[i].start, files[i].end, files[i].crunched, files[i].audio).open('GET', files[i].filename);
    }


    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    var IDB_RO = "readonly";
    var IDB_RW = "readwrite";
    var DB_NAME = "EM_PRELOAD_CACHE";
    var DB_VERSION = 1;
    var METADATA_STORE_NAME = 'METADATA';
    var PACKAGE_STORE_NAME = 'PACKAGES';
    function openDatabase(callback, errback) {
      try {
        var openRequest = indexedDB.open(DB_NAME, DB_VERSION);
      } catch (e) {
        return errback(e);
      }
      openRequest.onupgradeneeded = function(event) {
        var db = event.target.result;

        if(db.objectStoreNames.contains(PACKAGE_STORE_NAME)) {
          db.deleteObjectStore(PACKAGE_STORE_NAME);
        }
        var packages = db.createObjectStore(PACKAGE_STORE_NAME);

        if(db.objectStoreNames.contains(METADATA_STORE_NAME)) {
          db.deleteObjectStore(METADATA_STORE_NAME);
        }
        var metadata = db.createObjectStore(METADATA_STORE_NAME);
      };
      openRequest.onsuccess = function(event) {
        var db = event.target.result;
        callback(db);
      };
      openRequest.onerror = function(error) {
        errback(error);
      };
    };

    /* Check if there's a cached package, and if so whether it's the latest available */
    function checkCachedPackage(db, packageName, callback, errback) {
      var transaction = db.transaction([METADATA_STORE_NAME], IDB_RO);
      var metadata = transaction.objectStore(METADATA_STORE_NAME);

      var getRequest = metadata.get("metadata/" + packageName);
      getRequest.onsuccess = function(event) {
        var result = event.target.result;
        if (!result) {
          return callback(false);
        } else {
          return callback(PACKAGE_UUID === result.uuid);
        }
      };
      getRequest.onerror = function(error) {
        errback(error);
      };
    };

    function fetchCachedPackage(db, packageName, callback, errback) {
      var transaction = db.transaction([PACKAGE_STORE_NAME], IDB_RO);
      var packages = transaction.objectStore(PACKAGE_STORE_NAME);

      var getRequest = packages.get("package/" + packageName);
      getRequest.onsuccess = function(event) {
        var result = event.target.result;
        callback(result);
      };
      getRequest.onerror = function(error) {
        errback(error);
      };
    };

    function cacheRemotePackage(db, packageName, packageData, packageMeta, callback, errback) {
      var transaction_packages = db.transaction([PACKAGE_STORE_NAME], IDB_RW);
      var packages = transaction_packages.objectStore(PACKAGE_STORE_NAME);

      var putPackageRequest = packages.put(packageData, "package/" + packageName);
      putPackageRequest.onsuccess = function(event) {
        var transaction_metadata = db.transaction([METADATA_STORE_NAME], IDB_RW);
        var metadata = transaction_metadata.objectStore(METADATA_STORE_NAME);
        var putMetadataRequest = metadata.put(packageMeta, "metadata/" + packageName);
        putMetadataRequest.onsuccess = function(event) {
          callback(packageData);
        };
        putMetadataRequest.onerror = function(error) {
          errback(error);
        };
      };
      putPackageRequest.onerror = function(error) {
        errback(error);
      };
    };

    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;

        // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though
        // (we may be allocating before malloc is ready, during startup).
        if (Module['SPLIT_MEMORY']) Module.printErr('warning: you should run the file packager with --no-heap-copy when SPLIT_MEMORY is used, otherwise copying into the heap may fail due to the splitting');
        var ptr = Module['getMemory'](byteArray.length);
        Module['HEAPU8'].set(byteArray, ptr);
        DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);

        var files = metadata.files;
        for (i = 0; i < files.length; ++i) {
          DataRequest.prototype.requests[files[i].filename].onload();
        }
        Module['removeRunDependency']('datafile_game.data');

      };
      Module['addRunDependency']('datafile_game.data');

      if (!Module.preloadResults) Module.preloadResults = {};

      function preloadFallback(error) {
        console.error(error);
        console.error('falling back to default preload behavior');
        fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, processPackageData, handleError);
      };

      openDatabase(
        function(db) {
          checkCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME,
            function(useCached) {
              Module.preloadResults[PACKAGE_NAME] = {fromCache: useCached};
              if (useCached) {
                console.info('loading ' + PACKAGE_NAME + ' from cache');
                fetchCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME, processPackageData, preloadFallback);
              } else {
                console.info('loading ' + PACKAGE_NAME + ' from remote');
                fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE,
                  function(packageData) {
                    cacheRemotePackage(db, PACKAGE_PATH + PACKAGE_NAME, packageData, {uuid:PACKAGE_UUID}, processPackageData,
                      function(error) {
                        console.error(error);
                        processPackageData(packageData);
                      });
                  }
                  , preloadFallback);
              }
            }
            , preloadFallback);
        }
        , preloadFallback);

      if (Module['setStatus']) Module['setStatus']('Downloading...');

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

  }
  loadPackage({"package_uuid":"e3452f81-6309-4e2c-87ee-c86192f50cf1","remote_package_size":6707456,"files":[{"filename":"/.DS_Store","crunched":0,"start":0,"end":6148,"audio":false},{"filename":"/.git/COMMIT_EDITMSG","crunched":0,"start":6148,"end":6172,"audio":false},{"filename":"/.git/HEAD","crunched":0,"start":6172,"end":6193,"audio":false},{"filename":"/.git/ORIG_HEAD","crunched":0,"start":6193,"end":6234,"audio":false},{"filename":"/.git/config","crunched":0,"start":6234,"end":6492,"audio":false},{"filename":"/.git/description","crunched":0,"start":6492,"end":6565,"audio":false},{"filename":"/.git/hooks/applypatch-msg.sample","crunched":0,"start":6565,"end":7043,"audio":false},{"filename":"/.git/hooks/commit-msg.sample","crunched":0,"start":7043,"end":7939,"audio":false},{"filename":"/.git/hooks/fsmonitor-watchman.sample","crunched":0,"start":7939,"end":12665,"audio":false},{"filename":"/.git/hooks/post-update.sample","crunched":0,"start":12665,"end":12854,"audio":false},{"filename":"/.git/hooks/pre-applypatch.sample","crunched":0,"start":12854,"end":13278,"audio":false},{"filename":"/.git/hooks/pre-commit.sample","crunched":0,"start":13278,"end":14921,"audio":false},{"filename":"/.git/hooks/pre-merge-commit.sample","crunched":0,"start":14921,"end":15337,"audio":false},{"filename":"/.git/hooks/pre-push.sample","crunched":0,"start":15337,"end":16711,"audio":false},{"filename":"/.git/hooks/pre-rebase.sample","crunched":0,"start":16711,"end":21609,"audio":false},{"filename":"/.git/hooks/pre-receive.sample","crunched":0,"start":21609,"end":22153,"audio":false},{"filename":"/.git/hooks/prepare-commit-msg.sample","crunched":0,"start":22153,"end":23645,"audio":false},{"filename":"/.git/hooks/push-to-checkout.sample","crunched":0,"start":23645,"end":26428,"audio":false},{"filename":"/.git/hooks/update.sample","crunched":0,"start":26428,"end":30078,"audio":false},{"filename":"/.git/index","crunched":0,"start":30078,"end":35905,"audio":false},{"filename":"/.git/info/exclude","crunched":0,"start":35905,"end":36145,"audio":false},{"filename":"/.git/logs/HEAD","crunched":0,"start":36145,"end":43915,"audio":false},{"filename":"/.git/logs/refs/heads/main","crunched":0,"start":43915,"end":51533,"audio":false},{"filename":"/.git/logs/refs/remotes/origin/main","crunched":0,"start":51533,"end":52983,"audio":false},{"filename":"/.git/objects/00/e6af6da4308a5dd0426c2212d0a1986524b697","crunched":0,"start":52983,"end":53481,"audio":false},{"filename":"/.git/objects/01/010326d296b604e91d30712bad46b48bef84e7","crunched":0,"start":53481,"end":218584,"audio":false},{"filename":"/.git/objects/02/36a33b3d423a8394293f6a38e69e403b69d1b5","crunched":0,"start":218584,"end":218817,"audio":false},{"filename":"/.git/objects/04/116f1a32907a7072f4711efb2cd249ffca814f","crunched":0,"start":218817,"end":219033,"audio":false},{"filename":"/.git/objects/04/b8bd6c9379c69f6e21ca824319df0125eae3bc","crunched":0,"start":219033,"end":219157,"audio":false},{"filename":"/.git/objects/04/ff15f1f97b45f974bffa43f4945e0a2d11fb28","crunched":0,"start":219157,"end":219239,"audio":false},{"filename":"/.git/objects/05/5d508fb08c127a854c9c64a8e673c5a69f6140","crunched":0,"start":219239,"end":219426,"audio":false},{"filename":"/.git/objects/05/5d6bf26e57f5e5172708335301b6b09cfd95db","crunched":0,"start":219426,"end":219545,"audio":false},{"filename":"/.git/objects/05/7222bc713f845fa9a78ade71814f5d2e78adeb","crunched":0,"start":219545,"end":219705,"audio":false},{"filename":"/.git/objects/05/d68903f280a901f89e7c72aceb7771430490fc","crunched":0,"start":219705,"end":295026,"audio":false},{"filename":"/.git/objects/05/e6d140a79e591ce758fa04dfbfd90a6f478433","crunched":0,"start":295026,"end":305611,"audio":false},{"filename":"/.git/objects/06/db32e639f9d91ad2e93ecea8972842b8bfa997","crunched":0,"start":305611,"end":306174,"audio":false},{"filename":"/.git/objects/07/5fc4cba57b61c8a11e61426222f5d1fb5fee7d","crunched":0,"start":306174,"end":306327,"audio":false},{"filename":"/.git/objects/07/687e5667f72872d4eb6ea721d4d082ba8566d4","crunched":0,"start":306327,"end":307229,"audio":false},{"filename":"/.git/objects/07/ebb9a82710e2490f2d088c4920347254988c9c","crunched":0,"start":307229,"end":307286,"audio":false},{"filename":"/.git/objects/07/f8494d000d4246fb5636b5b2cac4a34acf976f","crunched":0,"start":307286,"end":307820,"audio":false},{"filename":"/.git/objects/08/539abaf23caebd47f169d70d38a8f0119f3a6f","crunched":0,"start":307820,"end":308054,"audio":false},{"filename":"/.git/objects/09/27fac8c73449667ad1482f08b674b435918739","crunched":0,"start":308054,"end":308111,"audio":false},{"filename":"/.git/objects/09/54a849d784bfc214fbe7c7c6e8c7a0ae816783","crunched":0,"start":308111,"end":308277,"audio":false},{"filename":"/.git/objects/09/612857f3f5a844b9c82deb732a02079d1ddfec","crunched":0,"start":308277,"end":308443,"audio":false},{"filename":"/.git/objects/09/98fc4ff04084ad39b8d9fee755a45546facc81","crunched":0,"start":308443,"end":308677,"audio":false},{"filename":"/.git/objects/09/f1bb78c319c2b26021a21b715c5c9dbc197cb8","crunched":0,"start":308677,"end":323998,"audio":false},{"filename":"/.git/objects/0a/5350468e4500121ad928ed523944c5e6b34ac7","crunched":0,"start":323998,"end":324119,"audio":false},{"filename":"/.git/objects/0a/71cbdbdab0330dbd13ececc886ffce63fc5844","crunched":0,"start":324119,"end":324654,"audio":false},{"filename":"/.git/objects/0b/62fa28b545dd87981c0e79b42e0c8fe0684309","crunched":0,"start":324654,"end":325206,"audio":false},{"filename":"/.git/objects/0c/406e90d853009d5a7b71de51d28f11272f645e","crunched":0,"start":325206,"end":328986,"audio":false},{"filename":"/.git/objects/0c/e5a03e06614e84d90d98fd6c57882534cb8cc6","crunched":0,"start":328986,"end":329468,"audio":false},{"filename":"/.git/objects/0d/3439bb33fc310061138b7a49ab8558809e153e","crunched":0,"start":329468,"end":330826,"audio":false},{"filename":"/.git/objects/0d/634935166c401518f70df8cab833b7f999c1d6","crunched":0,"start":330826,"end":331127,"audio":false},{"filename":"/.git/objects/0e/b78c7aae1abd94d956b4a5b6cd5794af0aa9ba","crunched":0,"start":331127,"end":331329,"audio":false},{"filename":"/.git/objects/0f/d0830df6fb559d53cabc160e2ea096e99d876e","crunched":0,"start":331329,"end":331843,"audio":false},{"filename":"/.git/objects/0f/e3833489f720eb4d6b3644466309cfae5a71f4","crunched":0,"start":331843,"end":331976,"audio":false},{"filename":"/.git/objects/10/e5ac07c8b4d2374f7a5d1c7960b65795f160ad","crunched":0,"start":331976,"end":332538,"audio":false},{"filename":"/.git/objects/11/d1620a7d0b2e6ce0ef55ac9aee3013a951140d","crunched":0,"start":332538,"end":333322,"audio":false},{"filename":"/.git/objects/12/999a8ab10b12d67e55699a0a3d5b81fadad8e8","crunched":0,"start":333322,"end":333576,"audio":false},{"filename":"/.git/objects/12/b8d6ee31993748adcfc93a170d42cce6f1feee","crunched":0,"start":333576,"end":334429,"audio":false},{"filename":"/.git/objects/12/e6300ac120d2ceffc85c5bd89d448411455017","crunched":0,"start":334429,"end":334486,"audio":false},{"filename":"/.git/objects/13/e46608c21d8e42672bd3e0670eb56d9727b9c3","crunched":0,"start":334486,"end":334608,"audio":false},{"filename":"/.git/objects/13/f7a13b5101212625715ed1b2d083dc5b3a9ce3","crunched":0,"start":334608,"end":335107,"audio":false},{"filename":"/.git/objects/14/5220626b7268ababd38d327f2d6a8740da2ce1","crunched":0,"start":335107,"end":335656,"audio":false},{"filename":"/.git/objects/15/612cd473f6cb890f2ba4e818b6186075acbb3b","crunched":0,"start":335656,"end":335760,"audio":false},{"filename":"/.git/objects/15/808af504be7a7a1c5277e9e3eeff0374622a80","crunched":0,"start":335760,"end":342530,"audio":false},{"filename":"/.git/objects/17/0597e055f54aba6314c2343f96c6a2c9af33ab","crunched":0,"start":342530,"end":343058,"audio":false},{"filename":"/.git/objects/17/15ef1b78eb6bd546da73c0a7968904538e6727","crunched":0,"start":343058,"end":343139,"audio":false},{"filename":"/.git/objects/17/d3cb71cb2db1af8c7819f4720e70359281fea0","crunched":0,"start":343139,"end":352376,"audio":false},{"filename":"/.git/objects/17/f7519be4be3054d5f9183f8f0d4bb1847f2db1","crunched":0,"start":352376,"end":352612,"audio":false},{"filename":"/.git/objects/18/8f17b945e1c3b3a118a25bc4019d991b99800b","crunched":0,"start":352612,"end":353580,"audio":false},{"filename":"/.git/objects/18/c3e04266bb29bd52100ab0d0bdf4004dc5aa94","crunched":0,"start":353580,"end":353741,"audio":false},{"filename":"/.git/objects/19/283bd460c7c8f07c98e50b846fbe29c6fbc017","crunched":0,"start":353741,"end":353901,"audio":false},{"filename":"/.git/objects/19/4baeeed01a7ba20d19cad6092529fcf02bdcd9","crunched":0,"start":353901,"end":354990,"audio":false},{"filename":"/.git/objects/19/ad47c37c1de26ec065a1c1f989e33a6f2a1b36","crunched":0,"start":354990,"end":355150,"audio":false},{"filename":"/.git/objects/1b/0306e2bced475b3110349ce0897f0c94644528","crunched":0,"start":355150,"end":355777,"audio":false},{"filename":"/.git/objects/1b/da6cc8f22819801ebfd49bbe83177b883056da","crunched":0,"start":355777,"end":356172,"audio":false},{"filename":"/.git/objects/1c/8233136dce27c780cedfa82a5d5fafa42f1a0e","crunched":0,"start":356172,"end":361165,"audio":false},{"filename":"/.git/objects/1d/0dbd3392b08790c23f638e41e21c3f9ca18ad9","crunched":0,"start":361165,"end":361317,"audio":false},{"filename":"/.git/objects/1d/e0fed7a441a383323305e0eaaca76b297e2ca2","crunched":0,"start":361317,"end":361400,"audio":false},{"filename":"/.git/objects/1e/046e8e5a977c6ee3dd5313256315857e26000d","crunched":0,"start":361400,"end":361879,"audio":false},{"filename":"/.git/objects/1e/61de4ac3e95d60c983fe5e89f5092b25b3d7fe","crunched":0,"start":361879,"end":362006,"audio":false},{"filename":"/.git/objects/1f/42e02e969dfdbcc6eb61fbeb32374369438ee7","crunched":0,"start":362006,"end":362089,"audio":false},{"filename":"/.git/objects/1f/d1a8c4dabd1c821df62b4b0e5519efe734ffb2","crunched":0,"start":362089,"end":362330,"audio":false},{"filename":"/.git/objects/20/37806089f19aeb6003357fe0db05470082da49","crunched":0,"start":362330,"end":362405,"audio":false},{"filename":"/.git/objects/20/b88d4351773732c1ddf0771a1fdaa8b808169d","crunched":0,"start":362405,"end":362546,"audio":false},{"filename":"/.git/objects/20/fe98c34d54f0dc4359cbee5f4569b0fea92c13","crunched":0,"start":362546,"end":365167,"audio":false},{"filename":"/.git/objects/21/4e1abe3a0ca7418b6f5bf7f02c35be58f7469a","crunched":0,"start":365167,"end":365325,"audio":false},{"filename":"/.git/objects/21/e40a1cbb4b6964ef122840fd73875a39d25703","crunched":0,"start":365325,"end":366006,"audio":false},{"filename":"/.git/objects/22/1f2431a22eb8e30915fc70c34d13747191ef51","crunched":0,"start":366006,"end":366091,"audio":false},{"filename":"/.git/objects/23/969b29c34a4bd116c445d2e632b724bca1d8af","crunched":0,"start":366091,"end":366247,"audio":false},{"filename":"/.git/objects/24/8e698372c9e523d448bdd053e37773bd1dc889","crunched":0,"start":366247,"end":369841,"audio":false},{"filename":"/.git/objects/24/f196e14d464a213b8eae34d6ca14780839f90f","crunched":0,"start":369841,"end":369994,"audio":false},{"filename":"/.git/objects/25/c61db73f0f8512f624f888a1f3679479654aff","crunched":0,"start":369994,"end":370174,"audio":false},{"filename":"/.git/objects/29/8892b733eae9674a24688c09dbf5e1f818f084","crunched":0,"start":370174,"end":373953,"audio":false},{"filename":"/.git/objects/29/d8b91019de27d26a181e779e005759c91b166f","crunched":0,"start":373953,"end":374063,"audio":false},{"filename":"/.git/objects/2a/163a1db88f9e0c0185092d533c4664775c626e","crunched":0,"start":374063,"end":374242,"audio":false},{"filename":"/.git/objects/2b/3fd8a2f0d43116c36af72c4a27623acc4ecfba","crunched":0,"start":374242,"end":374445,"audio":false},{"filename":"/.git/objects/2c/1925ab4a98a4f8ae4d118bb0b3b2e835592b2f","crunched":0,"start":374445,"end":374802,"audio":false},{"filename":"/.git/objects/2c/252a6ab5ab07968d39df040195eb3b3f204427","crunched":0,"start":374802,"end":375356,"audio":false},{"filename":"/.git/objects/2c/5f82593e70ad83672851e7f8d01e89c8c12476","crunched":0,"start":375356,"end":375543,"audio":false},{"filename":"/.git/objects/2c/8e15ce60afab7a0781c816d3ad28a7421b2a30","crunched":0,"start":375543,"end":375697,"audio":false},{"filename":"/.git/objects/2d/2f29b37c3df29c85005c7cf9419da034cd88ee","crunched":0,"start":375697,"end":377529,"audio":false},{"filename":"/.git/objects/2d/75d62c0f7dce8d14fce9901b74398232dcac44","crunched":0,"start":377529,"end":379756,"audio":false},{"filename":"/.git/objects/2d/da7d8c27c16cac8c2a9617ad965fcad38041a7","crunched":0,"start":379756,"end":379914,"audio":false},{"filename":"/.git/objects/2f/162e0dc7004325cc04c01fef2e74033d6d3503","crunched":0,"start":379914,"end":380891,"audio":false},{"filename":"/.git/objects/2f/968794501d1a7a99df5e842f967b1d904ddb32","crunched":0,"start":380891,"end":386911,"audio":false},{"filename":"/.git/objects/30/43a1a43dd46c33443e444b388276529dc97d57","crunched":0,"start":386911,"end":387083,"audio":false},{"filename":"/.git/objects/31/467f78c33d32f8ce17613eb652aadf4265441b","crunched":0,"start":387083,"end":387286,"audio":false},{"filename":"/.git/objects/31/6bd881a3faae86c069856dd34e6b9ad7469620","crunched":0,"start":387286,"end":387847,"audio":false},{"filename":"/.git/objects/31/9f0c24ba6506de21b10c875e105a110a260f52","crunched":0,"start":387847,"end":391404,"audio":false},{"filename":"/.git/objects/31/f399858b267181a1eb08c79263015602395761","crunched":0,"start":391404,"end":391913,"audio":false},{"filename":"/.git/objects/32/4ab595985f59484b2b41673a21518b88755da8","crunched":0,"start":391913,"end":392644,"audio":false},{"filename":"/.git/objects/32/e273ee97214aa7d38dae29022ff63dd0f7ff51","crunched":0,"start":392644,"end":393871,"audio":false},{"filename":"/.git/objects/33/421b47e2a6fd1b8be8b12633a9190327744363","crunched":0,"start":393871,"end":394434,"audio":false},{"filename":"/.git/objects/33/53a07149ef805ef55077b05aff835242ad5387","crunched":0,"start":394434,"end":394926,"audio":false},{"filename":"/.git/objects/33/f126c3754e08811b44f2053516e2e80b49f4cd","crunched":0,"start":394926,"end":394983,"audio":false},{"filename":"/.git/objects/34/5ffaebfdaa931a6f7b4cb634bed6732efd63e6","crunched":0,"start":394983,"end":395130,"audio":false},{"filename":"/.git/objects/34/825686e03634fbf845a1707e416910b60d7595","crunched":0,"start":395130,"end":395483,"audio":false},{"filename":"/.git/objects/34/ae41c0c1dd9de140ee73868f15e94e3b50ccc7","crunched":0,"start":395483,"end":396043,"audio":false},{"filename":"/.git/objects/35/48133cd973c714c4ae9d9d5bc3b13ed6336ae6","crunched":0,"start":396043,"end":396280,"audio":false},{"filename":"/.git/objects/35/7767d293734f8bd9ba5dc13c89f1a29f0d93ec","crunched":0,"start":396280,"end":417385,"audio":false},{"filename":"/.git/objects/35/9e54d6678fd00635e0a557c06f4e9b9c9ea2df","crunched":0,"start":417385,"end":417543,"audio":false},{"filename":"/.git/objects/36/016be1a6ea54e580fa442ec98a40f9c8893e40","crunched":0,"start":417543,"end":417729,"audio":false},{"filename":"/.git/objects/37/87b2a242a8523a242f49fae03c2d3d5f9e89ae","crunched":0,"start":417729,"end":448966,"audio":false},{"filename":"/.git/objects/38/6c9c167be9814c61600f89b273dc18f357627e","crunched":0,"start":448966,"end":449058,"audio":false},{"filename":"/.git/objects/38/bb4472e9d2d885bb8ff5fc3d61ad65a46d8b3e","crunched":0,"start":449058,"end":449178,"audio":false},{"filename":"/.git/objects/3a/c6bd31b641f8d55bcf0a3292a52c5c2f986c98","crunched":0,"start":449178,"end":449424,"audio":false},{"filename":"/.git/objects/3b/811284608a4f7b1fe47c98219b98b20e83171f","crunched":0,"start":449424,"end":450423,"audio":false},{"filename":"/.git/objects/3b/a29facb650ebc024b9870bfa2549d44f16d8a7","crunched":0,"start":450423,"end":450564,"audio":false},{"filename":"/.git/objects/3c/f8716d7408a08224845574d1c33feb6ed01cb1","crunched":0,"start":450564,"end":450729,"audio":false},{"filename":"/.git/objects/3d/328da81ba04704341982757067ab6a6d5fcad8","crunched":0,"start":450729,"end":450996,"audio":false},{"filename":"/.git/objects/3e/74f043e270d2b2466df1344057c01dc1399ebe","crunched":0,"start":450996,"end":451200,"audio":false},{"filename":"/.git/objects/3f/19bb38b80809dc899f9bbbdf837aa70ab76f35","crunched":0,"start":451200,"end":451258,"audio":false},{"filename":"/.git/objects/3f/9b1690b82ed41d0bdea1b7822ce485850f0f2f","crunched":0,"start":451258,"end":451406,"audio":false},{"filename":"/.git/objects/3f/ff0f1f5f59b257ff655c9b8c162f87a54cec4f","crunched":0,"start":451406,"end":451608,"audio":false},{"filename":"/.git/objects/40/2aaa6d51132dd12dcf341be5ca4d7bfcae99cf","crunched":0,"start":451608,"end":451760,"audio":false},{"filename":"/.git/objects/40/7059301e405caa48e68ae8a9978ee529071bb4","crunched":0,"start":451760,"end":451816,"audio":false},{"filename":"/.git/objects/40/752fd4c68a058571fe82aaaae93acc33e12380","crunched":0,"start":451816,"end":452431,"audio":false},{"filename":"/.git/objects/40/f62325a092304de3f969927f7b6a7356e19fbe","crunched":0,"start":452431,"end":452941,"audio":false},{"filename":"/.git/objects/41/cb144300ed187cd5e3a6b4db23fefa7c13ffbe","crunched":0,"start":452941,"end":452995,"audio":false},{"filename":"/.git/objects/43/033c613c26d139efe91dfe6f02124e4c3b1887","crunched":0,"start":452995,"end":453134,"audio":false},{"filename":"/.git/objects/43/342e6ed7b63c42cb2afe959bcb784490bc28e8","crunched":0,"start":453134,"end":453302,"audio":false},{"filename":"/.git/objects/43/f5441dc97abb6695c55544979c33efb069c93d","crunched":0,"start":453302,"end":455113,"audio":false},{"filename":"/.git/objects/44/523fc7a34b9e89bf074325f614e28a218e625d","crunched":0,"start":455113,"end":455257,"audio":false},{"filename":"/.git/objects/45/e81f85fd703dbe4c355e949144431fbb9315d0","crunched":0,"start":455257,"end":479534,"audio":false},{"filename":"/.git/objects/46/24c5ada34e02b3fddbd0b248f11863c89dd5da","crunched":0,"start":479534,"end":479854,"audio":false},{"filename":"/.git/objects/46/aac696933bcf3912073d274786b75987c18e99","crunched":0,"start":479854,"end":479995,"audio":false},{"filename":"/.git/objects/47/144a0a3c8158fb9264ee6d8ea3b1e46dde105f","crunched":0,"start":479995,"end":480389,"audio":false},{"filename":"/.git/objects/47/6760b401e8963cbce0dd1773a7c8e6c83e31d4","crunched":0,"start":480389,"end":481015,"audio":false},{"filename":"/.git/objects/4a/4f2c65fdbf68b48e6f0c6d3ea5d673a8d77514","crunched":0,"start":481015,"end":482597,"audio":false},{"filename":"/.git/objects/4a/c0332b2bea5393579b42040ba58b62edb3250e","crunched":0,"start":482597,"end":483088,"audio":false},{"filename":"/.git/objects/4b/1e0df71e5a4500f568516258a81b2332a619c2","crunched":0,"start":483088,"end":483260,"audio":false},{"filename":"/.git/objects/4b/fdb0b630c39f07ea29e6393e324b60b7cec933","crunched":0,"start":483260,"end":483417,"audio":false},{"filename":"/.git/objects/4c/1818d02869f34cd8c0581c1001661e8b56966b","crunched":0,"start":483417,"end":484141,"audio":false},{"filename":"/.git/objects/4c/921da71f4147820408fb171dc96fb817489562","crunched":0,"start":484141,"end":484739,"audio":false},{"filename":"/.git/objects/4c/9d0baa5cbb0060a8f59c28825116cb6f8f6c53","crunched":0,"start":484739,"end":485985,"audio":false},{"filename":"/.git/objects/4d/3072c5ca2d2816eaf43e65f27b707e0c97efd7","crunched":0,"start":485985,"end":486043,"audio":false},{"filename":"/.git/objects/4d/fac58d06e1ddda57c28e36f7439ac7f22433b9","crunched":0,"start":486043,"end":486385,"audio":false},{"filename":"/.git/objects/4e/584c4764107124f743e6c770d37b97f42a2bfb","crunched":0,"start":486385,"end":486458,"audio":false},{"filename":"/.git/objects/4f/3935dc8852a6d30ef8d1f7d3dbdd4bf0fc2b3a","crunched":0,"start":486458,"end":486633,"audio":false},{"filename":"/.git/objects/4f/438a07ec7321a9dc204e9f92e6211fc09478dc","crunched":0,"start":486633,"end":486819,"audio":false},{"filename":"/.git/objects/4f/80b7c5ed53f4761660898fa5a7cb903640fded","crunched":0,"start":486819,"end":486933,"audio":false},{"filename":"/.git/objects/4f/d3f24596caeb98e268a9e554b87e4292a8bd8c","crunched":0,"start":486933,"end":486990,"audio":false},{"filename":"/.git/objects/50/08ddfcf53c02e82d7eee2e57c38e5672ef89f6","crunched":0,"start":486990,"end":487245,"audio":false},{"filename":"/.git/objects/50/d1c71eb6e44d5866360230f45519c61a7bce68","crunched":0,"start":487245,"end":487814,"audio":false},{"filename":"/.git/objects/52/61b8605e2d335e2ac988fd9e20ae41c22da8b7","crunched":0,"start":487814,"end":488385,"audio":false},{"filename":"/.git/objects/52/93bfdf341b306eb57814ce233847336025ce94","crunched":0,"start":488385,"end":488526,"audio":false},{"filename":"/.git/objects/52/dec04860839fd03270977dfc296a091365473b","crunched":0,"start":488526,"end":488582,"audio":false},{"filename":"/.git/objects/53/33952f23560e19e64141ed5aee9ef1343a40a3","crunched":0,"start":488582,"end":488663,"audio":false},{"filename":"/.git/objects/53/c2d19d18ede4e9495043308689762f961667c3","crunched":0,"start":488663,"end":488869,"audio":false},{"filename":"/.git/objects/53/e2c453f41339d945b860a5f5d12f4a07183873","crunched":0,"start":488869,"end":489212,"audio":false},{"filename":"/.git/objects/54/773c6861a2e09cc02bf3ddddf880af1e3f5644","crunched":0,"start":489212,"end":489378,"audio":false},{"filename":"/.git/objects/56/26d4ff4edfe444ecba14da32b04985023fb0b2","crunched":0,"start":489378,"end":496711,"audio":false},{"filename":"/.git/objects/56/a93a0c7fe0c636c86c36a1de2a8d31480f86d2","crunched":0,"start":496711,"end":496768,"audio":false},{"filename":"/.git/objects/56/dc3d0411a966ddfc59ec036df5773ce3ecde39","crunched":0,"start":496768,"end":2057469,"audio":false},{"filename":"/.git/objects/56/f94b06e3c3a8a4ac536e2abfdd8dec8bee4990","crunched":0,"start":2057469,"end":2057525,"audio":false},{"filename":"/.git/objects/58/7b78c5b3159fdd604b4de94bbd1610383fb831","crunched":0,"start":2057525,"end":2057772,"audio":false},{"filename":"/.git/objects/58/8e5af5e513b21e849df5359f2f9950a81264b0","crunched":0,"start":2057772,"end":2098500,"audio":false},{"filename":"/.git/objects/58/a18469c45a4a7013ee5805ad08b0f236bc0c12","crunched":0,"start":2098500,"end":2098678,"audio":false},{"filename":"/.git/objects/59/ebcad2bfa0cbfae8f53fae367ae12d98acb6be","crunched":0,"start":2098678,"end":2098835,"audio":false},{"filename":"/.git/objects/5a/4e862728addae4b7df5fbca85ff4618480d767","crunched":0,"start":2098835,"end":2100713,"audio":false},{"filename":"/.git/objects/5a/ee1c1742bc79eb1af75767fb3ecbdb99df63fe","crunched":0,"start":2100713,"end":2101751,"audio":false},{"filename":"/.git/objects/5b/c834014cb39f01b11bbe1a1ae5dc7e3b178b49","crunched":0,"start":2101751,"end":2101905,"audio":false},{"filename":"/.git/objects/5d/25d276ee9bd9e7c947cbac5ca96bba5a0315ba","crunched":0,"start":2101905,"end":2102531,"audio":false},{"filename":"/.git/objects/5d/997fe593d891be83bcd4bcd6b0c2dc810d7416","crunched":0,"start":2102531,"end":2102662,"audio":false},{"filename":"/.git/objects/5d/a710ba345f86496a8ca0d1f3c39dd8927db3f6","crunched":0,"start":2102662,"end":2103280,"audio":false},{"filename":"/.git/objects/5d/c4fc5c2d57c73e82097f49ac30365c1b68d267","crunched":0,"start":2103280,"end":2103427,"audio":false},{"filename":"/.git/objects/5d/eb2ea9945766f7415bfcfbf5cb973a3dffef28","crunched":0,"start":2103427,"end":2103579,"audio":false},{"filename":"/.git/objects/5d/fa2b986bb5fcbc92b0868f6a4642975573d272","crunched":0,"start":2103579,"end":2104811,"audio":false},{"filename":"/.git/objects/5e/2c7f22be31997741e6d4155cbc41c324667c17","crunched":0,"start":2104811,"end":2104927,"audio":false},{"filename":"/.git/objects/5e/3ceaa7106b9ea4e4f14c1b749173ccc8c3e1d6","crunched":0,"start":2104927,"end":2105010,"audio":false},{"filename":"/.git/objects/5e/4e85cefb42ed2a841bf93acae29bcd5f9ee285","crunched":0,"start":2105010,"end":2105572,"audio":false},{"filename":"/.git/objects/5e/6135d765a73be2053afbc736621b2fc72000d2","crunched":0,"start":2105572,"end":2114039,"audio":false},{"filename":"/.git/objects/5e/ad20112dd4ff8a2cc74edf5906da668cd47af3","crunched":0,"start":2114039,"end":2114193,"audio":false},{"filename":"/.git/objects/5e/e8d2e7f447511d0f84275599b529c9548d729e","crunched":0,"start":2114193,"end":2127678,"audio":false},{"filename":"/.git/objects/5e/fbb8b16a1952af114a92e5e2c4d6a647c04432","crunched":0,"start":2127678,"end":2127874,"audio":false},{"filename":"/.git/objects/5f/17e00b1d4b627ce1f23c61de07a5105cc86443","crunched":0,"start":2127874,"end":2127931,"audio":false},{"filename":"/.git/objects/5f/ed08f197acec50c0d0f7a52016fac076c77038","crunched":0,"start":2127931,"end":2127982,"audio":false},{"filename":"/.git/objects/5f/ef4dc787b61c1718bd6f0897037569d3735b0c","crunched":0,"start":2127982,"end":2128104,"audio":false},{"filename":"/.git/objects/60/b5cc85f7d37b3b2285ae51b5fa43f758a23032","crunched":0,"start":2128104,"end":2128595,"audio":false},{"filename":"/.git/objects/61/9d7fdeb25f6ca1b33e79e40a70d9b150e36dac","crunched":0,"start":2128595,"end":2129363,"audio":false},{"filename":"/.git/objects/61/a6b164d934101e87a657fb7a74c292b2f9ff52","crunched":0,"start":2129363,"end":2129428,"audio":false},{"filename":"/.git/objects/62/9f543ec2c10024cc9ff2da03b4f7f2ae36d017","crunched":0,"start":2129428,"end":2132529,"audio":false},{"filename":"/.git/objects/64/fd26b05dd51c2d1a38797b35667e51d7cef058","crunched":0,"start":2132529,"end":2132562,"audio":false},{"filename":"/.git/objects/64/fde8914988d1811877f32fac00e71e33ad83ae","crunched":0,"start":2132562,"end":2133161,"audio":false},{"filename":"/.git/objects/64/fe946568b8004e5672e82cb1b80090aec56b22","crunched":0,"start":2133161,"end":2133283,"audio":false},{"filename":"/.git/objects/65/7e1f0c14068f59b678313b01d9e2ad4cb4f6ba","crunched":0,"start":2133283,"end":2133528,"audio":false},{"filename":"/.git/objects/66/54b60505b234844d1c44e11a9cd057e916fb07","crunched":0,"start":2133528,"end":2133609,"audio":false},{"filename":"/.git/objects/66/a56b72df6412da6b30fa039e7632d95823ab97","crunched":0,"start":2133609,"end":2137723,"audio":false},{"filename":"/.git/objects/66/f83c5d882ffb83cd7f4b3d3c7edd45240c0166","crunched":0,"start":2137723,"end":2205253,"audio":false},{"filename":"/.git/objects/67/373d7f4df75addc836cc0a9465554e204942c7","crunched":0,"start":2205253,"end":2205374,"audio":false},{"filename":"/.git/objects/67/6d1602aef888a6ce9eed3aa9afd625cca85c0d","crunched":0,"start":2205374,"end":2205936,"audio":false},{"filename":"/.git/objects/67/6e2d5855df73dc09a84f6ddc637e834baaef1b","crunched":0,"start":2205936,"end":2206084,"audio":false},{"filename":"/.git/objects/67/ac310108979d3457f08010996cec0ae8b02963","crunched":0,"start":2206084,"end":2206136,"audio":false},{"filename":"/.git/objects/67/f2ea0d7067ee496588772568fa09d5fd44a210","crunched":0,"start":2206136,"end":2207071,"audio":false},{"filename":"/.git/objects/68/fd568ce1c4832f2904ca59571fe54506ac4480","crunched":0,"start":2207071,"end":2207128,"audio":false},{"filename":"/.git/objects/69/368ed3379ea2f6854ebd80fda32d47be6f44fd","crunched":0,"start":2207128,"end":2207322,"audio":false},{"filename":"/.git/objects/6a/96e4f1e020542f8db95e0f1bddb33edb59bfd7","crunched":0,"start":2207322,"end":2209339,"audio":false},{"filename":"/.git/objects/6a/98cc8578f1291b141e12f450c1555ebffab3f7","crunched":0,"start":2209339,"end":2209936,"audio":false},{"filename":"/.git/objects/6c/17026ab6e5d101358f6399025f45e5411c8d28","crunched":0,"start":2209936,"end":2210528,"audio":false},{"filename":"/.git/objects/6c/1bd42f29fed011ba7fc6d45158ca2341198b6b","crunched":0,"start":2210528,"end":2210578,"audio":false},{"filename":"/.git/objects/6c/6863a77bcc540bb481baf9e87d86537d59bf17","crunched":0,"start":2210578,"end":2211536,"audio":false},{"filename":"/.git/objects/6c/d3520e897585c356e65baad4548c9fd6ab3163","crunched":0,"start":2211536,"end":2242544,"audio":false},{"filename":"/.git/objects/6d/42bc53c1f11fe98ce33dbe76a3fb68acd86602","crunched":0,"start":2242544,"end":2243380,"audio":false},{"filename":"/.git/objects/6d/5875c9a23ad4e8bf67601c19a8dec5ff13456e","crunched":0,"start":2243380,"end":2243462,"audio":false},{"filename":"/.git/objects/6e/265d26cd8ffa3acdc0c7151146649143502303","crunched":0,"start":2243462,"end":2243544,"audio":false},{"filename":"/.git/objects/6e/500565f827b8633d188859b99b70a4ac6b0176","crunched":0,"start":2243544,"end":2244136,"audio":false},{"filename":"/.git/objects/6f/7c2ab25af066f4d94700cc176069bbb394a193","crunched":0,"start":2244136,"end":2244284,"audio":false},{"filename":"/.git/objects/6f/a63b1862c3e5fd9630eb7bf4e3de897090bb29","crunched":0,"start":2244284,"end":2244449,"audio":false},{"filename":"/.git/objects/70/3e1634076b5b8b50445ee5a3865d8577418b01","crunched":0,"start":2244449,"end":2247251,"audio":false},{"filename":"/.git/objects/70/a08aa73988f9f56ad8f2e7dfab639eb38365a4","crunched":0,"start":2247251,"end":2259060,"audio":false},{"filename":"/.git/objects/71/9119061fab9e15d7f9240a8868507e9997485e","crunched":0,"start":2259060,"end":2259318,"audio":false},{"filename":"/.git/objects/72/ae630d9a99b14f6e8698e2d29933acb66f4679","crunched":0,"start":2259318,"end":2262507,"audio":false},{"filename":"/.git/objects/72/b3e89466e4ff32ea51cf416ca721f30ee0971c","crunched":0,"start":2262507,"end":2262768,"audio":false},{"filename":"/.git/objects/73/537da729302b2f12a346fef10ec5c9666a4a35","crunched":0,"start":2262768,"end":2263266,"audio":false},{"filename":"/.git/objects/73/77dd16c8f507f9c9bb510be97aae31c87b1c5f","crunched":0,"start":2263266,"end":2269343,"audio":false},{"filename":"/.git/objects/73/d79908526a20125bc631bb87d3c7c873c0dc92","crunched":0,"start":2269343,"end":2269546,"audio":false},{"filename":"/.git/objects/73/db1f61e6ba3da7f9d294c039304b88ef33c865","crunched":0,"start":2269546,"end":2270097,"audio":false},{"filename":"/.git/objects/74/0ac97ff534b85640db9aedeac92684243feb6e","crunched":0,"start":2270097,"end":2270336,"audio":false},{"filename":"/.git/objects/74/6ad16e301f86ada0fed0e3c7a767ef48b4605a","crunched":0,"start":2270336,"end":2270502,"audio":false},{"filename":"/.git/objects/74/8b91fdfabfb102ecd25a549e5bc2f9dda1e7b9","crunched":0,"start":2270502,"end":2271063,"audio":false},{"filename":"/.git/objects/74/afb41774ec0139914b56e2abd7ab8632fcb8f1","crunched":0,"start":2271063,"end":2271239,"audio":false},{"filename":"/.git/objects/75/33631961e04688a92b443999921eb49699ae6d","crunched":0,"start":2271239,"end":2272223,"audio":false},{"filename":"/.git/objects/75/f5aaea1d1a05606bcad0d45bd993da63730f18","crunched":0,"start":2272223,"end":2272366,"audio":false},{"filename":"/.git/objects/76/3acff3fd02dae4acee37691a2bd3b5de7208fb","crunched":0,"start":2272366,"end":2272507,"audio":false},{"filename":"/.git/objects/77/5bca2855cb68aa88ef5e3d1047a751eb021216","crunched":0,"start":2272507,"end":2272694,"audio":false},{"filename":"/.git/objects/77/7e27ef82600d64e61edfaa06669ff8db2653cb","crunched":0,"start":2272694,"end":2272752,"audio":false},{"filename":"/.git/objects/77/a56f52507053a88f3f576c80306c1c9045b2a2","crunched":0,"start":2272752,"end":2273320,"audio":false},{"filename":"/.git/objects/78/fb5ea7315757985b5682419ec15e628ef5e4a7","crunched":0,"start":2273320,"end":2273991,"audio":false},{"filename":"/.git/objects/79/de3439feeb9fdfa628e495d4bbb284d193816d","crunched":0,"start":2273991,"end":2274066,"audio":false},{"filename":"/.git/objects/79/ffa01fdc9c178e9d3ae4d7fb8424f690ea0ccf","crunched":0,"start":2274066,"end":2274371,"audio":false},{"filename":"/.git/objects/7a/0e2e915a32e55367cc49913ec48e1600e83e45","crunched":0,"start":2274371,"end":2275391,"audio":false},{"filename":"/.git/objects/7a/2cfa14c470f1db3e9468007a48a9cfc274f1c0","crunched":0,"start":2275391,"end":2275473,"audio":false},{"filename":"/.git/objects/7a/c375e21b4c497a81e68ad32be3a7699337cfac","crunched":0,"start":2275473,"end":2276068,"audio":false},{"filename":"/.git/objects/7b/a27d4e3c5a369fb8ecd4f0d6e6d154c657e1d0","crunched":0,"start":2276068,"end":2276229,"audio":false},{"filename":"/.git/objects/7b/c1116330cd7dc33f04186a24baa88584e7eedc","crunched":0,"start":2276229,"end":2276377,"audio":false},{"filename":"/.git/objects/7c/382dd220f16de7be35d48d3ae7927d252162fa","crunched":0,"start":2276377,"end":2276664,"audio":false},{"filename":"/.git/objects/7c/51f35468494caa9d0e200d7ec6d2ba35261872","crunched":0,"start":2276664,"end":2287393,"audio":false},{"filename":"/.git/objects/7c/fbab5ec56dc2958351f26865b2240f810e6d90","crunched":0,"start":2287393,"end":2287505,"audio":false},{"filename":"/.git/objects/7d/10674ba474e802689a45f3485f175aaf2ef1c2","crunched":0,"start":2287505,"end":2287528,"audio":false},{"filename":"/.git/objects/7d/b1c74dc9528b77503fdd824bc0a90c04f57144","crunched":0,"start":2287528,"end":2287586,"audio":false},{"filename":"/.git/objects/7d/ca6d97041807afa2bbcb6d9fe83fd8c0259a9e","crunched":0,"start":2287586,"end":2287744,"audio":false},{"filename":"/.git/objects/7e/071cda363d0f4c8e594ccdeb6855b79207b130","crunched":0,"start":2287744,"end":2287795,"audio":false},{"filename":"/.git/objects/7e/0f5b3cb6a5e45803b202fc91810378685191d9","crunched":0,"start":2287795,"end":2288329,"audio":false},{"filename":"/.git/objects/7e/3a01ce4739565209706dc2f74c82dea73ce19d","crunched":0,"start":2288329,"end":2294564,"audio":false},{"filename":"/.git/objects/7e/b8e312081a08c4fb1000fbab909c5bd08c2545","crunched":0,"start":2294564,"end":2301194,"audio":false},{"filename":"/.git/objects/7e/bad74e20d79878ce7ca0c80becbf7943759711","crunched":0,"start":2301194,"end":2304848,"audio":false},{"filename":"/.git/objects/7f/87ab50e3d2551716485c62963ed0e99cbc5fac","crunched":0,"start":2304848,"end":2304906,"audio":false},{"filename":"/.git/objects/7f/bf5460fa333f62773e0786f36b67009ae29278","crunched":0,"start":2304906,"end":2305057,"audio":false},{"filename":"/.git/objects/81/1002b37e6b1b86c1b6c83b87b1ceff83cc155e","crunched":0,"start":2305057,"end":2305654,"audio":false},{"filename":"/.git/objects/82/2f7f7836359f07c90b88a00fb51a111d8273c1","crunched":0,"start":2305654,"end":2305766,"audio":false},{"filename":"/.git/objects/82/436c5829cfc86f8ab08127c4e786f1d919c391","crunched":0,"start":2305766,"end":2305848,"audio":false},{"filename":"/.git/objects/82/44a97b61a2e332a0480d07fd3d6625d957141c","crunched":0,"start":2305848,"end":2373201,"audio":false},{"filename":"/.git/objects/83/15f6871eef95a8b9009514cb0eaba3b9bf8425","crunched":0,"start":2373201,"end":2376132,"audio":false},{"filename":"/.git/objects/84/140fe6cd462bc41e7ec8043c56eddac6e083dc","crunched":0,"start":2376132,"end":2376301,"audio":false},{"filename":"/.git/objects/84/f9647d3448a4310040279600ca9f703bbe1a77","crunched":0,"start":2376301,"end":2377522,"audio":false},{"filename":"/.git/objects/85/2ae1db3567f9003a39096f7581f0c4d89cc4e2","crunched":0,"start":2377522,"end":2377604,"audio":false},{"filename":"/.git/objects/85/76aa19ddc0833b41710a3d6bed5b5757568e92","crunched":0,"start":2377604,"end":2377772,"audio":false},{"filename":"/.git/objects/85/7d3aa02bedbe853676a7bacfe379ed9db6f878","crunched":0,"start":2377772,"end":2377990,"audio":false},{"filename":"/.git/objects/86/5227e33dd8f419aaef71e3c81c51d83bfcbd6f","crunched":0,"start":2377990,"end":2378950,"audio":false},{"filename":"/.git/objects/87/aa1a6a04f912930529d0b03ef89e72e6526f6b","crunched":0,"start":2378950,"end":2379065,"audio":false},{"filename":"/.git/objects/88/0beb92f56f6a04b81f4306bbee29df2204f12a","crunched":0,"start":2379065,"end":2379201,"audio":false},{"filename":"/.git/objects/88/5d4cd66225d0ebb81614ea4a5c6f98f4b62360","crunched":0,"start":2379201,"end":2379293,"audio":false},{"filename":"/.git/objects/89/06d3ff9eaa40cb2411c28621038f2a2024b7bd","crunched":0,"start":2379293,"end":2391217,"audio":false},{"filename":"/.git/objects/89/72f9c64cbfc54a74eb90e74e7d521fdfc404d1","crunched":0,"start":2391217,"end":2391849,"audio":false},{"filename":"/.git/objects/89/e0476db8100771feeb2dd3abec0de53cdd03a5","crunched":0,"start":2391849,"end":2406529,"audio":false},{"filename":"/.git/objects/8a/86bb841d79d5f337e32fe35393b42f369b8e4e","crunched":0,"start":2406529,"end":2406689,"audio":false},{"filename":"/.git/objects/8b/7168f7db2940c69b6116b16fd26c28f89e1a86","crunched":0,"start":2406689,"end":2406821,"audio":false},{"filename":"/.git/objects/8b/8d1a765818a0441134f134d32cdb62fcb7e53b","crunched":0,"start":2406821,"end":2409638,"audio":false},{"filename":"/.git/objects/8c/324a1574229238084df5a307021912f152c20f","crunched":0,"start":2409638,"end":2409843,"audio":false},{"filename":"/.git/objects/8d/11e6c88c68712830980b0db3299d5896e73c5f","crunched":0,"start":2409843,"end":2410688,"audio":false},{"filename":"/.git/objects/8d/16d64deda55b3c566f5ef7b72ba3ab1f3b3cbb","crunched":0,"start":2410688,"end":2410944,"audio":false},{"filename":"/.git/objects/8e/06bb993189a3fdc753280be4f5dfedd2510234","crunched":0,"start":2410944,"end":2411026,"audio":false},{"filename":"/.git/objects/8e/f8cfaba2f3cfebac109de32b3057c989e2dede","crunched":0,"start":2411026,"end":2411283,"audio":false},{"filename":"/.git/objects/8f/41f75d679ec4e72c02423c38171d83ad9dc5a5","crunched":0,"start":2411283,"end":2412240,"audio":false},{"filename":"/.git/objects/8f/70d7f803d8538ed85f693a095dbe2b4b0a89fc","crunched":0,"start":2412240,"end":2412801,"audio":false},{"filename":"/.git/objects/8f/75c7718a0c786556c8fbeb2d13cbf7cdda4832","crunched":0,"start":2412801,"end":2417717,"audio":false},{"filename":"/.git/objects/8f/914a84da8a2d42f8e3e1407dcbed807f88a48a","crunched":0,"start":2417717,"end":2417950,"audio":false},{"filename":"/.git/objects/90/058ead0b8f350d5a355d4c60da15e6a0c8c7c0","crunched":0,"start":2417950,"end":2418154,"audio":false},{"filename":"/.git/objects/90/39ba63f46bb96feedd3ef8b60594a9a1c54987","crunched":0,"start":2418154,"end":2418312,"audio":false},{"filename":"/.git/objects/90/9badf43727ff161fe5b11268a6aaebe9a0403c","crunched":0,"start":2418312,"end":2418536,"audio":false},{"filename":"/.git/objects/90/fea064542c5ef15b2489c9c1c0613e54aeb13c","crunched":0,"start":2418536,"end":2419235,"audio":false},{"filename":"/.git/objects/91/26a680c79e14728c6ed2b9fa78066d7cbaecfd","crunched":0,"start":2419235,"end":2419399,"audio":false},{"filename":"/.git/objects/92/26640fe4b68a3979884dd0f4a258bcad59df16","crunched":0,"start":2419399,"end":2419602,"audio":false},{"filename":"/.git/objects/93/3378110deae763012bda6ae558dd7358d05f49","crunched":0,"start":2419602,"end":2419995,"audio":false},{"filename":"/.git/objects/93/3f4e5ded628ab0a0687b5829669132a346d148","crunched":0,"start":2419995,"end":2420851,"audio":false},{"filename":"/.git/objects/93/5728995edc497ce9708c1b87bf7e9c33e8fb54","crunched":0,"start":2420851,"end":2420933,"audio":false},{"filename":"/.git/objects/93/89e9ec0791e7434f974cd48403552041eaf724","crunched":0,"start":2420933,"end":2421255,"audio":false},{"filename":"/.git/objects/93/8a1ebbe542ef3a0ac58d6677574cc16ba947b8","crunched":0,"start":2421255,"end":2421969,"audio":false},{"filename":"/.git/objects/95/b43a99d202f65ca8470f9f3e3636a7f07f8421","crunched":0,"start":2421969,"end":2422269,"audio":false},{"filename":"/.git/objects/96/16aea99b5318fcd949aca6764a236a35b3f8e2","crunched":0,"start":2422269,"end":2422431,"audio":false},{"filename":"/.git/objects/98/065d074f017b5dd5e5335f5cb331d358b530da","crunched":0,"start":2422431,"end":2422495,"audio":false},{"filename":"/.git/objects/98/408e24209af98b0c53fb1ebd5dbd4251d33c66","crunched":0,"start":2422495,"end":2422889,"audio":false},{"filename":"/.git/objects/99/3c014902a2f5843fd22f86643c3523832662cf","crunched":0,"start":2422889,"end":2423327,"audio":false},{"filename":"/.git/objects/99/a52f18ff356547e8606e74f5877df7db3c2e03","crunched":0,"start":2423327,"end":2423500,"audio":false},{"filename":"/.git/objects/99/ca046fe0d13f46792a0fcb5eadc04c182c83eb","crunched":0,"start":2423500,"end":2423784,"audio":false},{"filename":"/.git/objects/99/d2a400eaea1c673f6acbcd29584f7265e3baf1","crunched":0,"start":2423784,"end":2425029,"audio":false},{"filename":"/.git/objects/99/e41691f6626bcc4c3792aa381e1392ada888e6","crunched":0,"start":2425029,"end":2425797,"audio":false},{"filename":"/.git/objects/9a/a70cc8ff5b056dbf26484c329d3dda68e00569","crunched":0,"start":2425797,"end":2437619,"audio":false},{"filename":"/.git/objects/9a/b5f06549de50e6ba36a5782860e560ed9f80e8","crunched":0,"start":2437619,"end":2437790,"audio":false},{"filename":"/.git/objects/9b/452e4fb7156f07b7cbbe438891f9ec1b317605","crunched":0,"start":2437790,"end":2438351,"audio":false},{"filename":"/.git/objects/9b/874b54d53ba8587c54bd0765e688c25f77caf7","crunched":0,"start":2438351,"end":2438616,"audio":false},{"filename":"/.git/objects/9c/d3dfc236d8e717e7e77e5c5ef2663b6ea6302a","crunched":0,"start":2438616,"end":2438726,"audio":false},{"filename":"/.git/objects/9d/31ab1a2cc334a6fa271033fbb36eca577b76e6","crunched":0,"start":2438726,"end":2479541,"audio":false},{"filename":"/.git/objects/9e/e5d572da65d481de2731b64775190a9912f336","crunched":0,"start":2479541,"end":2881708,"audio":false},{"filename":"/.git/objects/9f/8a27dd3952d2c669a063532b9b0e0318b10315","crunched":0,"start":2881708,"end":2882203,"audio":false},{"filename":"/.git/objects/a0/961769cacac3e20e7b6d39566aac8a87599c8e","crunched":0,"start":2882203,"end":2882698,"audio":false},{"filename":"/.git/objects/a1/330ec5115e5b8df321c55e11042e7ad823d4e8","crunched":0,"start":2882698,"end":2883280,"audio":false},{"filename":"/.git/objects/a1/964b14ee1b349ed2cfc22edf7778a805e2cfb4","crunched":0,"start":2883280,"end":2883338,"audio":false},{"filename":"/.git/objects/a2/3bb3955a5cb709f81e479107f40c3fbd13a9ab","crunched":0,"start":2883338,"end":2883807,"audio":false},{"filename":"/.git/objects/a2/4f003a64057fd4bca64632b94f31fdada49159","crunched":0,"start":2883807,"end":2883889,"audio":false},{"filename":"/.git/objects/a3/61da646227637ff5a8fa331f62ef612004fdbb","crunched":0,"start":2883889,"end":2884161,"audio":false},{"filename":"/.git/objects/a3/c1b85bdf425c21ca503ef7556806fd2d4bc263","crunched":0,"start":2884161,"end":2885117,"audio":false},{"filename":"/.git/objects/a4/36eacdbf3bc64bf9528c5357224d90d8be2f59","crunched":0,"start":2885117,"end":2885875,"audio":false},{"filename":"/.git/objects/a4/5d0da7669b65c8d3b507c0050b3ddf39585cd7","crunched":0,"start":2885875,"end":2886078,"audio":false},{"filename":"/.git/objects/a4/f887b8b52254c9f60647427087ffe7726f9e17","crunched":0,"start":2886078,"end":2886310,"audio":false},{"filename":"/.git/objects/a5/c2d6e0257a87506ed5fb9ccb1b4e73a8245b59","crunched":0,"start":2886310,"end":2886423,"audio":false},{"filename":"/.git/objects/a5/cab333350597595a0e0497d8a68bc587a34b99","crunched":0,"start":2886423,"end":2886661,"audio":false},{"filename":"/.git/objects/a6/2b4e3be807a2bcdecb6690c0301396d79123ba","crunched":0,"start":2886661,"end":2887389,"audio":false},{"filename":"/.git/objects/a6/76dcd53fba629077a10633e63bbfbe5f3f1178","crunched":0,"start":2887389,"end":2887550,"audio":false},{"filename":"/.git/objects/a6/da4b212fd0dd48fa4166d3ed7e0ec5a7e83753","crunched":0,"start":2887550,"end":2888808,"audio":false},{"filename":"/.git/objects/a6/ffa50fff7f376df50ce3cbd4f97f97f4738a5e","crunched":0,"start":2888808,"end":2897192,"audio":false},{"filename":"/.git/objects/a8/8ba01ee17f5601231932b5c0e9667ed635d025","crunched":0,"start":2897192,"end":2897586,"audio":false},{"filename":"/.git/objects/a8/d92d9b8420b3ae473dd219c7b7f3079d14130d","crunched":0,"start":2897586,"end":2898081,"audio":false},{"filename":"/.git/objects/a8/e931fa50b8f2a96fbb06c426877ea3e656668c","crunched":0,"start":2898081,"end":2898163,"audio":false},{"filename":"/.git/objects/a9/cf3c5a1f8d6a6b378ef19b563410f80d37fd47","crunched":0,"start":2898163,"end":2898668,"audio":false},{"filename":"/.git/objects/aa/247a06ffaa5de75340540aff1c646d011546a8","crunched":0,"start":2898668,"end":2899442,"audio":false},{"filename":"/.git/objects/aa/3ada74a28401a76d477e61081ec67ad887c874","crunched":0,"start":2899442,"end":2899628,"audio":false},{"filename":"/.git/objects/aa/904c7dd6ad69cfb27ab57b917d8da0fe5b9e85","crunched":0,"start":2899628,"end":2907822,"audio":false},{"filename":"/.git/objects/ab/7d31a2d37c4ca88af3894ccc7234837701c573","crunched":0,"start":2907822,"end":2907983,"audio":false},{"filename":"/.git/objects/ac/0982423c85db7f151530f50f7cb2b4caec8962","crunched":0,"start":2907983,"end":2908577,"audio":false},{"filename":"/.git/objects/ac/65cc5a2f963c95f98e96cd908ce0499ed4da0b","crunched":0,"start":2908577,"end":2909080,"audio":false},{"filename":"/.git/objects/ac/b492692ec13d0b4abf3d7f9df4849748afafa1","crunched":0,"start":2909080,"end":2909137,"audio":false},{"filename":"/.git/objects/ad/2161869154a0598250aafd39382f06106c9311","crunched":0,"start":2909137,"end":2909344,"audio":false},{"filename":"/.git/objects/ad/7b0c59f83b40386eb131fdabd499714b381867","crunched":0,"start":2909344,"end":2910347,"audio":false},{"filename":"/.git/objects/ad/ba8a81a5943874f0dd0fc05d1d0315aa57e593","crunched":0,"start":2910347,"end":2910404,"audio":false},{"filename":"/.git/objects/ad/e69ef6025558bd63c223bfa15665d1e36cdd67","crunched":0,"start":2910404,"end":2910612,"audio":false},{"filename":"/.git/objects/ae/40873b759e51ff599c92e9dd84f8cdb7ef4ccb","crunched":0,"start":2910612,"end":2911312,"audio":false},{"filename":"/.git/objects/ae/abdc3f287220e0c0e23885a1787efefa8ee35e","crunched":0,"start":2911312,"end":2911398,"audio":false},{"filename":"/.git/objects/ae/c9b86379ea775da58e26a6d082121f3cc59c7c","crunched":0,"start":2911398,"end":2911948,"audio":false},{"filename":"/.git/objects/af/6477994dcd97c385d2ebdc5cf7c3e219dd2e14","crunched":0,"start":2911948,"end":2912096,"audio":false},{"filename":"/.git/objects/af/daee36224da6e23516c48e7c6bade6f7c01794","crunched":0,"start":2912096,"end":2912206,"audio":false},{"filename":"/.git/objects/af/fbfd93e0df7a33e022aba1be13c9937871638d","crunched":0,"start":2912206,"end":2912380,"audio":false},{"filename":"/.git/objects/b0/24d9795c6014d40117b19188020310059b1a83","crunched":0,"start":2912380,"end":2912971,"audio":false},{"filename":"/.git/objects/b0/a36cb2520e4add3d030be724402070bda16669","crunched":0,"start":2912971,"end":2922205,"audio":false},{"filename":"/.git/objects/b1/89250ce75fe990e7b56600fc278a7f2010590b","crunched":0,"start":2922205,"end":2922768,"audio":false},{"filename":"/.git/objects/b1/b1c8124cdcacb8a5c19617928659bfbfeb3565","crunched":0,"start":2922768,"end":2922954,"audio":false},{"filename":"/.git/objects/b1/cfd15982c5998d8ea808008fee3b3fbb22de3a","crunched":0,"start":2922954,"end":2923456,"audio":false},{"filename":"/.git/objects/b2/47d4b991f2b76a2567cec85b6d912a5f90e288","crunched":0,"start":2923456,"end":2923678,"audio":false},{"filename":"/.git/objects/b2/c55219001dbd4480d801f2509c1b67d2bd9413","crunched":0,"start":2923678,"end":2923882,"audio":false},{"filename":"/.git/objects/b3/4b0b19103e28a43e431436ad623185da12a450","crunched":0,"start":2923882,"end":2924040,"audio":false},{"filename":"/.git/objects/b4/928f20ac0e878bb25917c872e7ce9bb01f57a4","crunched":0,"start":2924040,"end":2925398,"audio":false},{"filename":"/.git/objects/b4/c934e0721bdf304c9502370c6d094a4b393bdd","crunched":0,"start":2925398,"end":2925550,"audio":false},{"filename":"/.git/objects/b5/35579cefecdc7a0ea424f138f811d31fcd3837","crunched":0,"start":2925550,"end":2925753,"audio":false},{"filename":"/.git/objects/b6/2dcbbb36d246bd06791a5858fee3f25afccc52","crunched":0,"start":2925753,"end":2926511,"audio":false},{"filename":"/.git/objects/b6/3cccccc5c9b24d61389566cc8c99c463f42e18","crunched":0,"start":2926511,"end":2927050,"audio":false},{"filename":"/.git/objects/b6/77e60e1a8ff2a27d152e0810b45728409ddeee","crunched":0,"start":2927050,"end":2927325,"audio":false},{"filename":"/.git/objects/b8/7f3349b1dc502a4a650d85d385a3239810377b","crunched":0,"start":2927325,"end":2929196,"audio":false},{"filename":"/.git/objects/b9/5f4aa710fdc54da92e1ebc3c5b9a38b3c9d1e7","crunched":0,"start":2929196,"end":2930478,"audio":false},{"filename":"/.git/objects/ba/681553f03493e9e6a2cb65682e3a6b74e4fd89","crunched":0,"start":2930478,"end":2930753,"audio":false},{"filename":"/.git/objects/ba/bab2a4740247c40b2613ed39d7a713a8a08567","crunched":0,"start":2930753,"end":2930925,"audio":false},{"filename":"/.git/objects/ba/c44c691f6d134d18a81128cf4b0bcaa72ba146","crunched":0,"start":2930925,"end":2931128,"audio":false},{"filename":"/.git/objects/ba/e185db1f412b7a00b283b6cd430c1e3bb229d1","crunched":0,"start":2931128,"end":2932471,"audio":false},{"filename":"/.git/objects/bb/b8fdbe6a9d74e34f3dadf01da4c7e8f6629ea1","crunched":0,"start":2932471,"end":3082936,"audio":false},{"filename":"/.git/objects/bb/e3c423fb7b3c51b70bebc1dd9d70ac6d9de118","crunched":0,"start":3082936,"end":3083528,"audio":false},{"filename":"/.git/objects/bc/8332d1cb8a0ec9ce997579452091470f11ec5c","crunched":0,"start":3083528,"end":3083625,"audio":false},{"filename":"/.git/objects/bc/b70a228d5a82b12539021948439be906d29300","crunched":0,"start":3083625,"end":3084159,"audio":false},{"filename":"/.git/objects/bd/cef9d9f3b5050b2633e4f52179a16b4b5f88e6","crunched":0,"start":3084159,"end":3084312,"audio":false},{"filename":"/.git/objects/be/1c00f38b8bf049852a4e3a23eb3d692ff21d02","crunched":0,"start":3084312,"end":3084365,"audio":false},{"filename":"/.git/objects/bf/73eccc2cd34f8b576282b5428c1f08db4879ab","crunched":0,"start":3084365,"end":3084572,"audio":false},{"filename":"/.git/objects/c0/4c66ba193c2f3a4bd5c6eccde1b42af92e4084","crunched":0,"start":3084572,"end":3085026,"audio":false},{"filename":"/.git/objects/c1/6cb51106a66bccf7bac19bbfc3e0212c52c1de","crunched":0,"start":3085026,"end":3085120,"audio":false},{"filename":"/.git/objects/c1/aa6b6e460616a095418de4e1f18aef020de895","crunched":0,"start":3085120,"end":3085279,"audio":false},{"filename":"/.git/objects/c2/94450b2aaab87436ea6971e92c58455afb6a88","crunched":0,"start":3085279,"end":3091219,"audio":false},{"filename":"/.git/objects/c2/9daae20d3a0e280c510e45de5b1cb6e2c0ac05","crunched":0,"start":3091219,"end":3091303,"audio":false},{"filename":"/.git/objects/c2/a4c9cb8b6623828058728261d33c371a61c0b4","crunched":0,"start":3091303,"end":3091506,"audio":false},{"filename":"/.git/objects/c2/e6f9b56e566975fade9b7532d0d211bec3eb7b","crunched":0,"start":3091506,"end":3092132,"audio":false},{"filename":"/.git/objects/c2/fdbe697c1ef812181affe084f406f8e8c22220","crunched":0,"start":3092132,"end":3092274,"audio":false},{"filename":"/.git/objects/c3/ae13b4e0f331ece0ed3d40e64fe528f14d998f","crunched":0,"start":3092274,"end":3094305,"audio":false},{"filename":"/.git/objects/c3/b8bb0359f304a0a846cfb4df300c1d94b985a2","crunched":0,"start":3094305,"end":3103290,"audio":false},{"filename":"/.git/objects/c3/cf4be3e25178d4a92485540e28a298eda4ff6d","crunched":0,"start":3103290,"end":3103443,"audio":false},{"filename":"/.git/objects/c4/e81f0491916073cce9d7d41ef6786ceb11aa0a","crunched":0,"start":3103443,"end":3104210,"audio":false},{"filename":"/.git/objects/c5/6112f5a08f9c2050b7bb953eaea8359f7332d4","crunched":0,"start":3104210,"end":3104361,"audio":false},{"filename":"/.git/objects/c5/d10b31c0fa626bd06359fffe3b12960d1a277c","crunched":0,"start":3104361,"end":3104924,"audio":false},{"filename":"/.git/objects/c6/8816159f22639316421b7e2bf3ff91a898aa58","crunched":0,"start":3104924,"end":3105088,"audio":false},{"filename":"/.git/objects/c7/2e73b7d2346a05f405f061b3b1eebbf866dd79","crunched":0,"start":3105088,"end":3106357,"audio":false},{"filename":"/.git/objects/c7/df0f55d59fa4d7bd6fc0d82beaccb742a0d222","crunched":0,"start":3106357,"end":3107544,"audio":false},{"filename":"/.git/objects/c9/21e58638cc14d8978677c613686f06d887f0c9","crunched":0,"start":3107544,"end":3107777,"audio":false},{"filename":"/.git/objects/c9/7ce490fc46ec356a2b2720bb3b8ea1e6c7f05c","crunched":0,"start":3107777,"end":3107835,"audio":false},{"filename":"/.git/objects/c9/ee504e37946f9c4f048098fb5ab36991920540","crunched":0,"start":3107835,"end":3108029,"audio":false},{"filename":"/.git/objects/cb/8eab3a700c89506aa2155b08f2769c3507ca3e","crunched":0,"start":3108029,"end":3108334,"audio":false},{"filename":"/.git/objects/cc/78f75c417d45097928ed868b62e296e7840c27","crunched":0,"start":3108334,"end":3108609,"audio":false},{"filename":"/.git/objects/cc/f9a9257eb77c57053f136798cf1d965cefd5d4","crunched":0,"start":3108609,"end":3108770,"audio":false},{"filename":"/.git/objects/ce/ca7e4be174774995484c2d2bd07c476a6666f7","crunched":0,"start":3108770,"end":3109310,"audio":false},{"filename":"/.git/objects/cf/3828dc1eac49300a59cf50a0c16996a20a06c4","crunched":0,"start":3109310,"end":3109451,"audio":false},{"filename":"/.git/objects/cf/6d0868a5fc0c807e7f20139b15fd45498dfb12","crunched":0,"start":3109451,"end":3163925,"audio":false},{"filename":"/.git/objects/cf/91f32e90e13136c2b954069739274bb0bfc79d","crunched":0,"start":3163925,"end":3163982,"audio":false},{"filename":"/.git/objects/cf/b4f5cb2b1363dcdf29b0e533c2cfef4cf9788d","crunched":0,"start":3163982,"end":3164821,"audio":false},{"filename":"/.git/objects/d0/2298013b6c8f66b94968d9c2932c5dcd201ed7","crunched":0,"start":3164821,"end":3169789,"audio":false},{"filename":"/.git/objects/d0/eb592064c0d5c3dfc557c22150372056bcc5de","crunched":0,"start":3169789,"end":3169936,"audio":false},{"filename":"/.git/objects/d1/2551023be214ef5fd6b21f8fe26404edb805b6","crunched":0,"start":3169936,"end":3170525,"audio":false},{"filename":"/.git/objects/d1/4553841fea406c531833b0b60c7033831b443e","crunched":0,"start":3170525,"end":3170760,"audio":false},{"filename":"/.git/objects/d2/25c71f664aa19609bf877dfb334eef6596161f","crunched":0,"start":3170760,"end":3170817,"audio":false},{"filename":"/.git/objects/d3/16a03595bcbc0b0e36cf9cbcb4cd38f8c3537a","crunched":0,"start":3170817,"end":3171215,"audio":false},{"filename":"/.git/objects/d3/28b6261ddd4790c1def6feccd423fd101b24b7","crunched":0,"start":3171215,"end":3171593,"audio":false},{"filename":"/.git/objects/d3/408e23ebbb2d815d76499510662e1b01f020e2","crunched":0,"start":3171593,"end":3172543,"audio":false},{"filename":"/.git/objects/d3/9379ada9887627b96e96e5db2fdc8b6a1e6719","crunched":0,"start":3172543,"end":3172749,"audio":false},{"filename":"/.git/objects/d4/016ce392533ec2e8c01548458dc14b401f6ec2","crunched":0,"start":3172749,"end":3173374,"audio":false},{"filename":"/.git/objects/d4/2d0bf64029e3ede658cf67b508014e72004e4f","crunched":0,"start":3173374,"end":3173456,"audio":false},{"filename":"/.git/objects/d4/488cc89b5a3ad2d11faf2c23cb5912f0a58377","crunched":0,"start":3173456,"end":3176272,"audio":false},{"filename":"/.git/objects/d4/c89931a99138e77c8ccd32d561a369dac036d9","crunched":0,"start":3176272,"end":3176440,"audio":false},{"filename":"/.git/objects/d4/f2852c265dc07a6e0b8a4cf46ae40ee63f1dc6","crunched":0,"start":3176440,"end":3176606,"audio":false},{"filename":"/.git/objects/d6/51d4a4598e8dc46405b304c24533bcc77aa501","crunched":0,"start":3176606,"end":3177860,"audio":false},{"filename":"/.git/objects/d6/a482eeffa944976dd83f9700ace5206e9b855c","crunched":0,"start":3177860,"end":3177941,"audio":false},{"filename":"/.git/objects/d6/f370f9390eba5f30e73f37a13a2d95094c642a","crunched":0,"start":3177941,"end":3178093,"audio":false},{"filename":"/.git/objects/d7/f061df873dfe6b2bce9cd08463f025f9d0fcbf","crunched":0,"start":3178093,"end":3178624,"audio":false},{"filename":"/.git/objects/d8/9c3bbd8cf2b3d69555f38036037ab1463a73a1","crunched":0,"start":3178624,"end":3182937,"audio":false},{"filename":"/.git/objects/da/90d8260eeebdc4e5fcc7c260ea38d1b74cd003","crunched":0,"start":3182937,"end":3183504,"audio":false},{"filename":"/.git/objects/db/a4885e1be95c3b1f28802cbdf6e7a5da2e3419","crunched":0,"start":3183504,"end":3184803,"audio":false},{"filename":"/.git/objects/dc/195b771de6eb57a2b3d7ba5046eb9ec39e36d3","crunched":0,"start":3184803,"end":3184959,"audio":false},{"filename":"/.git/objects/dc/3f81c4bf0e38f8f739dd7976bf483bb81ef7b7","crunched":0,"start":3184959,"end":3190084,"audio":false},{"filename":"/.git/objects/dc/84a3ac2ffbb5143fa58b780aa6c51b46e5e906","crunched":0,"start":3190084,"end":3190194,"audio":false},{"filename":"/.git/objects/dc/a05241eaa9d57256652e0e8daac4854130ae32","crunched":0,"start":3190194,"end":3190251,"audio":false},{"filename":"/.git/objects/dd/68617810da097b00ae1ee9faa6c866c6e36982","crunched":0,"start":3190251,"end":3190462,"audio":false},{"filename":"/.git/objects/de/1d44215b5e2b29acd51720323c0702cfea7b88","crunched":0,"start":3190462,"end":3190696,"audio":false},{"filename":"/.git/objects/de/6e86a0d9868fa26efc6820cec0217c4f265fe0","crunched":0,"start":3190696,"end":3190933,"audio":false},{"filename":"/.git/objects/de/f42bc5d3be9250aa9d1492824cf34dd9eb3966","crunched":0,"start":3190933,"end":3191514,"audio":false},{"filename":"/.git/objects/df/184d873ea7da03ae8eeeb540bdb0401f1a12e8","crunched":0,"start":3191514,"end":3191596,"audio":false},{"filename":"/.git/objects/df/4e292871b620a65eec891de37b96e74e372bde","crunched":0,"start":3191596,"end":3191750,"audio":false},{"filename":"/.git/objects/df/7ed9e1e346a3a6c45e275db93c29a3560b5423","crunched":0,"start":3191750,"end":3191953,"audio":false},{"filename":"/.git/objects/e0/f49b03d10b6eea4a3c598c49ae1c49bbc03c58","crunched":0,"start":3191953,"end":3199017,"audio":false},{"filename":"/.git/objects/e1/5e04142b6df79474dbc73f861058f029e9face","crunched":0,"start":3199017,"end":3199985,"audio":false},{"filename":"/.git/objects/e2/04ca070211fe49afe8b9967278ed779f4cd8ca","crunched":0,"start":3199985,"end":3201232,"audio":false},{"filename":"/.git/objects/e2/f5b92244b8677995c984966e15383ef8f7793b","crunched":0,"start":3201232,"end":3201391,"audio":false},{"filename":"/.git/objects/e3/40a535379531d104b9f16c225105ef285cf75c","crunched":0,"start":3201391,"end":3201472,"audio":false},{"filename":"/.git/objects/e3/e01e9c42f96001af9a8923735d9a59245cb634","crunched":0,"start":3201472,"end":3201575,"audio":false},{"filename":"/.git/objects/e5/3b6769785da8c4cf2b2a3b059ea243ebe2f35c","crunched":0,"start":3201575,"end":3206073,"audio":false},{"filename":"/.git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391","crunched":0,"start":3206073,"end":3206088,"audio":false},{"filename":"/.git/objects/e6/b0a4941b149f5822a97bf1f60517dc6da3bb5a","crunched":0,"start":3206088,"end":3208770,"audio":false},{"filename":"/.git/objects/e7/5c8898ae20be9dffc2818115e319c8ac85436b","crunched":0,"start":3208770,"end":3208924,"audio":false},{"filename":"/.git/objects/e7/ee3a50d16fb0f6a4942503cf958bb11af0f34e","crunched":0,"start":3208924,"end":3209563,"audio":false},{"filename":"/.git/objects/e8/042f1a1625a260731b0b83c76a064f8a8f387f","crunched":0,"start":3209563,"end":3209926,"audio":false},{"filename":"/.git/objects/e8/2270dc78d0799ad2b717d0c819027f73b0e7b3","crunched":0,"start":3209926,"end":3210073,"audio":false},{"filename":"/.git/objects/e8/ff5ae9a744eda07156e2b898a8c5f1db7af09e","crunched":0,"start":3210073,"end":3210604,"audio":false},{"filename":"/.git/objects/e9/131a303d56318894104919ea0676aa154a7bcd","crunched":0,"start":3210604,"end":3216917,"audio":false},{"filename":"/.git/objects/e9/bc1a8414e99152acca6435e3f692b920176548","crunched":0,"start":3216917,"end":3217881,"audio":false},{"filename":"/.git/objects/ea/077a82d66e58aa8efca362e035dbad3c0046e0","crunched":0,"start":3217881,"end":3222945,"audio":false},{"filename":"/.git/objects/ea/4580dab5428892d8ffa8ff63f6a053943b885f","crunched":0,"start":3222945,"end":3223107,"audio":false},{"filename":"/.git/objects/eb/cb3080567ce8f5a26c5b78a4beffe1f03d129e","crunched":0,"start":3223107,"end":3223294,"audio":false},{"filename":"/.git/objects/ec/27b9ebd6c07319ec2115976cbad19fa06fec68","crunched":0,"start":3223294,"end":3223500,"audio":false},{"filename":"/.git/objects/ec/4493eb2c704e9c001efd4775a142829edac34e","crunched":0,"start":3223500,"end":3223888,"audio":false},{"filename":"/.git/objects/ef/1f74954fda3f088b29433178f9e4db40d7c7ad","crunched":0,"start":3223888,"end":3224433,"audio":false},{"filename":"/.git/objects/ef/31c7bbaade952daed64e16259fb8ca03812e5f","crunched":0,"start":3224433,"end":3225059,"audio":false},{"filename":"/.git/objects/f0/1e20ea041816a186aac2173c5601cfca68b2c6","crunched":0,"start":3225059,"end":3225611,"audio":false},{"filename":"/.git/objects/f0/dc58eaf0b247f2565d349aff4c3e3aee2d7afb","crunched":0,"start":3225611,"end":3225773,"audio":false},{"filename":"/.git/objects/f0/e8c091557f64b5fa3869d9cd09396ffc5d6a28","crunched":0,"start":3225773,"end":3226167,"audio":false},{"filename":"/.git/objects/f2/2d552644c92cc93a976b17e458145a8964bc16","crunched":0,"start":3226167,"end":3226319,"audio":false},{"filename":"/.git/objects/f2/854cc61e37bb64e0dc774024c4d655cc846d84","crunched":0,"start":3226319,"end":3226441,"audio":false},{"filename":"/.git/objects/f2/c8cf40aff8ce6343941e504217e160f1bb634f","crunched":0,"start":3226441,"end":3226475,"audio":false},{"filename":"/.git/objects/f2/fc42b7fafc6c518195ba6782825db784711647","crunched":0,"start":3226475,"end":3226661,"audio":false},{"filename":"/.git/objects/f3/7a694b2647456c620e322862b018f0061e7a42","crunched":0,"start":3226661,"end":3226880,"audio":false},{"filename":"/.git/objects/f4/00950da9b30beeb3c48fbf00519a05acddf929","crunched":0,"start":3226880,"end":3227571,"audio":false},{"filename":"/.git/objects/f4/48ad1fc0ef8943aa905489f4c07238379b0add","crunched":0,"start":3227571,"end":3227628,"audio":false},{"filename":"/.git/objects/f5/57e98d4c6b53d89b6243a41489dee17c54edce","crunched":0,"start":3227628,"end":3227829,"audio":false},{"filename":"/.git/objects/f5/65f66400116e911ed9e0746e318aa8f6fb39f0","crunched":0,"start":3227829,"end":3228814,"audio":false},{"filename":"/.git/objects/f5/c965f3b3eb88335cefa6af3681a536d2b77308","crunched":0,"start":3228814,"end":3229405,"audio":false},{"filename":"/.git/objects/f5/f0825ee9e1baa2583b6ac05d04d15f022087e7","crunched":0,"start":3229405,"end":3229873,"audio":false},{"filename":"/.git/objects/f7/56c83f34de7158f3ea0a8a65573a226c5f4fe1","crunched":0,"start":3229873,"end":3240706,"audio":false},{"filename":"/.git/objects/f7/c3d95c24c5452fc23760ecd6c01202f0be65fa","crunched":0,"start":3240706,"end":3240939,"audio":false},{"filename":"/.git/objects/f9/3af23aef41bdcccd5297c700e916bd62ff5d31","crunched":0,"start":3240939,"end":3241693,"audio":false},{"filename":"/.git/objects/f9/419479e68f3fe3820069e9c7c1e0bb9f07e807","crunched":0,"start":3241693,"end":3241962,"audio":false},{"filename":"/.git/objects/f9/bf288efbcb82daf4b45a65da7b764183272bd0","crunched":0,"start":3241962,"end":3242118,"audio":false},{"filename":"/.git/objects/f9/f34e34c288dd9ead2efbb4dd1ef2a516f89d8c","crunched":0,"start":3242118,"end":3242174,"audio":false},{"filename":"/.git/objects/fa/453afd379ed141319db88bb2ac7917011fa4a9","crunched":0,"start":3242174,"end":3282384,"audio":false},{"filename":"/.git/objects/fa/7c27e8c25ab7fa2325b0dd835631acceff753f","crunched":0,"start":3282384,"end":3282669,"audio":false},{"filename":"/.git/objects/fa/86611235229d8119efcf6bd20f1e5e20ef93f9","crunched":0,"start":3282669,"end":3282871,"audio":false},{"filename":"/.git/objects/fa/c522613ae2ad7a6cbe43eb3a2a1eb69a1672c3","crunched":0,"start":3282871,"end":3283434,"audio":false},{"filename":"/.git/objects/fa/cdc63f5888637a03de8ba82141b2e03c3d4284","crunched":0,"start":3283434,"end":3283989,"audio":false},{"filename":"/.git/objects/fa/ed8bb1e91dd39e6e33cfd7a1e8d0d5f25071c0","crunched":0,"start":3283989,"end":3284130,"audio":false},{"filename":"/.git/objects/fb/2d23ac84fb0b6e0d3518d6eacc945fb30ebfdf","crunched":0,"start":3284130,"end":3284734,"audio":false},{"filename":"/.git/objects/fb/cc4470e27372da0743db943ceaa36141622800","crunched":0,"start":3284734,"end":3284976,"audio":false},{"filename":"/.git/objects/fb/d0f5d8f7a0027eb47c76199d39dd8cc51ad5fa","crunched":0,"start":3284976,"end":3285538,"audio":false},{"filename":"/.git/objects/fc/70554e3e7c5827bdfff485c507ddc4ec33b88c","crunched":0,"start":3285538,"end":3285835,"audio":false},{"filename":"/.git/objects/fc/8114236988209e8ee7c45bf70354c7f3af0dd2","crunched":0,"start":3285835,"end":3285982,"audio":false},{"filename":"/.git/objects/fc/99cfbbc415bff532af573a538f7063a2a067d7","crunched":0,"start":3285982,"end":3286316,"audio":false},{"filename":"/.git/objects/fd/190a5e5300be0ef60702b2f4144c84e83346cd","crunched":0,"start":3286316,"end":3286912,"audio":false},{"filename":"/.git/objects/fd/c0c5ceff2b4ded326aa449dffc9f33745d2897","crunched":0,"start":3286912,"end":3286993,"audio":false},{"filename":"/.git/objects/fd/e6f7ebcbd0a0398d73d21c279d2e2d96b39685","crunched":0,"start":3286993,"end":3287469,"audio":false},{"filename":"/.git/objects/fe/250cf02972c805f27b6debd00212eb41232bf7","crunched":0,"start":3287469,"end":3288255,"audio":false},{"filename":"/.git/objects/fe/5f71bc6b93e5e634e5f998d2414c52323e2d17","crunched":0,"start":3288255,"end":3288337,"audio":false},{"filename":"/.git/objects/fe/97f9ede7afaff1b96c318b48da870d7a88eece","crunched":0,"start":3288337,"end":3299035,"audio":false},{"filename":"/.git/objects/ff/14d615496034f44c89e01e86f73dc46fdee211","crunched":0,"start":3299035,"end":3299596,"audio":false},{"filename":"/.git/objects/ff/7264960024b44a99a241652d2d0bf44e7aec39","crunched":0,"start":3299596,"end":3299777,"audio":false},{"filename":"/.git/refs/heads/main","crunched":0,"start":3299777,"end":3299818,"audio":false},{"filename":"/.git/refs/remotes/origin/main","crunched":0,"start":3299818,"end":3299859,"audio":false},{"filename":"/.vscode/settings.json","crunched":0,"start":3299859,"end":3300114,"audio":false},{"filename":"/README.md","crunched":0,"start":3300114,"end":3301019,"audio":false},{"filename":"/assets/.DS_Store","crunched":0,"start":3301019,"end":3307167,"audio":false},{"filename":"/assets/img/.DS_Store","crunched":0,"start":3307167,"end":3313315,"audio":false},{"filename":"/assets/img/buildings/a_3x3.png","crunched":0,"start":3313315,"end":3320358,"audio":false},{"filename":"/assets/img/buildings/b_3x3.png","crunched":0,"start":3320358,"end":3327107,"audio":false},{"filename":"/assets/img/buildings/c_4x3.png","crunched":0,"start":3327107,"end":3331263,"audio":false},{"filename":"/assets/img/buildings/d_5x3.png","crunched":0,"start":3331263,"end":3343165,"audio":false},{"filename":"/assets/img/buildings/e_3x5.png","crunched":0,"start":3343165,"end":3354022,"audio":false},{"filename":"/assets/img/buildings/f_6x3.png","crunched":0,"start":3354022,"end":3369321,"audio":false},{"filename":"/assets/img/food.png","crunched":0,"start":3369321,"end":3374425,"audio":false},{"filename":"/assets/img/full_pwr.png","crunched":0,"start":3374425,"end":3415462,"audio":false},{"filename":"/assets/img/lvl_up.png","crunched":0,"start":3415462,"end":3455898,"audio":false},{"filename":"/assets/img/title.png","crunched":0,"start":3455898,"end":3531180,"audio":false},{"filename":"/assets/sfx/bounce.mp3","crunched":0,"start":3531180,"end":3541707,"audio":true},{"filename":"/assets/sfx/eat.ogg","crunched":0,"start":3541707,"end":3566883,"audio":true},{"filename":"/assets/sfx/fanfare.mp3","crunched":0,"start":3566883,"end":3610116,"audio":true},{"filename":"/assets/sfx/grow.mp3","crunched":0,"start":3610116,"end":3643811,"audio":true},{"filename":"/assets/sfx/hit.ogg","crunched":0,"start":3643811,"end":3651269,"audio":true},{"filename":"/assets/sfx/howto.mp3","crunched":0,"start":3651269,"end":3804259,"audio":true},{"filename":"/assets/sfx/music.ogg","crunched":0,"start":3804259,"end":5372118,"audio":true},{"filename":"/assets/sfx/power_up.mp3","crunched":0,"start":5372118,"end":5405546,"audio":true},{"filename":"/assets/sfx/title.mp3","crunched":0,"start":5405546,"end":5811902,"audio":true},{"filename":"/conf.lua","crunched":0,"start":5811902,"end":5812245,"audio":false},{"filename":"/entities/building.fnl","crunched":0,"start":5812245,"end":5812472,"audio":false},{"filename":"/entities/food.fnl","crunched":0,"start":5812472,"end":5812738,"audio":false},{"filename":"/entities/player.fnl","crunched":0,"start":5812738,"end":5812947,"audio":false},{"filename":"/entities/track.fnl","crunched":0,"start":5812947,"end":5812965,"audio":false},{"filename":"/enums.fnl","crunched":0,"start":5812965,"end":5813103,"audio":false},{"filename":"/fmt","crunched":0,"start":5813103,"end":5813189,"audio":false},{"filename":"/globals.fnl","crunched":0,"start":5813189,"end":5813407,"audio":false},{"filename":"/levels.fnl","crunched":0,"start":5813407,"end":5813820,"audio":false},{"filename":"/lib/anim8.lua","crunched":0,"start":5813820,"end":5822368,"audio":false},{"filename":"/lib/fennel.lua","crunched":0,"start":5822368,"end":6056393,"audio":false},{"filename":"/lib/hump/timer.lua","crunched":0,"start":6056393,"end":6063181,"audio":false},{"filename":"/lib/hump/vector.lua","crunched":0,"start":6063181,"end":6069159,"audio":false},{"filename":"/lib/sti/graphics.lua","crunched":0,"start":6069159,"end":6071158,"audio":false},{"filename":"/lib/sti/init.lua","crunched":0,"start":6071158,"end":6108589,"audio":false},{"filename":"/lib/sti/plugins/box2d.lua","crunched":0,"start":6108589,"end":6116507,"audio":false},{"filename":"/lib/sti/plugins/bump.lua","crunched":0,"start":6116507,"end":6122114,"audio":false},{"filename":"/lib/sti/utils.lua","crunched":0,"start":6122114,"end":6126813,"audio":false},{"filename":"/lib/tprint.lua","crunched":0,"start":6126813,"end":6127614,"audio":false},{"filename":"/main.fnl","crunched":0,"start":6127614,"end":6128784,"audio":false},{"filename":"/main.lua","crunched":0,"start":6128784,"end":6129237,"audio":false},{"filename":"/map/.DS_Store","crunched":0,"start":6129237,"end":6135385,"audio":false},{"filename":"/map/lisp_jam_2024_mcromp.tiled-project","crunched":0,"start":6135385,"end":6135608,"audio":false},{"filename":"/map/lisp_jam_2024_mcromp.tiled-session","crunched":0,"start":6135608,"end":6136800,"audio":false},{"filename":"/map/map.lua","crunched":0,"start":6136800,"end":6399279,"audio":false},{"filename":"/map/map.tmx","crunched":0,"start":6399279,"end":6521248,"audio":false},{"filename":"/map/ts.png","crunched":0,"start":6521248,"end":6688178,"audio":false},{"filename":"/scenes/game.fnl","crunched":0,"start":6688178,"end":6692522,"audio":false},{"filename":"/scenes/howto.fnl","crunched":0,"start":6692522,"end":6693513,"audio":false},{"filename":"/scenes/title.fnl","crunched":0,"start":6693513,"end":6694273,"audio":false},{"filename":"/scenes/win.fnl","crunched":0,"start":6694273,"end":6694701,"audio":false},{"filename":"/services/building.fnl","crunched":0,"start":6694701,"end":6694840,"audio":false},{"filename":"/services/camera.fnl","crunched":0,"start":6694840,"end":6696315,"audio":false},{"filename":"/services/food.fnl","crunched":0,"start":6696315,"end":6696397,"audio":false},{"filename":"/services/map.fnl","crunched":0,"start":6696397,"end":6698550,"audio":false},{"filename":"/services/player_movement.fnl","crunched":0,"start":6698550,"end":6702016,"audio":false},{"filename":"/startup.fnl","crunched":0,"start":6702016,"end":6703469,"audio":false},{"filename":"/ui/graphics.fnl","crunched":0,"start":6703469,"end":6706751,"audio":false},{"filename":"/utils.fnl","crunched":0,"start":6706751,"end":6707456,"audio":false}]});

})();
