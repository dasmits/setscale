import React, { Component } from 'react'
import Viz from './Viz';
import "./Viz.css";

export default class Control extends Component {
    constructor(props){
        super(props);
        this.state = {
            num: 4,
            boundary: 2,
            model: "set",
            critical : false
        }
    }

    updateModel = e =>{
        this.setState({model:e.target.value});
    }

    render(){
        return(
            <div>
                <form>
                    {["set", "scale", "internal", "external", "literal"].map(m=>
                        <>
                        <input type="radio" name="model" id={m+"_id"} value={m} onChange={this.updateModel} checked={this.state.model==m} />
                        <label for={m+"_id"}>{m}</label>
                        </>
                    )}
            
                    <br/>
                    <label>
                        Items: {this.state.num} 
                        <input type="range" name="num" min="4" max="8" step="2"
                                value={this.state.num} onChange={(e)=>this.setState({num:e.target.value, boundary: e.target.value/2})}/>
                    </label>
                    
                    
                
                    <label>
                        Set: {this.state.boundary}
                            <input type="range" name="boundary" min="0" max={this.state.num} step ="1"
                                value={this.state.boundary} onChange={(e)=>this.setState({boundary:e.target.value})}/>
                    </label>
                    <button type="button" onClick={(e)=>this.setState({critical:!this.state.critical})}>Toggle Critical : {this.state.critical?"True":"False"}</button>
                </form>

                <Viz critical={this.state.critical} num={this.state.num} model={this.state.model} boundary ={this.state.boundary}/>

            </div> 
        )
    }
}
