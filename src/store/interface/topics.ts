import { author } from "./base";
export interface TabsInfo {
  id: string;
  value: string;
}
export interface TopicsState {
  topics: Array<TopicInfo>;
  currentTab: string;
  tabbar: string;
  openTopics: Array<TopicDetails>;
  topicsScroll: number;
}

export interface TopicInfo {
  id: string;
  author_id: string;
  tab: string;
  content: string;
  title: string;
  last_reply_at: string;
  good: boolean;
  top: boolean;
  reply_count: number;
  visit_count: number;
  create_at: string;
  author: author;
}

export interface TopicDetails extends TopicInfo {
  replies: Array<comment>;
  is_collect: boolean;
  scroll: number;
}

export interface comment {
  id: string;
  author: author;
  content: string;
  ups: Array<string>;
  create_at: string;
  reply_id: string;
  is_uped: boolean;
  is_author?: boolean;
}

export interface TopicScroll {
  id: string;
  scroll: number;
}

export interface ChangeCollect {
  result: boolean;
  topic: string;
}

export interface CreateTopic {
  accesstoken: string;
  title: string;
  tab: TopicTab;
  content: string;
}

export type TopicTab = "job" | "share" | "ask" | "dev";

export interface CommentInfo {
  content: string;
  topic_id: string;
}
