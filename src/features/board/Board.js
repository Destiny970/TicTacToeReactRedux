import Square from './Square'
import Status from './Status'
import { fetchData } from './boardSlice'
import { useDispatch } from 'react-redux'

export function Board() {
  const dispatch = useDispatch();
  return (
      <div>
        <div className="status"><Status /></div>
        <div className="board-row">
          <Square squareNum={0} />
          <Square squareNum={1} />
          <Square squareNum={2} />
        </div>
        <div className="board-row">
          <Square squareNum={3} />
          <Square squareNum={4} />
          <Square squareNum={5} />
        </div>
        <div className="board-row">
          <Square squareNum={6} />
          <Square squareNum={7} />
          <Square squareNum={8} />
        </div>
        <button className="fetchButton" onClick={() => {console.log("Do the thing"); dispatch(fetchData())} }>
          Fetch from API
        </button>
      </div>
    );
}