/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "67c6792bbd1a63d8acfd";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\nmodule.exports = function(updatedModules, renewedModules) {\n\tvar unacceptedModules = updatedModules.filter(function(moduleId) {\n\t\treturn renewedModules && renewedModules.indexOf(moduleId) < 0;\n\t});\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tif (unacceptedModules.length > 0) {\n\t\tlog(\n\t\t\t\"warning\",\n\t\t\t\"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)\"\n\t\t);\n\t\tunacceptedModules.forEach(function(moduleId) {\n\t\t\tlog(\"warning\", \"[HMR]  - \" + moduleId);\n\t\t});\n\t}\n\n\tif (!renewedModules || renewedModules.length === 0) {\n\t\tlog(\"info\", \"[HMR] Nothing hot updated.\");\n\t} else {\n\t\tlog(\"info\", \"[HMR] Updated modules:\");\n\t\trenewedModules.forEach(function(moduleId) {\n\t\t\tif (typeof moduleId === \"string\" && moduleId.indexOf(\"!\") !== -1) {\n\t\t\t\tvar parts = moduleId.split(\"!\");\n\t\t\t\tlog.groupCollapsed(\"info\", \"[HMR]  - \" + parts.pop());\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t\tlog.groupEnd(\"info\");\n\t\t\t} else {\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t}\n\t\t});\n\t\tvar numberIds = renewedModules.every(function(moduleId) {\n\t\t\treturn typeof moduleId === \"number\";\n\t\t});\n\t\tif (numberIds)\n\t\t\tlog(\n\t\t\t\t\"info\",\n\t\t\t\t\"[HMR] Consider using the NamedModulesPlugin for module names.\"\n\t\t\t);\n\t}\n};\n\n\n//# sourceURL=webpack:///(webpack)/hot/log-apply-result.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var logLevel = \"info\";\n\nfunction dummy() {}\n\nfunction shouldLog(level) {\n\tvar shouldLog =\n\t\t(logLevel === \"info\" && level === \"info\") ||\n\t\t([\"info\", \"warning\"].indexOf(logLevel) >= 0 && level === \"warning\") ||\n\t\t([\"info\", \"warning\", \"error\"].indexOf(logLevel) >= 0 && level === \"error\");\n\treturn shouldLog;\n}\n\nfunction logGroup(logFn) {\n\treturn function(level, msg) {\n\t\tif (shouldLog(level)) {\n\t\t\tlogFn(msg);\n\t\t}\n\t};\n}\n\nmodule.exports = function(level, msg) {\n\tif (shouldLog(level)) {\n\t\tif (level === \"info\") {\n\t\t\tconsole.log(msg);\n\t\t} else if (level === \"warning\") {\n\t\t\tconsole.warn(msg);\n\t\t} else if (level === \"error\") {\n\t\t\tconsole.error(msg);\n\t\t}\n\t}\n};\n\n/* eslint-disable node/no-unsupported-features/node-builtins */\nvar group = console.group || dummy;\nvar groupCollapsed = console.groupCollapsed || dummy;\nvar groupEnd = console.groupEnd || dummy;\n/* eslint-enable node/no-unsupported-features/node-builtins */\n\nmodule.exports.group = logGroup(group);\n\nmodule.exports.groupCollapsed = logGroup(groupCollapsed);\n\nmodule.exports.groupEnd = logGroup(groupEnd);\n\nmodule.exports.setLogLevel = function(level) {\n\tlogLevel = level;\n};\n\n\n//# sourceURL=webpack:///(webpack)/hot/log.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?100":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?100 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n/*globals __resourceQuery */\nif (true) {\n\tvar hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tvar checkForUpdate = function checkForUpdate(fromUpdate) {\n\t\tif (module.hot.status() === \"idle\") {\n\t\t\tmodule.hot\n\t\t\t\t.check(true)\n\t\t\t\t.then(function(updatedModules) {\n\t\t\t\t\tif (!updatedModules) {\n\t\t\t\t\t\tif (fromUpdate) log(\"info\", \"[HMR] Update applied.\");\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\t\t\t\t\t__webpack_require__(/*! ./log-apply-result */ \"./node_modules/webpack/hot/log-apply-result.js\")(updatedModules, updatedModules);\n\t\t\t\t\tcheckForUpdate(true);\n\t\t\t\t})\n\t\t\t\t.catch(function(err) {\n\t\t\t\t\tvar status = module.hot.status();\n\t\t\t\t\tif ([\"abort\", \"fail\"].indexOf(status) >= 0) {\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] Cannot apply update.\");\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] \" + (err.stack || err.message));\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] You need to restart the application!\");\n\t\t\t\t\t} else {\n\t\t\t\t\t\tlog(\n\t\t\t\t\t\t\t\"warning\",\n\t\t\t\t\t\t\t\"[HMR] Update failed: \" + (err.stack || err.message)\n\t\t\t\t\t\t);\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t}\n\t};\n\tsetInterval(checkForUpdate, hotPollInterval);\n} else {}\n\n/* WEBPACK VAR INJECTION */}.call(this, \"?100\"))\n\n//# sourceURL=webpack:///(webpack)/hot/poll.js?");

/***/ }),

/***/ "./src/app/app.gateway.ts":
/*!********************************!*\
  !*** ./src/app/app.gateway.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst websockets_1 = __webpack_require__(/*! @nestjs/websockets */ \"@nestjs/websockets\");\r\nlet AppGateway = class AppGateway {\r\n    handleConnection(client) {\r\n        client.emit('connection', 'Successfully connected to server.');\r\n    }\r\n};\r\n__decorate([\r\n    websockets_1.WebSocketServer(),\r\n    __metadata(\"design:type\", Object)\r\n], AppGateway.prototype, \"wss\", void 0);\r\nAppGateway = __decorate([\r\n    websockets_1.WebSocketGateway(4001)\r\n], AppGateway);\r\nexports.AppGateway = AppGateway;\r\n\n\n//# sourceURL=webpack:///./src/app/app.gateway.ts?");

/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\r\nconst database_module_1 = __webpack_require__(/*! ../database/database.module */ \"./src/database/database.module.ts\");\r\nconst config_1 = __webpack_require__(/*! ./config */ \"./src/app/config.ts\");\r\nconst graphql_1 = __webpack_require__(/*! @nestjs/graphql */ \"@nestjs/graphql\");\r\nconst user_module_1 = __webpack_require__(/*! @user/user.module */ \"./src/user/user.module.ts\");\r\nconst date_1 = __webpack_require__(/*! ../scalar/date */ \"./src/scalar/date.ts\");\r\nconst project_module_1 = __webpack_require__(/*! @project/project.module */ \"./src/project/project.module.ts\");\r\nconst client_module_1 = __webpack_require__(/*! @client/client.module */ \"./src/client/client.module.ts\");\r\nconst timesheet_module_1 = __webpack_require__(/*! @timesheet/timesheet.module */ \"./src/timesheet/timesheet.module.ts\");\r\nconst auth_module_1 = __webpack_require__(/*! ../auth/auth.module */ \"./src/auth/auth.module.ts\");\r\nlet imports = [\r\n    database_module_1.DatabaseModule,\r\n    graphql_1.GraphQLModule.forRoot({\r\n        typePaths: ['./**/*.graphql'],\r\n    }),\r\n    auth_module_1.AuthModule,\r\n    user_module_1.UserModule,\r\n    project_module_1.ProjectModule,\r\n    client_module_1.ClientModule,\r\n    timesheet_module_1.TimesheetModule\r\n];\r\nif (config_1.default.TYPEORM_CONNECTION) {\r\n    imports.push(typeorm_1.TypeOrmModule.forRoot());\r\n}\r\nlet AppModule = class AppModule {\r\n};\r\nAppModule = __decorate([\r\n    common_1.Module({\r\n        imports,\r\n        controllers: [],\r\n        providers: [\r\n            date_1.DateScalar,\r\n        ],\r\n    })\r\n], AppModule);\r\nexports.AppModule = AppModule;\r\n\n\n//# sourceURL=webpack:///./src/app/app.module.ts?");

/***/ }),

/***/ "./src/app/config.ts":
/*!***************************!*\
  !*** ./src/app/config.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\r\nconst typescript_stringcaster_1 = __webpack_require__(/*! typescript-stringcaster */ \"typescript-stringcaster\");\r\ndotenv.config();\r\nconst source = process.env;\r\nclass Config {\r\n}\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toNumber, defaultValue: 4000, source }),\r\n    __metadata(\"design:type\", Number)\r\n], Config.prototype, \"APP_PORT\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toString, source }),\r\n    __metadata(\"design:type\", String)\r\n], Config.prototype, \"TYPEORM_CONNECTION\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toString, source }),\r\n    __metadata(\"design:type\", String)\r\n], Config.prototype, \"FIREBASE_API_KEY\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toString, source }),\r\n    __metadata(\"design:type\", String)\r\n], Config.prototype, \"FIREBASE_AUTH_DOMAIN\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toString, source }),\r\n    __metadata(\"design:type\", String)\r\n], Config.prototype, \"FIREBASE_DATABASE_URL\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toString, source }),\r\n    __metadata(\"design:type\", String)\r\n], Config.prototype, \"FIREBASE_PROJECT_ID\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toString, source }),\r\n    __metadata(\"design:type\", String)\r\n], Config.prototype, \"FIREBASE_STORAGE_BUCKET\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toString, source }),\r\n    __metadata(\"design:type\", Number)\r\n], Config.prototype, \"FIREBASE_MESSAGING_SENDER_ID\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toNumber, source }),\r\n    __metadata(\"design:type\", Number)\r\n], Config.prototype, \"SALT_ROUNDS\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toString, source }),\r\n    __metadata(\"design:type\", String)\r\n], Config.prototype, \"BITBUCKET_APP_USERNAME\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toString, source }),\r\n    __metadata(\"design:type\", String)\r\n], Config.prototype, \"BITBUCKET_APP_PASSWORD\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toString, source }),\r\n    __metadata(\"design:type\", String)\r\n], Config.prototype, \"JWT_SECRET_KEY\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toBoolean, source }),\r\n    __metadata(\"design:type\", Boolean)\r\n], Config.prototype, \"USE_CUSTOM_AUTHENTICATION\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toBoolean, source }),\r\n    __metadata(\"design:type\", Boolean)\r\n], Config.prototype, \"USE_GOOGLE_AUTHENTICATION\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toNumber, source }),\r\n    __metadata(\"design:type\", Number)\r\n], Config.prototype, \"SESSION_EXPIRES_IN\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toString, source }),\r\n    __metadata(\"design:type\", String)\r\n], Config.prototype, \"APP_DOMAIN\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toString, source }),\r\n    __metadata(\"design:type\", String)\r\n], Config.prototype, \"GOOGLE_CLIENT_ID\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toString, source }),\r\n    __metadata(\"design:type\", String)\r\n], Config.prototype, \"GOOGLE_CLIENT_SECRET\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toString, source }),\r\n    __metadata(\"design:type\", String)\r\n], Config.prototype, \"GOOGLE_REDIRECT_URI\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toString, source }),\r\n    __metadata(\"design:type\", String)\r\n], Config.prototype, \"GITHUB_CLIENT_ID\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toString, source }),\r\n    __metadata(\"design:type\", String)\r\n], Config.prototype, \"GITHUB_CLIENT_SECRET\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toString, source }),\r\n    __metadata(\"design:type\", String)\r\n], Config.prototype, \"GITHUB_CALLBACK_URL\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toString, source }),\r\n    __metadata(\"design:type\", String)\r\n], Config.prototype, \"BITBUCKET_CLIENT_ID\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toString, source }),\r\n    __metadata(\"design:type\", String)\r\n], Config.prototype, \"BITBUCKET_CLIENT_SECRET\", void 0);\r\n__decorate([\r\n    typescript_stringcaster_1.inject({ cast: typescript_stringcaster_1.toString, source }),\r\n    __metadata(\"design:type\", String)\r\n], Config.prototype, \"BITBUCKET_CALLBACK_URL\", void 0);\r\nexports.default = new Config();\r\n\n\n//# sourceURL=webpack:///./src/app/config.ts?");

