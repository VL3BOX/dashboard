const { User } = require("@jx3box/jx3box-common");

export default function(){
    if(location.hostname != 'localhost'){
        if(!User.isLogin()){
            User.destroy()
            User.toLogin()
        }
    }
}