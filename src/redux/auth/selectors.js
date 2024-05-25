export const selectUserName = (state) => state.auth.user.name;
export const selectToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectUserRole = (state) => state.auth.user.role;
