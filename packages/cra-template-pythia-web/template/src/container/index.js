import React from 'react'
import {Button} from 'antd-mobile'
import history from '@/utils/history'
import {connect} from 'react-redux'
import './index.less'

const mapState = state => state

const mapDispatch = dispatch => ({})

@connect(mapState, mapDispatch)
class Index extends React.Component {
    render = () => {
        return (
            <div className="index container flex column ac">
                <Button
                    type="primary"
                    onClick={() => {
                        history.push('/rematch')
                    }}>
                    rematch
                </Button>
            </div>
        )
    }
}

export default Index
