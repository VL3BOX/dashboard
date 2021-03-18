export default function (url){
    if(process.env == 'production'){
        return '/dashboard/' + url
    }else{
        return './' + url
    }
}