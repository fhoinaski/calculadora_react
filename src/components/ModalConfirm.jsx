import React from 'react';

const ModalConfirm = ({ isOpen, closeModal, title, message }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-gray-500 opacity-75 z-40" onClick={closeModal}></div>
            <div className="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg p-4 text-center z-50">
                <div className="mb-4">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                        <svg className="h-6 w-6 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 00-2 0v3a1 1 0 002 0V7z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
                </div>
                <div className="mb-4">
                    <p className="text-sm text-gray-500">{message}</p>
                </div>
                <div className="mt-5">
                    <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                        onClick={closeModal}
                    >
                        Ok entendi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirm;
