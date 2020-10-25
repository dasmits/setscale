import React, { Component } from 'react'
import Viz from './Viz';

export default class Control extends Component {
    constructor(props){
        super(props);
        this.state = {
            num: 4,
            boundary: 2,
            model: "set",

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
                        <div>
                            <input type="radio" name="model" value={m} onChange={this.updateModel} checked={this.state.model==m} />
                            <label>{m}</label>
                        </div>
                    )}
            
                    <br/>
                    <label>
                        Number of Items: {this.state.num} <br/>
                        <input type="range" name="num" min="4" max="12" step="2"
                                value={this.state.num} onChange={(e)=>this.setState({num:e.target.value, boundary: e.target.value/2})}/>

                    </label>
                    <br/>
                    <label>
                        Boundary: {this.state.boundary} <br/>
                            <input type="range" name="boundary" min="0" max={this.state.num} step ="1"
                                value={this.state.boundary} onChange={(e)=>this.setState({boundary:e.target.value})}/>
                    </label>
                </form>

                <Viz num={this.state.num} model={this.state.model} boundary ={this.state.boundary}/>

            </div> 
        )
    }
}
