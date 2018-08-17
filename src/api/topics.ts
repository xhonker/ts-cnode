import { get, post } from "./index";
import { detailsArg, ICreateTopic, IReplies } from "@/store/interface/topics";
/**
 * 获取话题列表 默认ALL
 * @param tab
 * @param page
 * @param limit
 */
export const getTopics = (tab = "all", page = 1, limit = 20) =>
  get("topics", { tab, page, limit }).then(data => data.data.data);

/**
 * 获取话题详情
 * @param data
 */
export const getTopicDetails = (data: detailsArg) =>
  get(`topic/${data.topic}`).then(data => data.data.data);
/**
 * 新建话题
 * @param data
 */
export const createTopic = (data: ICreateTopic) =>
  post(`topics`, data).then(data => data.data);

/**
 * 评论
 * @param topic 话题ID
 */
export const API_replies = (data: IReplies) =>
  post(`topic/${data.topic_id}/replies`, { content: data.content }).then(
    data => data.data
  );
