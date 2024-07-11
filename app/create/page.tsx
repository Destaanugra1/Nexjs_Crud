import CreateFrorm from '@/components/Form/create-form';
import React from 'react';

const CreatePage = () => {
  return (
    <div className="min-h-screen flex  items-center justify-center bg-slate-100">
      <div className="bg-white rounded-sm shadow p-8">
        <h1 className="text-xl font-bold mb-5">Upload Images</h1>
        <CreateFrorm />
      </div>
    </div>
  );
};
export default CreatePage;

