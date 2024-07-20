// import { defineStore } from 'pinia';

// // 持久化配置
// const persistConfig = {
//     enabled: true, // 为 true 则开启持久化存储
//     strategies: [
//         {
//             key: 'user', // 存储名称
//             storage: 'localStorage', // 存储方式，可以是 'localStorage' 或 'sessionStorage'
//             paths: [] // 指定 state 中哪些数据需要被持久化，如果为空或者不存在等就全部存储
//         }
//     ]
// };

// const piniaName = 'user';

// export const piniaUser = defineStore(piniaName, {
//     state: () => ({
//         accountnumber: {},
//     }),
//     actions: {
//         steacc(val) {
//             this.accountnumber = val
//         },
//         // 根据 persistConfig 配置存储状态到指定的存储方式
//         setlocalStorages(fields = []) {
//             let stateToStore;

//             if (fields.length > 0) {
//                 // 如果提供了字段列表，则只存储这些字段
//                 stateToStore = fields.reduce((acc, field) => {
//                     acc[field] = this.$state[field];
//                     return acc;
//                 }, {});
//             } else if (persistConfig && persistConfig.enabled) {
//                 const paths = persistConfig.strategies[0].paths;
//                 if (paths && paths.length > 0) {
//                     // 如果 persistConfig 配置中指定了路径，则只存储这些路径对应的状态
//                     stateToStore = paths.reduce((acc, path) => {
//                         acc[path] = this.$state[path];
//                         return acc;
//                     }, {});
//                 } else {
//                     // 如果路径不存在或为空，则存储整个状态
//                     stateToStore = this.$state;
//                 }
//             } else {
//                 // 如果没有 persistConfig 配置，则存储整个状态
//                 stateToStore = this.$state;
//             }

//             // 动态选择存储方式，默认为 localStorage
//             const storageType = persistConfig.strategies[0].storage || 'localStorage';
//             const storage = window[storageType];
//             storage.setItem(persistConfig.strategies[0].key || piniaName, JSON.stringify(stateToStore));
//         },
//         // 从指定的存储方式获取存储的状态并进行恢复
//         getlocalStorages() {
//             if (typeof window !== 'undefined' && persistConfig && persistConfig.enabled) {
//                 const storageType = persistConfig.strategies[0].storage || 'localStorage';
//                 const storage = window[storageType];
//                 const state = storage.getItem(persistConfig.strategies[0].key || piniaName);
//                 if (state) {
//                     this.$patch(JSON.parse(state));
//                 }
//             }
//         }
//     },
// });
