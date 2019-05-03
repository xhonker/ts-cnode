import { author } from "./base";
import { TopicInfo } from "./topics";

export interface UserState extends LoginInfo {
  scroll: number;
  tab: UserTab;
  users?: Array<UserInfo>;
  message: Array<MessageInfo>;
}

export interface UserInfo {
  loginname: string;
  avatar_url: string;
  githubUsername: string;
  create_at: string;
  score: number;
  recent_topics: Array<RecentInfo>;
  recent_replies: Array<RecentInfo>;
  collect?: Array<TopicInfo>;
}

export interface RecentInfo {
  id: string;
  author: author;
  title: string;
  last_reply_at: string;
}

export type UserTab = "topics" | "replies" | "collect";

export interface CollectInfo {
  accesstoken: string;
  topic_id: string;
}

export interface LoginInfo {
  success?: boolean;
  accessToken: string;
  loginname: string;
  avatar_url: string;
  id: string;
  message: Array<MessageInfo>;
}

export interface MessageInfo {
  id: string;
  type: string;
  has_read: boolean;
  author: author;
  topic: {
    id: string;
    title: string;
    last_reply_at: string;
  };
  reply: {
    id: string;
    content: string;
    ups: Array<string>;
    create_at: string;
  };
  create_at: string;
}
