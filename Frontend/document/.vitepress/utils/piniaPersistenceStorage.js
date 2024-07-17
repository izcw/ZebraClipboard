// // 持久化存储插件
// export function createPersistPlugin(options = {}) {
//     const { key: defaultKey = 'pinia', storage: defaultStorage = localStorage } = options;
  
//     return (context) => {
//       const { store, options } = context;
  
//       // 检查是否在选项中启用了持久化
//       const persistConfig = options.persist;
//       if (!persistConfig || !persistConfig.enabled) {
//         return;
//       }
  
//       // 解构持久化配置
//       const { key = defaultKey, strategies = [] } = persistConfig;
  
//       strategies.forEach(strategy => {
//         const { key: strategyKey, paths } = strategy;
  
//         // 根据策略的存储类型选择 localStorage 或 sessionStorage
//         const strategyStorage = strategy.storage === 'sessionStorage' ? sessionStorage : localStorage;
  
//         // 获取存储中的数据，并恢复到 store 中
//         const strategyData = strategyStorage.getItem(`${key}-${strategyKey}`);
//         if (strategyData) {
//           store.$patch(JSON.parse(strategyData));
//         }
  
//         // 订阅 store 的变化，将状态持久化到对应的存储中
//         store.$subscribe((mutation, state) => {
//           const stateToSave = paths && paths.length > 0
//             ? paths.reduce((acc, path) => {
//                 acc[path] = state[path];
//                 return acc;
//               }, {})
//             : state;
  
//           // 将状态序列化并保存到对应的存储中
//           strategyStorage.setItem(`${key}-${strategyKey}`, JSON.stringify(stateToSave));
//         });
//       });
//     };
//   }
  