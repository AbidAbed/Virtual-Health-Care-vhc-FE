import React from "react";
import Modal from "react-modal";
import Button from "./Button";

Modal.setAppElement("#root"); // Set the root element for accessibility

const Popup = ({
  isOpen,
  onRequestClose,
  onSave,
  onCancel,
  text,
  cancelIcon,
  saveIcon,
  saveText,
  cancelText,
}) => {
  const handleSave = () => {
    onSave();
    onRequestClose();
  };

  const handleCancel = () => {
    onCancel();
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal z-50"
      overlayClassName="overlay"
      bodyOpenClassName="body-modal-open" // Add this line
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-100 p-8 rounded-md shadow-md overflow-y-auto max-h-screen max-w-screen">
        <p className="mb-4 text-lg">{text}</p>
        <div className="flex space-x-4">
          <Button
            className="px-4 py-2 text-white rounded hover:bg-red-600 flex items-center justify-center bg-red-500 text-white px-4 py-3 rounded "
            onChange={handleSave}
            icon={saveIcon}
            text={saveText}
          />

          <Button
            className="px-4 py-2 flex items-center justify-center bg-green-500 text-white px-4 py-3 rounded "
            onChange={handleCancel}
            icon={cancelIcon}
            text={cancelText}
          />
        </div>
      </div>
    </Modal>
  );
};

export default Popup;
