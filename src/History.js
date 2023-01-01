import axios from "axios";
import React from "react";


class History extends React.Component {

    state={minRound:0,maxRound:50,historyData:[],goalData:[],dataStatus:true}

    componentDidMount() {
        this.getLeagueHistory();
        setTimeout(() => {
            this.getGoalData();
        }, 6 * 1000)
    }


    getLeagueHistory=()=>{
        let tempHistoryData=[];
        axios.get("https://app.seker.live/fm1/history/"+ this.props.value)
            .then((response) => {
                response.data.map((item) => {
                    tempHistoryData.push(item)
                })
                this.setState({
                    historyData: tempHistoryData
                })
            });
    }

    getGoalData=()=>{
        let tempGoalsData=[];
        let tempGoalGame=[];
        let gameGoal={home:0,away:0}
        this.state.historyData.map((item)=>{
            tempGoalsData.push(item.goals);
        })
        tempGoalsData.map((item)=>{
            item.map((goal)=>{
                if (goal.home==true){
                    gameGoal.home++;
                }
                else {gameGoal.away++;}

            })
            tempGoalGame.push(gameGoal);
            gameGoal={home:0,away: 0}
        })
        this.setState({goalData:tempGoalGame,dataStatus:false});

    }

    setMinRound=(event) => {
            this.setState({
                minRound: event.target.value
            })
    }
    setMaxRound=(event) => {
            this.setState({
                maxRound: event.target.value
            })
    }

    filterRound=()=>{
        const all=this.state.historyData;
        const filterRound = all.filter((roundNum)=>{
            let keep=false;
            if (roundNum.round>=this.state.minRound && roundNum.round<=this.state.maxRound){
                keep=true;
            }
            return keep;
        })
        return filterRound;
    }

    render() {
        return (
            <div>
                {
                this.state.dataStatus ?
                <div>Please wait...</div>
                :
                    <div>
                <h1> History </h1>
                        <label>min Round</label>
                        <input type={"number"} value={this.state.minRound} onChange={this.setMinRound}/>
                        <label>max Round</label>
                        <input type={"number"} value={this.state.maxRound} onChange={this.setMaxRound}/>
                <table className={"History"}>
                    <tr>
                        <th>Round</th>
                        <th>Home</th>
                        <th>Goal</th>
                        <th>-</th>
                        <th>Goal</th>
                        <th>Away</th>
                    </tr>
                    {this.filterRound().map((roundNum,index) => {
                        return (
                            <tr>
                                <td>{roundNum.round}</td>
                                <td>{roundNum.homeTeam.name}</td>
                                <td>{this.state.goalData[index].home}</td>
                                <td>-</td>
                                <td>{this.state.goalData[index].away}</td>
                                <td>{roundNum.awayTeam.name}</td>
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

export default History;