import React, { Component } from 'react'
import JobsApplied from './JobsApplied/JobsApplied'
import SelectedInterview from './SelectedInterview/SelectedInterview'
import { } from './Sidebar.css'

export default class Sidebar extends Component {
    render() {
        return (
            <>
                <div className="sidebar container-fluid p-1 d-none d-md-block">
                    <JobsApplied />
                    <SelectedInterview />
                </div>
            </>
        )
    }
}