/***/ }),

/***/ "./src/auth/auth.controller.ts":
/*!*************************************!*\
  !*** ./src/auth/auth.controller.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nconst auth_service_1 = __webpack_require__(/*! ./auth.service */ \"./src/auth/auth.service.ts\");\r\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\r\nconst app_gateway_1 = __webpack_require__(/*! @app/app.gateway */ \"./src/app/app.gateway.ts\");\r\nlet AuthController = class AuthController {\r\n    constructor(authService, appGateway) {\r\n        this.authService = authService;\r\n        this.appGateway = appGateway;\r\n    }\r\n    googleLogin() {\r\n        console.log('Hit login');\r\n    }\r\n    googleLoginCallback(req) {\r\n        return req.user;\r\n    }\r\n    githubLogin() {\r\n        console.log('Hit login');\r\n    }\r\n    githubLoginCallback(req) {\r\n        console.log('req.user', req.user);\r\n        return req.user;\r\n    }\r\n    bitbucketLogin() {\r\n        console.log('Hit login');\r\n    }\r\n    bitbucketLoginCallback(req) {\r\n        return req.user;\r\n    }\r\n};\r\n__decorate([\r\n    common_1.Get('google'),\r\n    common_1.UseGuards(passport_1.AuthGuard('google')),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", []),\r\n    __metadata(\"design:returntype\", void 0)\r\n], AuthController.prototype, \"googleLogin\", null);\r\n__decorate([\r\n    common_1.Get('google/callback'),\r\n    common_1.UseGuards(passport_1.AuthGuard('google')),\r\n    __param(0, common_1.Req()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Object]),\r\n    __metadata(\"design:returntype\", void 0)\r\n], AuthController.prototype, \"googleLoginCallback\", null);\r\n__decorate([\r\n    common_1.Get('github'),\r\n    common_1.UseGuards(passport_1.AuthGuard('github')),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", []),\r\n    __metadata(\"design:returntype\", void 0)\r\n], AuthController.prototype, \"githubLogin\", null);\r\n__decorate([\r\n    common_1.Get('github/callback'),\r\n    common_1.UseGuards(passport_1.AuthGuard('github')),\r\n    __param(0, common_1.Req()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Object]),\r\n    __metadata(\"design:returntype\", void 0)\r\n], AuthController.prototype, \"githubLoginCallback\", null);\r\n__decorate([\r\n    common_1.Get('bitbucket'),\r\n    common_1.UseGuards(passport_1.AuthGuard('bitbucket')),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", []),\r\n    __metadata(\"design:returntype\", void 0)\r\n], AuthController.prototype, \"bitbucketLogin\", null);\r\n__decorate([\r\n    common_1.Get('bitbucket/callback'),\r\n    common_1.UseGuards(passport_1.AuthGuard('bitbucket')),\r\n    __param(0, common_1.Req()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Object]),\r\n    __metadata(\"design:returntype\", void 0)\r\n], AuthController.prototype, \"bitbucketLoginCallback\", null);\r\nAuthController = __decorate([\r\n    swagger_1.ApiUseTags('Authentication'),\r\n    common_1.Controller('api/rest/auth'),\r\n    __metadata(\"design:paramtypes\", [auth_service_1.AuthService,\r\n        app_gateway_1.AppGateway])\r\n], AuthController);\r\nexports.AuthController = AuthController;\r\n\n\n//# sourceURL=webpack:///./src/auth/auth.controller.ts?");

/***/ }),

/***/ "./src/auth/auth.module.ts":
/*!*********************************!*\
  !*** ./src/auth/auth.module.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst app_gateway_1 = __webpack_require__(/*! @app/app.gateway */ \"./src/app/app.gateway.ts\");\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst auth_service_1 = __webpack_require__(/*! ./auth.service */ \"./src/auth/auth.service.ts\");\r\nconst user_module_1 = __webpack_require__(/*! @user/user.module */ \"./src/user/user.module.ts\");\r\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\r\nconst jwt_1 = __webpack_require__(/*! @nestjs/jwt */ \"@nestjs/jwt\");\r\nconst jwt_strategy_1 = __webpack_require__(/*! ./strategy/jwt.strategy */ \"./src/auth/strategy/jwt.strategy.ts\");\r\nconst google_strategy_1 = __webpack_require__(/*! ./strategy/google.strategy */ \"./src/auth/strategy/google.strategy.ts\");\r\nconst auth_controller_1 = __webpack_require__(/*! ./auth.controller */ \"./src/auth/auth.controller.ts\");\r\nconst config_1 = __webpack_require__(/*! @app/config */ \"./src/app/config.ts\");\r\nconst github_strategy_1 = __webpack_require__(/*! ./strategy/github.strategy */ \"./src/auth/strategy/github.strategy.ts\");\r\nconst bitbucket_strategy_1 = __webpack_require__(/*! ./strategy/bitbucket.strategy */ \"./src/auth/strategy/bitbucket.strategy.ts\");\r\nlet AuthModule = class AuthModule {\r\n};\r\nAuthModule = __decorate([\r\n    common_1.Global(),\r\n    common_1.Module({\r\n        imports: [\r\n            user_module_1.UserModule,\r\n            passport_1.PassportModule.register({ defaultStrategy: 'jwt', session: true }),\r\n            jwt_1.JwtModule.register({\r\n                secretOrPrivateKey: config_1.default.JWT_SECRET_KEY || 'secretKey',\r\n                signOptions: {\r\n                    expiresIn: config_1.default.SESSION_EXPIRES_IN,\r\n                },\r\n            }),\r\n        ],\r\n        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, google_strategy_1.GoogleStrategy, github_strategy_1.GithubStrategy, bitbucket_strategy_1.BitbucketStrategy, app_gateway_1.AppGateway],\r\n        exports: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],\r\n        controllers: [auth_controller_1.AuthController]\r\n    })\r\n], AuthModule);\r\nexports.AuthModule = AuthModule;\r\n\n\n//# sourceURL=webpack:///./src/auth/auth.module.ts?");

/***/ }),

/***/ "./src/auth/auth.service.ts":
/*!**********************************!*\
  !*** ./src/auth/auth.service.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst user_service_1 = __webpack_require__(/*! ../user/user.service */ \"./src/user/user.service.ts\");\r\nconst jwt_1 = __webpack_require__(/*! @nestjs/jwt */ \"@nestjs/jwt\");\r\nconst config_1 = __webpack_require__(/*! @app/config */ \"./src/app/config.ts\");\r\nconst jsonwebtoken_1 = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\r\nconst firebase_1 = __webpack_require__(/*! firebase */ \"firebase\");\r\nlet AuthService = class AuthService {\r\n    constructor(userService, jwtService) {\r\n        this.userService = userService;\r\n        this.jwtService = jwtService;\r\n    }\r\n    createToken(credentials) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const user = yield this.userService.login(credentials);\r\n            const accessToken = this.jwtService.sign({ email: user.email });\r\n            return {\r\n                expiresIn: config_1.default.SESSION_EXPIRES_IN,\r\n                accessToken\r\n            };\r\n        });\r\n    }\r\n    validateOAuthLogin(thirdPartyId, provider) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                return jsonwebtoken_1.sign({\r\n                    thirdPartyId,\r\n                    provider,\r\n                }, config_1.default.JWT_SECRET_KEY, {\r\n                    expiresIn: config_1.default.SESSION_EXPIRES_IN,\r\n                });\r\n            }\r\n            catch (err) {\r\n                throw new common_1.ForbiddenException('validateOAuthLogin', err.message);\r\n            }\r\n        });\r\n    }\r\n    signPayload(payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return jsonwebtoken_1.sign(payload, config_1.default.JWT_SECRET_KEY, { expiresIn: config_1.default.SESSION_EXPIRES_IN });\r\n        });\r\n    }\r\n    validatePayload(payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.userService.getOneByEmail(payload.email);\r\n        });\r\n    }\r\n    validateUser(payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            if (payload.email) {\r\n                return yield this.userService.getOneByEmail(payload.email);\r\n            }\r\n            if (payload.thirdPartyId) {\r\n                return yield this.userService.getOneByProvider(payload.provider, payload.thirdPartyId);\r\n            }\r\n        });\r\n    }\r\n    login(email, password) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield firebase_1.auth().signInWithEmailAndPassword(email, password);\r\n        });\r\n    }\r\n};\r\nAuthService = __decorate([\r\n    common_1.Injectable(),\r\n    __param(0, common_1.Inject(common_1.forwardRef(() => user_service_1.UserService))),\r\n    __metadata(\"design:paramtypes\", [user_service_1.UserService,\r\n        jwt_1.JwtService])\r\n], AuthService);\r\nexports.AuthService = AuthService;\r\n\n\n//# sourceURL=webpack:///./src/auth/auth.service.ts?");

/***/ }),

/***/ "./src/auth/enum/provider.enum.ts":
/*!****************************************!*\
  !*** ./src/auth/enum/provider.enum.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Provider;\r\n(function (Provider) {\r\n    Provider[\"GOOGLE\"] = \"google\";\r\n    Provider[\"GITHUB\"] = \"github\";\r\n    Provider[\"BITBUCKET\"] = \"bitbucket\";\r\n})(Provider = exports.Provider || (exports.Provider = {}));\r\n\n\n//# sourceURL=webpack:///./src/auth/enum/provider.enum.ts?");

/***/ }),

