import { axios as $ } from "./axios";
import {__helperUrl} from '@jx3box/jx3box-common/js/jx3box.json'
const API = __helperUrl + 'api/messages'

function getMsgs(i=1) {
    return $.get(API,{
        headers : {
            Accept : 'application/prs.helper.v2+json'
        },
        withCredentials: true,
        params : {
            // length : 2,
            page :i
        }
    })

}
export { getMsgs }
