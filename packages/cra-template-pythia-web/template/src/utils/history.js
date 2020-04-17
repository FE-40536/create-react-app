import {createBrowserHistory} from 'history'
import qs from 'qs'

const history = createBrowserHistory()

function addLocationQuery(history) {
    history.location = Object.assign(history.location, {
        query: qs.parse(history.location.search.replace(/^\?/, '')),
    })
}

addLocationQuery(history)

history.listen(() => {
    addLocationQuery(history)
})

export default history
