import "tailwindcss/tailwind.css";
import "react-datepicker/dist/react-datepicker.css";
import '../styles/globals.css'
import App from 'next/app';

import Store from '../stores';

export default class WorkOutsApp extends App {
  static async getInitialProps(appContext) {
    const store = new Store();
    appContext.ctx.store = store;
    const appProps = await App.getInitialProps(appContext);
    return {
      ...appProps,
      initialData: store
    };
  }

  constructor(props) {
    super(props);
    const isServer = typeof window === 'undefined';
    this.store = isServer ? props.initialData : new Store(props.initialData);
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} store={this.store} />
  }
}

// export default WorkOutsApp;
