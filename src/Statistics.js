import React from "react";

class Statistics extends React.Component {

    state={historyData:this.props.history,fasterGoal:0,slowGoal:0,goalInFirstHalf:0
        ,goalInSecHalf:0,mostGoalInRound:0,goalsData:[],dataStatus:true}

    componentDidMount() {
        this.getGoalData();
        setTimeout(() => {
            this.checkTimesOfGoal();
        }, 6 * 1000)
    }

    getGoalData=()=>{
        let tempGoalData=[];
        let allGoalData=[];
        this.state.historyData.map((item) => {
            tempGoalData.push(item.goals)
        })
        this.setState({
            goalsData: tempGoalData
        })
    }

    checkTimesOfGoal=()=>{
        debugger
        let fastGoal=120,slowGoal=0,countGoalFirstHalf=0,countGoalSecHalf=0
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



    render() {


        return (
            <div>
                {
                    this.state.dataStatus ?
                        <div>Please wait...</div>
                        :
                        <div>
                            <label>fastGoal:{this.state.fasterGoal}</label>
                            <br/>
                            <label>slowGoal:{this.state.slowGoal}</label>
                            <br/>
                            <label>firstHalf:{this.state.goalInFirstHalf}</label>
                            <br/>
                            <label>sectHalf:{this.state.goalInSecHalf}</label>
                        </div>
                }
                    </div>
        )
    }
}

export default Statistics;