/**
 * error code defines.
 */
function Errors() {
}
Errors.Success = 0;
// errors >= 10000 are ui errors.
Errors.UIApiError = 10000;
Errors.UIUnAuthoriezed = 10001;
Errors.UINotFound = 10002;
// resolve error code
Errors.resolve = function(code, status, desc) {
    var err_map = {
        100: '没有达到api要求的参数个数，请检查参数',
        101: 'api要求参数必须指定，请检查参数',
        102: 'api要求参数为非null，请检查参数',
        103: 'api要求参数为非空，请检查参数',
        104: 'api要求参数的类型为bool，请检查参数',
        105: 'api要求参数的类型为数组，请检查参数',
        106: 'api要求参数的类型为int，请检查参数'
    };
    err_map[Errors.UIUnAuthoriezed] = "您没有登录或者登录超时，请重新登录";
    err_map[Errors.UINotFound] = "访问的资源不存在";
    err_map[Errors.UIApiError] = "服务器错误";
    err_map[Errors.DomainUserNotExists] = " 指定的用户不存在或密码错误";

    var msg = "";

    // always parse the code.
    if (err_map[code]) {
        msg += err_map[code];
    } else {
        msg += "未知错误";
    }

    // show status code when http unknown error.
    if (code == Errors.UIApiError) {
        msg += "，HTTP：" + status;
    }

    // hide the detail when http known error.
    if (code <= Errors.UIApiError && desc) {
        msg += "，原因：" + desc;
    }

    return msg;
};

/**
 * global error function for backend.
 * @param code the error code, from backend or js error code.
 * @param status http status code, if code is http unknown error, show it.
 * @param desc the description of error from backend, or http error data.
 */
function bc_on_error(code, status, desc) {
    // we parse the http error to system error code.
    var http_known_error = {
        401: Errors.UIUnAuthoriezed,
        404: Errors.UINotFound
    };
    if (code == Errors.UIApiError && http_known_error[status]) {
        code = http_known_error[status];
    }

    // process the system error.
    if (code == Errors.UIUnAuthoriezed) {
        alert("请登录");
        //提供url path
        var url = get_user_login_page();
        window.location.href = url;
        return code;
    }

    // show error message to log. ignore errors:
    // 406: user test, has not login yet.
    if (code != 406) {
        logs.warn(code, Errors.resolve(code, status, desc));
    }

    return code;
}
