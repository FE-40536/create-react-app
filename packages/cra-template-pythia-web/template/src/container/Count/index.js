import React from 'react'
import {connect} from 'react-redux'

const Count = props => {
    const [el, setEl] = React.useState(1)

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{width: 120}}>
                <h3>Sharks</h3>
                <h1>{props.sharks}</h1>
                <button onClick={props.decreaseSharks}>-1</button>
                <button onClick={props.incrementSharks}>+1</button>
                <button
                    onClick={() => {
                        props.syncSet(props.persistence.set, el)
                        setEl(el + 1)
                    }}>
                    sync set
                </button>
            </div>
        </div>
    )
}

const mapState = state => state

const mapDispatch = dispatch => ({
    decreaseSharks: () => dispatch.sharks.decrease(1), // 1为payload
    incrementSharks: () => dispatch.sharks.increment(1), // 1为payload
    syncSet: (prevSet, el) => {
        prevSet.add(el)
        dispatch.persistence.sync({
            set: prevSet,
        })
    },
})

export default connect(mapState, mapDispatch)(Count)
