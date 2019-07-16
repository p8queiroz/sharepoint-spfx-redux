

import * as React from 'react';
import { IAppProps } from './IAppProps';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './App.module.scss';
import { HttpClientResponse, HttpClient } from '@microsoft/sp-http';
import ISession from '../interfaces/ISession';
import List from './list/List';
import { autobind } from 'office-ui-fabric-react';
import Form from './form/Form';

export interface IAppWpState {
  sessionItems?: ISession[];
}

export default class App extends React.Component<IAppProps, IAppWpState> {

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      sessionItems: null
    };
  }

  public componentDidMount(): void {
    this._retrieveItems();
  }

  public render(): React.ReactElement<IAppProps> {
    return (
      <div className={styles.app}>
        <div className="ms-Grid-row">
          <h1>Session list SPS Doha - demo</h1>
        </div>
        <div className="ms-Grid-row">
          <List
            sessionItems={this.state.sessionItems}
            handleDelete={this._deleteItem}
          />
        </div>
        <div className="ms-Grid-row">
          <Form handleAddItem={this._addItem} />
        </div>
      </div>
    );
  }

  @autobind
  private async _retrieveItems() {
    this.props.httpClient.get("https://spsdohaapi.azurewebsites.net/api/values", HttpClient.configurations.v1)
      .then((data: HttpClientResponse) => data.json())
      .then((data: any) => {
        this.setState({
          sessionItems: data
        });
      });
  }

  @autobind
  private _addItem(session: ISession) {
    var sessionItems = this.state.sessionItems;
    sessionItems.push(session);
    this.setState({ sessionItems: sessionItems });
  }

  @autobind
  private _deleteItem(session: ISession) {
    this.setState(prevState => ({
      sessionItems: prevState.sessionItems.filter(el => el.title != session.title && el.speaker != session.title)
    }));
  }
}
