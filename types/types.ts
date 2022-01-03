export interface Card_Props {
  author: string;
  content: string;
  subtitle: string;
  createdAt: string;
  likes: number;
  link: string;
  title: string;
  _id: string | number;
}

export type stringOrNumber = string | number;

export type DataResponse = {
  ok: boolean;
  message: string;
  data: unknown;
};

export interface PropIcons {
  color?: string;
  size?: string;
  width?: string | number;
  height?: string | number;
  transition?: string;
}