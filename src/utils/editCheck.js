// for url like   ?edit=1
function editCheck() {
    if (location.search.indexOf("edit") >= 0) {
        let _ = new URLSearchParams(location.search);
        return _.get("edit");
    }
    return "";
}

export { editCheck };
