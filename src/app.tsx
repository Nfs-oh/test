import React, { Component } from 'react';
import { routes, asyncRoutes } from './router';
import bridge from '@/config/JSbridge';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserInfo, setTheme, setActoken } from './redux/actions';
import { createBrowserHistory } from 'history';
import { GlobalStyle } from '@/styles/globalStyle';
import { ThemeProvider } from 'styled-components';
import bwmodel from '@/config/bwmodel';
// import VConsole from 'vconsole';
const history = createBrowserHistory();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'light'
    };
  }

  componentDidMount() {
    bridge.addRegisterHandler([
      {
        name: 'refreshUserInfo',
        callback: (data, responseCallback) => {
          const params = data.params;
          this.props.setActoken(params);
        }
      },
      {
        name: 'setTheme',
        callback: (data, responseCallback) => {
          const params = data.params;
          if (params.theme) {
            this.changeTheme(params.theme);
          }
        }
      }
    ]);
  }
  UNSAFE_componentWillMount() {
    const script = document.createElement('script');
    script.src = 'https://v1.cnzz.com/z_stat.php?id=1278563798&web_id=1278563798';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);
    history.listen((location) => {
      if (window._czc) {
        const location = window.location;
        const contentUrl = location.pathname + location.hash;
        const refererUrl = '/';
        window._czc.push(['_trackPageview', contentUrl, refererUrl]);
      }
    });

    this.props.setUserInfo();
    this.setState({ theme: bwmodel.theme === '1' ? 'dark' : 'light' });
    this.props.setTheme(bwmodel.theme === '1' ? 'dark' : 'light');
  }

  changeTheme = (theme) => {
    this.setState({ theme: theme === '1' ? 'dark' : 'light' });
    this.props.setTheme(theme === '1' ? 'dark' : 'light');
  };
  render() {
    const customRoute = asyncRoutes.concat(routes);
    const theme = this.state.theme;
    return (
      <ThemeProvider theme={{ mode: theme }}>
        <GlobalStyle />
        <HashRouter>
          <Switch>
            {customRoute.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props) => {
                  if (route.children) {
                    return (
                      <div>
                        <route.component props={props}></route.component>
                        <Switch>
                          {route.children.map((child, i) => (
                            <Route
                              key={i}
                              path={child.path}
                              exact={child.exact}
                              component={child.component}
                            />
                          ))}
                          <Redirect to={route.children[0].path}></Redirect>
                        </Switch>
                      </div>
                    );
                  } else {
                    return <route.component props={props}></route.component>;
                  }
                }}
              />
            ))}
          </Switch>
        </HashRouter>
      </ThemeProvider>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user
});
const mapDispatchToProps = (dispatch) => ({
  setUserInfo: bindActionCreators(setUserInfo, dispatch),
  setTheme: bindActionCreators(setTheme, dispatch),
  setActoken: bindActionCreators(setActoken, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
