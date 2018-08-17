import { author } from "./base";
export interface tabs {
  id: string;
  value: string;
}
export interface State {
  topics: Array<topic>;
  currentTab: string;
  tabbar: string;
  topicTabs: Array<tabs>;
  tabbars: Array<tabs>;
  openTopics: Array<topicDetails>;
  topicsScroll: number;
}

export interface topic {
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

export interface topicDetails extends topic {
  replies: Array<replies>;
  is_collect: boolean;
  scroll: number;
}

export interface replies {
  id: string;
  author: author;
  content: string;
  ups: Array<string>;
  create_at: string;
  reply_id: string;
  is_uped: boolean;
  is_author?: boolean;
}

export interface topicScroll {
  id: string;
  scroll: number;
}

export interface detailsArg {
  topic: string;
}

export interface changeCollect {
  result: boolean;
  topic: string;
}

export interface ICreateTopic {
  accesstoken: string;
  title: string;
  tab: topicTab;
  content: string;
}

export type topicTab = "job" | "share" | "ask" | "dev";

export interface IReplies {
  content: string;
  topic_id: string;
}
