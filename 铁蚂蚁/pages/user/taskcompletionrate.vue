<template>
    <div class="bg_f8f8f8">
        <headers>账号完成率</headers>
        <div class="main completionRate">
            <img class="bannertop" src="/static/image/banner/accountrule.png" />
            <div class="completionRate-box">
                <div class="completionRate-tit">
                    <p>接单规则</p>
                </div>
                <div class="completionRate-text">
                    平台采用拍单机制，用户打开APP，登录平台后，需开启接单模式， 选择愿意接单的任务类型等条件，等待系统派单，系统有订单时，会 根据如下规则综合后选择用于拍单。
                </div>
                <p class="completionRate-p">
                    1、开启接单模式的用户
                </p>
                <p class="completionRate-p">
                    2、符合商家对账号的要求
                </p>
                <p class="completionRate-p">
                    3、符合平台对时间间隔和订单数量的要求
                </p>
                <p class="completionRate-p">
                    4、优先给完成率高、被投诉率低、接单少量的用户
                </p>
                <div class="completionRate-tit" style="margin-top:.3rem;">
                    <p>完成率</p>
                </div>
                <div class="completionRate-text">完成率是指你最近30天内所有完成订单数占有系统派送给你的订单总数百分比。</div>
                <p class="completionRate-p">
                    1、系统派单之后不去操作，造成超时系统自动取消订单
                </p>
                <p class="completionRate-p">
                    2、用户要求商家取消订单（或商家要求用户取消订单）
                </p>
                <p class="completionRate-p">
                    3、用户自行取消订单
                </p>
                <p class="completionRate-p">
                    4、管理员取消的订单
                </p>
                <div class="completionRate-text" style="padding-bottom:.3rem;">维持高完成率可以保持平台对商家和用户的可靠性，也会增加系统派送订单给你的优先级</div>
            </div>
        </div>
    </div>
</template>

<script>
import {} from '@/utils';
export default {
    data(){
        return {

        }
    },
    onLoad(){

    },
    onShow(){

    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>

</style>