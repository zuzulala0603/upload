function readURL(input) {
    hide(document.getElementById("upload__dropbox"))
    block(uploadPage)
    uploadPage.style.backgroundColor = "white"
    flex(uploadBtnArea)
    flex(uploadOption)
    isImgUploaded = 1
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $(".image-upload-wrap").hide();
            $(".file-upload-image").attr("src", e.target.result);
            $("#result__img__style").attr("src", e.target.result);
            flex(uploadUser);
            $(".image-title").html(input.files.name);
        };

        reader.readAsDataURL(input.files[0]);

    } else {
        removeUpload();
    }
}

function startAi() {
    newResultHtml = ""
    startLoading()
    init().then(() => {
        predict().then(() => {
            hide(uploadPage)
            finishLoading()
            showResult()
        })
    })
}


function triggerClick() {
    if (isImgUploaded == 0) {
        $('.file-upload-input').trigger('click')
    }
}


function removeUpload() {
    hide(uploadOption)
    hide(uploadBtnArea)
    isImgUploaded = 0
    $(".file-upload-input").replaceWith($(".file-upload-input").clone());
    $(".file-upload-content").hide();
    $(".image-upload-wrap").show();
}
$(".image-upload-wrap").bind("dragover", function () {
    $(".image-upload-wrap").addClass("image-dropping");
});
$(".image-upload-wrap").bind("dragleave", function () {
    $(".image-upload-wrap").removeClass("image-dropping");
});



function showResult() {
    block(resultPage)
    let resultList = document.getElementById("result__list")
    resultList.innerHTML = newResultHtml
}


function showRecommand() {
    block(recommandPage)
}