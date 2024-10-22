// components/Modal.tsx
import { Dialog } from '@headlessui/react';
import { Fragment } from 'react';
import { Button } from './ui/button';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (data: any) => void;
  title: string;
  fields: { label: string; placeholder: string; name: string }[];
}

export default function Modal({ isOpen, closeModal, onSubmit, title, fields }: ModalProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement); // Cast to HTMLFormElement
    const data: { [key: string]: string } = {};
    
    fields.forEach(field => {
      data[field.name] = formData.get(field.name) as string;
    });

    onSubmit(data);
    closeModal();
  };

  return (
    <Dialog as="div" open={isOpen} onClose={closeModal} className="relative z-10">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="mx-auto w-full max-w-md rounded bg-white p-6">
          <Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>
          <form onSubmit={handleSubmit} className="mt-4">
            {fields.map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  name={field.name}
                  type="text"
                  placeholder={field.placeholder}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            ))}
            <div className="flex justify-end">
              <Button type="button" onClick={closeModal} variant="outline">Cancel</Button>
              <Button type="submit" className="ml-2">Submit</Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
