import { useSelector } from 'react-redux'
import {getWinner, getXIsNext} from './boardSlice'
export function Status(){
    const winner = useSelector(getWinner);
    const xIsNext = useSelector(getXIsNext);
            if (winner) {
                return <span>Winner: {winner}</span>
              } else {
                return <span>Next player: { xIsNext ? 'X' : 'O' }</span>;
              }
}

export default Status;