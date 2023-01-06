import axios from "axios";
import React from "react";
import './Tables.css';

class Tables extends React.Component {

    state = {teams: [],showTeams:false
        ,showPlayer:true,players: [],historyData:this.props.history,
    goalsData:this.props.goalsData,dataStatus:true,leagueId:this.props.leagueId}

    componentDidMount() {
        this.getLeagueData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps!=this.state.leagueId){
            this.setState({teams: [],showTeams:false
                ,showPlayer:true,players: [],historyData:this.props.history,
                goalsData:this.props.goalsData,dataStatus:true,leagueId:prevProps})
            this.getLeagueData();
        }
    }

    constructor(props) {
        super(props);
    }


    getLeagueData = () => {
        let tempTeamsName = [];
        // let tempTeamsList =[];
        let teamData={id:0,name:"",points:0,difference:0}
        axios.get("https://app.seker.live/fm1/teams/"+ this.props.leagueId)
            .then((response) => {
                response.data.map((item) => {
                    teamData={id:item.id,name:item.name,points:0,difference:0}
                    tempTeamsName.push(teamData)
                    teamData={id:0,name:"",points:0,difference:0}
                })
                this.setState({
                    teams: tempTeamsName
                })
            });
        setTimeout(() => {
            this.calculatePoints();
        }, 1000)
    }

    calculatePoints=()=>{
        debugger;
        let tempGoalsData=this.state.goalsData;
        let tempTeamsList=[]
        for (let i=0;i<this.state.teams.length;i++){
            tempTeamsList[i]=0
        }
        let winTeam="";
        debugger;
        tempGoalsData.map((game)=>{
            if (game.home>game.away){
                winTeam=game.homeTeamName;
                let index=this.state.teams.findIndex(team=>team.name==winTeam)
                tempTeamsList[index]=tempTeamsList[index]+3
            }
            if (game.home<game.away){
                winTeam=game.awayTeamName;
                let index=this.state.teams.findIndex(team=>team.name==winTeam)
                tempTeamsList[index]=tempTeamsList[index]+3
            }
            if (game.home==game.away){
                let index=this.state.teams.findIndex(team=>team.name==game.homeTeamName)
                tempTeamsList[index]=tempTeamsList[index]+1
                let index2=this.state.teams.findIndex(team=>team.name==game.awayTeamName)
                tempTeamsList[index2]=tempTeamsList[index2]+1
            }
        })
        tempTeamsList.map((item,index)=>{
            this.state.teams[index].points=item
        })
        debugger;
        setTimeout(() => {
            this.calculateDifferenceGoal();
        }, 1000)

    }


    calculateDifferenceGoal=()=>{
        let tempTeamsList=[]
        for (let i=0;i<this.state.teams.length;i++){
            tempTeamsList[i]=0
        }
        this.state.goalsData.map((game)=>{
            let homeDifference=game.home-game.away;
            let awayDifference=game.away-game.home;
            let homeName=game.homeTeamName;
            let awayName=game.awayTeamName;
            let indexHome=0, indexAway=0;
              while (homeName!=this.state.teams[indexHome].name){
                 indexHome++;
              }
            while (awayName!=this.state.teams[indexAway].name){
                indexAway++;
             }
            tempTeamsList[indexHome]=tempTeamsList[indexHome]+homeDifference;
            tempTeamsList[indexAway]=tempTeamsList[indexAway]+awayDifference;
          })
        tempTeamsList.map((item,index)=>{
            this.state.teams[index].difference=item
        })
        this.setState({dataStatus:false})
    }


    showPlayers=(event)=>{
        let id=event.target.firstChild.data;
        let tempPlayers = [];
        axios.get("https://app.seker.live/fm1/squad/"+this.props.leagueId+"/"+id)
            .then(response=> {
                response.data.map((item) => {
                    tempPlayers.push(item)
                })
                this.setState({
                    players: tempPlayers
                })
            });

        this.setState({showTeams:true,showPlayer:false})
    }

    hidePlayers=()=>{
        this.setState({showTeams:false,showPlayer:true})
    }

    sortTableLeague=()=>{
            let sortedTeamsList=[];
            sortedTeamsList=this.state.teams.sort((a,b)=>b.points-a.points || b.difference-a.difference || b.name - a.difference);
            return sortedTeamsList;
    }

    render() {
        return (
            <div>
                <div>
                    <section className="wrapperHistory">
                        <div className="topHistory">Table</div>
                        <div className="bottomHistory" aria-hidden="true">Table</div>
                    </section>
                </div>
                {
                    this.state.dataStatus ?
                        <div className="load-wrapp">
                            <div className="load-4">
                                <p>Loading...</p>
                                <div className="ring-1"></div>
                            </div>
                        </div>
                        :
                        <div>
                            <table  className={"teams"} hidden={this.state.showTeams}>
                                <tr>
                                    <th>Place</th>
                                    <th>ID</th>
                                    <th>Team</th>
                                    <th>Points</th>
                                    <th>Difference</th>
                                </tr>
                                {this.sortTableLeague().map((team,index) => {
                                    return (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td onClick={this.showPlayers}>{team.id}</td>
                                            <td>{team.name}</td>
                                            <td>{team.points}</td>
                                            <td>{team.difference}</td>
                                        </tr>
                                    )
                                })}
                            </table>
                            <button onClick={this.hidePlayers} hidden={this.state.showPlayer}>Back</button>
                            <table className={"player"} hidden={this.state.showPlayer}>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                </tr>
                                {this.state.players.map((player) => {
                                    return (
                                        <tr>
                                            <td>{player.id}</td>
                                            <td>{player.firstName}</td>
                                            <td>{player.lastName}</td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                }
            </div>
                )
    }
}

export default Tables;