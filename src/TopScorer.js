import React from "react";
import "./TopScorer.css";

class TopScorer extends React.Component{

    state={topScorer:[],goalData:[],dataStatus:true,historyData:this.props.history}

    componentDidMount() {
        this.getGoalData();
        setTimeout(() => {
            this.getAllScorer();
        }, 2 * 1000)
    }


    getGoalData=()=>{  //collect all goals in league
        let tempGoalData=[];
        this.state.historyData.map((item) => {
                    tempGoalData.push(item.goals)
                })
                this.setState({
                    goalData: tempGoalData
                })
    }

    getAllScorer=()=>{ //collect all scorer in league
        const temGoalList=this.state.goalData;
        let tempScorerList=[];
        temGoalList.map((item)=>{
            item.map((goal)=>{
                tempScorerList.push(goal.scorer)
            })
        })
        this.sortTopScorer(tempScorerList);
    }

    sortTopScorer=(scorerList)=>{ //sort scorer in league
        let sortedScorerList=[];
        let counter=1,scorer={id:0,firstName:"",lastName:"",goals:0}
        let playerListByGoal=[];
        sortedScorerList=scorerList.sort((a,b)=>a.id-b.id)
        sortedScorerList.map((player,index)=>{
            if (index<sortedScorerList.length-1) {
                if (sortedScorerList[index].id == sortedScorerList[index + 1].id) {
                    counter++;
                } else {
                    scorer = {
                        id: player.id, firstName: player.firstName
                        , lastName: player.lastName, goals: counter
                    }
                    playerListByGoal.push(scorer);
                    counter = 1;
                }
            }
        })
        let sortPlayerListByGoal=[]
        sortPlayerListByGoal=playerListByGoal.sort((a,b)=>a.goals-b.goals);
        this.setState({topScorer:sortPlayerListByGoal,dataStatus:false})
        debugger;
    }

    render() {
        return (
            <div>
                <div>
                    <section className="wrapperHistory">
                        <div className="topHistory">Top Scorer</div>
                        <div className="bottomHistory" aria-hidden="true">Top Scorer</div>
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
            <table className={"topScoerr"}>
                <tr>
                    <th>Place</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Goals</th>
                </tr>
                        <tr>
                            <td>1</td>
                            <td>{this.state.topScorer[this.state.topScorer.length-1].firstName}</td>
                            <td>{this.state.topScorer[this.state.topScorer.length-1].lastName}</td>
                            <td>{this.state.topScorer[this.state.topScorer.length-1].goals}</td>
                        </tr>
                <tr>
                    <td>2</td>
                    <td>{this.state.topScorer[this.state.topScorer.length-2].firstName}</td>
                    <td>{this.state.topScorer[this.state.topScorer.length-2].lastName}</td>
                    <td>{this.state.topScorer[this.state.topScorer.length-2].goals}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>{this.state.topScorer[this.state.topScorer.length-3].firstName}</td>
                    <td>{this.state.topScorer[this.state.topScorer.length-3].lastName}</td>
                    <td>{this.state.topScorer[this.state.topScorer.length-3].goals}</td>
                </tr>
            </table>
    }
            </div>

        )}
}


export default TopScorer;