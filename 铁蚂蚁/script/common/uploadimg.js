//previewDiv 预览图 外层div ， hidhenIputId隐藏的input标签，用来存base64值
function getpic(previewDiv, hidhenIputId, imgSize) {
    var obj = previewDiv; //含有子元素img标签的Div对象
    var id = hidhenIputId;
    var picSize = imgSize;
    var systemType = api.systemType;
    var qualityNum = systemType == 'ios' ? 25 : 70;
    api.actionSheet({
        title: '上传照片',
        cancelTitle: '取消',
        buttons: ['拍照', '手机相册']
    }, function(ret, err) {
        if (ret) {
            //通过手机拍照获得图片
            if (ret.buttonIndex == 1) {
                api.getPicture({
                    sourceType: 'camera',
                    encodingType: 'jpg',
                    mediaValue: 'pic',
                    destinationType: 'base64',
                    allowEdit: false,
                    quality: qualityNum,
                    targetWidth: 800,
                    saveToPhotoAlbum: false
                }, function(ret, err) {
                    if (ret) {
                        if (picSize > 0) {
                            var uploadImgSize = getsize(ret.base64Data);

                            if (uploadImgSize > picSize) {
                                api.toast({
                                    msg: '上传图片失败，图片大小不能超过' + picSize + 'M！',
                                    duration: 3000,
                                    location: 'bottom'
                                });
                                clearImg('', obj, id); //刷新，并清空img src ,input标签 value;
                            } else {
                                saveImg(ret.base64Data, obj, id);
                            }
                        } else {
                            saveImg(ret.base64Data, obj, id);
                        }
                    } else {
                        api.toast({
                            msg: '图像获取失败',
                            duration: 3000,
                            location: 'bottom'
                        });
                    }
                });
            } else if (ret.buttonIndex == 2) {
                //手机相册选图片
                api.getPicture({
                    sourceType: 'library',
                    encodingType: 'jpg',
                    mediaValue: 'pic',
                    destinationType: 'base64',
                    allowEdit: false,
                    quality: qualityNum,
                    targetWidth: 800,
                    preview: true,
                    saveToPhotoAlbum: false
                }, function(ret, err) {
                    if (ret) {
                        if (picSize > 0) {
                            var uploadImgSize = getsize(ret.base64Data);

                            if (uploadImgSize > picSize) {
                                api.toast({
                                    msg: '上传图片失败，图片大小不能超过' + picSize + 'M！',
                                    duration: 3000,
                                    location: 'bottom'
                                });
                                clearImg('', obj, id); //刷新，并清空img src ,input标签 value;
                            } else {
                                saveImg(ret.base64Data, obj, id);
                            }
                        } else {
                            saveImg(ret.base64Data, obj, id);
                        }
                    } else {
                        api.toast({
                            msg: '图像获取失败',
                            duration: 3000, ///动画过渡时间，默认300毫秒
                            location: 'bottom'
                        });
                    }
                });
            }
        }
    });
};

function photograph(previewDiv, hidhenIputId, imgSize) {
    var obj = previewDiv; //含有子元素img标签的Div对象
    var id = hidhenIputId;
    var picSize = imgSize;
    var systemType = api.systemType;
    var qualityNum = systemType == 'ios' ? 25 : 70;
    api.actionSheet({
        title: '拍照',
        cancelTitle: '取消',
        buttons: ['拍照']
    }, function(ret, err) {
        if (ret) {
            //通过手机拍照获得图片
            api.getPicture({
                sourceType: 'camera',
                encodingType: 'jpg',
                mediaValue: 'pic',
                destinationType: 'base64',
                allowEdit: false,
                quality: qualityNum,
                targetWidth: 800,
                saveToPhotoAlbum: false
            }, function(ret, err) {
                if (ret) {
                    if (picSize > 0) {
                        var uploadImgSize = getsize(ret.base64Data);
                        if (uploadImgSize > picSize) {
                            api.toast({
                                msg: '上传图片失败，图片大小不能超过' + picSize + 'M！',
                                duration: 3000,
                                location: 'bottom'
                            });
                            clearImg('', obj, id); //刷新，并清空img src ,input标签 value;
                        } else {
                            saveImg(ret.base64Data, obj, id);
                        }
                    } else {
                        saveImg(ret.base64Data, obj, id);
                    }
                } else {
                    api.toast({
                        msg: '图像获取失败',
                        duration: 3000,
                        location: 'bottom'
                    });
                }
            });
        }
    });
};

//obj为点击事件传进来的this对象，id为input标签id
function saveImg(base64Data, obj, id) {
    obj.firstElementChild.src = base64Data; //预览图 src赋值

    var inputTag = document.getElementById(id);
    inputTag.value = base64Data; // base64Data存储在Hidden标签input中
};

function clearImg(base64Data, obj, id) {
    obj.firstElementChild.src = base64Data; //预览图 src赋值

    var inputTag = document.getElementById(id);
    inputTag.value = base64Data; // base64Data存储在Hidden标签input中
};

function getsize(base64data) {
    var base64String = base64data;
    var stringLength = base64String.length - 'data:image/jpg;base64,'.length;

    var sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
    var sizeInKb = sizeInBytes / 1000;
    var sizeInMb = sizeInKb / 1000;
    var size = sizeInMb.toFixed(2); //图片大小 单位Mb ,保留两位小数点
    var floatSize = parseFloat(size);
    return floatSize;
}
