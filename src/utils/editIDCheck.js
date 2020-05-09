// for url like   ?edit=1
function editIDCheck() {
    if(location.href.indexOf('?') > 0){
        try{
            return location.href.slice(location.href.indexOf('?') + 1).split('&')[0].split('=')[1]
        }catch{
            return false
        }
    }else{
        return false
    }
}

export { editIDCheck };