/***/ "./src/auth/strategy/bitbucket.strategy.ts":
/*!*************************************************!*\
  !*** ./src/auth/strategy/bitbucket.strategy.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\r\nconst passport_bitbucket_oauth2_1 = __webpack_require__(/*! passport-bitbucket-oauth2 */ \"passport-bitbucket-oauth2\");\r\nconst auth_service_1 = __webpack_require__(/*! ../auth.service */ \"./src/auth/auth.service.ts\");\r\nconst config_1 = __webpack_require__(/*! @app/config */ \"./src/app/config.ts\");\r\nconst provider_enum_1 = __webpack_require__(/*! ../enum/provider.enum */ \"./src/auth/enum/provider.enum.ts\");\r\nconst axios_1 = __webpack_require__(/*! axios */ \"axios\");\r\nconst app_gateway_1 = __webpack_require__(/*! @app/app.gateway */ \"./src/app/app.gateway.ts\");\r\nlet BitbucketStrategy = class BitbucketStrategy extends passport_1.PassportStrategy(passport_bitbucket_oauth2_1.Strategy, 'bitbucket') {\r\n    constructor(authService, appGateway) {\r\n        super({\r\n            clientID: config_1.default.BITBUCKET_CLIENT_ID,\r\n            clientSecret: config_1.default.BITBUCKET_CLIENT_SECRET,\r\n            callbackURL: config_1.default.BITBUCKET_CALLBACK_URL,\r\n            passReqToCallback: true,\r\n            scope: ['email', 'account']\r\n        }, (request, accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {\r\n            let email = undefined;\r\n            if (profile.emails) {\r\n                email = profile.emails[0].value;\r\n            }\r\n            else {\r\n                const response = yield axios_1.default.get(`https://api.bitbucket.org/2.0/user/emails`, {\r\n                    params: {\r\n                        access_token: accessToken\r\n                    }\r\n                });\r\n                email = response.data.values[0].email;\r\n            }\r\n            const jwt = yield this.authService.validateOAuthLogin(profile.id, provider_enum_1.Provider.BITBUCKET);\r\n            const userExists = yield this.authService.validateUser({ email });\r\n            if (!userExists) {\r\n                const userData = yield this.authService.userService.create({\r\n                    name: profile.displayName,\r\n                    email,\r\n                    integrations: {\r\n                        bitbucket: {\r\n                            id: profile.id,\r\n                            token: accessToken\r\n                        }\r\n                    }\r\n                });\r\n                yield userData.save();\r\n            }\r\n            const user = {\r\n                email,\r\n                name: profile.displayName,\r\n                integrations: {\r\n                    bitbucket: {\r\n                        id: profile.id,\r\n                        token: accessToken\r\n                    }\r\n                },\r\n                jwt\r\n            };\r\n            this.appGateway.wss.emit(provider_enum_1.Provider.BITBUCKET, user);\r\n            done(null, user);\r\n        }));\r\n        this.authService = authService;\r\n        this.appGateway = appGateway;\r\n    }\r\n};\r\nBitbucketStrategy = __decorate([\r\n    common_1.Injectable(),\r\n    __metadata(\"design:paramtypes\", [auth_service_1.AuthService, app_gateway_1.AppGateway])\r\n], BitbucketStrategy);\r\nexports.BitbucketStrategy = BitbucketStrategy;\r\n\n\n//# sourceURL=webpack:///./src/auth/strategy/bitbucket.strategy.ts?");

/***/ }),

/***/ "./src/auth/strategy/github.strategy.ts":
/*!**********************************************!*\
  !*** ./src/auth/strategy/github.strategy.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\r\nconst passport_github_1 = __webpack_require__(/*! passport-github */ \"passport-github\");\r\nconst auth_service_1 = __webpack_require__(/*! ../auth.service */ \"./src/auth/auth.service.ts\");\r\nconst config_1 = __webpack_require__(/*! @app/config */ \"./src/app/config.ts\");\r\nconst provider_enum_1 = __webpack_require__(/*! @auth/enum/provider.enum */ \"./src/auth/enum/provider.enum.ts\");\r\nconst app_gateway_1 = __webpack_require__(/*! @app/app.gateway */ \"./src/app/app.gateway.ts\");\r\nlet GithubStrategy = class GithubStrategy extends passport_1.PassportStrategy(passport_github_1.Strategy, 'github') {\r\n    constructor(authService, appGateway) {\r\n        super({\r\n            clientID: config_1.default.GITHUB_CLIENT_ID,\r\n            clientSecret: config_1.default.GITHUB_CLIENT_SECRET,\r\n            callbackURL: config_1.default.GITHUB_CALLBACK_URL,\r\n            passReqToCallback: true,\r\n            scope: ['profile', 'user:email'],\r\n        }, (request, accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {\r\n            const email = profile.emails[0].value;\r\n            const jwt = yield this.authService.validateOAuthLogin(profile.id, provider_enum_1.Provider.GITHUB);\r\n            const userExists = yield this.authService.validateUser({ email });\r\n            if (!userExists) {\r\n                const userData = yield this.authService.userService.create({\r\n                    name: profile.displayName,\r\n                    email,\r\n                    integrations: {\r\n                        github: {\r\n                            id: profile.id,\r\n                            token: accessToken\r\n                        }\r\n                    }\r\n                });\r\n                yield userData.save();\r\n            }\r\n            const user = {\r\n                email,\r\n                name: profile.displayName,\r\n                integrations: {\r\n                    github: {\r\n                        id: profile.id,\r\n                        token: accessToken\r\n                    }\r\n                },\r\n                jwt\r\n            };\r\n            this.appGateway.wss.emit(provider_enum_1.Provider.GITHUB, user);\r\n            done(null, user);\r\n        }));\r\n        this.authService = authService;\r\n        this.appGateway = appGateway;\r\n    }\r\n    validate(accessToken, refreshToken, profile, done) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const email = profile.emails[0].value;\r\n                const jwt = yield this.authService.validateOAuthLogin(profile.id, provider_enum_1.Provider.GITHUB);\r\n                let user = yield this.authService.validateUser({ email });\r\n                if (!user) {\r\n                    const userData = yield this.authService.userService.create({\r\n                        name: profile.displayName,\r\n                        email,\r\n                        integrations: {\r\n                            github: {\r\n                                id: profile.id,\r\n                                token: accessToken\r\n                            }\r\n                        }\r\n                    });\r\n                    const firebaseUser = yield userData.save();\r\n                    const newUser = yield firebaseUser.get();\r\n                    user = newUser.data();\r\n                }\r\n                const payload = Object.assign({ jwt }, user);\r\n                return done(null, payload);\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n            }\r\n        });\r\n    }\r\n};\r\nGithubStrategy = __decorate([\r\n    common_1.Injectable(),\r\n    __metadata(\"design:paramtypes\", [auth_service_1.AuthService, app_gateway_1.AppGateway])\r\n], GithubStrategy);\r\nexports.GithubStrategy = GithubStrategy;\r\n\n\n//# sourceURL=webpack:///./src/auth/strategy/github.strategy.ts?");

/***/ }),

/***/ "./src/auth/strategy/google.strategy.ts":
/*!**********************************************!*\
  !*** ./src/auth/strategy/google.strategy.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\r\nconst passport_google_oauth_1 = __webpack_require__(/*! passport-google-oauth */ \"passport-google-oauth\");\r\nconst auth_service_1 = __webpack_require__(/*! ../auth.service */ \"./src/auth/auth.service.ts\");\r\nconst config_1 = __webpack_require__(/*! @app/config */ \"./src/app/config.ts\");\r\nconst provider_enum_1 = __webpack_require__(/*! ../enum/provider.enum */ \"./src/auth/enum/provider.enum.ts\");\r\nconst app_gateway_1 = __webpack_require__(/*! @app/app.gateway */ \"./src/app/app.gateway.ts\");\r\nlet GoogleStrategy = class GoogleStrategy extends passport_1.PassportStrategy(passport_google_oauth_1.OAuth2Strategy, 'google') {\r\n    constructor(authService, appGateway) {\r\n        super({\r\n            clientID: config_1.default.GOOGLE_CLIENT_ID,\r\n            clientSecret: config_1.default.GOOGLE_CLIENT_SECRET,\r\n            callbackURL: config_1.default.GOOGLE_REDIRECT_URI,\r\n            passReqToCallback: true,\r\n            scope: ['profile', 'email']\r\n        }, (request, accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {\r\n            const email = profile.emails[0].value;\r\n            const jwt = yield this.authService.validateOAuthLogin(profile.id, provider_enum_1.Provider.GOOGLE);\r\n            const userExists = yield this.authService.validateUser({ email });\r\n            if (!userExists) {\r\n                const userData = yield this.authService.userService.create({\r\n                    name: profile.displayName,\r\n                    email,\r\n                    integrations: {\r\n                        google: {\r\n                            id: profile.id,\r\n                            token: accessToken\r\n                        }\r\n                    }\r\n                });\r\n                yield userData.save();\r\n            }\r\n            const user = {\r\n                email,\r\n                name: profile.displayName,\r\n                integrations: {\r\n                    google: {\r\n                        id: profile.id,\r\n                        token: accessToken\r\n                    }\r\n                },\r\n                jwt\r\n            };\r\n            this.appGateway.wss.emit(provider_enum_1.Provider.GOOGLE, user);\r\n            done(null, user);\r\n        }));\r\n        this.authService = authService;\r\n        this.appGateway = appGateway;\r\n    }\r\n};\r\nGoogleStrategy = __decorate([\r\n    common_1.Injectable(),\r\n    __metadata(\"design:paramtypes\", [auth_service_1.AuthService, app_gateway_1.AppGateway])\r\n], GoogleStrategy);\r\nexports.GoogleStrategy = GoogleStrategy;\r\n\n\n//# sourceURL=webpack:///./src/auth/strategy/google.strategy.ts?");

/***/ }),

/***/ "./src/auth/strategy/jwt.strategy.ts":
/*!*******************************************!*\
  !*** ./src/auth/strategy/jwt.strategy.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\r\nconst passport_jwt_1 = __webpack_require__(/*! passport-jwt */ \"passport-jwt\");\r\nconst auth_service_1 = __webpack_require__(/*! ../auth.service */ \"./src/auth/auth.service.ts\");\r\nconst config_1 = __webpack_require__(/*! @app/config */ \"./src/app/config.ts\");\r\nlet JwtStrategy = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {\r\n    constructor(authService) {\r\n        super({\r\n            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),\r\n            secretOrKey: config_1.default.JWT_SECRET_KEY\r\n        });\r\n        this.authService = authService;\r\n    }\r\n    validate(payload, done) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const user = yield this.authService.validateUser(payload);\r\n            if (!user) {\r\n                return done(new common_1.UnauthorizedException(), false);\r\n            }\r\n            return done(null, user, payload);\r\n        });\r\n    }\r\n};\r\nJwtStrategy = __decorate([\r\n    common_1.Injectable(),\r\n    __metadata(\"design:paramtypes\", [auth_service_1.AuthService])\r\n], JwtStrategy);\r\nexports.JwtStrategy = JwtStrategy;\r\n\n\n//# sourceURL=webpack:///./src/auth/strategy/jwt.strategy.ts?");

/***/ }),

