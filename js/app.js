const cvs = document.querySelector("#cvs");
const cxt = cvs.getContext("2d");
const imgInput = document.getElementById('image')
const buttons = document.querySelectorAll("#button")
const save = document.getElementById("save")
let imgdata;

let image

let data;

let active;

//removing styling from input


//running event listener for image input if changed
imgInput.addEventListener('change', (e) => {
    if (e.target.files) {
        //getting files
        console.log(e.target.files)
        //here we get the image file
        let imageFile = e.target.files[0];
        // fileReader
        var fr = new FileReader();
        // convert to url
        fr.readAsDataURL(imageFile);
        // if the image loads sucessfully give me the data
        fr.onloadend = function (e) {
            //image
            image = new Image();
            image.src = e.target.result;
            image.onload = function (e) {
                cvs.width = image.width;
                cvs.height = image.height;
                cxt.drawImage(image, 0, 0)
                //get data 
                imgdata = cxt.getImageData(0, 0, image.width, image.height)
            }
        }
    }
    else{
        cvs.style.display='none'
    }
})

cvs.addEventListener('click', () => {
    data = imgdata.data
    console.log(data);
    blue()

})

buttons.forEach(elem => {
    elem.addEventListener('click', (e) => {
        active = elem.name;
        switch (active) {
            case "red":
                red()
                break;
            case "blue":
                blue()
                break;
            case "grayscale":
                grayscale()
                break;
            case "green":
                green()
                break;
            case "purple":
                purple()
                break;
            case "remove-filters":
                nofilter()
                break;
            case "cyan":
                cyan()
                break;
            case "yellow":
                yellow()
                break;
            default:
                break;
        }

    })
});

//removing all filters
function nofilter() {
    cxt.drawImage(image, 0, 0)
    imgdata = cxt.getImageData(0, 0, image.width, image.height)
    data = imgdata.data
    for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i]; // red
        data[i + 1] = data[i + 1]; // green
        data[i + 2] = data[i + 2]; // blue
    }
    cxt.putImageData(imgdata, 0, 0)
}

//red filter
function red() {
    data = imgdata.data
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 / 2; // red
        data[i + 1] = data[i + 1]; // green
        data[i + 2] = data[i + 2]; // blue
    }
    cxt.putImageData(imgdata, 0, 0)
}

//custom filters
function purple() {
    grayscale()
    red()
    blue()

}

function cyan() {
    data = imgdata.data
    for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i]; // red
        data[i + 1] = 255 / 2; // green
        data[i + 2] = data[i + 2]; // blue
    }
    cxt.putImageData(imgdata, 0, 0)
    blue()

}

function yellow() {
    data = imgdata.data
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 / 3; // red
        data[i + 1] = data[i + 1]; // green
        data[i + 2] = data[i + 2]; // blue
    }
    cxt.putImageData(imgdata, 0, 0)

    for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i]; // red
        data[i + 1] = 255 / 3; // green
        data[i + 2] = data[i + 2]; // blue
    }
    cxt.putImageData(imgdata, 0, 0)

}
//blue filter
function blue() {
    data = imgdata.data
    for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i]; // red
        data[i + 1] = data[i + 1]; // green
        data[i + 2] = 255; // blue
    }
    cxt.putImageData(imgdata, 0, 0)
}

//green
function green() {
    data = imgdata.data
    for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i] / 3; // red
        data[i + 1] = 255 / 5; // green
        data[i + 2] = data[i + 2] / 3; // blue
    }
    cxt.putImageData(imgdata, 0, 0)
}
//grayscale 
function grayscale() {
    data = imgdata.data
    for (let i = 0; i < data.length; i += 4) {
        let avg = (data[i] * 1 / 3 + data[i + 1] * 1 / 3 + data[i + 2] * 1 / 3)

        data[i] = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
    }

    cxt.putImageData(imgdata, 0, 0)
}

//downloading the image
function download(){
  let  url = cvs.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
  let link = document.createElement('a');
  link.download = "image.png";
  link.href = url;
  link.click();
}

save.addEventListener('click', download)