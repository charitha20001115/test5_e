// sap.ui.define(['sap/ui/core/mvc/ControllerExtension',"sap/ui/model/Filter", 'sap/ui/model/FilterOperator'], function (Controller,filter,FilterOperator) {
// 	'use strict';
// 	debugger
// return Controller.extend("sap.ui.comp.sample.filterbar.DynamicPageListReport.DynamicPageListReport", {

// })

// });

//--------- p-------------
sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('gobutton.ext.controller.ListReportExtension', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf listpage.ext.controller.Objectpagecontroller
             */
			onInit: function () {
		      debugger
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				// var oController = this.base;
				// var oView = oController.getView();
				// var oButton = oView.byId('fragbutton');
	
				// if (oButton) {
				// 	oButton.attachPress(function() {
				// 		// Custom logic when the button is clicked
				// 		console.log('Button Clicked!');
				// 	});
				// }
				var oModel = this.base.getExtensionAPI().getModel();  // getModal error 
				// debugger

				// this.editFlow.attachEvent("edit", this.onEdit, this);
			},
			editFlow:{ 
				
				onBeforeEdit:function(oEvent){   //working
					debugger
					var oData = this.getView().getBindingContext().getObject();

					if(!oData || !oData.sname || oData.sname !=="suga"){
						sap.m.MessageBox.show("suga required");
						oEvent.PreventDefault();
					} 
				},

				onBeforeSave: function () {  // working
                    debugger
                    var oData1 = this.getView().getBindingContext().getObject();
					var sMissingFields = "";
                
                    // Check if the required fields are filled in before saving
                    if (!oData1 || !oData1.sid || !oData1.sname) {
                        // Show a message indicating that creation is not allowed due to missing data

						if(!oData1.sname){
							sMissingFields += "Name,";
						}

						sMissingFields = sMissingFields.slice(0,-1);
                        sap.m.MessageToast.show("Please fill in all required fields before saving." + sMissingFields);
                        oEvent.preventDefault();
                    }

					if (oData1.sname.length < 3) {
						// Show a message indicating that the phone number must be exactly 10 digits
						sap.m.MessageToast.show("atleast three characters.");
						oEvent.preventDefault();
						return;
					}
                
                    // All required fields are filled in, proceed with the save operation

					
                    
                },

				onAfterSave: function () {  //working
					debugger
                    // Perform actions after the save operation is successful
                    console.log("Save operation successful");
                
                    // Show a success message to the user
                    sap.m.MessageToast.show("Save operation successful");
                
                    // Perform additional logic such as refreshing the data or updating UI elements
                    this.refreshData(); // Example function to refresh data
                    this.updateUI();    // Example function to update UI elements
                },

				// onBeforeCreate: function(){
                //     debugger
				// 	var oData = this.getView().getBindingContext().getObject();
				// 	if(oData.sid == " "){
				// 		sap.m.MessageToast.show("fill the field");
                //         oEvent.preventDefault();
				// 	}

				// },

				onBeforeDelete: function(){
					// debugger
                    var oData1 = this.getView().getBindingContext().getObject();
					console.log("ok");
                    if(oData1.sname == "suga"){
                        sap.m.MessageToast.show("don't delete");
                        oEvent.preventDefault();
                        
					}
					sap.m.MessageToast.show(" deleted ");

				},

				onAfterDelete: function(){
					debugger 
					var oData = this.getView().getBindingContext().getObject();

				}



				// onBeforeCreate: function () {   //not working
				// 	debugger;
	            //  var oData = this.getView().getBindingContext().getObject();

				// 	if(!oData || !oData.sname || oData.sname !=="suga"){
				// 		sap.m.MessageBox.show("suga required");
				// 		oEvent.PreventDefault();
				// 		// MessageBox.error("suga required");
				// 		// MessageBox.alert("not editabel");
				// 	}
				// 	// console.log("Debugging onCreateBefore");
                //     // // Access the extensionAPI to get the current context
                //     // var oContext = this.base.getExtensionAPI().getContext();

                //     // // Access the data of the current context
                //     // var oData = oContext.getObject();

                //     // // Perform validation or any other pre-create operations
                //     // if (!oData || !oData.sid || oData.sid === "") {
                //     //     // Cancel the create operation if the Name field is empty
                //     //     throw new Error("Name field is required");
                //     // }

                //     // // Optionally, you can also modify the data before creating
                //     // oData.CreatedBy = "John Doe";

                //     // // Update the context data with the modified data
                //     // oContext.getObject(oData);

                //     // // Optionally, you can also perform other actions or logics here
                //     // console.log("Before create operation: Data validated and modified.");
                // },

			
			}
		}
	});
});