/***/ "./src/client/client.controller.ts":
/*!*****************************************!*\
  !*** ./src/client/client.controller.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nconst client_service_1 = __webpack_require__(/*! ./client.service */ \"./src/client/client.service.ts\");\r\nconst client_dto_1 = __webpack_require__(/*! ./dto/client.dto */ \"./src/client/dto/client.dto.ts\");\r\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\r\nlet ClientController = class ClientController {\r\n    constructor(clientService) {\r\n        this.clientService = clientService;\r\n    }\r\n    getAll() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.clientService.getAll();\r\n        });\r\n    }\r\n    create(data) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const client = yield this.clientService.create(data);\r\n            const save = yield client.save();\r\n            const newClient = yield save.get();\r\n            return {\r\n                success: true,\r\n                message: `You've successfully created a client.`,\r\n                client: Object.assign({ id: newClient.id }, newClient.data())\r\n            };\r\n        });\r\n    }\r\n    update(id, data) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.clientService.update(id, data);\r\n        });\r\n    }\r\n    destroy(id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.clientService.delete(id);\r\n        });\r\n    }\r\n};\r\n__decorate([\r\n    common_1.Get(),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", []),\r\n    __metadata(\"design:returntype\", Promise)\r\n], ClientController.prototype, \"getAll\", null);\r\n__decorate([\r\n    common_1.Post(),\r\n    swagger_1.ApiBearerAuth(),\r\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\r\n    __param(0, common_1.Body()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [client_dto_1.ClientDto]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], ClientController.prototype, \"create\", null);\r\n__decorate([\r\n    common_1.Put(':id'),\r\n    __param(0, common_1.Param('id')), __param(1, common_1.Body()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [String, Object]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], ClientController.prototype, \"update\", null);\r\n__decorate([\r\n    common_1.Delete(':id'),\r\n    __param(0, common_1.Param('id')),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [String]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], ClientController.prototype, \"destroy\", null);\r\nClientController = __decorate([\r\n    swagger_1.ApiUseTags('Clients'),\r\n    common_1.Controller('api/rest/clients'),\r\n    __metadata(\"design:paramtypes\", [client_service_1.ClientService])\r\n], ClientController);\r\nexports.ClientController = ClientController;\r\n\n\n//# sourceURL=webpack:///./src/client/client.controller.ts?");

/***/ }),

/***/ "./src/client/client.model.ts":
/*!************************************!*\
  !*** ./src/client/client.model.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst model_1 = __webpack_require__(/*! ../shared/model */ \"./src/shared/model.ts\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nclass Client extends model_1.AbstractModel {\r\n    constructor(partial) {\r\n        super(partial);\r\n    }\r\n    getData() {\r\n        const { label, value } = this;\r\n        const responseObject = { label, value };\r\n        return responseObject;\r\n    }\r\n}\r\n__decorate([\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], Client.prototype, \"id\", void 0);\r\n__decorate([\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], Client.prototype, \"label\", void 0);\r\nexports.Client = Client;\r\n\n\n//# sourceURL=webpack:///./src/client/client.model.ts?");

/***/ }),

/***/ "./src/client/client.module.ts":
/*!*************************************!*\
  !*** ./src/client/client.module.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst client_controller_1 = __webpack_require__(/*! ./client.controller */ \"./src/client/client.controller.ts\");\r\nconst client_service_1 = __webpack_require__(/*! ./client.service */ \"./src/client/client.service.ts\");\r\nlet ClientModule = class ClientModule {\r\n};\r\nClientModule = __decorate([\r\n    common_1.Module({\r\n        imports: [common_1.HttpModule],\r\n        controllers: [client_controller_1.ClientController],\r\n        providers: [client_service_1.ClientService]\r\n    })\r\n], ClientModule);\r\nexports.ClientModule = ClientModule;\r\n\n\n//# sourceURL=webpack:///./src/client/client.module.ts?");

/***/ }),

/***/ "./src/client/client.service.ts":
/*!**************************************!*\
  !*** ./src/client/client.service.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst service_1 = __webpack_require__(/*! @shared/service */ \"./src/shared/service.ts\");\r\nconst database_service_1 = __webpack_require__(/*! @db/database.service */ \"./src/database/database.service.ts\");\r\nconst client_model_1 = __webpack_require__(/*! ./client.model */ \"./src/client/client.model.ts\");\r\nconst enum_1 = __webpack_require__(/*! @shared/enum */ \"./src/shared/enum/index.ts\");\r\nlet ClientService = class ClientService extends service_1.AbstractService {\r\n    constructor(db, httpService) {\r\n        super(db, 'clients');\r\n        this.httpService = httpService;\r\n    }\r\n    getCollection() {\r\n        const _super = Object.create(null, {\r\n            getAll: { get: () => super.getAll }\r\n        });\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const data = yield _super.getAll.call(this);\r\n            let collection = [];\r\n            data.forEach(datum => {\r\n                const client = new client_model_1.Client(datum);\r\n                collection.push(client.getData());\r\n            });\r\n            return collection;\r\n        });\r\n    }\r\n    create(data) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            if (!data.value) {\r\n                data.value = data.label.toLowerCase().replace(/\\W/g, '_');\r\n            }\r\n            this.data = data;\r\n            this.data.status = enum_1.EStatus.Active;\r\n            return this;\r\n        });\r\n    }\r\n    update(id, data) {\r\n        const _super = Object.create(null, {\r\n            update: { get: () => super.update }\r\n        });\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield _super.update.call(this, id, data);\r\n        });\r\n    }\r\n};\r\nClientService = __decorate([\r\n    common_1.Injectable(),\r\n    __metadata(\"design:paramtypes\", [database_service_1.DatabaseService, common_1.HttpService])\r\n], ClientService);\r\nexports.ClientService = ClientService;\r\n\n\n//# sourceURL=webpack:///./src/client/client.service.ts?");

/***/ }),

/***/ "./src/client/dto/client.dto.ts":
/*!**************************************!*\
  !*** ./src/client/dto/client.dto.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nclass ClientDto {\r\n}\r\n__decorate([\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], ClientDto.prototype, \"label\", void 0);\r\n__decorate([\r\n    swagger_1.ApiModelPropertyOptional(),\r\n    __metadata(\"design:type\", String)\r\n], ClientDto.prototype, \"value\", void 0);\r\nexports.ClientDto = ClientDto;\r\n\n\n//# sourceURL=webpack:///./src/client/dto/client.dto.ts?");

/***/ }),

/***/ "./src/database/database.module.ts":
/*!*****************************************!*\
  !*** ./src/database/database.module.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst database_service_1 = __webpack_require__(/*! ./database.service */ \"./src/database/database.service.ts\");\r\nlet DatabaseModule = class DatabaseModule {\r\n};\r\nDatabaseModule = __decorate([\r\n    common_1.Global(),\r\n    common_1.Module({\r\n        providers: [\r\n            {\r\n                provide: database_service_1.DatabaseService,\r\n                useValue: new database_service_1.DatabaseService(),\r\n            },\r\n        ],\r\n        exports: [\r\n            database_service_1.DatabaseService,\r\n        ],\r\n    })\r\n], DatabaseModule);\r\nexports.DatabaseModule = DatabaseModule;\r\n\n\n//# sourceURL=webpack:///./src/database/database.module.ts?");

/***/ }),

/***/ "./src/database/database.service.ts":
/*!******************************************!*\
  !*** ./src/database/database.service.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst config_1 = __webpack_require__(/*! ../app/config */ \"./src/app/config.ts\");\r\nconst firebase_1 = __webpack_require__(/*! firebase */ \"firebase\");\r\nclass DatabaseService {\r\n    constructor() {\r\n        const config = {\r\n            apiKey: config_1.default.FIREBASE_API_KEY,\r\n            authDomain: config_1.default.FIREBASE_AUTH_DOMAIN,\r\n            databaseURL: config_1.default.FIREBASE_DATABASE_URL,\r\n            projectId: config_1.default.FIREBASE_PROJECT_ID,\r\n            storageBucket: config_1.default.FIREBASE_STORAGE_BUCKET,\r\n            messagingSenderId: config_1.default.FIREBASE_MESSAGING_SENDER_ID,\r\n        };\r\n        firebase_1.default.initializeApp(config);\r\n        this.firestore = firebase_1.default.firestore();\r\n    }\r\n    getCollection(collection) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.firestore.collection(collection).get();\r\n        });\r\n    }\r\n    write(collection, data) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.firestore.collection(collection).add(data);\r\n        });\r\n    }\r\n    read(collection) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.getCollection(collection);\r\n        });\r\n    }\r\n}\r\nexports.DatabaseService = DatabaseService;\r\n\n\n//# sourceURL=webpack:///./src/database/database.service.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst core_1 = __webpack_require__(/*! @nestjs/core */ \"@nestjs/core\");\r\nconst app_module_1 = __webpack_require__(/*! @app/app.module */ \"./src/app/app.module.ts\");\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst config_1 = __webpack_require__(/*! @app/config */ \"./src/app/config.ts\");\r\nconst compression = __webpack_require__(/*! compression */ \"compression\");\r\nconst helmet = __webpack_require__(/*! helmet */ \"helmet\");\r\nconst rateLimit = __webpack_require__(/*! express-rate-limit */ \"express-rate-limit\");\r\nconst swagger_1 = __webpack_require__(/*! ./shared/swagger */ \"./src/shared/swagger.ts\");\r\nconst expressSession = __webpack_require__(/*! express-session */ \"express-session\");\r\nfunction bootstrap() {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const app = yield core_1.NestFactory.create(app_module_1.AppModule);\r\n        swagger_1.swagger(app);\r\n        app.use(compression());\r\n        app.use(helmet());\r\n        app.use(rateLimit({\r\n            windowMs: 15 * 60 * 1000,\r\n            max: 100\r\n        }));\r\n        app.use(expressSession({\r\n            secret: config_1.default.JWT_SECRET_KEY,\r\n            resave: true,\r\n            saveUninitialized: true,\r\n            cookie: {\r\n                maxAge: config_1.default.SESSION_EXPIRES_IN\r\n            }\r\n        }));\r\n        yield app.listen(config_1.default.APP_PORT);\r\n        common_1.Logger.log(`Server running on http://localhost:${config_1.default.APP_PORT}`, 'Bootstrap');\r\n    });\r\n}\r\nbootstrap();\r\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "./src/project/dto/client.dto.ts":
/*!***************************************!*\
  !*** ./src/project/dto/client.dto.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nclass ClientDTO {\r\n}\r\n__decorate([\r\n    swagger_1.ApiModelPropertyOptional(),\r\n    __metadata(\"design:type\", String)\r\n], ClientDTO.prototype, \"label\", void 0);\r\n__decorate([\r\n    swagger_1.ApiModelPropertyOptional(),\r\n    __metadata(\"design:type\", String)\r\n], ClientDTO.prototype, \"value\", void 0);\r\nexports.ClientDTO = ClientDTO;\r\n\n\n//# sourceURL=webpack:///./src/project/dto/client.dto.ts?");

/***/ }),

