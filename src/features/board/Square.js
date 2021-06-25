import { squareData, handleClick, putData } from './boardSlice'
import { useSelector, useDispatch } from 'react-redux'

export function Square(props) {
    const data = useSelector(squareData(props.squareNum))
    const dispatch = useDispatch()
    return (
      <button className="square" onClick={() => {
        dispatch(handleClick(props.squareNum));
        dispatch(putData());
      } }>
        {data}
      </button>
    );
  }

export default Square
