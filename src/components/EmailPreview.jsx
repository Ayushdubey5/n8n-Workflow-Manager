import React, { useState } from 'react';
import { Mail, Eye, Send, User, Building, MessageSquare } from 'lucide-react';

const EmailPreview = ({ contacts }) => {
  const [selectedContact, setSelectedContact] = useState(0);
  
  const contact = contacts[selectedContact];
  
  const generateEmailContent = (contact) => {
    const subject = `Welcome to ${contact.company}, ${contact.name}!`;
    const body = `Hi ${contact.name},

We're excited to have you on board at ${contact.company}.

${contact.customMessage}

Best regards,
GigFloww`;
    
    return { subject, body };
  };

  const { subject, body } = generateEmailContent(contact);

  return (
    <div className="space-y-8">
      {/* Contact Selector */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Email Preview</h2>
        <div className="flex items-center space-x-4 mb-4">
          <label className="text-sm font-medium text-gray-700">Select Contact:</label>
          <select
            value={selectedContact}
            onChange={(e) => setSelectedContact(parseInt(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {contacts.map((contact, index) => (
              <option key={index} value={index}>
                {contact.name} ({contact.company})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Details</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">Name</p>
                <p className="text-gray-900">{contact.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="text-gray-900">{contact.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Building className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">Company</p>
                <p className="text-gray-900">{contact.company}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <MessageSquare className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-700">Custom Message</p>
                <p className="text-gray-900">{contact.customMessage}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Email Preview */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Eye className="w-6 h-6 text-primary-600" />
                <h3 className="text-lg font-semibold text-gray-900">Email Preview</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="status-badge status-completed">Ready to Send</span>
              </div>
            </div>

            {/* Email Interface */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Email Header */}
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">G</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">GigFloww</p>
                      <p className="text-xs text-gray-600">noreply@gigfloww.com</p>
                    </div>
                  </div>
                  <Send className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Email Content */}
              <div className="p-6 bg-white">
                <div className="mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <span>To:</span>
                    <span className="font-medium text-gray-900">{contact.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Subject:</span>
                    <span className="font-medium text-gray-900">{subject}</span>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-line text-gray-900 leading-relaxed">
                    {body}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Variables */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Template Variables</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-blue-900 mb-1">{'{{ $json["Name"] }}'}</p>
            <p className="text-blue-700">→ {contact.name}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-green-900 mb-1">{'{{ $json["Email"] }}'}</p>
            <p className="text-green-700">→ {contact.email}</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-purple-900 mb-1">{'{{ $json["Company"] }}'}</p>
            <p className="text-purple-700">→ {contact.company}</p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-orange-900 mb-1">{'{{ $json["CustomMessage"] }}'}</p>
            <p className="text-orange-700">→ {contact.customMessage}</p>
          </div>
        </div>
      </div>

      {/* All Emails Preview */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">All Generated Emails</h3>
        <div className="space-y-4">
          {contacts.map((contact, index) => {
            const emailContent = generateEmailContent(contact);
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-sm font-medium">{contact.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.email}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{contact.company}</span>
                </div>
                
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-medium text-sm text-gray-900 mb-1">Subject: {emailContent.subject}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{emailContent.body.split('\n')[0]}...</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;