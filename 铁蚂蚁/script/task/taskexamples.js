userId = $api.getStorage('userId');
userToKen = $api.getStorage('userToKen');

apiready = function() {
    exit_app(2);
    if (isNullOrEmpty(userId) || userId <= 0 || isNullOrEmpty(userToKen)) {
        location.href = '../../html/login/login.html';
    } else {
        $(".taskexamples_box img").eq(api.pageParam.indexval).show();
    }
}
