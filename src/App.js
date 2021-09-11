import styles from './App.module.less';
import HomePage from './pages/HomePage';
import PageOne from './pages/PageOne';
import PageTwo from './pages/PageTwo';
import PageThree from './pages/PageThree';
import PageFour from './pages/PageFour';
import { withRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core';
import NavigationBar from "@/components/navigationBar/navigationBar";

const theme = createTheme({
  palette: {
    primary: {
      main: '#224878',
    },
    secondary: {
      main: '#2196f3',
    },
  }
});


function App() {
  return (
    <div className={styles.App}>
      <ThemeProvider theme={theme}>
      <NavigationBar />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/page1" component={PageOne} />
        <Route path="/page2" component={PageTwo} />
        <Route path="/page3" component={PageThree} />
        <Route path="/page4" component={PageFour} />
      </Switch>
      </ThemeProvider>
      {/* <div>this is app</div> */}
    </div>
  );
}

export default withRouter(App);
