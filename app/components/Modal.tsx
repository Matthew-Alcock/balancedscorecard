import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (data: any) => void;
  title: string;
  fields: Array<{ 
    label: string; 
    placeholder?: string; 
    name: string; 
    type?: 'text' | 'dropdown' | 'date'; 
    options?: { label: string; value: string }[]; // For dropdown options
  }>;
  initialValues?: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, onSubmit, title, fields, initialValues }) => {
  const [formData, setFormData] = useState(initialValues || {});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    closeModal(); // Close modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label>{field.label}</label>
              {field.type === 'dropdown' ? (
                <select name={field.name} onChange={handleInputChange} value={formData[field.name] || ''}>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'date' ? (
                <input 
                  type="date" 
                  name={field.name} 
                  onChange={handleInputChange} 
                  value={formData[field.name] || ''} 
                />
              ) : (
                <input 
                  type="text" 
                  placeholder={field.placeholder} 
                  name={field.name} 
                  onChange={handleInputChange} 
                  value={formData[field.name] || ''} 
                />
              )}
            </div>
          ))}
          <button type="submit">Submit</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
