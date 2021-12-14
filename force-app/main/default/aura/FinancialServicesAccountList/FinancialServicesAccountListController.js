({
    doInit : function(component, event, helper) {
        component.set('v.columns', [
            {label: 'Account Name', fieldName:'Name',sortable:true,type:'text',type: 'url',editable:'true', initialWidth: 300},
            {label: 'Account Owner', fieldName:'Owner_Name__c',sortable:true,type:'text', editable:'true', initialWidth: 400},
            {label: 'Phone', fieldName:'Phone',sortable:true,type:'text', editable:'true', initialWidth: 300},
            {label: 'Website', fieldName:'Website',sortable:true,type:'text', editable:'true', initialWidth: 400},
            {label: 'Annual Revenue', fieldName:'AnnualRevenue',sortable:true,type:'text', editable:'true', initialWidth: 400}
        ]);
        helper.getAccounts(component, helper);
    },
    updateSorting: function (cmp, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        cmp.set("v.sortedBy", fieldName);
        cmp.set("v.sortedDirection", sortDirection);
        helper.sortData(cmp, fieldName, sortDirection);
    },
    onSave : function( component, event, helper ) {   
          
        var updatedRecords = component.find( "acctTable" ).get( "v.draftValues" );  
        var action = component.get( "c.updateAccts" );  
        action.setParams({  
              
            'updatedAccountList' : updatedRecords  
              
        });  
        action.setCallback( this, function( response ) {  
              
            var state = response.getState();   
            if ( state === "SUCCESS" ) {  
  
                if ( response.getReturnValue() === true ) {  
                      
                    helper.toastMsg( 'success', 'Records Saved Successfully.' );  
                    component.find( "acctTable" ).set( "v.draftValues", null );  
                      
                } else {   
                      
                    helper.toastMsg( 'error', 'Something went wrong. Contact your system administrator.' );  
                      
                }  
                  
            } else {  
                  
                helper.toastMsg( 'error', 'Something went wrong. Contact your system administrator.' );  
                  
            }  
              
        });  
        $A.enqueueAction( action );  
          
    }  
    
})