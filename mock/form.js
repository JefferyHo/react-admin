import Mock from 'mockjs';
import { delay } from 'roadhog-api-doc';

const wrapResult = (res, code, data) => {
    let msg, result;
    switch (code) {
        case 400: msg = 'bad request'; break;
        case 401: msg = 'unauthorized'; break;
        case 403: msg = 'forbidden'; break;
        case 404: msg = 'not found'; break;
        case 405: msg = 'method not allowed'; break;
        case 408: msg = 'request timeout'; break;
        case 500: msg = 'internal server error'; break;
        case 503: msg = 'service unavaliable'; break;
        case 200: 
        default: msg = 'success';
    }
    res.send({
        status: code,
        msg,
        result: code === 200 ? data : []
    });
}

const getFormList = (req, res) => {
    const mockData = Mock.mock({
      'result|5-10': [{
        'label': '@cword(3, 5)',
        'field': '@word(4, 6)',
        'type|1': ['input', 'password'],
        'placeholder': '@csentence()'
      }]
    })["result"];
    wrapResult(res, 200, mockData);
} 

const proxy = {
    'GET /api/formList': getFormList
}

export default delay(proxy, 1000);