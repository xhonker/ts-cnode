import { get, post } from "./index";
import { ICollect } from "@/store/interface/user";

/**
 * 获取用户基本信息
 * @param loginname 登录用户名
 */
export const getUserInfo = (loginname: string) =>
  get(`user/${loginname}`).then(data => data.data.data);

/**
 * 获取用户收藏
 * @param loginname 登录用户名
 */
export const getUserCollect = (loginname: string) =>
  get(`topic_collect/${loginname}`).then(data => data.data.data);

/**
 * 收藏
 * @param accessToken token
 * @param topic_id 主题ID
 */
export const collect = (data: ICollect) =>
  post(`topic_collect/collect`, data).then(data => data.data.success);

/**
 * 取消收藏
 * @param accessToken token
 * @param topic_id 主题ID
 */
export const deCollect = (data: ICollect) =>
  post(`topic_collect/de_collect`, data).then(data => data.data.success);

/**
 * 登录
 * @param accesstoken 用户令牌
 */
export const login = (accesstoken: string) =>
  post(`accesstoken`, { accesstoken }).then(data => data.data);

/**
 * 获取已读/未读消息
 * @param accesstoken 用户令牌
 */
export const message = (accesstoken: string) =>
  get(`messages`, { accesstoken }).then(data => {
    let { has_read_messages, hasnot_read_messages } = data.data.data;
    return hasnot_read_messages.concat(has_read_messages);
  });

/**
 * 标记全部未读为已读
 *
 */
export const markALlMessage = () =>
  post("message/mark_all").then(data => data.data);
