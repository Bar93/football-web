
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

const FIRST_LEAGUE_ID=-1;
const API_LEAGUE="https://app.seker.live/fm1/leagues";
const API_HISTORY="https://app.seker.live/fm1/history/";


class App extends React.Component {
    state = {
        leagueNameList: [],
        historyData: [],
        currentLeague: "none",
        currentLeagueId: FIRST_LEAGUE_ID,
        showNavLink: true,
        goalsData: [],
        dataStatus: false
    }

    componentDidMount() {
        this.getLeagueData();
    }


    getLeagueData = () => {
        let tempLeaguesName = [];
        axios.get(API_LEAGUE)
            .then((response) => {
                response.data.map((item) => {
                    tempLeaguesName.push(item);
                })
                this.setState({
                    leagueNameList: tempLeaguesName,
                })
            });
    }

    getLeagueHistory = () => {
        let tempHistoryData = [];
        axios.get(API_HISTORY + this.state.currentLeagueId)
            .then((response) => {
                response.data.map((item) => {
                    tempHistoryData.push(item)
                })
                this.setState({
                    historyData: tempHistoryData
                })
            });
        setTimeout(() => {
            this.getGoalData();
        }, 3 * 1000)
    }

    getGoalData = () => {
        let tempGoalsData = [];
        let tempGoalGame = [];
        let gameGoal = {home: 0, away: 0, homeTeamName: "", awayTeamName: ""}
        this.state.historyData.map((item) => {
            gameGoal = {home: 0, away: 0, homeTeamName: item.homeTeam.name, awayTeamName: item.awayTeam.name}
            tempGoalGame.push(gameGoal)
            tempGoalsData.push(item.goals);
        })
        tempGoalsData.map((item, index) => {
            item.map((goal) => {
                if (goal.home == true) {
                    gameGoal.home++;
                } else {
                    gameGoal.away++;
                }
            })
            tempGoalGame[index].home = gameGoal.home;
            tempGoalGame[index].away = gameGoal.away;
            gameGoal = {home: 0, away: 0, homeTeamName: "", awayTeamName: ""}
        })
        this.setState({goalsData: tempGoalGame, dataStatus: false,showNavLink: false});
    }


    setLeagueName = (event) => {
        this.setState({
            currentLeague: event.target.value
        })
    }

    setLeagueId = () => {
        this.state.leagueNameList.map((item) => {
            if (item.name == this.state.currentLeague) {
                this.setState({
                    currentLeagueId: item.id,dataStatus: true
                })
            }
        })
        setTimeout(() => {
            this.getLeagueHistory();
        },  1000)

    }


    render() {
        return (
            <div className="App">
                <div>
                    <BrowserRouter>
                        <NavLink exact activeClassName="active" to={"/"} className={"nav"}>Home</NavLink>
                        <NavLink exact activeClassName="active" to={"/table"} className={"nav"}
                                 hidden={this.state.showNavLink}>Tables</NavLink>
                        <NavLink exact activeClassName="active" to={"/history"} className={"nav"}
                                 hidden={this.state.showNavLink}>History</NavLink>
                        <NavLink exact activeClassName="active" to={"/top-scorer"} className={"nav"}
                                 hidden={this.state.showNavLink}>Top</NavLink>
                        <NavLink exact activeClassName="active" to={"/statistics"} className={"nav"}
                                 hidden={this.state.showNavLink}>Statistics</NavLink>
                        <br/>
                        <select id={"select"} value={this.state.currentLeague} onChange={this.setLeagueName}>
                            <option value={"none"} disabled={true}>SELECT & ENTER</option>
                            {
                                this.state.leagueNameList.map((item) => {
                                    return (
                                        <option value={item.name}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                        <button className={"button"} onClick={this.setLeagueId} disabled={this.state.currentLeague=="none"?true:false}>
                            ENTER
                        </button>
                        {
                            this.state.dataStatus ?
                                <div className="load-wrapp">
                                    <div className="load-4">
                                        <p>Loading...</p>
                                        <div className="ring-1"></div>
                                    </div>
                                </div>
                                :
                                <Routes>
                                    <Route path={"/"} element={<HomePage/>}/>
                                    <Route path={"/table"} element={<Tables leagueId={this.state.currentLeagueId}
                                                                            history={this.state.historyData}
                                                                            goalsData={this.state.goalsData}/>}/>
                                    <Route path={"/history"} element={<History leagueId={this.state.currentLeagueId}
                                                                               history={this.state.historyData}
                                                                               goalsData={this.state.goalsData}/>}/>
                                    <Route path={"/top-scorer"}
                                           element={<TopScorer leagueId={this.state.currentLeagueId}
                                                               history={this.state.historyData}/>}/>
                                    <Route path={"/statistics"}
                                           element={<Statistics history={this.state.historyData}/>}/>
                                    <Route path={"/*"} element={<E404/>}/>
                                </Routes>
                        }
                    </BrowserRouter>
                </div>
            </div>
        )
    }
}





export default App;
