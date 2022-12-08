import React from 'react';
import styles from './app.module.css';

class ButtonsGroup extends React.Component {
    render() {
        return <div className="buttons">
            {this.props.children}
        </div>
    }
}

function Button({label, ...props}) {
    return <button {...props}>{label}</button>
}

function App() {
    return <div className={styles.app}>
        <ButtonsGroup>
            <Button label="CLICK ME!" onClick={() => alert('Hello world!')} />
        </ButtonsGroup>
    </div>
}

export default App;