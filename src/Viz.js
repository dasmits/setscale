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



var cellStyle = (i, props)=>{
    const model = props.model;
    const num = props.num;
    const boundary = props.boundary;
    var row = parseInt(i/num)+1
    var col = (i%num) +1
    const critical = props.critical && row != col && row<(num/2+1) == col<(num/2+1); 
    
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

var makeGrid = props=>{
    var g = []
    for(var i=0; i<props.num*props.num; i++){
        g.push(<div style={cellStyle(i,props)}></div>)
    }
    return g
}

export default class Viz extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
        this.grid = makeGrid(this.props);
        
    }
    
    shouldComponentUpdate(nextProps, nextState){
        if(! equal(nextProps, this.props)){
            this.grid = makeGrid(nextProps);
            return true;
        }
        return false;
        
    }

    render() {
        return (
            <div id="grid" style={gridStyle(this.props.num)}>
                {this.grid}
            </div>
        )
    }
}
