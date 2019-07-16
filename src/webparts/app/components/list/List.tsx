import * as React from 'react';
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import ISession from '../../interfaces/ISession';
import SessionItem from '../session/SessionItem';

export interface ISessionListProps {
    sessionItems: ISession[];
    handleDelete: any;
}

export default class List extends React.Component<ISessionListProps, {}> {
    
    constructor(props: ISessionListProps) {
        super(props);
    }

    public render(): React.ReactElement<ISessionListProps> {
        return (
            <div>
                <ul>
                    {this.props.sessionItems != null ?
                        this.props.sessionItems.map(item => {
                            return (<SessionItem sessionItem={item} onDeleteItem={this.props.handleDelete}></SessionItem>);
                        }
                        )
                        : <Spinner size={SpinnerSize.medium} />}
                </ul>
            </div>
        );
    }
}