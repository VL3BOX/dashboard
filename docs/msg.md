## 消息格式

type : 主题标识(boxcoin)
subtype : 主题标识+功能(boxcoin_admin/user)
source_type : 应用标识(macro)
source_id : 应用唯一编号($macro_id)

根据source_type与source_id决定附加链接
根据type和subtype来决定内部应用独立域下的消息筛选（例如team下包含的org等）