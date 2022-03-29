import { $next } from "@jx3box/jx3box-common/js/https";
function getMyFavs(params) {
    return $next()
        .get(`/api/article/favorites/my`, {
            params,
        })
        .then((res) => {
            return res.data.data;
        });
}

function delFav(id) {
    return $next().delete(`api/article/favorites/my/${id}`);
}

export { getMyFavs, delFav };
