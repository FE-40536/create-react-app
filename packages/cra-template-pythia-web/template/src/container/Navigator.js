import {Icon} from 'antd-mobile'
import React, {Component, lazy, Suspense} from 'react'
import {Route, Switch} from 'react-router-dom'

export default class Navigator extends Component {
    state = {
        selectedTab: global.location.pathname.slice(1),
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return (
            <Suspense fallback={<PageLoading />}>
                <Switch>
                    <Route exact path="/" component={lazy(() => import('.'))} />
                    <Route exact path="/rematch" component={lazy(() => import('./Count'))} />
                </Switch>

                {/* <TabBarPart /> */}
            </Suspense>
        )
    }
}

class PageLoading extends Component {
    render() {
        return (
            <div
                style={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Icon type="loading" />
            </div>
        )
    }
}
