import React, { Component } from 'react'
var equal = require('deep-equal');

var gridStyle = (n)=>{
    return {
        display:"grid",
        gridTemplateColumns: "repeat("+n+", 1fr)",
        gridTemplateRows:"repeat("+n+", 1fr)",
        height: 500,
        width: 500,
        margin: "30px auto",
        position: "relative",
    }
}



var cellStyle = (row, col, props)=>{
    const model = props.model;
    const boundary = parseInt(props.boundary);
    
    var critical =  (row > col && row< boundary+1) || (row < col && row>boundary); 
    critical = props.critical && critical;
    

    var val;
    if(row === col){
        val = 2;
    }
    else if(row < col){
        if(model === "set"){
            val = (row > boundary)? 1 : 0;
        }
        else if(model === "ordering"){
            val = 0;
        }
        else if(model === "disjunction"){
            val = 0;
        }
        else if(model === "conjunction"){
            val = (row > boundary)? 1 : 0;
        }
        else{
            val = 0;  
        } 
    }
    else{
        if(model === "set"){
            val = (row > boundary)? 1 : 0;
        }
        else if(model === "ordering"){
            val = 1;
        }
        else if(model === "disjunction"){
            val = (row > boundary)? 1 : 0;
        }
        else if(model === "conjunction"){
            val = 1;
        }
        else{
            val = 0;  
        } 
    }
    
    var val2col = ["#ff3737", "#feffbf", "#a2f2ad"]
    const negshades = ["#ff3737","#f84e41", "#f36549","#f48757","#ef9c58","#f4bb68", "#f5ca73","#fcec9d"]
    var color = val2col[val];
    if(val===0 && props.negation !=="uniform" && props.model !=="set" && props.model !=="literal"){
        var neg = 0;
        if(props.negation === "query"){
            neg = row-1
        }
        else if(props.negation ==="trigger"){
            neg = props.num-col
        }
        else{
            neg = Math.max(row-1, props.num-col)
        }
        
        color = negshades[neg];
    }

    

    return {
        border: ".5px solid darkgrey",
        margin: 0,
        padding: 0,
        backgroundColor: color, //props.critical?critical?color:"grey":color
        position: "relative", 
        boxShadow: props.critical?critical?"inset 0px 0px 5px 1px rgba(25,25,25,.75)": "inset 0px 0px 5px 100px rgba(25,25,25,.4)":"",
    }
}





export default class Viz extends Component {
    constructor(props){
        super(props);
        this.state = {
            chosenItem: "...",
            targetItem: "..."
        }
        this.items= {
            4:["..." , "water", "milk", "yogurt", "meat"],
            6:["..." , "water", "soda", "milk", "yogurt", "ketchup", "meat"],
            8:["..." , "water", "soda", "juice", "milk", "yogurt", "ketchup", "eggs", "bread"],
        }

        this.grid = this.makeGrid(this.props);

    }

    makeGrid = props=>{
        var g = []

        for(var i=0; i<props.num*props.num; i++){
            const row = parseInt(i/props.num)+1;
            const col = (i%props.num) +1;
            g.push(<div onClick={()=>this.updatePrev(row,col,props.num)} style={cellStyle(row, col,props)}>
                {(row!==1)||<div style = {{top:-25, left: "50%", transform: "translate(-50%, 0)",position:"absolute", color:"darkgrey", fontSize:15}}>
                     {this.items[props.num][col]}
                </div>}
                {(col!==1)||<div style = {{left:-20, top: "50%", transform: "translate(-50%, -50%)", position:"absolute", color:"darkgrey", fontSize:15, textAlign:"center"}}>
                     {this.items[props.num][row]}
                </div>}
            </div>);
        }
        return g
    }

    updatePrev = (row, col, n)=>{
        this.setState({chosenItem:this.items[n][col],targetItem:this.items[n][row]})
    }
    
    shouldComponentUpdate(nextProps, nextState){
        console.log(nextState)
        if(! equal(nextProps, this.props) || !equal(nextState, this.state)){
            this.grid = this.makeGrid(nextProps);
            return true;
        }
        return false;
        
    }

    render() {
        return (
            [<h2>Trigger Items</h2>,<div id="grid" style={gridStyle(this.props.num)}>
                {this.grid}
                <h2 style={{fontSize: "1.8em",position:"absolute", top:"55%", left:-140, transform: "rotate(-90deg) translate(50%, 0)"}}>Query Item</h2>
            </div>,
            <div id="preview">
                <strong>Preview:</strong>
                <div><em>"I only have <strong>{this.state.chosenItem}</strong> in the fridge."</em></div>
                <div>Does that tell you whether or not there is <strong>{this.state.targetItem}</strong> in the fridge?</div>
            </div>]
        )
    }
}
