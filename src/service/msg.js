import {$} from "./axios";
import {__helperUrl} from '@jx3box/jx3box-common/js/jx3box.json'
const API = __helperUrl + 'api/messages';
const qs = require('qs');

function getMsgs(i = 1) {
    return $.get(API, {
        headers: {Accept: 'application/prs.helper.v2+json'},
        params: {
            // length : 2,
            page: i
        }
    })
}

function readMsg(ids) {
    return $.put(`${API}/read`, qs.stringify({
        ids: ids
    }), {
        headers: {Accept: 'application/prs.helper.v2+json'},
    })
}

function removeMsg(ids) {
    return $.put(`${API}/remove`, qs.stringify({
        ids: ids
    }), {
        headers: {Accept: 'application/prs.helper.v2+json'},
    })
}

export {getMsgs, readMsg, removeMsg}
