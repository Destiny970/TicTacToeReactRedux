import { squareData, handleClick } from './boardSlice'
import { useSelector, useDispatch } from 'react-redux'
import { putGame } from '../socket/socketSlice'

export function Square(props) {
    const data = useSelector(squareData(props.squareNum))
    const dispatch = useDispatch()
    return (
      <button className="square" onClick={() => {
        dispatch(handleClick(props.squareNum));
        dispatch(putGame());
      } }>
        {data}
      </button>
    );
  }

export default Square
