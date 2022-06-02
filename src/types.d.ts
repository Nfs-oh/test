export {};

declare global {
  interface Window {
    WebViewJavascriptBridge: {};
    WVJBCallbacks: {
      push: () => void;
    };
  }
}
