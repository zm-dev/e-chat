import { createHashHistory } from 'history';

const history = createHashHistory();

history.listen((location, action) => {
  setTimeout(() => {
    if (action === 'POP') {
      return;
    }
    const { state = {} } = location;
    if (!state.noScrollToTop) window.scrollTo(0, 0);
  });
});

export default history;
