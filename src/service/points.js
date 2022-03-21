import { $pay } from "@jx3box/jx3box-common/js/https";

function getPointsHistory(params) {
	return $pay()
		.get(`/api/my/points/history`, {
			params,
		})
		.then((res) => {
			return res.data.data;
		});
}

export { getPointsHistory };
