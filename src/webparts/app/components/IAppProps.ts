import { HttpClient } from "@microsoft/sp-http";

export interface IAppProps {
  description: string;
  httpClient: HttpClient;
}
