// node_modules/.pnpm/vitepress@1.3.1_@algolia+client-search@4.24.0_async-validator@4.2.5_axios@1.7.2_postcss@8.4.3_ngxujo6nstyuf5mtztkrxzxag4/node_modules/vitepress/lib/vue-demi.mjs
var isVue2 = false;
var isVue3 = true;
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}

export {
  isVue2,
  isVue3,
  set,
  del
};
/*! Bundled license information:

vitepress/lib/vue-demi.mjs:
  (**
   * vue-demi v0.14.7
   * Copyright (c) 2020-present, Anthony Fu
   * @license MIT
   *)
*/
//# sourceMappingURL=chunk-7P2SYXZX.js.map
