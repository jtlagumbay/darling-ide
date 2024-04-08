import React, {useState} from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, headerText, content, inputField, buttonText1, buttonText2, onCancel, onConfirm }) => {

    if (!isOpen) return null;

    return (
        <>
            <div className='modal-backdrop' onClick={onClose}></div>
            <div className='modal'>
                <div className='modal-cont'>
                    <div className='modal-header'>
                        <h2 className='modal-header'>{headerText}</h2>
                    </div>
                    <div className='modal-body'>
                        {content}
                    <div className='modal-body-input'>
                        {inputField}
                    </div>
                    </div>
                    <div className='modal-btn'>
                        <button className='modal-cancel' onClick={handleCancel}>{buttonText1}</button>
                        <button className='modal-submit' onClick={handleConfirm}>{buttonText2}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal 