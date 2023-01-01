
import './App.css';
import React from "react";
import {BrowserRouter,Routes,Route,NavLink} from "react-router-dom";
import axios from "axios";
import HomePage from "./HomePage";
import Tables from "./Tables";
import History from "./History";
import TopScorer from "./TopScorer";
import Statistics from "./Statistics";
import E404 from "./E404";

class App extends React.Component {
    state = {
        leagueNameList: [],
        currentLeague:"none",
        currentLeagueId:-1
    }

    componentDidMount() {
            this.getLeagueData();
    }

    getLeagueData = () => {
        let tempLeaguesName = [];
        axios.get("https://app.seker.live/fm1/leagues")
            .then((response) => {
                response.data.map((item) => {
                    tempLeaguesName.push(item);
                })
                this.setState({
                    leagueNameList: tempLeaguesName,
                })
            });
    }

    setLeagueName=(event) => {
        this.setState({
            currentLeague: event.target.value
        })

    }

    setLeagueId=()=> {
        this.state.leagueNameList.map((item) => {
            if (item.name == this.state.currentLeague) {
                this.setState({
                    currentLeagueId: item.id
                })
            }
        })
    }
  render(){
  return (
      <div className="App">
        <BrowserRouter>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/table"}>Tables</NavLink>
            <NavLink to={"/history"}>History</NavLink>
            <NavLink to={"/top-scorer"}>Top</NavLink>
            <NavLink to={"/statistics"}>Statistics</NavLink>
            <br/>
            <select value={this.state.currentLeague} onChange={this.setLeagueName}>
                <option value={"none"} disabled={true}>SELECT LEAGUE</option>
                {
                    this.state.leagueNameList.map((item) => {
                        return (
                            <option value={item.name}>{item.name}</option>
                        )
                    })
                }
            </select>
            <button onClick={this.setLeagueId}>
                ENTER
            </button>
                <br/>
          <Routes>
            <Route path={"/"} element={<HomePage/>}/>
              <Route path={"/table"} element={<Tables value={this.state.currentLeagueId}/>}/>
              <Route path={"/history"} element={<History/>}/>
              <Route path={"/top-scorer"} element={<TopScorer/>}/>
              <Route path={"/statistics"} element={<Statistics/>}/>
             <Route path={"/*"} element={<E404/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  )
}



}

export default App;
