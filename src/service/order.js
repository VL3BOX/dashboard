import { $_pay } from "./axios"; 

function getOrderslist() {
    return $_pay.get("/api/order/list");
}

export { getOrderslist }
