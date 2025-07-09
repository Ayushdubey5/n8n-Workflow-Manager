import React, { useState } from 'react';
import { FileSpreadsheet, Plus, Edit3, Trash2, ExternalLink, Copy, CheckCircle } from 'lucide-react';

const GoogleSheetsManager = ({ contacts, setWorkflowData }) => {
  const [editingContact, setEditingContact] = useState(null);
  const [newContact, setNewContact] = useState({ name: '', email: '', company: '', customMessage: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [copied, setCopied] = useState(false);

  const sheetUrl = "https://docs.google.com/spreadsheets/d/1ABC123DEF456/edit#gid=0";
  const sheetId = "1ABC123DEF456";

  const handleAddContact = () => {
    if (newContact.name && newContact.email && newContact.company) {
      setWorkflowData(prev => ({
        ...prev,
        contacts: [...prev.contacts, { ...newContact }]
      }));
      setNewContact({ name: '', email: '', company: '', customMessage: '' });
      setShowAddForm(false);
    }
  };

  const handleEditContact = (index, updatedContact) => {
    setWorkflowData(prev => ({
      ...prev,
      contacts: prev.contacts.map((contact, i) => i === index ? updatedContact : contact)
    }));
    setEditingContact(null);
  };

  const handleDeleteContact = (index) => {
    setWorkflowData(prev => ({
      ...prev,
      contacts: prev.contacts.filter((_, i) => i !== index)
    }));
  };

  const copySheetId = () => {
    navigator.clipboard.writeText(sheetId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Google Sheets Connection */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <FileSpreadsheet className="w-8 h-8 text-green-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Google Sheets Integration</h2>
              <p className="text-gray-600">Manage your contact data source</p>
            </div>
          </div>
          <a
            href={sheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 btn-primary"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Sheet</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sheet URL</label>
              <div className="bg-gray-50 p-3 rounded-lg text-sm font-mono break-all">
                {sheetUrl}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sheet ID</label>
              <div className="flex items-center space-x-2">
                <div className="bg-gray-50 p-3 rounded-lg text-sm font-mono flex-1">
                  {sheetId}
                </div>
                <button
                  onClick={copySheetId}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {copied ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Required Columns</label>
              <div className="space-y-2">
                {['Name', 'Email', 'Company', 'CustomMessage'].map((column) => (
                  <div key={column} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">{column}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Data Management */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Contact Data ({contacts.length} contacts)</h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 btn-primary"
          >
            <Plus className="w-4 h-4" />
            <span>Add Contact</span>
          </button>
        </div>

        {/* Add Contact Form */}
        {showAddForm && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-4">Add New Contact</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={newContact.name}
                onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={newContact.email}
                onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <input
                type="text"
                placeholder="Company"
                value={newContact.company}
                onChange={(e) => setNewContact(prev => ({ ...prev, company: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <input
                type="text"
                placeholder="Custom Message"
                value={newContact.customMessage}
                onChange={(e) => setNewContact(prev => ({ ...prev, customMessage: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="flex items-center space-x-3 mt-4">
              <button onClick={handleAddContact} className="btn-primary">Add Contact</button>
              <button onClick={() => setShowAddForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </div>
        )}

        {/* Contacts Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custom Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map((contact, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {editingContact === index ? (
                      <input
                        type="text"
                        value={contact.name}
                        onChange={(e) => handleEditContact(index, { ...contact, name: e.target.value })}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      contact.name
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {editingContact === index ? (
                      <input
                        type="email"
                        value={contact.email}
                        onChange={(e) => handleEditContact(index, { ...contact, email: e.target.value })}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      contact.email
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {editingContact === index ? (
                      <input
                        type="text"
                        value={contact.company}
                        onChange={(e) => handleEditContact(index, { ...contact, company: e.target.value })}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      contact.company
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {editingContact === index ? (
                      <input
                        type="text"
                        value={contact.customMessage}
                        onChange={(e) => handleEditContact(index, { ...contact, customMessage: e.target.value })}
                        className="px-2 py-1 border border-gray-300 rounded text-sm w-full"
                      />
                    ) : (
                      contact.customMessage
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingContact(editingContact === index ? null : index)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteContact(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* API Configuration */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">API Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Required APIs</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Google Sheets API</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Gmail API</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">OAuth2 Redirect URI</h4>
            <div className="bg-gray-50 p-3 rounded-lg text-sm font-mono break-all">
              https://app.n8n.io/api/oauth2-credential/callback
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleSheetsManager;