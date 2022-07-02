import { getMovies, searchMovie } from 'features/Movies/movieSlice';
import React,{ FC, useEffect, useState } from 'react'
import { useAppDispatch } from 'store/store';
import Styles from "../../../css/SearchBar.module.css";

const SeachBar:FC = () => {

  const dispatch = useAppDispatch();
  

  const [searchVal, setSearchVal] = useState<string>('');  
  
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  }
  
  const handleClearBtn = () => {    
    setSearchVal('');
  }

  useEffect(() => {
    if(searchVal){
      dispatch(searchMovie(searchVal))
    }else{
      dispatch(getMovies())
    }
  }, [searchVal])
  

  return (
    <div className={Styles.container}>
    <div className={Styles.input_wrap}>
      <i className="fas fa-search"></i>
      <input 
        onChange={handleInput}
        value={searchVal}
        type="text" 
        className={Styles.product_search}
        name="product-search" 
        id="product_search" 
        placeholder="Search Products"
      />
      <span
        tabIndex={0}
        role="button" 
        onClick={handleClearBtn}
        className={Styles.clear}
      >X</span>
    </div>
  </div>
  )
}

export default SeachBar