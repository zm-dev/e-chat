const DATE_RANGE_STATUS = {
  /**
   * 全部
   */
  ALL: 0,

  /**
   * 生效中
   */
  ONGOING: 1,

  /**
   * 已经过期
   */
  EXPIRED: 2,

  /**
   * 未开始
   */
  NOT_STARTED: 3,
};

const JWT_TOKEN_KEY = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
};
export { DATE_RANGE_STATUS, JWT_TOKEN_KEY };