/***/ "./src/project/dto/project.dto.ts":
/*!****************************************!*\
  !*** ./src/project/dto/project.dto.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nconst client_dto_1 = __webpack_require__(/*! ./client.dto */ \"./src/project/dto/client.dto.ts\");\r\nclass ProjectDto {\r\n}\r\n__decorate([\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], ProjectDto.prototype, \"label\", void 0);\r\n__decorate([\r\n    swagger_1.ApiModelPropertyOptional(),\r\n    __metadata(\"design:type\", String)\r\n], ProjectDto.prototype, \"value\", void 0);\r\n__decorate([\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", client_dto_1.ClientDTO)\r\n], ProjectDto.prototype, \"client\", void 0);\r\n__decorate([\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], ProjectDto.prototype, \"clientId\", void 0);\r\nexports.ProjectDto = ProjectDto;\r\n\n\n//# sourceURL=webpack:///./src/project/dto/project.dto.ts?");

/***/ }),

/***/ "./src/project/project.controller.ts":
/*!*******************************************!*\
  !*** ./src/project/project.controller.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nconst project_service_1 = __webpack_require__(/*! ./project.service */ \"./src/project/project.service.ts\");\r\nconst project_dto_1 = __webpack_require__(/*! ./dto/project.dto */ \"./src/project/dto/project.dto.ts\");\r\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\r\nlet ProjectController = class ProjectController {\r\n    constructor(projectService) {\r\n        this.projectService = projectService;\r\n    }\r\n    getAll(clientId) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.projectService.getAllByClient(clientId);\r\n        });\r\n    }\r\n    create(data) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const project = yield this.projectService.create(data);\r\n            const save = yield project.save();\r\n            const newProject = yield save.get();\r\n            return {\r\n                success: true,\r\n                message: `You've successfully created a project.`,\r\n                project: Object.assign({ id: newProject.id }, newProject.data())\r\n            };\r\n        });\r\n    }\r\n    update(id, data) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.projectService.update(id, data);\r\n        });\r\n    }\r\n    delete(id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.projectService.delete(id);\r\n        });\r\n    }\r\n};\r\n__decorate([\r\n    common_1.Get(),\r\n    __param(0, common_1.Query('clientId')),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [String]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], ProjectController.prototype, \"getAll\", null);\r\n__decorate([\r\n    common_1.Post(),\r\n    swagger_1.ApiBearerAuth(),\r\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\r\n    __param(0, common_1.Body()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [project_dto_1.ProjectDto]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], ProjectController.prototype, \"create\", null);\r\n__decorate([\r\n    common_1.Put(':id'),\r\n    __param(0, common_1.Param('id')), __param(1, common_1.Body()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [String, Object]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], ProjectController.prototype, \"update\", null);\r\n__decorate([\r\n    common_1.Delete(':id'),\r\n    __param(0, common_1.Param('id')),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [String]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], ProjectController.prototype, \"delete\", null);\r\nProjectController = __decorate([\r\n    swagger_1.ApiUseTags('Projects'),\r\n    common_1.Controller('api/rest/projects'),\r\n    __metadata(\"design:paramtypes\", [project_service_1.ProjectService])\r\n], ProjectController);\r\nexports.ProjectController = ProjectController;\r\n\n\n//# sourceURL=webpack:///./src/project/project.controller.ts?");

/***/ }),

/***/ "./src/project/project.model.ts":
/*!**************************************!*\
  !*** ./src/project/project.model.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst model_1 = __webpack_require__(/*! @shared/model */ \"./src/shared/model.ts\");\r\nclass Project extends model_1.AbstractModel {\r\n    constructor(partial) {\r\n        super(partial);\r\n    }\r\n    getData() {\r\n        const { label, value, client, clientId } = this;\r\n        const responseObject = { label, value, client, clientId };\r\n        return responseObject;\r\n    }\r\n}\r\nexports.Project = Project;\r\n\n\n//# sourceURL=webpack:///./src/project/project.model.ts?");

/***/ }),

/***/ "./src/project/project.module.ts":
/*!***************************************!*\
  !*** ./src/project/project.module.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst project_controller_1 = __webpack_require__(/*! ./project.controller */ \"./src/project/project.controller.ts\");\r\nconst project_service_1 = __webpack_require__(/*! ./project.service */ \"./src/project/project.service.ts\");\r\nlet ProjectModule = class ProjectModule {\r\n};\r\nProjectModule = __decorate([\r\n    common_1.Module({\r\n        controllers: [project_controller_1.ProjectController],\r\n        providers: [project_service_1.ProjectService]\r\n    })\r\n], ProjectModule);\r\nexports.ProjectModule = ProjectModule;\r\n\n\n//# sourceURL=webpack:///./src/project/project.module.ts?");

/***/ }),

/***/ "./src/project/project.service.ts":
/*!****************************************!*\
  !*** ./src/project/project.service.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst service_1 = __webpack_require__(/*! ../shared/service */ \"./src/shared/service.ts\");\r\nconst database_service_1 = __webpack_require__(/*! @db/database.service */ \"./src/database/database.service.ts\");\r\nconst project_model_1 = __webpack_require__(/*! ./project.model */ \"./src/project/project.model.ts\");\r\nconst status_enum_1 = __webpack_require__(/*! ../shared/enum/status.enum */ \"./src/shared/enum/status.enum.ts\");\r\nlet ProjectService = class ProjectService extends service_1.AbstractService {\r\n    constructor(db) {\r\n        super(db, 'projects');\r\n    }\r\n    getCollection() {\r\n        const _super = Object.create(null, {\r\n            getAll: { get: () => super.getAll }\r\n        });\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const data = yield _super.getAll.call(this);\r\n            let collection = [];\r\n            data.forEach(datum => {\r\n                const project = new project_model_1.Project(datum);\r\n                collection.push(project.getData());\r\n            });\r\n            return collection;\r\n        });\r\n    }\r\n    getAllByClient(clientId) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            if (!clientId) {\r\n                throw new common_1.UnprocessableEntityException('You must specify a client ID as a parameter.');\r\n            }\r\n            const collection = yield this.collection.where('clientId', '==', clientId).get();\r\n            return collection.docs.map(doc => { return Object.assign({}, doc.data(), { id: doc.id }); });\r\n        });\r\n    }\r\n    create(data) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            if (!data.value) {\r\n                data.value = data.label.toLowerCase().replace(/\\W/g, '_');\r\n            }\r\n            this.data = data;\r\n            this.data.status = status_enum_1.EStatus.Active;\r\n            return this;\r\n        });\r\n    }\r\n    update(id, data) {\r\n        const _super = Object.create(null, {\r\n            update: { get: () => super.update }\r\n        });\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield _super.update.call(this, id, data);\r\n        });\r\n    }\r\n};\r\nProjectService = __decorate([\r\n    common_1.Injectable(),\r\n    __metadata(\"design:paramtypes\", [database_service_1.DatabaseService])\r\n], ProjectService);\r\nexports.ProjectService = ProjectService;\r\n\n\n//# sourceURL=webpack:///./src/project/project.service.ts?");

/***/ }),

/***/ "./src/scalar/date.ts":
/*!****************************!*\
  !*** ./src/scalar/date.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst graphql_1 = __webpack_require__(/*! @nestjs/graphql */ \"@nestjs/graphql\");\r\nconst graphql_2 = __webpack_require__(/*! graphql */ \"graphql\");\r\nconst firebase_1 = __webpack_require__(/*! firebase */ \"firebase\");\r\nlet DateScalar = class DateScalar {\r\n    constructor() {\r\n        this.description = 'Date custom scalar type';\r\n    }\r\n    parseValue(value) {\r\n        const isNumber = typeof value === 'number';\r\n        if (!isNumber) {\r\n            console.log('value is not a number', value);\r\n            if (value.seconds) {\r\n                console.log('value.seconds === true', value.seconds);\r\n                return new Date(value.seconds);\r\n            }\r\n        }\r\n        console.log('value is a number', value);\r\n        return new Date(value);\r\n    }\r\n    serialize(value) {\r\n        const isNumber = typeof value === 'number';\r\n        if (!isNumber) {\r\n            if (value.seconds !== undefined && value.nanoseconds !== undefined) {\r\n                const date = new firebase_1.firestore.Timestamp(value.seconds, value.nanoseconds).toDate();\r\n                return date;\r\n            }\r\n        }\r\n        return value.getTime();\r\n    }\r\n    parseLiteral(ast) {\r\n        if (ast.kind === graphql_2.Kind.INT) {\r\n            return parseInt(ast.value, 10);\r\n        }\r\n        return null;\r\n    }\r\n};\r\nDateScalar = __decorate([\r\n    graphql_1.Scalar('DateTime')\r\n], DateScalar);\r\nexports.DateScalar = DateScalar;\r\n\n\n//# sourceURL=webpack:///./src/scalar/date.ts?");

/***/ }),

/***/ "./src/shared/credentials.dto.ts":
/*!***************************************!*\
  !*** ./src/shared/credentials.dto.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nclass Credentials {\r\n}\r\n__decorate([\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], Credentials.prototype, \"email\", void 0);\r\n__decorate([\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], Credentials.prototype, \"password\", void 0);\r\nexports.Credentials = Credentials;\r\n\n\n//# sourceURL=webpack:///./src/shared/credentials.dto.ts?");

/***/ }),

/***/ "./src/shared/enum/index.ts":
/*!**********************************!*\
  !*** ./src/shared/enum/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst role_enum_1 = __webpack_require__(/*! ./role.enum */ \"./src/shared/enum/role.enum.ts\");\r\nexports.ERole = role_enum_1.ERole;\r\nconst status_enum_1 = __webpack_require__(/*! ./status.enum */ \"./src/shared/enum/status.enum.ts\");\r\nexports.EStatus = status_enum_1.EStatus;\r\n\n\n//# sourceURL=webpack:///./src/shared/enum/index.ts?");

/***/ }),

/***/ "./src/shared/enum/role.enum.ts":
/*!**************************************!*\
  !*** ./src/shared/enum/role.enum.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar ERole;\r\n(function (ERole) {\r\n    ERole[\"Subscribe\"] = \"subscriber\";\r\n    ERole[\"Editor\"] = \"editor\";\r\n    ERole[\"Admin\"] = \"admin\";\r\n})(ERole = exports.ERole || (exports.ERole = {}));\r\n\n\n//# sourceURL=webpack:///./src/shared/enum/role.enum.ts?");

/***/ }),

/***/ "./src/shared/enum/status.enum.ts":
/*!****************************************!*\
  !*** ./src/shared/enum/status.enum.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar EStatus;\r\n(function (EStatus) {\r\n    EStatus[\"Active\"] = \"active\";\r\n    EStatus[\"InActive\"] = \"inActive\";\r\n})(EStatus = exports.EStatus || (exports.EStatus = {}));\r\n\n\n//# sourceURL=webpack:///./src/shared/enum/status.enum.ts?");

/***/ }),

/***/ "./src/shared/model.ts":
/*!*****************************!*\
  !*** ./src/shared/model.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass AbstractModel {\r\n    constructor(partial) {\r\n        Object.assign(this, partial);\r\n    }\r\n}\r\nexports.AbstractModel = AbstractModel;\r\n\n\n//# sourceURL=webpack:///./src/shared/model.ts?");

/***/ }),

