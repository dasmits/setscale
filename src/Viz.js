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
    }
}



var cellStyle = (row, col, props)=>{
    const model = props.model;
    const boundary = parseInt(props.boundary);
    
    var critical =  (row > col && row< boundary+1) || (row < col && row>boundary) || (row==boundary && col == boundary+1) || (row == boundary+1 && col == boundary); 
    critical = props.critical && critical;
    

    var val;
    if(row == col){
        val = 2;
    }
    else if(row < col){
        if(model == "set"){
            val = (row > boundary)? 1 : 0;
        }
        else if(model == "scale"){
            val = 0;
        }
        else if(model == "external"){
            val = 0;
        }
        else if(model == "internal"){
            val = (row > boundary)? 1 : 0;
        }
        else{
            val = 0;  
        } 
    }
    else{
        if(model == "set"){
            val = (row > boundary)? 1 : 0;
        }
        else if(model == "scale"){
            val = 1;
        }
        else if(model == "external"){
            val = (row > boundary)? 1 : 0;
        }
        else if(model == "internal"){
            val = 1;
        }
        else{
            val = 0;  
        } 
    }
    
    var val2col = ["#f79797", "#feffbf", "#a2f2ad"]
    

    return {
        border: ".5px solid darkgrey",
        margin: 0,
        padding: 0,
        backgroundColor: val2col[val],
        boxShadow: critical?"inset 0px 0px 10px 1px rgba(75,75,75,.75)": ""
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
            4:["..." , "water", "milk", "soup", "bread"],
            6:["..." , "water", "soda", "milk", "yogurt", "soup", "bread"],
            8:["..." , "water", "soda", "juice", "milk", "yogurt", "soup", "eggs", "read"],
        }
        this.grid = this.makeGrid(this.props);

    }

    makeGrid = props=>{
        var g = []
        
        for(var i=0; i<props.num*props.num; i++){
            const row = parseInt(i/props.num)+1;
            const col = (i%props.num) +1;
            g.push(<div onClick={()=>this.updatePrev(row,col,props.num)} style={cellStyle(row, col,props)}>
                {(row!=1)||<div style = {{top:-25,position:"relative", color:"darkgrey", fontSize:15}}>
                     {this.items[props.num][col]}
                </div>}
                {(col!=1)||<div style = {{left:-85, top: 40, position:"relative", color:"darkgrey", fontSize:15, textAlign:"center"}}>
                     {this.items[props.num][row]}
                </div>}
                {/* <span style = {{top:(row==1)?-25:0,position:"relative"}}>
                     {(col==1?"R"+row+" ("+this.items[props.num][row]+")":row==1?"R"+col+" ("+this.items[props.num][col]+")":"")}
                </span> */}
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
            [<div id="grid" style={gridStyle(this.props.num)}>
                {this.grid}
            </div>,
            <div id="preview">
                <strong>Preview:</strong>
                <div><em>"I only have <strong>{this.state.chosenItem}</strong> in the fridge."</em></div>
                <div>Does that tell you whether or not there is <strong>{this.state.targetItem}</strong> in the fridge?</div>
            </div>]
        )
    }
}
