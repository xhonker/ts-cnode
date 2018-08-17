import { author } from "./base";
import { topic } from "./topics";

export interface userState extends ILogin {
  scroll: number;
  tab: userTab;
  user?: Array<user>;
  message: Array<IMessage>;
}

export interface user {
  loginname: string;
  avatar_url: string;
  githubUsername: string;
  create_at: string;
  score: number;
  recent_topics: Array<recent>;
  recent_replies: Array<recent>;
  collect?: Array<topic>;
}

export interface recent {
  id: string;
  author: author;
  title: string;
  last_reply_at: string;
}

export type userTab = "topics" | "replies" | "collect";

export interface ICollect {
  accesstoken: string;
  topic_id: string;
}

export interface ILogin {
  success?: boolean;
  accessToken: string;
  localToken: string;
  loginname: string;
  avatar_url: string;
  id: string;
  message: Array<IMessage>;
}

export interface IMessage {
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
