import React from 'react';
import { useJobs } from '../contexts/JobsContext';
import JobList from '../components/JobList';
import Spinner from '../components/Spinner'; // Make sure this is properly imported

const AppliedToPage: React.FC = () => {
    const { jobs, loading, error } = useJobs();

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <div>
                <h1>Applied To Jobs</h1>
                <div>Failed to load jobs. Please try again later or contact support.</div>
                {/* Optionally, suggest reloading or checking network if the error might be temporary or network-related */}
            </div>
        );
    }

    const appliedJobs = jobs.filter(job => job.appliedDate);

    return (
        <div>
            <h1>Applied To Jobs</h1>
            {appliedJobs.length > 0 ? (
                <JobList jobs={appliedJobs} listType="applied" />
            ) : (
                <div>
                    <p>You have not applied to any jobs yet.</p>
                    <a href="/jobs">Browse available jobs</a>  // Encourage user action if they haven't applied yet
                </div>
            )}
        </div>
    );
};

export default AppliedToPage;
