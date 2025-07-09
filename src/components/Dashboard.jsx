import React from 'react';
import { Play, Users, Mail, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Dashboard = ({ workflowData, setWorkflowData }) => {
  const { contacts, workflowStatus, emailsSent } = workflowData;

  const handleRunWorkflow = () => {
    setWorkflowData(prev => ({
      ...prev,
      workflowStatus: 'running'
    }));

    // Simulate workflow execution
    setTimeout(() => {
      setWorkflowData(prev => ({
        ...prev,
        workflowStatus: 'completed',
        emailsSent: contacts.length
      }));
    }, 3000);
  };

  const stats = [
    {
      title: 'Total Contacts',
      value: contacts.length,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Emails Sent',
      value: emailsSent,
      icon: Mail,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Success Rate',
      value: contacts.length > 0 ? `${Math.round((emailsSent / contacts.length) * 100)}%` : '0%',
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Status',
      value: workflowStatus.charAt(0).toUpperCase() + workflowStatus.slice(1),
      icon: workflowStatus === 'completed' ? CheckCircle : workflowStatus === 'running' ? Clock : AlertCircle,
      color: workflowStatus === 'completed' ? 'text-green-600' : workflowStatus === 'running' ? 'text-yellow-600' : 'text-gray-600',
      bgColor: workflowStatus === 'completed' ? 'bg-green-50' : workflowStatus === 'running' ? 'bg-yellow-50' : 'bg-gray-50'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Workflow Control */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Workflow Control</h2>
            <p className="text-gray-600">Execute the n8n email automation workflow</p>
          </div>
          <button
            onClick={handleRunWorkflow}
            disabled={workflowStatus === 'running'}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              workflowStatus === 'running'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700 text-white hover:shadow-lg'
            }`}
          >
            <Play className="w-5 h-5" />
            <span>{workflowStatus === 'running' ? 'Running...' : 'Run Workflow'}</span>
          </button>
        </div>

        {/* Workflow Steps */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              workflowStatus !== 'pending' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
            }`}>
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Schedule Trigger</p>
              <p className="text-sm text-gray-600">Manual execution trigger activated</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              workflowStatus === 'completed' || workflowStatus === 'running' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
            }`}>
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Google Sheets Read</p>
              <p className="text-sm text-gray-600">Fetching contact data from spreadsheet</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              workflowStatus === 'completed' ? 'bg-green-100 text-green-600' : workflowStatus === 'running' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'
            }`}>
              {workflowStatus === 'running' ? <Clock className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
            </div>
            <div>
              <p className="font-medium text-gray-900">Split in Batches</p>
              <p className="text-sm text-gray-600">Processing contacts individually</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              workflowStatus === 'completed' ? 'bg-green-100 text-green-600' : workflowStatus === 'running' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'
            }`}>
              {workflowStatus === 'running' ? <Clock className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
            </div>
            <div>
              <p className="font-medium text-gray-900">Gmail Send</p>
              <p className="text-sm text-gray-600">Sending personalized emails</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {workflowStatus === 'completed' && contacts.map((contact, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Email sent to {contact.name}</p>
                <p className="text-sm text-gray-600">{contact.email} • {contact.company}</p>
              </div>
            </div>
          ))}
          
          {workflowStatus === 'running' && (
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium text-gray-900">Workflow is running...</p>
                <p className="text-sm text-gray-600">Processing contacts and sending emails</p>
              </div>
            </div>
          )}
          
          {workflowStatus === 'pending' && (
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Workflow ready to execute</p>
                <p className="text-sm text-gray-600">Click "Run Workflow" to start the automation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;