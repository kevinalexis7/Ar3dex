function previewImage (event, elementId) {
    const input = event.target;
    
    imgpreview = document.getElementById(elementId);
    
    if(!input.files.length) return
    
    file = input.files[0]
    
    objectURL = URL.createObjectURL(file);
    
    imgpreview.src = objectURL;
  }
  
  function previewSecondaryImage (event, elementId) {
    const input = event.target;
    
    const secondaryImgPreviews = [
        document.getElementById(elementId + "-0"),
        document.getElementById(elementId + "-1"),
        document.getElementById(elementId + "-2")
    ];
    
    if(!input.files.length) return

    const files = input.files;

    for (let i = 0; i < files.length && i < secondaryImgPreviews.length; i++) {
        const file = files[i];
        const objectURL = URL.createObjectURL(file);
        
        secondaryImgPreviews[i].src = objectURL;
    }



    
  }
  