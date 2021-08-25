import styles from './App.module.less';
import HomePage from './pages/HomePage';
import PageOne from './pages/PageOne';
import PageTwo from './pages/PageTwo';
import PageThree from './pages/PageThree';
import PageFour from './pages/PageFour';
import { withRouter, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div className={styles.App}>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/page1" component={PageOne} />
        <Route path="/page2" component={PageTwo} />
        <Route path="/page3" component={PageThree} />
        <Route path="/page4" component={PageFour} />
      </Switch>
      <div>this is app</div>
    </div>
  );
}

export default withRouter(App);
