import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "./Box";
import BoardLogic from "./BoardLogic";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

class Board extends Component {
  static defaultProps = {
    size: 3,
    onMove: (i, j) => {
      console.log(`Clicked tile ${i},${j}`);
    },
    timerDuration: 5,
  };

  constructor(props) {
    super(props);
    // this.state = this.initialGameState();
    this.state = {
      timer: 0, // Initialize timer to 0
      // Include other state properties here
      // For example, if you have a board state from initialGameState
      board: this.initialGameState().board,
      moves: 0,
      isWin: false,
      // Add any other state properties you need
    };
  }

  componentDidMount() {
    this.timerInterval = setInterval(this.tick, 1000); // Start the timer
  }

  componentWillUnmount() {
    toast.dismiss();
    // clearInterval(this.timer);
    clearInterval(this.timerInterval);
  }

  tick = () => {
    this.setState((prevState) => {
      // Only decrement the timer if it's greater than 0
      const newTimer = prevState.timer > 0 ? prevState.timer - 1 : 0;
      if (newTimer <= 0) {
        clearInterval(this.timerInterval); // Corrected from this.timer to this.timerInterval
        this.handleTimerEnd();
      }
      return { timer: newTimer };
    });
  };

  handleTimerEnd = () => {
    if (!this.state.isWin) {
      toast.dismiss();
      toast.error("Time's up! You lose.");
    }
  };

  startTimer = () => {
    this.setState({ timer: this.props.timerDuration });
    this.timer = setInterval(this.tick, 1000);
  };

  initialGameState = () => {
    this.boardLogic = new BoardLogic(this.props.data || this.props.size);
    console.log(this.props.data);
    console.log(
      this.props.data ? this.boardLogic.matrix : this.boardLogic.scramble()
    );
    return {
      board: this.props.data
        ? this.boardLogic.matrix
        : this.boardLogic.scramble(),
      moves: 0,
      isWin: this.boardLogic.checkWin(),
      timer: this.props.timerDuration,
    };
  };

  //note declaring class function as an arrow function gives us automatic 'this' binding.
  move = (i, j) => {
    if (this.state.isWin) return;

    if (this.boardLogic.move(i, j)) {
      this.props.onMove(i, j);
      this.setState((prevState) => ({
        board: this.boardLogic.matrix,
        moves: prevState.moves + 1,
        isWin: this.boardLogic.checkWin(),
      }));
    }

    if (this.boardLogic.checkWin()) {
      clearInterval(this.timer);
      toast.success("Congratulations! You won!");
    }
  };

  /**
   * returns a single slider row given the row data
   * @param {Object} rowData row data
   * @param {Number} i row number
   */
  getRow = (rowData, j) => {
    return (
      <div key={j}>
        {rowData.map((bNum, i) => (
          <Box key={bNum} boxNumber={bNum} onClick={() => this.move(i, j)} />
        ))}
      </div>
    );
  };

  newGame = () => {
    toast.dismiss();
    this.setState(this.initialGameState());
    clearInterval(this.timer);
    this.startTimer();
  };

  render() {
    let rows = this.state.board.map(this.getRow);
    let message =
      (this.state.isWin ? "Winner !!! " : "Total ") +
      `Moves: ${this.state.moves}`;
    let isTimerEnded = this.state.timer <= 0;

  

    let timerEndMessage = isTimerEnded ? (
      <p>Please click "Start New" to play the game.</p>
    ) : null ;

    return (
      <>
        <div className={`timer ${isTimerEnded?"d-hide":""}`}>Time Remaining: {this.state.timer} seconds</div>
        {/* <ToastContainer /> */}
        <div>
          <div
            className={`slider-board ${
              isTimerEnded ? "slider-board-disabled" : ""
            }`}
          >
            {rows}
          </div>

          <span className={`slider-msg ${isTimerEnded?"d-hide":""}`}>
            <h4>{message}</h4>
          </span>
          <div>
          {timerEndMessage}
          </div>
          
          <div className="btn-new-game">
            <button onClick={this.newGame}>New Game</button>
          </div>
        </div>
      </>
    );
  }
}

Board.propTypes = {
  data: PropTypes.array,
  size: PropTypes.number,
  onMove: PropTypes.func,
};

export default Board;
