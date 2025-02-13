import Modal from 'react-modal';
import { useRef } from 'react';
import './WarningModal.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#faf4e8ac',
        minWidth: '380px',
        height: 'fitcontent',
        backdropfilter: 'blur(40px)',
        border: '2px solid #9d13138a',
        boxShadow: '8px 8px 12px rgba(0, 0, 0, 10%)',
    },
};

export const WarningModal = ({ showModal, setShowModal, wordToDelete, setWordToDelete, handleDeleteWord }) => {
    const ref = useRef();

    return (
        <Modal
            isOpen={showModal}
            ariaHideApp={false}
            style={customStyles}
            onRequestClose={() => {
                setShowModal(false);
            }}
            onAfterOpen={() => {
                if (ref.current) {
                    ref.current.focus(); // Устанавливаем фокус на кнопку после открытия модального окна
                }
            }}
        >
            <div className="warningwrap">
                <p>Вы действительно хотите удалить слово?</p>
                <div className="warningBtncontainer">
                    {' '}
                    <button onClick={() => handleDeleteWord(wordToDelete)}>Да, хочу!</button>
                    <button
                        onClick={() => {
                            setShowModal(false);
                            setWordToDelete(null);
                        }}
                        ref={ref}
                    >
                        Нет, отмени!
                    </button>
                </div>
            </div>
        </Modal>
    );
};
