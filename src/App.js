
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
        historyData: [],
        currentLeague: "none",
        currentLeagueId: -1,
        showSelect: false,
        showNavLink: true,
        goalsData: [],
        dataStatus: true
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

    getLeagueHistory = () => {
        let tempHistoryData = [];
        axios.get("https://app.seker.live/fm1/history/" + this.state.currentLeagueId)
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
        }, 4 * 1000)
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
        this.setState({goalsData: tempGoalGame, dataStatus: false});
    }


    setLeagueName = (event) => {
        this.setState({
            currentLeague: event.target.value
        })

    }

    setLeagueId = () => {
        debugger
        this.state.leagueNameList.map((item) => {
            if (item.name == this.state.currentLeague) {
                this.setState({
                    currentLeagueId: item.id,
                    showSelect: true,
                    showNavLink: false
                })
            }
        })
        setTimeout(() => {
            this.getLeagueHistory();
        }, 1 * 1000)

    }


    showSelect = () => {
        this.setState({showSelect: false, showNavLink: true})
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
                            <option value={"none"} disabled={true}>SELECT LEAGUE</option>
                            {
                                this.state.leagueNameList.map((item) => {
                                    return (
                                        <option value={item.name}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                        <button class={"button"} onClick={this.setLeagueId}>
                            ENTER
                        </button>
                        {/*{*/}
                        {/*    this.state.dataStatus ?*/}
                        {/*        <div>Please wait...</div>*/}
                        {/*        :*/}
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
                    </BrowserRouter>
                </div>
            </div>
        )
    }
}





export default App;
