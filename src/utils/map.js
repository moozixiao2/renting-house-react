/**
 * 获取当前城市信息
 */
export const getLocalCity = () => {
    return new Promise((resolve, reject) => {
      var myCity = new window.BMap.LocalCity();
      myCity.get(function (result) {
        resolve(result);
      });
    })
  }