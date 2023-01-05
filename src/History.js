import axios from "axios";
import React from "react";


class History extends React.Component {

    state={minRound:0,maxRound:50,historyData:this.props.history,goalData:this.props.goalsData,dataStatus:true}

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
        debugger;
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
                <h1> History </h1>
                        <label>min Round</label>
                        <input type={"number"} value={this.state.minRound}  onChange={this.setMinRound}/>
                        <label>max Round</label>
                        <input type={"number"} value={this.state.maxRound} onChange={this.setMaxRound}/>
                <table className={"History"}>
                    <tr>
                        <th>Round</th>
                        <th>Home</th>
                        <th>Goal</th>
                        <th>-</th>
                        <th>Goal</th>
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
        )

    }
}

export default History;