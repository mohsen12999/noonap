# noon-ap

## Todo

- [x] redux
- [x] add [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [x] material-ui

- [ ] main page -> tab index
- [ ] product page
  - [ ] product list
  - [x] add product
  - [ ] remove product
  - [ ] product cart count
  - [ ] page title
- [ ] address page
  - [ ] make page
  - [ ] load address
  - [ ] enable/disable load address btn
  - [ ] load current location
  - [ ] load times
- [x] soon page -> product group == false
- [ ] cart page -> see what you buy
- [ ] checkout page -> after address & before go to bank
- [ ] come back from bank page
- [ ] rating page

- [ ] install btn ->isAppInstallable && !isAppInstalled,deferredPrompt.prompt()
- [ ] router, title, active enable

## Bugs

- [ ] reset store when change page
- [ ] https/ssl -> cloudflare
- [ ] page title -> set when component mount -> [React Helmet](https://github.com/nfl/react-helmet)
- [ ] active tab -> read from store
- [x] remove from shop cart
- [ ] only save one market

## suggest

- [ ] add storybook -> `npx storybook`
- [ ] [react-snap](https://github.com/stereobooster/react-snap)
- [ ] read info at first -> fetch at beggining and save in store -> component mount off app -> not good for offline mode

```js
function fetchProducts() {
    return dispatch => {
        dispatch(fetchProductsPending());
        fetch('https://exampleapi.com/products')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchProductsSuccess(res.products);
            return res.products;
        })
        .catch(error => {
            dispatch(fetchProductsError(error));
        })
    }
}

export function productsReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_PRODUCTS_PENDING:
            return {
                ...state,
                pending: true
            }
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                pending: false,
                products: action.payload
            }
        case FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state;
    }
}

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://hn.algolia.com/api/v1/search?query=redux',
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  const useFetch = (url) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch(url);
      const data = await res.json();
      if (mounted) setData(data);
    })();
    const cleanup = () => { mounted = false; };
    return cleanup;
  }, [url]);
  return data;
};
```

## Help link

- active tab in state -> [Example of React JS with Material UI components](https://www.golangprograms.com/example-of-react-js-with-material-ui-components.html)
- [Getting started with create-react-app, Redux, React Router & Redux Thunk](https://medium.com/@notrab/getting-started-with-create-react-app-redux-react-router-redux-thunk-d6a19259f71f)
- change active tab in constroctor or hook to/from state.
- [connected-react-router](https://github.com/supasate/connected-react-router)
- [getting-started-with-connected-react-router](https://subscription.packtpub.com/book/web_development/9781789532555/8/ch08lvl1sec46/getting-started-with-connected-react-router)

## flow

- main => markets => products => deliver => address => order => bank => factor
