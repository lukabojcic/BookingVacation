import React from 'react';
import Calendar from './Calendar';
import Modal from 'react-modal';

Modal.setAppElement('#root')

function CalendarForm() {
    return (
        <Calendar/>
    );
}

export default CalendarForm;