//---------p--------------

//-----------------------------------------------------------------------
// sap.ui.define([
// 	'sap/ui/core/mvc/Controller',
// 	'sap/ui/model/json/JSONModel',
// 	'sap/m/Label',
// 	'sap/ui/model/Filter',
// 	'sap/ui/model/FilterOperator',
// 	'sap/ui/comp/smartvariants/PersonalizableInfo'
// ], function(Controller, JSONModel, Label, Filter, FilterOperator, PersonalizableInfo) {
// 	"use strict";
// // debugger
// 	return Controller.extend("sap.ui.comp.sample.filterbar.DynamicPageListReport.DynamicPageListReport", {
// 		onInit: function() {
// 			this.oModel = new JSONModel();
// 			this.oModel.loadData(sap.ui.require.toUrl("sap/ui/comp/sample/filterbar/DynamicPageListReport/model.json"), null, false);
// 			this.getView().setModel(this.oModel);

// 			this.applyData = this.applyData.bind(this);
// 			this.fetchData = this.fetchData.bind(this);
// 			this.getFiltersWithValues = this.getFiltersWithValues.bind(this);

// 			this.oSmartVariantManagement = this.getView().byId("svm");
// 			this.oExpandedLabel = this.getView().byId("expandedLabel");
// 			this.oSnappedLabel = this.getView().byId("snappedLabel");
// 			this.oFilterBar = this.getView().byId("filterbar");
// 			this.oTable = this.getView().byId("table");

// 			this.oFilterBar.registerFetchData(this.fetchData);
// 			this.oFilterBar.registerApplyData(this.applyData);
// 			this.oFilterBar.registerGetFiltersWithValues(this.getFiltersWithValues);

// 			var oPersInfo = new PersonalizableInfo({
// 				type: "filterBar",
// 				keyName: "persistencyKey",
// 				dataSource: "",
// 				control: this.oFilterBar
// 			});
// 			this.oSmartVariantManagement.addPersonalizableControl(oPersInfo);
// 			this.oSmartVariantManagement.initialise(function () {}, this.oFilterBar);
// 		},

// 		onExit: function() {
// 			this.oModel = null;
// 			this.oSmartVariantManagement = null;
// 			this.oExpandedLabel = null;
// 			this.oSnappedLabel = null;
// 			this.oFilterBar = null;
// 			this.oTable = null;
// 		},

// 		fetchData: function () {
// 			var aData = this.oFilterBar.getAllFilterItems().reduce(function (aResult, oFilterItem) {
// 				aResult.push({
// 					groupName: oFilterItem.getGroupName(),
// 					fieldName: oFilterItem.getName(),
// 					fieldData: oFilterItem.getControl().getSelectedKeys()
// 				});

// 				return aResult;
// 			}, []);

// 			return aData;
// 		},

// 		applyData: function (aData) {
// 			aData.forEach(function (oDataObject) {
// 				var oControl = this.oFilterBar.determineControlByName(oDataObject.fieldName, oDataObject.groupName);
// 				oControl.setSelectedKeys(oDataObject.fieldData);
// 			}, this);
// 		},

// 		getFiltersWithValues: function () {
// 			var aFiltersWithValue = this.oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
// 				var oControl = oFilterGroupItem.getControl();

