import { get, post } from "./index";
import { CreateTopic, CommentInfo } from "@/store/interface/topics";
/**
 * 获取话题列表
 * @param tab 默认ALL
 * @param page 默认第一页
 * @param limit 默认20
 */
export const getTopics = (tab = "all", page = 1, limit = 10) =>
  get("topics", { tab, page, limit }).then(data => data.data.data);

/**
 * 获取话题详情
 * @param data
 */
export const getTopicDetails = (topic: string) =>
  get(`topic/${topic}`).then(data => data.data.data);
/**
 * 新建话题
 * @param data
 */
export const createTopic = (data: CreateTopic) =>
  post(`topics`, data).then(data => data.data);

/**
 * 评论
 * @param topic 话题ID
 */
export const API_replies = ({ content, topic_id }: CommentInfo) =>
  post(`topic/${topic_id}/replies`, { content }).then(data => data.data);
