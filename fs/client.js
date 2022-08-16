import React from 'react'
import { render } from 'react-dom'
import App from '../components/App'
import Proptest from '../components/Proptest'
import TextDisplay from '../components/TextDisplay'
import Repo from '../components/Repo'
import { Router, Route, browserHistory  } from 'react-router'

render(( 
    <Router history={browserHistory}>
        <Route path="/" component={App}>
             <Route path="/Proptest" component={Proptest}/>
             <Route path="/TextDisplay" component={TextDisplay}/>
             <Route path="/repo/:userName/:repoName" component={Repo}/>
        </Route>
    </Router> 
  ),document.getElementById('app'))
