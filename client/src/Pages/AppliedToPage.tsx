// AppliedToPage.tsx
import React from 'react';
import { useJobs } from '../contexts/JobsContext';
import JobList from '../components/JobList';
import Spinner from '../components/Spinner';

const AppliedToPage: React.FC = () => {
    const { jobs, loading, error, removeJob, updateJobStatus } = useJobs();

    if (loading) return <Spinner />;
    if (error) return <div>Error loading jobs: {error}</div>;

    const appliedJobs = jobs.filter(job => job.appliedDate);

    return (
        <div>
            <h1>Applied To Jobs</h1>
            {appliedJobs.length > 0 ? (
                <JobList
                    jobs={appliedJobs}
                    onSave={() => {}}
                    onShare={() => {}}
                    onRemove={removeJob}
                    onUpdateStatus={updateJobStatus}
                />
            ) : (
                <p>You have not applied to any jobs yet.</p>
            )}
        </div>
    );
};

export default AppliedToPage;