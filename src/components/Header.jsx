import React from 'react';
import { Workflow, Mail, Sheet } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Workflow className="w-8 h-8 text-primary-600" />
              <Mail className="w-6 h-6 text-success-500" />
              <Sheet className="w-6 h-6 text-warning-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">n8n Workflow Manager</h1>
              <p className="text-sm text-gray-600">Automated Email Campaign with Google Sheets Integration</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Assignment Status</p>
              <p className="text-xs text-gray-500">Deadline: July 9th, EOD</p>
            </div>
            <div className="w-3 h-3 bg-warning-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;