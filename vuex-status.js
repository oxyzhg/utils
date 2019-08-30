export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const FAIL = 'FAIL';

export const checkLoading = status => status === LOADING;
export const checkSuccess = status => status === SUCCESS;

export function createStatusReducer(type, key) {
  return {
    [type](state) {
      state[key] = LOADING;
    },
    [`${type}_SUCCESS`](state) {
      state[key] = SUCCESS;
    },
    [`${type}_FAILURE`](state) {
      state[key] = FAIL;
    }
  };
}

export function createAction(type, api) {
  return async (context, payload) => {
    const { commit } = context;
    try {
      commit(type, { payload });
      const res = await api(payload);
      commit(`${type}_SUCCESS`, { res, payload });
      return res;
    } catch (err) {
      commit(`${type}_FAILURE`, { err, payload });
      throw err;
    }
  };
}
