// // 浏览器指纹
// import { ref } from 'vue'
// import { generateEnhancedFingerprint } from '../../utils/fingerprint.js'

// export const fingerprint = (accountnumber) => {
//     console.log(accountnumber.Browserid);
//     console.log("可以吗");
//     const userFingerprint = ref('');

//     const getGenerateEnhanced = async () => {
//         try {
//             const fingerprint = await generateEnhancedFingerprint();
//             userFingerprint.value = fingerprint;
//             // console.log(userFingerprint.value, "hhhjjjj");

//         } catch (error) {
//             console.error('生成指纹时出错：', error);
//         }
//     }

//     if (accountnumber.Browserid.user == '' || accountnumber.Browserid.user == null || accountnumber.Browserid.user == undefined) {
//         getGenerateEnhanced()
//     } else {
//         console.log("已经有了");
//         userFingerprint.value = accountnumber.Browserid.user
//     }


//     return {
//         userFingerprint
//     }
// }