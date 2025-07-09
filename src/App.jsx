import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import WorkflowBuilder from './components/WorkflowBuilder';
import GoogleSheetsManager from './components/GoogleSheetsManager';
import EmailPreview from './components/EmailPreview';
import SubmissionTracker from './components/SubmissionTracker';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [workflowData, setWorkflowData] = useState({
    contacts: [
      { name: 'Riya', email: 'riya@example.com', company: 'Alpha Inc.', customMessage: "Here's your onboarding doc." },
      { name: 'Aarav', email: 'aarav@example.com', company: 'Beta Ltd.', customMessage: 'See you at the kickoff call.' },
      { name: 'Ayush', email: 'ayush@email.com', company: 'GigFloww', customMessage: 'Welcome to the team!' }
    ],
    workflowStatus: 'pending',
    emailsSent: 0
  });

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'workflow', label: 'Workflow Builder', icon: '🔧' },
    { id: 'sheets', label: 'Google Sheets', icon: '📄' },
    { id: 'preview', label: 'Email Preview', icon: '📧' },
    { id: 'submission', label: 'Submission', icon: '✅' }
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard workflowData={workflowData} setWorkflowData={setWorkflowData} />;
      case 'workflow':
        return <WorkflowBuilder />;
      case 'sheets':
        return <GoogleSheetsManager contacts={workflowData.contacts} setWorkflowData={setWorkflowData} />;
      case 'preview':
        return <EmailPreview contacts={workflowData.contacts} />;
      case 'submission':
        return <SubmissionTracker />;
      default:
        return <Dashboard workflowData={workflowData} setWorkflowData={setWorkflowData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Active Component */}
        {renderActiveComponent()}
      </div>
    </div>
  );
}

export default App;