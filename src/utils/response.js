/**
 * 成功的返回信息格式
 * @param {Context}  ctx
 * @param { * } data 返回的数据
 * @param { string }  msg 提示信息
 * @param { number } code 状态码
 */
function success(data = [], msg = 'success', code = 200) {
  return {
    code,
    msg,
    data,
  };
}

/**
 * 错误的返回信息格式
 * @param {Context}  ctx
 * @param { string }  msg 错误提示信息
 * @param { * } data 扩展提示
 * @param { number } code 状态码
 */
function error(msg = 'error', data = [], code = 400) {
  return {
    code,
    msg,
    data,
  };
}

module.exports = {
  success,
  error,
};
