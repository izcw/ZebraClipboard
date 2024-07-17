<!-- <template>
    <div>

    </div>
</template>
<script setup>
import { watch, ref } from 'vue'
import axios from '../../utils/axios';  // 导入自定义的 axios 实例
import { storeToRefs } from 'pinia';
import { generateEnhancedFingerprint } from '../../utils/fingerprint.js'
import { monitorstorage } from '../hooks/monitorLocalstorage.js';
import { piniaUser } from '../../store/user.js';
const store = piniaUser();
monitorstorage(store);
const { counter, data, accountnumber } = storeToRefs(store);


const users = ref([]);
const fetchUsers = async () => {
    try {
        const response = await axios.get('/user');
        users.value = response.data;
        console.log(users.value);
        users.value.forEach((item, index) => {
            if (item.Browserid.user == accountnumber.value.Browserid.user) {
                if (item.VerifiCodeTime == '' || isTimestampExpired(item.VerifiCodeTime) == true) {
                    const currentTime = Math.floor(Date.now() / 1000);
                    item.VerifiCodeTime = String(currentTime)
                    item.VerifiCode = generateRandomCode()
                    let ind = index + 1
                    // console.log(ind);
                    axios.put('/user/' + ind, item);
                }
            }
        });
    } catch (error) {
        console.error("获取数据时出错：", error);
    }
};
// fetchUsers()

// 判断是否过期
function isTimestampExpired(timestamp) {
    // 获取当前时间的时间戳（秒级）
    const currentTimestamp = Math.floor(Date.now() / 1000);

    // 计算时间戳之间的差值（秒数）
    const difference = currentTimestamp - timestamp;

    // 定义过期时间阈值（5分钟，转换为秒数）
    const expirationThreshold = 10 * 60;

    console.log(difference);

    // 判断差值是否大于过期时间阈值
    return difference > expirationThreshold;
}

// 随机生成4位数验证码
function generateRandomCode() {
    // 生成一个 1000 到 9999 之间的随机整数
    const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    return code.toString(); // 将数字转换为字符串返回
}

const userFingerprint = ref('');
const fingerprint = (val) => {
    // console.log(accountnumber.Browserid);
    const getGenerateEnhanced = async () => {
        try {
            const fingerprint = await generateEnhancedFingerprint();
            userFingerprint.value = fingerprint;
            // console.log(userFingerprint.value, "hhhjjjj");

        } catch (error) {
            console.error('生成指纹时出错：', error);
        }
    }

    if (val.Browserid.user == '' || val.Browserid.user == null || val.Browserid.user == undefined) {
        getGenerateEnhanced()
        // setTimeout(()=>{
        fetchUsers()
        // },1000)

    } else {
        // console.log("已经有了指纹了");
        userFingerprint.value = val.Browserid.user;
        // setTimeout(()=>{
        fetchUsers()
        // },1000)
    }
}
fingerprint(accountnumber.value);

const setAccountnumbers = () => {
    store.setAccountnumber(userFingerprint.value);
};
watch(
    () => userFingerprint.value,
    () => {
        setAccountnumbers();
    },
    { deep: true }
);



</script>
<style scoped lang='scss'></style> -->
