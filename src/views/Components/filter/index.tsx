import { useState, FC } from 'react';
import { FilterData } from 'views/Components/filter/filter';

const data = [{id: 0, label: "Istanbul, TR (AHL)"}, {id: 1, label: "Paris, FR (CDG)"}];

const Dropdown:FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [items, setItem] = useState<FilterData[]>(data);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [label, setLabel] = useState<string | undefined>('');
  
  const toggleDropdown = () => setOpen(!isOpen);
  
  const handleItemClick = (id:number) => {    
    selectedItem === id ? setSelectedItem(null) : setSelectedItem(id);
    const result = items?.find(item => item?.id === id)?.label;
    setLabel(result);
  }
  
  return (
    <div className='dropdown'>
      <div className='dropdown-header' onClick={toggleDropdown}>
        {label ? label : 'Select your destination'}
        <span className={`icon ${isOpen && "open"}`}> {'>'} </span>
      </div>
      <div className={`dropdown-body ${isOpen && 'open'}`}>
        {items.map(item => (
          <div className="dropdown-item" onClick={() => handleItemClick(item.id)} key={item.id}>
            <span className={`dropdown-item-dot ${item.id === selectedItem && 'selected'}`}>• </span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
};

export default Dropdown;