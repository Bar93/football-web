import React from "react";
import "./Statistic.css"

class Statistics extends React.Component {

    state={historyData:this.props.history,fasterGoal:0,slowGoal:0,goalInFirstHalf:0
        ,goalInSecHalf:0,mostGoalInRound: {index:0,num:0},minGoalInRound: {index:0,num:100},goalsData:[],dataStatus:true}

    componentDidMount() {
        this.getGoalData();
        setTimeout(() => {
            this.checkTimesOfGoal();
        }, 3 * 1000)
        this.checkGoalInRound();
    }

    getGoalData=()=>{
        let tempGoalData=[];
        this.state.historyData.map((item) => {
            tempGoalData.push(item.goals)
        })
        this.setState({
            goalsData: tempGoalData
        })
    }

    checkTimesOfGoal=()=>{
        debugger
        let fastGoal=120,slowGoal=-1,countGoalFirstHalf=0,countGoalSecHalf=0
        this.state.goalsData.map((game)=>{
           game.map((goal)=>{
               if (goal.minute<fastGoal){
                   fastGoal=goal.minute;
               }
               if (goal.minute<45){
                   countGoalFirstHalf++;
               }
               if (goal.minute>slowGoal){
                   slowGoal=goal.minute
               }
               if (goal.minute>=45){
                   countGoalSecHalf++;
               }
           })
        })
        this.setState({goalInFirstHalf:countGoalFirstHalf,goalInSecHalf:countGoalSecHalf
            ,dataStatus:false,fasterGoal:fastGoal,slowGoal:slowGoal})
    }

    checkGoalInRound=()=>{
        let goalsByRound =[];
        let maxGoalInRound=0;
        let minGoalInRound=100;
        let indexMax=0;
        let indexMin=0;
        let size = this.state.historyData[this.state.historyData.length-1].round
        for (let i=0;i<size;i++){
            goalsByRound[i]=0;
        }
        this.state.historyData.map((item)=>{
            goalsByRound[item.round-1]= goalsByRound[item.round-1]+item.goals.length
        })
        debugger;
        goalsByRound.map((item,index)=>{
            if (item> maxGoalInRound){
                maxGoalInRound=item;
                indexMax=index;
            }
            if (item<minGoalInRound){
                minGoalInRound=item;
                indexMin=index;
            }
        })
        this.setState({mostGoalInRound: {index:indexMax,num:maxGoalInRound},minGoalInRound: {index:indexMin,num:minGoalInRound}});

    }

    render() {
        return (
            <div>
                <div>
                    <section className="wrapperHistory">
                        <div className="topHistory">Statistic</div>
                        <div className="bottomHistory" aria-hidden="true">Statistic</div>
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
                        <div className={"statistic"}>
                            <table className={"statistic"}>
                                <tr>
                                    <th>   </th>
                                    <th>Min</th>
                                    <th>Max</th>
                                </tr>
                                <tr>
                                    <td>Goal Time</td>
                                    <td>{this.state.slowGoal}</td>
                                    <td>{this.state.fasterGoal}</td>
                                </tr>
                                <tr>
                                    <td>Goals in Half</td>
                                    <td>First Half: {this.state.goalInFirstHalf}</td>
                                    <td>Second Half: {this.state.goalInSecHalf}</td>
                                </tr>
                                <tr>
                                    <td>Goal in Round</td>
                                    <td>Round: {this.state.minGoalInRound.index+1} Goals:{this.state.minGoalInRound.num}</td>
                                    <td>Round: {this.state.mostGoalInRound.index+1} Goals:{this.state.mostGoalInRound.num}</td>
                                </tr>
                            </table>
                        </div>
                }
                    </div>
        )
    }
}

export default Statistics;