import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, Download, ExternalLink, Video, FileText, Image, Link } from 'lucide-react';

const SubmissionTracker = () => {
  const [submissions, setSubmissions] = useState({
    description: { status: 'completed', content: 'This n8n workflow reads contact data from a Google Sheet and sends each person a personalized welcome email using Gmail. It uses the Schedule Trigger, loops over the rows, and dynamically fills email content using variables.' },
    workflowJson: { status: 'completed', filename: 'email-automation-workflow.json' },
    screenshot: { status: 'completed', filename: 'workflow-canvas-screenshot.png' },
    googleSheet: { status: 'completed', url: 'https://docs.google.com/spreadsheets/d/1ABC123DEF456/edit#gid=0' },
    loomVideo: { status: 'pending', url: '' }
  });

  const requirements = [
    {
      id: 'description',
      title: 'Short Description (2-4 sentences)',
      description: 'What your workflow does and how it works',
      icon: FileText,
      required: true
    },
    {
      id: 'workflowJson',
      title: 'Workflow Export (.json)',
      description: 'Export your n8n workflow using "Download Workflow"',
      icon: Download,
      required: true
    },
    {
      id: 'screenshot',
      title: 'Screenshot of Workflow Canvas',
      description: 'Visual representation of your workflow',
      icon: Image,
      required: true
    },
    {
      id: 'googleSheet',
      title: 'Google Sheet Link (View Only)',
      description: 'Share the sheet with dummy data used in automation',
      icon: Link,
      required: true
    },
    {
      id: 'loomVideo',
      title: 'Loom Video (1-2 minutes)',
      description: 'Quick walkthrough of your workflow - Optional but gives bonus points',
      icon: Video,
      required: false
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'pending':
        return 'status-pending';
      case 'error':
        return 'status-error';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const completedCount = Object.values(submissions).filter(s => s.status === 'completed').length;
  const totalRequired = requirements.filter(r => r.required).length;

  const handleDownloadWorkflow = () => {
    const workflowData = {
      name: "Email Automation Workflow",
      nodes: [
        {
          name: "Schedule Trigger",
          type: "n8n-nodes-base.scheduleTrigger",
          position: [240, 300],
          parameters: {
            rule: {
              interval: [
                {
                  field: "cronExpression",
                  value: "0 9 * * 1"
                }
              ]
            }
          }
        },
        {
          name: "Google Sheets",
          type: "n8n-nodes-base.googleSheets",
          position: [460, 300],
          parameters: {
            operation: "read",
            sheetId: "1ABC123DEF456",
            range: "A:D"
          }
        },
        {
          name: "SplitInBatches",
          type: "n8n-nodes-base.splitInBatches",
          position: [680, 300],
          parameters: {
            batchSize: 1,
            options: {}
          }
        },
        {
          name: "Gmail",
          type: "n8n-nodes-base.gmail",
          position: [900, 300],
          parameters: {
            operation: "send",
            message: {
              to: "={{ $json.Email }}",
              subject: "Welcome to {{ $json.Company }}, {{ $json.Name }}!",
              body: "Hi {{ $json.Name }},\n\nWe're excited to have you on board at {{ $json.Company }}.\n\n{{ $json.CustomMessage }}\n\nBest regards,\nGigFloww"
            }
          }
        }
      ],
      connections: {
        "Schedule Trigger": {
          main: [
            [
              {
                node: "Google Sheets",
                type: "main",
                index: 0
              }
            ]
          ]
        },
        "Google Sheets": {
          main: [
            [
              {
                node: "SplitInBatches",
                type: "main",
                index: 0
              }
            ]
          ]
        },
        "SplitInBatches": {
          main: [
            [
              {
                node: "Gmail",
                type: "main",
                index: 0
              }
            ]
          ]
        }
      }
    };

    const blob = new Blob([JSON.stringify(workflowData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-automation-workflow.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Submission Overview */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Submission Tracker</h2>
            <p className="text-gray-600">Track your assignment completion progress</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary-600">{completedCount}/{totalRequired}</p>
            <p className="text-sm text-gray-600">Required items completed</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round((completedCount / totalRequired) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / totalRequired) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Deadline Alert */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-yellow-600" />
            <p className="text-yellow-800 font-medium">Deadline: July 9th, EOD</p>
          </div>
        </div>
      </div>

      {/* Requirements Checklist */}
      <div className="space-y-4">
        {requirements.map((requirement) => {
          const submission = submissions[requirement.id];
          return (
            <div key={requirement.id} className="card">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(submission.status)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <requirement.icon className="w-5 h-5 text-gray-400" />
                      <h3 className="font-semibold text-gray-900">{requirement.title}</h3>
                      {requirement.required && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Required</span>
                      )}
                    </div>
                    <span className={`status-badge ${getStatusColor(submission.status)}`}>
                      {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{requirement.description}</p>
                  
                  {/* Submission Content */}
                  {submission.status === 'completed' && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      {requirement.id === 'description' && (
                        <p className="text-sm text-green-800">{submission.content}</p>
                      )}
                      {requirement.id === 'workflowJson' && (
                        <div className="flex items-center space-x-2">
                          <Download className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-800">{submission.filename}</span>
                          <button
                            onClick={handleDownloadWorkflow}
                            className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
                          >
                            Download
                          </button>
                        </div>
                      )}
                      {requirement.id === 'screenshot' && (
                        <div className="flex items-center space-x-2">
                          <Image className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-800">{submission.filename}</span>
                        </div>
                      )}
                      {requirement.id === 'googleSheet' && (
                        <div className="flex items-center space-x-2">
                          <ExternalLink className="w-4 h-4 text-green-600" />
                          <a 
                            href={submission.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-green-800 hover:underline"
                          >
                            View Google Sheet
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {submission.status === 'pending' && requirement.id === 'loomVideo' && (
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-sm text-yellow-800">Optional: Record a 1-2 minute walkthrough for bonus points</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Summary</h3>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">What You've Built</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• n8n workflow with Schedule Trigger → Google Sheets → SplitInBatches → Gmail</li>
              <li>• Personalized email automation using dynamic variables</li>
              <li>• Google Sheets integration with proper OAuth2 authentication</li>
              <li>• Template-based email generation with custom messages</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Technical Implementation</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Google Sheets API and Gmail API integration</li>
              <li>• Batch processing for individual email sending</li>
              <li>• Dynamic variable substitution in email templates</li>
              <li>• Error handling and workflow monitoring</li>
            </ul>
          </div>
          
          {completedCount === totalRequired && (
            <div className="bg-green-100 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="font-medium text-green-800">Assignment Complete!</p>
              </div>
              <p className="text-sm text-green-700 mt-1">
                All required components have been completed. You're ready to submit your assignment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionTracker;