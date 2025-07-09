import React from 'react';
import { Calendar, FileSpreadsheet, GitBranch, Mail, ArrowRight, Settings, Play } from 'lucide-react';

const WorkflowBuilder = () => {
  const workflowNodes = [
    {
      id: 'trigger',
      title: 'Schedule Trigger',
      description: 'Manual execution trigger',
      icon: Calendar,
      color: 'bg-blue-500',
      config: {
        'Trigger Type': 'Manual',
        'Schedule': 'On-demand execution',
        'Status': 'Active'
      }
    },
    {
      id: 'sheets',
      title: 'Google Sheets',
      description: 'Read contact data',
      icon: FileSpreadsheet,
      color: 'bg-green-500',
      config: {
        'Operation': 'Read Rows',
        'Sheet Name': 'Sheet1',
        'Columns': 'Name, Email, Company, CustomMessage',
        'Authentication': 'OAuth2'
      }
    },
    {
      id: 'split',
      title: 'Split in Batches',
      description: 'Process one contact at a time',
      icon: GitBranch,
      color: 'bg-purple-500',
      config: {
        'Batch Size': '1',
        'Reset': 'true',
        'Mode': 'Each Item'
      }
    },
    {
      id: 'email',
      title: 'Gmail',
      description: 'Send personalized emails',
      icon: Mail,
      color: 'bg-red-500',
      config: {
        'Operation': 'Send Email',
        'To': '{{ $json["Email"] }}',
        'Subject': 'Welcome to {{ $json["Company"] }}, {{ $json["Name"] }}!',
        'Authentication': 'OAuth2'
      }
    }
  ];

  return (
    <div className="space-y-8">
      {/* Workflow Overview */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">n8n Workflow Configuration</h2>
            <p className="text-gray-600">Visual representation of the email automation workflow</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="status-badge status-completed">Ready</span>
          </div>
        </div>

        {/* Workflow Flow */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
          {workflowNodes.map((node, index) => (
            <div key={node.id} className="flex items-center">
              <div className="flex flex-col items-center min-w-0">
                <div className={`w-16 h-16 ${node.color} rounded-xl flex items-center justify-center mb-3 shadow-lg`}>
                  <node.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-center text-sm">{node.title}</h3>
                <p className="text-xs text-gray-600 text-center mt-1">{node.description}</p>
              </div>
              {index < workflowNodes.length - 1 && (
                <ArrowRight className="w-6 h-6 text-gray-400 mx-6 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Node Configurations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workflowNodes.map((node) => (
          <div key={node.id} className="card">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 ${node.color} rounded-lg flex items-center justify-center`}>
                <node.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{node.title}</h3>
                <p className="text-sm text-gray-600">{node.description}</p>
              </div>
              <Settings className="w-5 h-5 text-gray-400 ml-auto" />
            </div>

            <div className="space-y-3">
              {Object.entries(node.config).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-sm font-medium text-gray-700">{key}</span>
                  <span className="text-sm text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Email Template */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Template Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject Template</label>
            <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm">
              Welcome to {'{{ $json["Company"] }}'}, {'{{ $json["Name"] }}'}!
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Body Template</label>
            <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm whitespace-pre-line">
{`Hi {{ $json["Name"] }},

We're excited to have you on board at {{ $json["Company"] }}.

{{ $json["CustomMessage"] }}

Best regards,
GigFloww`}
            </div>
          </div>
        </div>
      </div>

      {/* Workflow JSON Export Preview */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Export Structure</h3>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`{
  "name": "Email Automation Workflow",
  "nodes": [
    {
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.scheduleTrigger",
      "position": [240, 300]
    },
    {
      "name": "Google Sheets",
      "type": "n8n-nodes-base.googleSheets",
      "position": [460, 300]
    },
    {
      "name": "SplitInBatches",
      "type": "n8n-nodes-base.splitInBatches",
      "position": [680, 300]
    },
    {
      "name": "Gmail",
      "type": "n8n-nodes-base.gmail",
      "position": [900, 300]
    }
  ],
  "connections": {
    "Schedule Trigger": { "main": [["Google Sheets"]] },
    "Google Sheets": { "main": [["SplitInBatches"]] },
    "SplitInBatches": { "main": [["Gmail"]] }
  }
}`}</pre>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;