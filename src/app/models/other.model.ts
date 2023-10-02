
export interface MessagesModel {
  level?: string;
  content?: string;
}
export interface ResponseEntityModel<T> {
  messages?: MessagesModel[];
  data: T[];
}
