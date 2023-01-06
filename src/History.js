import axios from "axios";
import React from "react";
import "./History.css"

const MAX_ROUND=50

class History extends React.Component {

    state={minRound:0,maxRound:MAX_ROUND,historyData:this.props.history,goalData:this.props.goalsData,dataStatus:true}

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
                <div>
                    <section className="wrapperHistory">
                        <div className="topHistory">History</div>
                        <div className="bottomHistory" aria-hidden="true">History</div>
                    </section>
                </div>
                        <label>min Round:</label>
                        <input type={"number"} value={this.state.minRound}  onChange={this.setMinRound}/>
                        <label>max Round:</label>
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