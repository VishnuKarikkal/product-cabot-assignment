function showFiles()
{
    let inputField=document.getElementById('imgFile');
    let file=inputField.files;
    let fileReader=new FileReader;
    fileReader.onload=function(event)
                        {
                            let imageURL=fileReader.result;
                            $('#preview').attr("src",`${imageURL}`);
                        }
    fileReader.readAsDataURL(file[0]);
}