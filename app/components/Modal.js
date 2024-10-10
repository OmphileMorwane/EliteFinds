// Modal.js
const Modal = ({ show, onClose, children }) => {
        if (!show) return null;
      
        return (
          <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="modal-content bg-green-600 p-8 rounded shadow-lg">
              {children}
              <button
                onClick={onClose}
                className="bg-stone-500 text-white px-4 py-2 rounded mt-4 hover:bg-stone-700"
              >
                Close
              </button>
            </div>
          </div>
        );
      };
      
      export default Modal;
      