// 				if (oControl && oControl.getSelectedKeys && oControl.getSelectedKeys().length > 0) {
// 					aResult.push(oFilterGroupItem);
// 				}

// 				return aResult;
// 			}, []);

// 			return aFiltersWithValue;
// 		},

// 		onSelectionChange: function (oEvent) {
// 			this.oSmartVariantManagement.currentVariantSetModified(true);
// 			this.oFilterBar.fireFilterChange(oEvent);
// 		},

// 		onSearch: function () {
// 			var aTableFilters = this.oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
// 				var oControl = oFilterGroupItem.getControl(),
// 					aSelectedKeys = oControl.getSelectedKeys(),
// 					aFilters = aSelectedKeys.map(function (sSelectedKey) {
// 						return new Filter({
// 							path: oFilterGroupItem.getName(),
// 							operator: FilterOperator.Contains,
// 							value1: sSelectedKey
// 						});
// 					});

// 				if (aSelectedKeys.length > 0) {
// 					aResult.push(new Filter({
// 						filters: aFilters,
// 						and: false
// 					}));
// 				}

// 				return aResult;
// 			}, []);

// 			this.oTable.getBinding("items").filter(aTableFilters);
// 			this.oTable.setShowOverlay(false);
// 		},

// 		onFilterChange: function () {
// 			this._updateLabelsAndTable();
// 		},

// 		onAfterVariantLoad: function () {
// 			this._updateLabelsAndTable();
// 		},

// 		getFormattedSummaryText: function() {
// 			var aFiltersWithValues = this.oFilterBar.retrieveFiltersWithValues();

// 			if (aFiltersWithValues.length === 0) {
// 				return "No filters active";
// 			}

// 			if (aFiltersWithValues.length === 1) {
// 				return aFiltersWithValues.length + " filter active: " + aFiltersWithValues.join(", ");
// 			}

// 			return aFiltersWithValues.length + " filters active: " + aFiltersWithValues.join(", ");
// 		},

// 		getFormattedSummaryTextExpanded: function() {
// 			var aFiltersWithValues = this.oFilterBar.retrieveFiltersWithValues();

// 			if (aFiltersWithValues.length === 0) {
// 				return "No filters active";
// 			}

// 			var sText = aFiltersWithValues.length + " filters active",
// 				aNonVisibleFiltersWithValues = this.oFilterBar.retrieveNonVisibleFiltersWithValues();

// 			if (aFiltersWithValues.length === 1) {
// 				sText = aFiltersWithValues.length + " filter active";
// 			}

// 			if (aNonVisibleFiltersWithValues && aNonVisibleFiltersWithValues.length > 0) {
// 				sText += " (" + aNonVisibleFiltersWithValues.length + " hidden)";
// 			}

// 			return sText;
// 		},

// 		_updateLabelsAndTable: function () {
// 			this.oExpandedLabel.setText(this.getFormattedSummaryTextExpanded());
// 			this.oSnappedLabel.setText(this.getFormattedSummaryText());
// 			this.oTable.setShowOverlay(true);
// 		}
// 	});
// });

//-----------------------------------------------------------------------


// sap.ui.define(["sap/ui/core/mvc/controllerExtension","sap/ui/model/Filter", "sap/m/MessageBox"],function(controllerExtension,Filter, MessageBox){
// 	return controllerExtension.extend("gobutton.ext.controller.ListReportExtension",{
// 		override: {
// 			onViewNeedsRefresh: function(mParameters, next) {
// 				var filter = mParameters.filterConditions;
// 				if(filter){
// 					if(Object.keys(filter).length === 0){
// 						MessageBox.error("Please select at least one filter");
// 						return;
// 					}
// 				}
// 				return next();
// 			},
// 			onInit: function () {
// 				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
// 				var oModel = this.base.getExtensionAPI().getModel();
// 			}

// 		}

// 	})
// })  