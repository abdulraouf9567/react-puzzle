import { Component } from "react";
import "./App.css";
import Board from "./Board";

// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer, toast } from 'react-toastify';

class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   timer: 3, // Initial timer value in seconds
    // };
  }

  // componentDidMount() {
  //   this.timerInterval = setInterval(this.tick, 1000); // Start the timer
  // }

  // componentWillUnmount() {
  //   clearInterval(this.timerInterval); // Stop the timer when the component unmounts
  // }

  // tick = () => {
  //   // Function to decrement the timer
  //   this.setState(
  //     (prevState) => ({
  //       timer: prevState.timer - 1,
  //     }),
  //     () => {
  //       // Check if timer has reached 0
  //       if (this.state.timer === 0) {
  //         // Take action when timer finishes, for example, stop play
  //         clearInterval(this.timerInterval);
  //         toast.error(`Time's up! Stop play. You Lose`,{
  //           position: "top-center"
  //         });
  //         console.log("Time's up! Stop play.");
  //         // You can add further actions here, such as showing a message or resetting the game.
  //       }
  //     }
  //   );
  // };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <p>Time Remaining: {this.state.timer} seconds</p> */}
          <h1 className="App-title">Slide Solver</h1>
          <Board />
          {/* Same as */}
         
        </header>
      </div>
    );
  }
}

export default App;
