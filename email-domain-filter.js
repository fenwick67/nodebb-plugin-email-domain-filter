const emailDomain = process.env.EMAIL_DOMAIN_FILTER||'@gmail.com';

var Plugin = {
    filterEmailRegister: function(regData,next) {
        if(regData && regData.userData && regData.userData.email){
            if ( emailDomainCheck(regData.userData.email) ){
             return next(null,regData);  
            }
        }
        return next( new Error('Bad email address: you must register with a "'+emailDomain+'" email address.') );
    },
    filterEmailUpdate: function(data,next){
        if(data){
            if ( emailDomainCheck(data.email) ){
             return next(null,data);  
            }
        }
        return next( new Error('Bad email address: email addresses must end with "'+emailDomain+'" .') );
    }
}

module.exports = Plugin;
    
function emailDomainCheck(e){
    if (e == null || e.toString().toLowerCase().indexOf(emailDomain) >= 0){
        return true;
    }
    return false;
}
