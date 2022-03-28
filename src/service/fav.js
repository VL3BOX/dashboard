import { $next } from "@jx3box/jx3box-common/js/https";
import qs from "qs";
const $n = $next();
function getMyFavs(params) {
	return $n
		.get(`/api/article/favorites/my`, {
			params,
		})
		.then((res) => {
			return res.data.data;
		});
}

function delFav(id) {
	return $n.delete(`api/article/favorites/my/${id}`);
}

export { getMyFavs, delFav };