/***/ "./src/shared/service.ts":
/*!*******************************!*\
  !*** ./src/shared/service.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst database_service_1 = __webpack_require__(/*! @db/database.service */ \"./src/database/database.service.ts\");\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nlet AbstractService = class AbstractService {\r\n    constructor(db, collection) {\r\n        this.includeCreatedUpdatedDate = true;\r\n        this.db = db;\r\n        this.awaitCollection = this.db.getCollection(collection);\r\n        this.collection = this.db.firestore.collection(collection);\r\n    }\r\n    getAll() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const collection = yield this.collection.get();\r\n            return collection.docs.map(doc => { return Object.assign({}, doc.data(), { id: doc.id }); });\r\n        });\r\n    }\r\n    create(data) {\r\n        this.data = data;\r\n        if (this.includeCreatedUpdatedDate) {\r\n            this.data.createdAt = new Date();\r\n            this.data.updatedAt = new Date();\r\n        }\r\n    }\r\n    getData() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const data = yield this.document.get();\r\n            return data.data();\r\n        });\r\n    }\r\n    getOne(id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            this.document = yield this.collection.doc(id);\r\n            return this.document;\r\n        });\r\n    }\r\n    update(id, data) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const document = yield this.getOne(id);\r\n            const awaitDocument = yield document.get();\r\n            let obj = data;\r\n            if (awaitDocument.exists) {\r\n                if (this.includeCreatedUpdatedDate)\r\n                    yield document.update(Object.assign({}, data, { updatedAt: new Date() }));\r\n                else\r\n                    yield document.update(data);\r\n                return Object.assign({}, data, { success: true });\r\n            }\r\n            return { success: false, message: 'Unable to perform your request. Document doesn\\'t exist.' };\r\n        });\r\n    }\r\n    delete(id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const document = yield this.getOne(id);\r\n            const awaitDocument = yield document.get();\r\n            if (awaitDocument.exists) {\r\n                yield document.delete();\r\n                return { success: true };\r\n            }\r\n            return { success: false, message: 'Unable to perform your request. Document doesn\\'t exist.' };\r\n        });\r\n    }\r\n    save() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.collection.add(this.data);\r\n        });\r\n    }\r\n};\r\nAbstractService = __decorate([\r\n    common_1.Injectable(),\r\n    __metadata(\"design:paramtypes\", [database_service_1.DatabaseService, String])\r\n], AbstractService);\r\nexports.AbstractService = AbstractService;\r\n\n\n//# sourceURL=webpack:///./src/shared/service.ts?");

/***/ }),

/***/ "./src/shared/swagger.ts":
/*!*******************************!*\
  !*** ./src/shared/swagger.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nconst user_module_1 = __webpack_require__(/*! @user/user.module */ \"./src/user/user.module.ts\");\r\nconst project_module_1 = __webpack_require__(/*! ../project/project.module */ \"./src/project/project.module.ts\");\r\nconst client_module_1 = __webpack_require__(/*! ../client/client.module */ \"./src/client/client.module.ts\");\r\nexports.swagger = (app) => {\r\n    const options = new swagger_1.DocumentBuilder()\r\n        .setTitle('Timesheet')\r\n        .setDescription('The API for the timesheets chrome extension.')\r\n        .setVersion('1.0')\r\n        .addBearerAuth('Authorization', 'header')\r\n        .build();\r\n    const document = swagger_1.SwaggerModule.createDocument(app, options);\r\n    swagger_1.SwaggerModule.setup('api/swagger', app, document);\r\n    const userOptions = new swagger_1.DocumentBuilder()\r\n        .setTitle('Users')\r\n        .setDescription('Users API.')\r\n        .setVersion('1.0')\r\n        .addTag('Users')\r\n        .addBearerAuth('Authorization', 'header')\r\n        .build();\r\n    const userDocument = swagger_1.SwaggerModule.createDocument(app, userOptions, { include: [user_module_1.UserModule] });\r\n    swagger_1.SwaggerModule.setup('api/swagger/users', app, userDocument);\r\n    const projectOptions = new swagger_1.DocumentBuilder()\r\n        .setTitle('Projects')\r\n        .setDescription('Projects API.')\r\n        .setVersion('1.0')\r\n        .addTag('Projects')\r\n        .addBearerAuth('Authorization', 'header')\r\n        .build();\r\n    const projectDocument = swagger_1.SwaggerModule.createDocument(app, projectOptions, { include: [project_module_1.ProjectModule] });\r\n    swagger_1.SwaggerModule.setup('api/swagger/projects', app, projectDocument);\r\n    const clientOptions = new swagger_1.DocumentBuilder()\r\n        .setTitle('Clients')\r\n        .setDescription('Clients API')\r\n        .setVersion('1.0')\r\n        .addTag('Clients')\r\n        .addBearerAuth('Authorization', 'header')\r\n        .build();\r\n    const clientDocument = swagger_1.SwaggerModule.createDocument(app, clientOptions, { include: [client_module_1.ClientModule] });\r\n    swagger_1.SwaggerModule.setup('api/swagger/clients', app, clientDocument);\r\n    const timesheetOptions = new swagger_1.DocumentBuilder()\r\n        .setTitle('Timesheets')\r\n        .setDescription('Timesheets API')\r\n        .setVersion('1.0')\r\n        .addTag('Timesheets')\r\n        .addBearerAuth('Authorization', 'header')\r\n        .build();\r\n    const timesheetDocument = swagger_1.SwaggerModule.createDocument(app, timesheetOptions, { include: [client_module_1.ClientModule] });\r\n    swagger_1.SwaggerModule.setup('api/swagger/timesheets', app, timesheetDocument);\r\n};\r\n\n\n//# sourceURL=webpack:///./src/shared/swagger.ts?");

/***/ }),

/***/ "./src/timesheet/dto/client-timesheet.dto.ts":
/*!***************************************************!*\
  !*** ./src/timesheet/dto/client-timesheet.dto.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nclass ClientTimesheetDto {\r\n}\r\n__decorate([\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], ClientTimesheetDto.prototype, \"label\", void 0);\r\n__decorate([\r\n    swagger_1.ApiModelPropertyOptional(),\r\n    __metadata(\"design:type\", String)\r\n], ClientTimesheetDto.prototype, \"value\", void 0);\r\nexports.ClientTimesheetDto = ClientTimesheetDto;\r\n\n\n//# sourceURL=webpack:///./src/timesheet/dto/client-timesheet.dto.ts?");

/***/ }),

/***/ "./src/timesheet/dto/project-timesheet.dto.ts":
/*!****************************************************!*\
  !*** ./src/timesheet/dto/project-timesheet.dto.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nclass ProjectTimesheetDto {\r\n}\r\n__decorate([\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], ProjectTimesheetDto.prototype, \"label\", void 0);\r\n__decorate([\r\n    swagger_1.ApiModelPropertyOptional(),\r\n    __metadata(\"design:type\", String)\r\n], ProjectTimesheetDto.prototype, \"value\", void 0);\r\nexports.ProjectTimesheetDto = ProjectTimesheetDto;\r\n\n\n//# sourceURL=webpack:///./src/timesheet/dto/project-timesheet.dto.ts?");

/***/ }),

/***/ "./src/timesheet/dto/timesheet.dto.ts":
/*!********************************************!*\
  !*** ./src/timesheet/dto/timesheet.dto.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nconst project_timesheet_dto_1 = __webpack_require__(/*! ./project-timesheet.dto */ \"./src/timesheet/dto/project-timesheet.dto.ts\");\r\nconst client_timesheet_dto_1 = __webpack_require__(/*! ./client-timesheet.dto */ \"./src/timesheet/dto/client-timesheet.dto.ts\");\r\nclass TimesheetDto {\r\n}\r\n__decorate([\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], TimesheetDto.prototype, \"task\", void 0);\r\n__decorate([\r\n    swagger_1.ApiModelPropertyOptional(),\r\n    __metadata(\"design:type\", project_timesheet_dto_1.ProjectTimesheetDto)\r\n], TimesheetDto.prototype, \"project\", void 0);\r\n__decorate([\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", client_timesheet_dto_1.ClientTimesheetDto)\r\n], TimesheetDto.prototype, \"client\", void 0);\r\n__decorate([\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", Date)\r\n], TimesheetDto.prototype, \"date\", void 0);\r\n__decorate([\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", Number)\r\n], TimesheetDto.prototype, \"duration\", void 0);\r\nexports.TimesheetDto = TimesheetDto;\r\n\n\n//# sourceURL=webpack:///./src/timesheet/dto/timesheet.dto.ts?");

/***/ }),

/***/ "./src/timesheet/timesheet.controller.ts":
/*!***********************************************!*\
  !*** ./src/timesheet/timesheet.controller.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst timesheet_service_1 = __webpack_require__(/*! ./timesheet.service */ \"./src/timesheet/timesheet.service.ts\");\r\nconst timesheet_dto_1 = __webpack_require__(/*! ./dto/timesheet.dto */ \"./src/timesheet/dto/timesheet.dto.ts\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\r\nconst user_decorator_1 = __webpack_require__(/*! @user/decorators/user.decorator */ \"./src/user/decorators/user.decorator.ts\");\r\nconst user_service_1 = __webpack_require__(/*! @user/user.service */ \"./src/user/user.service.ts\");\r\nlet TimesheetController = class TimesheetController {\r\n    constructor(timesheetService, userService) {\r\n        this.timesheetService = timesheetService;\r\n        this.userService = userService;\r\n    }\r\n    getAll() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.timesheetService.getAll();\r\n        });\r\n    }\r\n    create(user, data) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const timesheet = yield this.timesheetService\r\n                .create(Object.assign({}, data, { user: {\r\n                    id: user.id,\r\n                    email: user.email,\r\n                    name: user.name ? user.name : ''\r\n                } }));\r\n            const save = yield timesheet.save();\r\n            const newTimesheet = yield save.get();\r\n            return newTimesheet.data();\r\n        });\r\n    }\r\n    update(id, data) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.timesheetService.update(id, data);\r\n        });\r\n    }\r\n    delete(id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.timesheetService.delete(id);\r\n        });\r\n    }\r\n};\r\n__decorate([\r\n    common_1.Get(),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", []),\r\n    __metadata(\"design:returntype\", Promise)\r\n], TimesheetController.prototype, \"getAll\", null);\r\n__decorate([\r\n    common_1.Post(),\r\n    swagger_1.ApiBearerAuth(),\r\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\r\n    __param(0, user_decorator_1.CurrentUser()), __param(1, common_1.Body()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Object, timesheet_dto_1.TimesheetDto]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], TimesheetController.prototype, \"create\", null);\r\n__decorate([\r\n    common_1.Put(':id'),\r\n    __param(0, common_1.Param('id')), __param(1, common_1.Body()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [String, Object]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], TimesheetController.prototype, \"update\", null);\r\n__decorate([\r\n    common_1.Delete(':id'),\r\n    __param(0, common_1.Param('id')),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [String]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], TimesheetController.prototype, \"delete\", null);\r\nTimesheetController = __decorate([\r\n    swagger_1.ApiUseTags('Timesheets'),\r\n    common_1.Controller('api/rest/timesheets'),\r\n    __metadata(\"design:paramtypes\", [timesheet_service_1.TimesheetService,\r\n        user_service_1.UserService])\r\n], TimesheetController);\r\nexports.TimesheetController = TimesheetController;\r\n\n\n//# sourceURL=webpack:///./src/timesheet/timesheet.controller.ts?");

