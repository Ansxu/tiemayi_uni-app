var userId = $api.getStorage('userId');
var userToKen = $api.getStorage('userToKen');

apiready = function() {
    exit_app(0);
    if (isNullOrEmpty(userId) || isNullOrEmpty(userToKen)) {
        location.href = '../login/login.html';
    }
}

//获取用户通讯录
function Getcontacts() {
    var systemType = api.systemType;
    var systemVersion = api.systemVersion;
    systemVersion = systemVersion.split(".", 1);

    var contacts = api.require('contacts');
    contacts.queryByPage({
            count: 2000,
            pageIndex: 0
        },
        function(ret, err) {
            if (ret) {
                var json = $.parseJSON(JSON.stringify(ret));
                var addressbook = JSON.stringify(json.contacts);
                if (addressbook == "" || addressbook == null) {
                    tips("请授权获取通讯录信息");
                    location.href = 'oauth.html';
                    return false;
                } else {
                    保存通讯录到
                    SaveAddressBook(addressbook);
                }
            } else {
                tips(JSON.stringify(err));
                location.href = 'oauth.html';
            }
        });
}

//保存通讯录信息到服务器
function SaveAddressBook(addressbookStr) {
    loading();
    api.ajax({
        url: baseUrl + "/api/Member/SaveMemberAddressBook",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                AddressBookJson: addressbookStr
            }
        }
    }, function(ret, err) {
        SaveAddressBookResult(ret);
        loading_close();
    });
}

function SaveAddressBookResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            $api.setStorage('IsAddressBook', true);
            location.href = '../user/member.html';
            tips("保存成功");
        } else if (json.errcode == 5) {
            tips("通讯录数据为空");
            location.href = 'oauth.html';
        } else if (json.errcode == 2) {
            tips("登陆失败，请重新登陆");
            location.href = '../login/login.html';
        } else {
            tips(json.msg);

        }
    } else {
        tips("服务器走神了，请重试");
    }
}
