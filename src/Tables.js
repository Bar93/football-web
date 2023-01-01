import axios from "axios";
import React from "react";

class Tables extends React.Component {

    state = {teams: [],showTeams:false,showPlayer:true,players: [],teamID:120}

    componentDidMount() {
        this.getLeagueData();
    }

    constructor(props) {
        super(props);
    }


    getLeagueData = () => {
        let tempTeamsName = [];
        axios.get("https://app.seker.live/fm1/teams/"+ this.props.value)
            .then((response) => {
                response.data.map((item) => {
                    tempTeamsName.push(item)
                })
                this.setState({
                    teams: tempTeamsName
                })
            });
    }


    showPlayers=(event)=>{
        let id=event.target.firstChild.data;
        debugger;
        let tempPlayers = [];
        axios.get("https://app.seker.live/fm1/squad/"+this.props.value+"/"+id)
            .then(response=> {
                debugger;
                response.data.map((item) => {
                    tempPlayers.push(item)
                })
                this.setState({
                    players: tempPlayers
                })
            });

        this.setState({showTeams:true,showPlayer:false})
    }

    render() {
        return (
            <div>
                <table className={"teams"} hidden={this.state.showTeams}>
                    <tr>
                        <th>ID</th>
                        <th>Team</th>
                    </tr>
                    {this.state.teams.map((team) => {
                        return (
                            <tr>
                                <td onClick={this.showPlayers}>{team.id}</td>
                                <td>{team.name}</td>
                            </tr>
                        )
                    })}
                </table>
                <table className={"player"}  hidden={this.state.showPlayer}>
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
        )

    }
}

export default Tables;