/***/ }),

/***/ "./src/timesheet/timesheet.model.ts":
/*!******************************************!*\
  !*** ./src/timesheet/timesheet.model.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst model_1 = __webpack_require__(/*! @shared/model */ \"./src/shared/model.ts\");\r\nclass Timesheet extends model_1.AbstractModel {\r\n    constructor(partial) {\r\n        super(partial);\r\n    }\r\n    getData() {\r\n        const { id, user, task, project, client, date, duration } = this;\r\n        const responseObject = { id, user, task, project, client, date, duration };\r\n        return responseObject;\r\n    }\r\n}\r\nexports.Timesheet = Timesheet;\r\n\n\n//# sourceURL=webpack:///./src/timesheet/timesheet.model.ts?");

/***/ }),

/***/ "./src/timesheet/timesheet.module.ts":
/*!*******************************************!*\
  !*** ./src/timesheet/timesheet.module.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst timesheet_service_1 = __webpack_require__(/*! ./timesheet.service */ \"./src/timesheet/timesheet.service.ts\");\r\nconst timesheet_controller_1 = __webpack_require__(/*! ./timesheet.controller */ \"./src/timesheet/timesheet.controller.ts\");\r\nconst user_module_1 = __webpack_require__(/*! @user/user.module */ \"./src/user/user.module.ts\");\r\nlet TimesheetModule = class TimesheetModule {\r\n};\r\nTimesheetModule = __decorate([\r\n    common_1.Module({\r\n        imports: [user_module_1.UserModule],\r\n        providers: [timesheet_service_1.TimesheetService],\r\n        controllers: [timesheet_controller_1.TimesheetController]\r\n    })\r\n], TimesheetModule);\r\nexports.TimesheetModule = TimesheetModule;\r\n\n\n//# sourceURL=webpack:///./src/timesheet/timesheet.module.ts?");

/***/ }),

/***/ "./src/timesheet/timesheet.service.ts":
/*!********************************************!*\
  !*** ./src/timesheet/timesheet.service.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst service_1 = __webpack_require__(/*! ../shared/service */ \"./src/shared/service.ts\");\r\nconst database_service_1 = __webpack_require__(/*! @db/database.service */ \"./src/database/database.service.ts\");\r\nconst timesheet_model_1 = __webpack_require__(/*! ./timesheet.model */ \"./src/timesheet/timesheet.model.ts\");\r\nconst enum_1 = __webpack_require__(/*! @shared/enum */ \"./src/shared/enum/index.ts\");\r\nlet TimesheetService = class TimesheetService extends service_1.AbstractService {\r\n    constructor(db) {\r\n        super(db, 'timesheets');\r\n    }\r\n    getCollection() {\r\n        const _super = Object.create(null, {\r\n            getAll: { get: () => super.getAll }\r\n        });\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const data = yield _super.getAll.call(this);\r\n            let collection = [];\r\n            data.forEach(datum => {\r\n                const project = new timesheet_model_1.Timesheet(datum);\r\n                collection.push(project.getData());\r\n            });\r\n            return collection;\r\n        });\r\n    }\r\n    create(data) {\r\n        const _super = Object.create(null, {\r\n            create: { get: () => super.create }\r\n        });\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            _super.create.call(this, Object.assign({}, data, { status: enum_1.EStatus.Active }));\r\n            return this;\r\n        });\r\n    }\r\n    update(id, data) {\r\n        const _super = Object.create(null, {\r\n            update: { get: () => super.update }\r\n        });\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield _super.update.call(this, id, data);\r\n        });\r\n    }\r\n};\r\nTimesheetService = __decorate([\r\n    common_1.Injectable(),\r\n    __metadata(\"design:paramtypes\", [database_service_1.DatabaseService])\r\n], TimesheetService);\r\nexports.TimesheetService = TimesheetService;\r\n\n\n//# sourceURL=webpack:///./src/timesheet/timesheet.service.ts?");

/***/ }),

/***/ "./src/user/decorators/user.decorator.ts":
/*!***********************************************!*\
  !*** ./src/user/decorators/user.decorator.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nexports.CurrentUser = common_1.createParamDecorator((data, req) => {\r\n    return data ? req.user[data] : req.user;\r\n});\r\n\n\n//# sourceURL=webpack:///./src/user/decorators/user.decorator.ts?");

/***/ }),

/***/ "./src/user/dto/user.dto.ts":
/*!**********************************!*\
  !*** ./src/user/dto/user.dto.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst enum_1 = __webpack_require__(/*! @shared/enum */ \"./src/shared/enum/index.ts\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nclass UserDto {\r\n}\r\n__decorate([\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], UserDto.prototype, \"email\", void 0);\r\n__decorate([\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], UserDto.prototype, \"name\", void 0);\r\n__decorate([\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], UserDto.prototype, \"password\", void 0);\r\n__decorate([\r\n    swagger_1.ApiModelProperty({ enum: enum_1.ERole }),\r\n    __metadata(\"design:type\", String)\r\n], UserDto.prototype, \"role\", void 0);\r\n__decorate([\r\n    swagger_1.ApiModelProperty({ enum: enum_1.EStatus }),\r\n    __metadata(\"design:type\", String)\r\n], UserDto.prototype, \"status\", void 0);\r\nexports.UserDto = UserDto;\r\n\n\n//# sourceURL=webpack:///./src/user/dto/user.dto.ts?");

/***/ }),

/***/ "./src/user/user.controller.ts":
/*!*************************************!*\
  !*** ./src/user/user.controller.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst user_service_1 = __webpack_require__(/*! ./user.service */ \"./src/user/user.service.ts\");\r\nconst user_model_1 = __webpack_require__(/*! ./user.model */ \"./src/user/user.model.ts\");\r\nconst user_dto_1 = __webpack_require__(/*! ./dto/user.dto */ \"./src/user/dto/user.dto.ts\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\r\nconst credentials_dto_1 = __webpack_require__(/*! @shared/credentials.dto */ \"./src/shared/credentials.dto.ts\");\r\nconst user_decorator_1 = __webpack_require__(/*! ./decorators/user.decorator */ \"./src/user/decorators/user.decorator.ts\");\r\nlet UserController = class UserController {\r\n    constructor(userService) {\r\n        this.userService = userService;\r\n    }\r\n    login(credentials) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.userService.login(credentials);\r\n        });\r\n    }\r\n    register(credentials) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.userService.register(credentials);\r\n        });\r\n    }\r\n    getAll() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.userService.getCollection();\r\n        });\r\n    }\r\n    create(data) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const user = yield this.userService.create(data);\r\n            const save = yield user.save();\r\n            const newUser = yield save.get();\r\n            return newUser.data();\r\n        });\r\n    }\r\n    me(data) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            console.log('data', data);\r\n            return new user_model_1.User(data).getData();\r\n        });\r\n    }\r\n    getOne(id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const awaitUser = yield this.userService.getOne(id);\r\n            const user = yield awaitUser.get();\r\n            return new user_model_1.User(user.data()).getData();\r\n        });\r\n    }\r\n    update(id, data) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.userService.update(id, data);\r\n        });\r\n    }\r\n    destroy(id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.userService.delete(id);\r\n        });\r\n    }\r\n};\r\n__decorate([\r\n    common_1.Post('login'),\r\n    swagger_1.ApiResponse({ status: 200, description: `You've successfully logged in.` }),\r\n    __param(0, common_1.Body()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [credentials_dto_1.Credentials]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], UserController.prototype, \"login\", null);\r\n__decorate([\r\n    common_1.Post('register'),\r\n    swagger_1.ApiCreatedResponse({ description: 'The record has been successfully created.' }),\r\n    __param(0, common_1.Body()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [credentials_dto_1.Credentials]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], UserController.prototype, \"register\", null);\r\n__decorate([\r\n    common_1.Get(),\r\n    swagger_1.ApiResponse({ status: 200, description: 'Successfully collected all user documents.' }),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", []),\r\n    __metadata(\"design:returntype\", Promise)\r\n], UserController.prototype, \"getAll\", null);\r\n__decorate([\r\n    common_1.Post(),\r\n    swagger_1.ApiCreatedResponse({ description: 'The record has been successfully created.' }),\r\n    __param(0, common_1.Body()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [user_dto_1.UserDto]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], UserController.prototype, \"create\", null);\r\n__decorate([\r\n    common_1.Get('me'),\r\n    swagger_1.ApiBearerAuth(),\r\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\r\n    __param(0, user_decorator_1.CurrentUser()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Object]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], UserController.prototype, \"me\", null);\r\n__decorate([\r\n    common_1.Get(':id'),\r\n    swagger_1.ApiBearerAuth(),\r\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\r\n    __param(0, common_1.Param('id')),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [String]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], UserController.prototype, \"getOne\", null);\r\n__decorate([\r\n    common_1.Put(':id'),\r\n    swagger_1.ApiBearerAuth(),\r\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\r\n    __param(0, common_1.Param('id')), __param(1, common_1.Body()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [String, Object]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], UserController.prototype, \"update\", null);\r\n__decorate([\r\n    common_1.Delete(':id'),\r\n    swagger_1.ApiBearerAuth(),\r\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\r\n    __param(0, common_1.Param('id')),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [String]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], UserController.prototype, \"destroy\", null);\r\nUserController = __decorate([\r\n    swagger_1.ApiUseTags('Users'),\r\n    common_1.Controller('api/rest/users'),\r\n    __metadata(\"design:paramtypes\", [user_service_1.UserService])\r\n], UserController);\r\nexports.UserController = UserController;\r\n\n\n//# sourceURL=webpack:///./src/user/user.controller.ts?");

/***/ }),

/***/ "./src/user/user.model.ts":
/*!********************************!*\
  !*** ./src/user/user.model.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst config_1 = __webpack_require__(/*! @app/config */ \"./src/app/config.ts\");\r\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\r\nconst model_1 = __webpack_require__(/*! ../shared/model */ \"./src/shared/model.ts\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nclass User extends model_1.AbstractModel {\r\n    constructor(partial) {\r\n        super(partial);\r\n    }\r\n    hashPassword() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            this.password = yield bcrypt.hash(this.password, config_1.default.SALT_ROUNDS);\r\n        });\r\n    }\r\n    comparePassword(attempt) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield bcrypt.compare(attempt, this.password);\r\n        });\r\n    }\r\n    getData() {\r\n        const { name, email, role, status } = this;\r\n        const responseObject = { name, email, role, status };\r\n        return responseObject;\r\n    }\r\n}\r\n__decorate([\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], User.prototype, \"id\", void 0);\r\n__decorate([\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], User.prototype, \"name\", void 0);\r\n__decorate([\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], User.prototype, \"email\", void 0);\r\nexports.User = User;\r\n\n\n//# sourceURL=webpack:///./src/user/user.model.ts?");

