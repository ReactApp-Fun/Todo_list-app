import React, { useState, useEffect, useRef } from "react";
import "./styles/button.css";
import { CoolButton } from "../context/ButtonStyle";
// import DayPicker from "../display_part/DayPicker";

const InputFunction = (props) => {
  const [inputValue, setInputValue] = useState(props.editingList ? props.editingList.text : '');
  const [selectedDay, setSelectedDay] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(props.editingList ? props.editingList.date : '');
  const datePickerRef = useRef(null);

  useEffect(() => {
    if (props.editingList?.text !== undefined) {
      setInputValue(props.editingList?.text);
      setSelectedDate(props.editingList?.date);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.editingList]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitForm();
    }
  };

  const submitForm = () => {
    if (inputValue.trim()) {
      if (props.editingList) {
        props.updateList(props.editingList.id, inputValue, selectedDate);
      } else {
        props.addList(inputValue, selectedDate);
      }
      setInputValue('');
      setSelectedDate('');
      props.hideInput();
    }
  };

  const handleCancelInput = () => {
    props.hideInput();
  };

  const handleClickOutside = (event) => {
    if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
    setIsOpen(false);
  };

  const toggleDayPicker = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <form className="input-display" onSubmit={handleSubmit}>
      <div>
        <input
          required
          onKeyDown={handleKeyDown}
          value={inputValue}
          onChange={handleChange}
          className="task-input"
          type="text"
          placeholder="Type your task here..."
        />
        {/* <input 
          required
          type="date"
          className="date-input"
          value={selectedDate}
          onClick={toggleDayPicker}
          onChange={handleChange}
          placeholder="Pick date...(mm/dd/yy)"
        /> */}
        {/* {isOpen && (
          <div ref={datePickerRef}>
            <DayPicker 
              // captionLayout="dropdown"
              // className="date-table"
              // mode="single"
              onDayClick={handleDayClick}
            />
          </div>
        )} */}
      </div>
      
      <div className="add-button-2-group">
        <CoolButton type="submit" className="add-button-2">
          Save
        </CoolButton>
        <CoolButton 
          type="button" 
          className="add-button-2"    
          onClick={handleCancelInput}
        >
          Cancel
        </CoolButton>
      </div>
    </form>
  );
};

export default InputFunction;