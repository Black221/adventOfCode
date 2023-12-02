const getInputFileData = (resolver, fileId) => {

    let file = document.getElementById(fileId).files[0];
    let reader = new FileReader();
    let data = [];

    reader.onload = function (e) {
        data = e.target.result.split('\n');
        resolver(data);
    }
    reader.readAsText(file);
}