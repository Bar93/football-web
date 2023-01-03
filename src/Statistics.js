import React from "react";

class Statistics extends React.Component {

    state={historyData:this.props.history,fasterGoal:0,slowGoal:0,goalInFirstHalf:0
        ,goalInSecHalf:0,mostGoalInRound: {index:0,num:0},minGoalInRound: {index:0,num:100},goalsData:[],dataStatus:true}

    componentDidMount() {
        this.getGoalData();
        setTimeout(() => {
            this.checkTimesOfGoal();
        }, 6 * 1000)
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
                            <br/>
                            <label>mostGoal:{this.state.mostGoalInRound.index},{this.state.mostGoalInRound.num}</label>
                            <br/>
                            <label>minGoal:{this.state.minGoalInRound.index},{this.state.minGoalInRound.num}</label>
                        </div>
                }
                    </div>
        )
    }
}

export default Statistics;