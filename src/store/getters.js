const getters = {
  menus: state => state.user.menus,
  userInfo: state => state.user.userInfo,
  token: state => state.user.token,
  elements: state => state.user.elements
}
export default getters
