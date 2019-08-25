import React from 'react';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            display: '',
            hasDecimal: false,
            result: 0 
        }

        this.clear = this.clear.bind(this)
        this.handleNumber = this.handleNumber.bind(this)
        this.isDecimal = this.isDecimal.bind(this)
        this.calculate = this.calculate.bind(this)
    }
    
    clear(){
        this.setState({ 
            display: '0', 
            result: '',
            hasDecimal: false 
        });
    }

    handleNumber(e){
        if(this.isDecimal(e)){
            this.setState({
                display: this.state.display === '0'? e.target.textContent: this.state.display.concat(e.target.textContent)
            })
        }
    }

    isDecimal(e){
        if(e.target.textContent === '.' && this.state.hasDecimal)
            return false;

        else if(e.target.textContent === '.' && !this.state.hasDecimal){
            this.setState({hasDecimal: true})
            return true;
            
        } else if (['+', '-', '*', '/'].indexOf(e.target.textContent) !== -1){
            this.setState({hasDecimal: false})
            return true
        }

        else 
            return true;   

    }

    calculate(){
        const exp = /([[+-/*]+]?)?([[\d.]+]?)/gm;
        let res = 0;

        Array.from(this.state.display.matchAll(exp)).forEach(el => {
            let op = el[1] === undefined? '+' : el[1];
            let number = el[2];

            if(op.length > 1 && op.endsWith('-')){
                op = op[0];
                number = '-'.concat(number);
            }

            if(op.length > 1){
                op = Array.from(op);
                op = op.splice(op.indexOf(op.length-1), 1).join('')
            }
            
            switch(op){
                case '+':
                    res += parseFloat(number);
                break;

                case '-':
                    res -= parseFloat(number);
                break;

                case '*':
                    res *= parseFloat(number);
                break;

                case '/':
                    res /= parseFloat(number);
                break;     
                default:
            }

        });

        this.setState({ result: res })
    }

    render(){
        return (
            <div className="card mt-3">
            <div id="display">
                {(this.state.result)? this.state.result : this.state.display}
            </div>
            <div className="content">
                <div className="left flex">
                    <button onClick={this.clear} id="clear">AC</button>
                    <button onClick={this.handleNumber} id="one">1</button>
                    <button onClick={this.handleNumber} id="two">2</button>
                    <button onClick={this.handleNumber} id="three">3</button>
                    <button onClick={this.handleNumber} id="four">4</button>
                    <button onClick={this.handleNumber} id="five">5</button>
                    <button onClick={this.handleNumber} id="six">6</button>
                    <button onClick={this.handleNumber} id="seven">7</button>
                    <button onClick={this.handleNumber} id="eight">8</button>
                    <button onClick={this.handleNumber} id="nine">9</button>
                    <button onClick={this.handleNumber} id="zero">0</button>
                    <button onClick={this.handleNumber} id="decimal">.</button>
                </div>
                <div className="right flex">
                    <button onClick={this.handleNumber} id="add">+</button>
                    <button onClick={this.handleNumber} id="subtract">-</button>
                    <button onClick={this.handleNumber} id="multiply">*</button>
                    <button onClick={this.handleNumber} id="divide">/</button>
                    <button onClick={this.calculate} id="equals">=</button>
                </div>
            </div>
            </div>
        );
    }
}

export default App;
