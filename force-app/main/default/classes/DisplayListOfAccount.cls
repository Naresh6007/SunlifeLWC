public class DisplayListOfAccount {
@AuraEnabled
    
    public static list<Account> getAccountList(String nameField){
        List<Account> accList = new list<account>();
        if(String.isNotEmpty(nameField))
        {
            String likeValue = '%' +nameField +'%';
            accList= [select id,Name,Owner_Name__c,Phone,Website, AnnualRevenue from Account where Industry =: 'Financial Services' and name LIKE : likeValue];
        
        }
        else
        {
           accList= [select id,Name,Owner_Name__c,Phone,Website, AnnualRevenue from Account where Industry =: 'Financial Services'];
        }
        if(accList != null && accList.size()>0){
  return accList;
        }
        else{return null;}
    }
    
    @AuraEnabled    
    public static boolean updateAccts( List < Account > updatedAccountList ) {    
            
        try {  
          
            update updatedAccountList;  
            return true;  
              
        } catch(Exception e) {  
          
            return false;  
              
        }  
            
    }    
}