// @flow
import React, { Component } from 'react';
import { Text, List } from 'react-native-paper';
import type { Job } from '../../models/job.model'
type Props = {
    jobs: Job[],
}
export class JobList extends Component<Props> {
    
    constructor(props: Props) {
        super(props);
    }

    renderPositionsText = (props, job) => {
        if(job.totalPositions <= job.participationSet.length) return;
        return <Text {...props}>Positions: {job.totalPositions}/{job.participationSet.length}</Text>;
    }
    
    renderIcon = (props, job) => {
        const icon = job.totalPositions <= job.participationSet.length ? 'check' : 'work'
        return <List.Icon {...props} icon={icon} />;
    }

    render() {
      return (
        <List.Section>
            {
                this.props.jobs.map(job => {
                    return <List.Item 
                        key={job.id} 
                        title={job.name} 
                        description={job.description} 
                        left={props => this.renderIcon(props, job)}
                        right={props => this.renderPositionsText(props, job)}

                        />
                })
            }
        </List.Section>
      )
    }
}