import React,{Component} from 'react';
import {connect} from 'react-redux';
import Row from './row';
import Button from './button';
import Label from './label';
import Board from './board';
import Size from './size';
import Speed from './speed';


const withLifeCycle = WrappedComponent =>
    class AppDidMount extends Component {
        componentDidMount() {
            this.props.start();
        }
        
        render() {
            return <WrappedComponent {...this.props} />;
        }
    };

const BoardApp = ({
                 dispach,
                 data: {board, running, generation, size, activeSize, speed, activeSpeed},
                 start,
                 stop,
                 generate,
                 clear,
                 changeSize,
                 changeSpeed,
                 onCellClick
             }) => (
    <div className="container">
        <Row>
            <Button active={running} onClick={running ? stop : start}>
                {running ? "stop" : "start"}
            </Button>
            <Button onClick={() => clear(size[activeSize])}>clear</Button>
            <Button onClick={() => generate(size[activeSize])}>regenerate</Button>
            <Label>
                Generations: <strong>{generation}</strong>
            </Label>
        </Row>
        
        <Board board={board} onCellClick={onCellClick}/>
        
        <Size size={size} activeSize={activeSize} changeSize={changeSize}/>
        
        <Speed speed={speed} activeSpeed={activeSpeed} changeSpeed={changeSpeed}/>
    </div>
);

const AppComponent = withLifeCycle(BoardApp);

const mapStateToProps = state => state;

export default connect(mapStateToProps)(AppComponent);