/***/ }),

/***/ "./src/user/user.module.ts":
/*!*********************************!*\
  !*** ./src/user/user.module.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\r\nconst user_model_1 = __webpack_require__(/*! ./user.model */ \"./src/user/user.model.ts\");\r\nconst user_resolver_1 = __webpack_require__(/*! ./user.resolver */ \"./src/user/user.resolver.ts\");\r\nconst user_service_1 = __webpack_require__(/*! ./user.service */ \"./src/user/user.service.ts\");\r\nconst config_1 = __webpack_require__(/*! @app/config */ \"./src/app/config.ts\");\r\nconst user_controller_1 = __webpack_require__(/*! ./user.controller */ \"./src/user/user.controller.ts\");\r\nlet imports = [];\r\nif (config_1.default.TYPEORM_CONNECTION) {\r\n    imports.push(typeorm_1.TypeOrmModule.forFeature([user_model_1.User]));\r\n}\r\nlet UserModule = class UserModule {\r\n};\r\nUserModule = __decorate([\r\n    common_1.Module({\r\n        imports,\r\n        providers: [\r\n            user_service_1.UserService,\r\n            user_resolver_1.UserResolver,\r\n        ],\r\n        controllers: [\r\n            user_controller_1.UserController,\r\n        ],\r\n        exports: [\r\n            user_service_1.UserService\r\n        ]\r\n    })\r\n], UserModule);\r\nexports.UserModule = UserModule;\r\n\n\n//# sourceURL=webpack:///./src/user/user.module.ts?");

/***/ }),

/***/ "./src/user/user.resolver.ts":
/*!***********************************!*\
  !*** ./src/user/user.resolver.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst graphql_1 = __webpack_require__(/*! @nestjs/graphql */ \"@nestjs/graphql\");\r\nconst user_service_1 = __webpack_require__(/*! ./user.service */ \"./src/user/user.service.ts\");\r\nlet UserResolver = class UserResolver {\r\n    constructor(userService) {\r\n        this.userService = userService;\r\n    }\r\n    getUsers() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.userService.getAll();\r\n        });\r\n    }\r\n};\r\n__decorate([\r\n    graphql_1.Query(),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", []),\r\n    __metadata(\"design:returntype\", Promise)\r\n], UserResolver.prototype, \"getUsers\", null);\r\nUserResolver = __decorate([\r\n    graphql_1.Resolver('User'),\r\n    __metadata(\"design:paramtypes\", [user_service_1.UserService])\r\n], UserResolver);\r\nexports.UserResolver = UserResolver;\r\n\n\n//# sourceURL=webpack:///./src/user/user.resolver.ts?");

/***/ }),

/***/ "./src/user/user.service.ts":
/*!**********************************!*\
  !*** ./src/user/user.service.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst user_model_1 = __webpack_require__(/*! ./user.model */ \"./src/user/user.model.ts\");\r\nconst database_service_1 = __webpack_require__(/*! @db/database.service */ \"./src/database/database.service.ts\");\r\nconst service_1 = __webpack_require__(/*! ../shared/service */ \"./src/shared/service.ts\");\r\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\r\nconst config_1 = __webpack_require__(/*! @app/config */ \"./src/app/config.ts\");\r\nconst auth_service_1 = __webpack_require__(/*! ../auth/auth.service */ \"./src/auth/auth.service.ts\");\r\nconst firebase_1 = __webpack_require__(/*! firebase */ \"firebase\");\r\nconst config_2 = __webpack_require__(/*! @app/config */ \"./src/app/config.ts\");\r\nlet UserService = class UserService extends service_1.AbstractService {\r\n    constructor(db, authService) {\r\n        super(db, 'users');\r\n        this.authService = authService;\r\n    }\r\n    getCollection() {\r\n        const _super = Object.create(null, {\r\n            getAll: { get: () => super.getAll }\r\n        });\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const data = yield _super.getAll.call(this);\r\n            let collection = [];\r\n            data.forEach(datum => {\r\n                collection.push(new user_model_1.User(datum).getData());\r\n            });\r\n            return collection;\r\n        });\r\n    }\r\n    getOneByProvider(provider, thirdPartyId) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const result = yield this.db.firestore\r\n                .collection('users')\r\n                .where(`integrations.${provider}.id`, '==', thirdPartyId)\r\n                .limit(1);\r\n            const users = yield result.get();\r\n            if (users.docs[0])\r\n                return new user_model_1.User(Object.assign({}, users.docs[0].data(), { id: users.docs[0].id }));\r\n            return null;\r\n        });\r\n    }\r\n    login(credentials) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const user = yield this.getOneByEmail(credentials.email);\r\n            if (!user) {\r\n                throw new common_1.UnauthorizedException('User was not found');\r\n            }\r\n            const isValid = yield bcrypt.compare(credentials.password, user.password);\r\n            if (!isValid) {\r\n                throw new common_1.NotAcceptableException('Password is incorrect. Please try again.');\r\n            }\r\n            const payload = {\r\n                id: user.id,\r\n                email: user.email\r\n            };\r\n            this.collection.doc(user.id).update({ lastLoggedIn: new Date() });\r\n            const token = yield this.authService.signPayload(payload);\r\n            const date = new Date();\r\n            date.setSeconds(date.getSeconds() + config_2.default.SESSION_EXPIRES_IN);\r\n            return { token, email: user.email, expires: date };\r\n        });\r\n    }\r\n    register(credentials) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            if (config_1.default.USE_CUSTOM_AUTHENTICATION) {\r\n                const user = yield this.create(Object.assign({}, credentials, { authType: 'CUSTOM' }));\r\n                yield user.save();\r\n                return yield this.login(credentials);\r\n            }\r\n            if (config_1.default.USE_GOOGLE_AUTHENTICATION) {\r\n                const user = yield firebase_1.auth().createUserWithEmailAndPassword(credentials.email, credentials.password);\r\n                yield this.db.firestore.collection('users').doc(user.user.uid).set({\r\n                    email: user.user.email,\r\n                    authType: 'GOOGLE'\r\n                });\r\n                return user;\r\n            }\r\n        });\r\n    }\r\n    getOneByEmail(email) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const result = yield this.db.firestore\r\n                .collection('users')\r\n                .where('email', '==', email)\r\n                .limit(1);\r\n            const users = yield result.get();\r\n            if (users.docs[0])\r\n                return new user_model_1.User(Object.assign({}, users.docs[0].data(), { id: users.docs[0].id }));\r\n            return null;\r\n        });\r\n    }\r\n    userValid(email, password) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const result = yield this.db.firestore\r\n                .collection('users')\r\n                .where('email', '==', email)\r\n                .limit(1);\r\n            const users = yield result.get();\r\n            return yield bcrypt.compare(password, users.docs[0].data().password);\r\n        });\r\n    }\r\n    create(data) {\r\n        const _super = Object.create(null, {\r\n            create: { get: () => super.create }\r\n        });\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            if (data.password)\r\n                data.password = yield bcrypt.hash(data.password, config_1.default.SALT_ROUNDS);\r\n            _super.create.call(this, data);\r\n            return this;\r\n        });\r\n    }\r\n    update(id, data) {\r\n        const _super = Object.create(null, {\r\n            update: { get: () => super.update }\r\n        });\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield _super.update.call(this, id, data);\r\n        });\r\n    }\r\n    getOneByToken(token) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const results = yield this.db.firestore.collection('users').where('token', '==', token).limit(1);\r\n            const users = yield results.get();\r\n            if (users.docs[0].data())\r\n                return new user_model_1.User(users.docs[0].data());\r\n            return undefined;\r\n        });\r\n    }\r\n};\r\nUserService = __decorate([\r\n    common_1.Injectable(),\r\n    __param(1, common_1.Inject(common_1.forwardRef(() => auth_service_1.AuthService))),\r\n    __metadata(\"design:paramtypes\", [database_service_1.DatabaseService,\r\n        auth_service_1.AuthService])\r\n], UserService);\r\nexports.UserService = UserService;\r\n\n\n//# sourceURL=webpack:///./src/user/user.service.ts?");

/***/ }),

/***/ 0:
/*!************************************************!*\
  !*** multi webpack/hot/poll?100 ./src/main.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! webpack/hot/poll?100 */\"./node_modules/webpack/hot/poll.js?100\");\nmodule.exports = __webpack_require__(/*! ./src/main.ts */\"./src/main.ts\");\n\n\n//# sourceURL=webpack:///multi_webpack/hot/poll?");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/common\");\n\n//# sourceURL=webpack:///external_%22@nestjs/common%22?");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/core\");\n\n//# sourceURL=webpack:///external_%22@nestjs/core%22?");

/***/ }),

/***/ "@nestjs/graphql":
/*!**********************************!*\
  !*** external "@nestjs/graphql" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/graphql\");\n\n//# sourceURL=webpack:///external_%22@nestjs/graphql%22?");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/jwt\");\n\n//# sourceURL=webpack:///external_%22@nestjs/jwt%22?");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/passport\");\n\n//# sourceURL=webpack:///external_%22@nestjs/passport%22?");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/swagger\");\n\n//# sourceURL=webpack:///external_%22@nestjs/swagger%22?");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/typeorm\");\n\n//# sourceURL=webpack:///external_%22@nestjs/typeorm%22?");

/***/ }),

/***/ "@nestjs/websockets":
/*!*************************************!*\
  !*** external "@nestjs/websockets" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/websockets\");\n\n//# sourceURL=webpack:///external_%22@nestjs/websockets%22?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt\");\n\n//# sourceURL=webpack:///external_%22bcrypt%22?");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"compression\");\n\n//# sourceURL=webpack:///external_%22compression%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express-rate-limit":
/*!*************************************!*\
  !*** external "express-rate-limit" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-rate-limit\");\n\n//# sourceURL=webpack:///external_%22express-rate-limit%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "firebase":
/*!***************************!*\
  !*** external "firebase" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"firebase\");\n\n//# sourceURL=webpack:///external_%22firebase%22?");

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"graphql\");\n\n//# sourceURL=webpack:///external_%22graphql%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "passport-bitbucket-oauth2":
/*!********************************************!*\
  !*** external "passport-bitbucket-oauth2" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-bitbucket-oauth2\");\n\n//# sourceURL=webpack:///external_%22passport-bitbucket-oauth2%22?");

/***/ }),

/***/ "passport-github":
/*!**********************************!*\
  !*** external "passport-github" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-github\");\n\n//# sourceURL=webpack:///external_%22passport-github%22?");

/***/ }),

/***/ "passport-google-oauth":
/*!****************************************!*\
  !*** external "passport-google-oauth" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-google-oauth\");\n\n//# sourceURL=webpack:///external_%22passport-google-oauth%22?");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-jwt\");\n\n//# sourceURL=webpack:///external_%22passport-jwt%22?");

/***/ }),

/***/ "typescript-stringcaster":
/*!******************************************!*\
  !*** external "typescript-stringcaster" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"typescript-stringcaster\");\n\n//# sourceURL=webpack:///external_%22typescript-stringcaster%22?");

/***/ })

/******/ });